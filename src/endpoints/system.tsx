import * as elements from "typed-html";

export const systemEndpoints = {
    getSystem: async (systemID: string) => {
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
};