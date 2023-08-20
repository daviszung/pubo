import * as elements from "typed-html";
import { ShipType } from "./spaceAPI/ships";

export type Menu = "registration" | "nav" | "tech" | "cargo";

type ShipProps = {
    ship: ShipType;
    menu: Menu;
};

const registrationLabels = ["NAME", "ROLE", "LOCATION"];
const navLabels = ["WAYPOINT", "STATUS", "FLIGHT-MODE", "DEPARTURE-TIME", "ARRIVAL"];
const destinationLabels = ["SYMBOL", "TYPE", "X", "Y"];
const departureLabels = ["SYMBOL", "TYPE", "X", "Y"];


function dateStringToLocale(dateString: string) {
    const newDate = new Date(dateString);
    return newDate.toLocaleString();
}

export function Ship({ ship, menu }: ShipProps) {

    const destination = ship.nav.route.destination;
    const departure = ship.nav.route.departure;

    const menus = {
        registration: (
            <div>
                <section>
                    <h3 class="font-bold text-2xl text-amber-400 mb-4">REGISTRATION</h3>
                    <div class="flex">
                        <ul class="font-semibold text-lg gap-2 mr-8">
                            {registrationLabels.map((label) =>
                                <li>{label}</li>
                            )}
                        </ul>
                        <ul class="font-semibold text-lg gap-2 italic text-emerald-600">
                            <li>{ship.registration.name}</li>
                            <li>{ship.registration.role}</li>
                            <li>{ship.nav.status} AT {ship.nav.waypointSymbol}</li>
                        </ul>
                    </div>
                </section>
            </div>
        ),
        nav: (
            <div class="flex">
                <section class="mr-10">
                    <h3 class="font-bold text-2xl text-amber-400 mb-4">NAVIGATION</h3>
                    <div class="flex">
                        <ul class="font-semibold text-lg gap-2 mr-8">
                            {navLabels.map((label) =>
                                <li>{label}</li>
                            )}
                        </ul>
                        <ul class="font-semibold text-lg gap-2 italic text-emerald-600">
                            <li>{ship.nav.waypointSymbol}</li>
                            <li>{ship.nav.status}</li>
                            <li>{ship.nav.flightMode}</li>
                            <li>{dateStringToLocale(ship.nav.route.departureTime)}</li>
                            <li>{dateStringToLocale(ship.nav.route.arrival)}</li>
                        </ul>
                    </div>
                </section>
                <section class="mr-10">
                    <h3 class="font-bold text-2xl text-amber-400 mb-4">DESTINATION</h3>
                    <div class="flex">
                        <ul class="font-semibold text-lg gap-2 mr-8">
                            {destinationLabels.map((label) =>
                                <li>{label}</li>
                            )}
                        </ul>
                        <ul class="font-semibold text-lg gap-2 italic text-emerald-600">
                            <li>{destination.symbol}</li>
                            <li>{destination.type}</li>
                            <li>{destination.x}</li>
                            <li>{destination.y}</li>
                        </ul>
                    </div>
                </section>
                <section class="mr-10">
                    <h3 class="font-bold text-2xl text-amber-400 mb-4">DEPARTURE</h3>
                    <div class="flex">
                        <ul class="font-semibold text-lg gap-2 mr-8">
                            {departureLabels.map((label) =>
                                <li>{label}</li>
                            )}
                        </ul>
                        <ul class="font-semibold text-lg gap-2 italic text-emerald-600">
                            <li>{departure.symbol}</li>
                            <li>{departure.type}</li>
                            <li>{departure.x}</li>
                            <li>{departure.y}</li>
                        </ul>
                    </div>
                </section>
            </div>
        ),
        tech: (
            <div>tech</div>
        ),
        cargo: (
            <div>cargo</div>
        )
    };


    return (
        <div id={ship.symbol} class="w-fit flex flex-col justify-between border border-emerald-500 rounded bg-slate-800 text-emerald-100 p-6 shadow-md shadow-emerald-900">
            {menus[menu]}
            <div id="hotbar" class="mt-4 flex items-center gap-6">
                <i hx-get={`/ships?symbol=${ship.symbol}&menu=registration`} hx-target={`#${ship.symbol}`} hx-swap="outerHTML" class={`${menu === "registration" ? "border-amber-300" : "border-emerald-500"} fa-solid fa-rocket cursor-pointer bg-slate-700  border p-2 rounded scale-125`}></i>
                <i hx-get={`/ships?symbol=${ship.symbol}&menu=nav`} hx-target={`#${ship.symbol}`} hx-swap="outerHTML" class={`${menu === "nav" ? "border-amber-300" : "border-emerald-500"} fa-solid fa-location-crosshairs cursor-pointer bg-slate-700  border p-2 rounded scale-125`}></i>
                <i hx-get={`/ships?symbol=${ship.symbol}&menu=tech`} hx-target={`#${ship.symbol}`} hx-swap="outerHTML" class={`${menu === "tech" ? "border-amber-300" : "border-emerald-500"} fa-solid fa-wrench cursor-pointer bg-slate-700  border p-2 rounded scale-125`}></i>
                <i hx-get={`/ships?symbol=${ship.symbol}&menu=cargo`} hx-target={`#${ship.symbol}`} hx-swap="outerHTML" class={`${menu === "cargo" ? "border-amber-300" : "border-emerald-500"} fa-solid fa-cubes cursor-pointer bg-slate-700  border p-2 rounded scale-125`}></i>
            </div>
        </div>
    );
};