
let shipsCache: ShipType[] | null = null;

export async function getShips(useCache: boolean = true) {
    if (shipsCache && useCache) {
        console.log("ships cache hit");
        return shipsCache;
    }

    console.log("ships cache miss");

	try {
		const response = await fetch("https://api.spacetraders.io/v2/my/ships", {
			headers: {
				"content-type": "application/json",
				Authorization: "Bearer " + process.env.TOKEN,
			},
		});

		const body: {data: ShipType[]} = await response.json();
        const data = body.data;

        shipsCache = data;

        if (!data) {
            throw "Error from spacetraders API looking for ships"
        }

        return data;

	} catch (err) {
		console.log("error: ", err);
	}
	return;
}


type Route = {
    departure: {
        symbol: string,
        type: string,
        systemSymbol: string,
        x: number,
        y: number;
    },
    destination: {
        symbol: string,
        type: string,
        systemSymbol: string,
        x: number,
        y: number;
    },
    departureTime: string
    arrival: string
};

type Crew = {
    current: number,
    capacity: number,
    required: number,
    rotation: string,
    morale: number,
    wages: number;
};

type Fuel = {
    current: number,
    capacity: number,
    consumed: {
        amount: number,
        timestamp: string;
    };
};


type Frame = {
    symbol: string,
    name: string,
    description: string,
    moduleSlots: number,
    mountingPoints: number,
    fuelCapacity: number,
    condition: number,
    requirements: {
        power: number,
        crew: number;
    };
};


type Reactor = {
    symbol: string,
    name: string,
    description: string,
    condition: number,
    powerOutput: number,
    requirements: {
        crew: number;
    };
};


type Engine = {
    symbol: string,
    name: string,
    description: string,
    condition: number,
    speed: number,
    requirements: {
        power: number,
        crew: number;
    };
};

type Module = {
    symbol: string,
    name: string,
    description: string,
    capacity: number,
    requirements: {
        crew: number,
        power: number,
        slots: number;
    };
};

type Mount = {
    symbol: string,
    name: string,
    description: string,
    strength: number,
    deposits: string[],
    requirements: {
        crew: number,
        power: number;
    };
};

type Registration = {
    name: string;
    factionSymbol: string;
    role: string;
}

type Cargo = {
    capacity: number;
    units: number;
    inventory: string[]
}

export type ShipType = {
    symbol: string,
    nav: {
        systemSymbol: string,
        waypointSymbol: string,
        route: Route;
        status: string,
        flightMode: "CRUISE" | "BURN" | "DRIFT" | "STEALTH";
    };
    crew: Crew;
    fuel: Fuel;
    frame: Frame;
    reactor: Reactor;
    engine: Engine;
    modules: Module[];
    mounts: Mount[];
    registration: Registration
    cargo: Cargo
};