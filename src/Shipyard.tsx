import { Ship } from "./Ship"
import { Frame, Reactor, Engine, Module, Mount, Crew } from "./spaceAPI/ships"

type ShipyardShip = {
    type: string
    name: string
    description: string
    purchasePrice: number
    frame: Frame
    reactor: Reactor
    engine: Engine
    modules: Array<Module>
    mounts: Array<Mount>
    crew: Crew
}

type ShipKind = {
    type: string
}

type Transaction = {
    waypointSymbol: string
    shipSymbol: string
    price: number
    agentSymbol: string
    timestamp: Date
}

type ShipyardData = {
    symbol: string
    shipTypes: Array<ShipKind>
    transactions: Array<Transaction>
    ships: Array<ShipyardShip>
    modificationsFee: number
}

export function Shipyard({ data }: { data: ShipyardData} ){
  
  return (
        <>
          <section>
            <h2 class="font-bold text-2xl text-amber-400 my-4">AVAILABLE SHIP TYPES</h2>
              {data.shipTypes.map((item) => {
                  return (
                      <div class="text-emerald-100 font-semibold">
                          {item.type}
                      </div>
                  );
              })}
          </section>
          <section>
            <h3 class="font-bold text-2xl text-amber-400 my-4">MODIFICATION FEE</h3>
            <p class="text-amber-300 font-semibold">{data.modificationsFee} CREDITS</p>
          </section>
          <section>
            <h2 class="font-bold text-2xl text-amber-400 my-4">SHIPS</h2>
            {data.ships.map((item) => {
                return (
                    <article class="text-emerald-100 py-4">
                        <div class="text-emerald-600 font-bold">{item.name.toUpperCase()}</div>
                        <div class="font-semibold">{item.type}</div>
                        <div>{item.description}</div>
                        <div class="text-amber-300 font-semibold">{item.purchasePrice.toLocaleString()} CREDITS</div>
                    </article>
                )
            })}
          </section>
        </>
    );
};
