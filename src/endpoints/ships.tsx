import * as elements from "typed-html";

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
                    console.log("found ship to change menu");
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
};