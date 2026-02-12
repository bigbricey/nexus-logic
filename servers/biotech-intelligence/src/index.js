import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();
const server = new Server({
    name: "biotech-intelligence",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
/**
 * Search ClinicalTrials.gov for studies.
 */
async function searchClinicalTrials(condition, term = "") {
    try {
        const response = await axios.get(`https://clinicaltrials.gov/api/v2/studies`, {
            params: {
                "query.cond": condition,
                "query.term": term,
                "pageSize": 5
            }
        });
        const studies = response.data.studies;
        return studies.map((study) => ({
            nctId: study.protocolSection.identificationModule.nctId,
            title: study.protocolSection.identificationModule.officialTitle || study.protocolSection.identificationModule.briefTitle,
            status: study.protocolSection.statusModule.overallStatus,
            conditions: study.protocolSection.designModule.enrollment?.type || "N/A",
            phases: study.protocolSection.designModule.phases || [],
            lastUpdate: study.protocolSection.statusModule.lastUpdatePostDateStruct?.date
        }));
    }
    catch (error) {
        return { error: error.message };
    }
}
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "search_clinical_trials",
                description: "Search ClinicalTrials.gov for studies by condition and optional term.",
                inputSchema: {
                    type: "object",
                    properties: {
                        condition: {
                            type: "string",
                            description: "The medical condition to search for (e.g., 'Lung Cancer', 'Alzheimer').",
                        },
                        term: {
                            type: "string",
                            description: "Additional search terms (e.g., drug name).",
                        }
                    },
                    required: ["condition"],
                },
            },
        ],
    };
});
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === "search_clinical_trials") {
        const condition = request.params.arguments?.condition;
        const term = request.params.arguments?.term || "";
        const results = await searchClinicalTrials(condition, term);
        return {
            content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
    }
    throw new Error("Tool not found");
});
async function runServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Biotech Intelligence MCP Server running on stdio");
}
runServer().catch(console.error);
//# sourceMappingURL=index.js.map