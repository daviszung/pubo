import * as elements from "typed-html"

const typeColors = {
    "PLANET": "blue-500",
    "GAS_GIANT": "rose-700",
    "MOON": "slate-100",
    "ORBITAL_STATION": "emerald-300",
    "JUMP_GATE": "violet-400",
    "ASTEROID_FIELD": "yellow-800"
} as const


type Trait = {
    symbol: string
    name: string
    description: string
}

type Chart = {
    waypointSymbol: string
    submittedBy: string
    submittedOn: Date
}

export type WaypointType = {
    symbol: string
    type: keyof typeof typeColors
    systemSymbol: string
    x: number
    y: number
    orbitals: Array<string>
    orbits: string
    faction: Record<string, string>
    traits: Array<Trait>
    chart: Chart
}


export function Waypoint({waypoint}: {waypoint: WaypointType}) {

    return (
        <div class={`shadow-${typeColors[waypoint.type]} flex items-center rounded bg-slate-800 text-emerald-100 p-6 shadow`}>
            <div class="flex">
                <ul class="font-semibold text-lg gap-2 mr-8">
                    <li>SYMBOL</li>
                    <li>TYPE</li>
                    <li>TRAITS</li>
                </ul>
                <ul class="font-semibold text-lg gap-2 italic text-emerald-600">
                    <li>{waypoint.symbol}</li>
                    <li class={`text-${typeColors[waypoint.type]}`}>{waypoint.type}</li>
                    {waypoint.traits.map((trait, index) => {
                        if (trait.symbol === "MARKETPLACE") {
                            return (
                                <li class="cursor-pointer text-amber-300">MARKETPLACE</li>
                            )
                        } else if (trait.symbol === "SHIPYARD") {
                            return (
                                <li class=" cursor-pointer text-sky-500">SHIPYARD</li>
                            )
                        }
                        return (
                            <li>{trait.symbol}</li>
                        );
                    })}
                </ul>
            </div>

        </div>
        
    );
};
