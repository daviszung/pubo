import { headersConfig } from "../misc/config";
import { Shipyard } from "../Shipyard";
import { System } from "../System";

export const systemEndpoints = {
	getWaypointsInSystem: async (systemID: string) => {
		try {
			const response = await fetch(
				`https://api.spacetraders.io/v2/systems/${systemID}/waypoints`,
				{
					headers: headersConfig
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
					headers: headersConfig
				}
			);

			const responseBody = await response.json();

			return <Shipyard data={responseBody.data} />
		} catch (err) {
			console.log("error: ", err);
			return;
		}
	},

	purchaseShip: async (shipType: string, waypointSymbol: string) => {
		try {
			const response = await fetch(
				`https://api.spacetraders.io/v2/my/ships`,
				{
					method: "POST",
					headers: headersConfig,
					body: JSON.stringify({
						shipType: shipType,
						waypointSymbol: waypointSymbol
					})
				}
			);

			const responseBody = await response.json();
			console.log(responseBody);

			return <div>Complete</div>
		} catch (err) {
			console.log("error: ", err);
			return;
		}
	},
};
