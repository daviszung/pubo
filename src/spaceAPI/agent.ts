import { z } from "zod"
import { headersConfig } from "../misc/config";

const AgentDetailsSchema = z.object({
	accountId: z.string(),
	symbol: z.string(),
	headquarters: z.string(),
	credits: z.number(),
	startingFaction: z.string(),
	shipCount: z.number().int()
});

export type AgentDetailsSchemaType = z.infer<typeof AgentDetailsSchema>;

let agentCache: AgentDetailsSchemaType | null = null;

export async function getAgentDetails(useCache: boolean = true) {
	if (agentCache && useCache) {
		console.log("Agent cache hit");

		return agentCache;
	}

	console.log("Agent cache miss");

	try {
		const details = await fetch("https://api.spacetraders.io/v2/my/agent", {
			headers: headersConfig
		});

		const detailsBody = await details.json();

		AgentDetailsSchema.parse(detailsBody.data)

		agentCache = detailsBody.data;

		return detailsBody.data;
	} catch (err) {
		console.log("error: ", err);
		return
	}
}
