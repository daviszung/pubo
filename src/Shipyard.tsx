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
            <h2>AVAILABLE SHIP TYPES</h2>
              {data.shipTypes.map((item) => {
                  return (
                      <div class="text-emerald-600">
                          {item.type}
                      </div>
                  );
              })}
          </section>
          <section>
            <h3>MODIFICATION FEE</h3>
            <p>{data.modificationsFee}</p>
          </section>
          <section>
            <h2>SHIPS</h2>
            {data.ships.map((item) => {
                return (
                    <article>
                        <div>{item.name}</div>
                        <div>{item.type}</div>
                        <div>{item.description}</div>
                        <div>{item.purchasePrice}</div>
                    </article>
                )
            })}
          </section>
        </>
    );
};
