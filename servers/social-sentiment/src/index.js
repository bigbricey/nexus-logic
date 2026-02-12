import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();
const server = new Server({
    name: "social-sentiment",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
/**
 * Fetch top posts from a subreddit and analyze sentiment.
 */
async function getRedditTrends(subreddit) {
    try {
        const response = await axios.get(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`, {
            headers: { "User-Agent": "NexusLogic/1.0.0" }
        });
        const posts = response.data.data.children;
        return posts.map((post) => ({
            title: post.data.title,
            ups: post.data.ups,
            num_comments: post.data.num_comments,
            link: `https://reddit.com${post.data.permalink}`,
            author: post.data.author
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
                name: "get_reddit_trends",
                description: "Get trending posts and sentiment from a specific subreddit.",
                inputSchema: {
                    type: "object",
                    properties: {
                        subreddit: {
                            type: "string",
                            description: "The subreddit name (e.g., 'technology', 'worldnews').",
                        },
                    },
                    required: ["subreddit"],
                },
            },
        ],
    };
});
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === "get_reddit_trends") {
        const subreddit = request.params.arguments?.subreddit;
        const trends = await getRedditTrends(subreddit);
        return {
            content: [{ type: "text", text: JSON.stringify(trends, null, 2) }],
        };
    }
    throw new Error("Tool not found");
});
async function runServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Social Sentiment MCP Server running on stdio");
}
runServer().catch(console.error);
//# sourceMappingURL=index.js.map