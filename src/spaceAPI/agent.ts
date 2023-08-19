type AgentDetails = {
	accountId: string;
	symbol: string;
	headquarters: string;
	credits: number;
	startingFaction: string;
};

let agentCache: AgentDetails | null = null;

export async function getAgentDetails(useCache: boolean = true) {
	if (agentCache && useCache) {
		console.log("Agent cache hit");

		return agentCache;
	}

	console.log("Agent cache miss");

	try {
		const details = await fetch("https://api.spacetraders.io/v2/my/agent", {
			headers: {
				"content-type": "application/json",
				Authorization: "Bearer " + process.env.TOKEN,
			},
		});

		const detailsBody: { data: AgentDetails } = await details.json();

		agentCache = detailsBody.data;

		return detailsBody.data;
	} catch (err) {
		console.log("error: ", err);
	}
	return;
}
