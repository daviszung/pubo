import { headersConfig } from "../misc/config";

export type Contract = {
    id: string
    factionSymbol: string
    type: string
    terms: {[index: string]: any}
    accepted: boolean
    fulfilled: boolean
    expiration: string
    deadlineToAccept: string
}

export type ContractsData = {
    data: Contract[]
    meta: {
        total: number
        page: number
        limit: number
    }
}

let contractsCache: ContractsData | null = null;

export async function getMyContracts(useCache: boolean = true) {

	if (contractsCache && useCache) {
		console.log("contracts cache hit");
		return contractsCache;
	}

	console.log("contracts cache miss");

	try {
		const details = await fetch(
			"https://api.spacetraders.io/v2/my/contracts", {
			headers: headersConfig
		});

		const detailsBody: ContractsData = await details.json();

		contractsCache = detailsBody;

		return detailsBody;

	} catch (err) {
		console.log("error: ", err);
	}

	return;
}

export async function acceptContract(contractID: string) {
	try {
		const response = await fetch(
			`https://api.spacetraders.io/v2/my/contracts/${contractID}/accept`,
			{
				method: "POST",
				headers: headersConfig
			}
		);

		const responseBody = await response.json();

		contractsCache = null;

		console.log(responseBody);
		return responseBody;

	} catch (err) {
		console.log("error: ", err);
	}

	return;
}
