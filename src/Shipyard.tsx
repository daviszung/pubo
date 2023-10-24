import { ShipType } from "./spaceAPI/ships"
import { Ship } from "./Ship"

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
    ships: Array<ShipType>
    modificationsFee: number
}

export function Shipyard({ data }: { data: ShipyardData} ){
  
  return (
    <>
        :3
    </>
  )
};
