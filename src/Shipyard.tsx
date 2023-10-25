import { Frame, Reactor, Engine, Module, Mount, Crew } from "./spaceAPI/ships";

type ShipyardShip = {
    type: string;
    name: string;
    description: string;
    purchasePrice: number;
    frame: Frame;
    reactor: Reactor;
    engine: Engine;
    modules: Array<Module>;
    mounts: Array<Mount>;
    crew: Crew;
};

type ShipKind = {
    type: string;
};

type Transaction = {
    waypointSymbol: string;
    shipSymbol: string;
    price: number;
    agentSymbol: string;
    timestamp: Date;
};

type ShipyardData = {
    symbol: string;
    shipTypes: Array<ShipKind>;
    transactions: Array<Transaction>;
    ships: Array<ShipyardShip>;
    modificationsFee: number;
};

export function Shipyard({ data }: { data: ShipyardData; }) {

    return (
        <>
            <section>
                <h3 class="font-bold text-2xl text-amber-400 my-4">MODIFICATION FEE</h3>
                <p class="text-amber-300 font-semibold">{data.modificationsFee} CREDITS</p>
            </section>
            <section>
                <h2 class="font-bold text-2xl text-amber-400 my-4">SHIPS</h2>
                {data.ships.map((item) =>
                    <article class="text-emerald-100 py-4">
                        <button hx-post={`/shipyard/purchase?shipType=${item.type}&waypointSymbol=${data.symbol}`} hx-confirm={`CONFIRM PURCHASE FOR ${item.type}`} hx-swap="none" class="font-semibold text-lg">{item.type}</button>
                        <details>
                            <summary class="text-emerald-600 font-bold cursor-pointer">{item.name.toUpperCase()}</summary>
                            <p>{item.description}</p>
                        </details>
                        <div class="text-amber-300 font-semibold">{item.purchasePrice.toLocaleString()} CREDITS</div>
                    </article>
                )}
            </section>
        </>
    );
};
