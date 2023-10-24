const shadowColors = {
    "PLANET": "shadow-blue-500",
    "GAS_GIANT": "shadow-rose-700",
    "MOON": "shadow-slate-100",
    "ORBITAL_STATION": "shadow-emerald-300",
    "JUMP_GATE": "shadow-violet-400",
    "ASTEROID_FIELD": "shadow-yellow-800"
} as const

const textColors = {
    "PLANET": "text-blue-500",
    "GAS_GIANT": "text-rose-700",
    "MOON": "text-slate-100",
    "ORBITAL_STATION": "text-emerald-300",
    "JUMP_GATE": "text-violet-400",
    "ASTEROID_FIELD": "text-yellow-800"
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
    type: keyof typeof shadowColors
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
        <article class={`${shadowColors[waypoint.type]} flex items-center rounded bg-slate-800 text-emerald-100 p-6 shadow`}>
            <div class="flex">
                <ul class="font-semibold text-lg gap-2 mr-8">
                    <li>SYMBOL</li>
                    <li>TYPE</li>
                    <li>TRAITS</li>
                </ul>
                <ul class="font-semibold text-lg gap-2 italic text-emerald-600">
                    <li>{waypoint.symbol}</li>
                    <li class={`${textColors[waypoint.type]}`}>{waypoint.type}</li>
                    {waypoint.traits.map((trait, index) => {
                        if (trait.symbol === "MARKETPLACE") {
                            return (
                                <div>
                                    <button class="cursor-pointer text-amber-300">MARKETPLACE</button>
                                </div>
                            )
                        } else if (trait.symbol === "SHIPYARD") {
                            return (
                                <div>
                                    <button hx-get={`/shipyard?system=${waypoint.systemSymbol}&waypoint=${waypoint.symbol}`} hx-target="#systemMain" class="cursor-pointer text-sky-500">SHIPYARD</button>
                                </div>
                            )
                        }
                        return (
                            <li>{trait.symbol}</li>
                        );
                    })}
                </ul>
            </div>

        </article>
        
    );
};
