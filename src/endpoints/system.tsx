import * as elements from "typed-html";

export const systemEndpoints = {
    getWaypointsInSystem: async (systemID: string) => {
	try {
		const response = await fetch(
			`https://api.spacetraders.io/v2/systems/${systemID}/waypoints`,
			{
				headers: {
					"content-type": "application/json",
					Authorization: "Bearer " + process.env.TOKEN,
				},
			}
		);

		const responseBody = await response.json();
        console.log(responseBody);

		return <div>work in progress</div>
	} catch (err) {
		console.log("error: ", err);
		return 
	}
    }
};
