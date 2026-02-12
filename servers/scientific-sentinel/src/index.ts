import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const server = new Server(
    {
        name: "scientific-sentinel",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

/**
 * Search ArXiv for papers.
 */
async function searchArxiv(query: string, maxResults: number = 5) {
    try {
        const response = await axios.get(`http://export.arxiv.org/api/query`, {
            params: {
                search_query: `all:${query}`,
                max_results: maxResults,
                sortBy: "relevance",
                sortOrder: "descending"
            }
        });

        const entries = response.data.split("<entry>");
        entries.shift(); // Remove the header part

        return entries.map((entry: string) => {
            const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/);
            const summaryMatch = entry.match(/<summary>([\s\S]*?)<\/summary>/);
            const idMatch = entry.match(/<id>([\s\S]*?)<\/id>/);
            const updatedMatch = entry.match(/<updated>([\s\S]*?)<\/updated>/);

            return {
                title: (titleMatch && titleMatch[1]) ? titleMatch[1].trim() : "No title",
                summary: (summaryMatch && summaryMatch[1]) ? summaryMatch[1].trim() : "No summary",
                link: (idMatch && idMatch[1]) ? idMatch[1].trim() : "No link",
                updated: (updatedMatch && updatedMatch[1]) ? updatedMatch[1].trim() : "No date"
            };
        });
    } catch (error: any) {
        return { error: error.message };
    }
}

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "search_arxiv",
                description: "Search the ArXiv repository for scientific papers by query.",
                inputSchema: {
                    type: "object",
                    properties: {
                        query: {
                            type: "string",
                            description: "The search query (e.g., 'quantum entaglement', 'large language models').",
                        },
                        max_results: {
                            type: "number",
                            description: "Maximum number of results to return (default: 5).",
                        }
                    },
                    required: ["query"],
                },
            },
        ],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === "search_arxiv") {
        const query = request.params.arguments?.query as string;
        const maxResults = (request.params.arguments?.max_results as number) || 5;
        const results = await searchArxiv(query, maxResults);
        return {
            content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
    }
    throw new Error("Tool not found");
});

async function runServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Scientific Sentinel MCP Server running on stdio");
}

runServer().catch(console.error);
