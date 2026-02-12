import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const SEC_USER_AGENT = process.env.SEC_USER_AGENT || "NexusLogic (admin@theokoles.ai)";

const server = new Server(
    {
        name: "sec-pulse",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

/**
 * Fetch SEC filings for a given ticker or CIK.
 */
async function getFilings(query: string) {
    try {
        // Note: EDGAR search usually requires CIK. We'll try to resolve Ticker to CIK if needed.
        // For now, let's use a simplified approach for demonstration or a direct EDGAR search URL.
        // SEC provides a JSON mapping for tickers to CIKs: https://www.sec.gov/files/company_tickers.json

        // 1. Get CIK from Ticker
        const tickerResponse = await axios.get("https://www.sec.gov/files/company_tickers.json", {
            headers: { "User-Agent": SEC_USER_AGENT }
        });

        let cik = "";
        const data = tickerResponse.data;
        for (const key in data) {
            if (data[key].ticker.toUpperCase() === query.toUpperCase()) {
                cik = data[key].cik_str.toString().padStart(10, '0');
                break;
            }
        }

        if (!cik) {
            // If it's already a CIK
            if (/^\d+$/.test(query)) {
                cik = query.padStart(10, '0');
            } else {
                throw new Error(`Could not find CIK for ticker: ${query}`);
            }
        }

        // 2. Fetch submissions from SEC API
        const submissionsResponse = await axios.get(`https://data.sec.gov/submissions/CIK${cik}.json`, {
            headers: { "User-Agent": SEC_USER_AGENT }
        });

        const filings = submissionsResponse.data.filings.recent;
        const result = [];

        for (let i = 0; i < Math.min(filings.accessionNumber.length, 10); i++) {
            result.push({
                accessionNumber: filings.accessionNumber[i],
                filingDate: filings.filingDate[i],
                form: filings.form[i],
                primaryDocument: filings.primaryDocument[i],
                description: filings.primaryDocDescription[i]
            });
        }

        return result;
    } catch (error: any) {
        return { error: error.message };
    }
}

// Tool definitions
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "get_filings",
                description: "Get recent SEC filings (10-K, 10-Q, 8-K) for a company ticker or CIK.",
                inputSchema: {
                    type: "object",
                    properties: {
                        query: {
                            type: "string",
                            description: "Stock ticker (e.g., TSLA) or SEC CIK number.",
                        },
                    },
                    required: ["query"],
                },
            },
        ],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === "get_filings") {
        const query = request.params.arguments?.query as string;
        const filings = await getFilings(query);
        return {
            content: [{ type: "text", text: JSON.stringify(filings, null, 2) }],
        };
    }
    throw new Error("Tool not found");
});

async function runServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("SEC Pulse MCP Server running on stdio");
}

runServer().catch(console.error);
