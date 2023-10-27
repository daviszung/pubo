import { headersConfig } from "../misc/config";
import { getShips } from "../spaceAPI/ships";
import { Menu, Ship } from "../Ship";

export const shipEndpoints = {
    changeMenu: async (shipSymbol: string, menu: Menu) => {
        try {
            const ships = await getShips(true)

            if(!ships) {
                throw("no ships found while getting ships")
            }

            for (let i = 0; i < ships.length; i++) {
                if (ships[i].symbol === shipSymbol) {
                    return <Ship ship={ships[i]} menu={menu}/>
                }
            }

        } catch (err) {
            console.log("error with change ship menu", err);
        }
        
        return (
            <div>500 server error</div>
        );
    },
    orbit: async (shipSymbol: string) => {
        try {
            const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${shipSymbol}/orbit`, {
                method: "POST",
                headers: headersConfig
            });

            const responseBody = await response.json();
            console.log("orbit", responseBody);
            return (
                <button class="cursor-pointer">
                    {responseBody.data.nav.status}
                </button>
            )

        } catch (error) {
            console.error("error: ", error);
        }

    }

};