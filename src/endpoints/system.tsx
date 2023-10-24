import * as elements from "typed-html";
import { System } from "../System";

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

			return <System data={responseBody.data} />;
		} catch (err) {
			console.log("error: ", err);
			return;
		}
	},

	getShipyard: async (systemID: string, waypointID: string) => {
		try {
			const response = await fetch(
				`https://api.spacetraders.io/v2/systems/${systemID}/waypoints/${waypointID}/shipyard`,
				{
					headers: {
						"content-type": "application/json",
						Authorization: "Bearer " + process.env.TOKEN,
					},
				}
			);

			const responseBody = await response.json();

			console.log("shipyard", responseBody);

			return <div>:3</div>
		} catch (err) {
			console.log("error: ", err);
			return;
		}
	}
};
