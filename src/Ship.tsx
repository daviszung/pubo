import * as elements from "typed-html";
import { ShipType } from "./spaceAPI/ships";

export type Menu = "registration" | "nav" | "tech" | "cargo"

type ShipProps = {
    ship: ShipType;
    menu: Menu;
}

const registrationLabels = ["NAME", "ROLE", "LOCATION"];
const navLabels = ["WAYPOINT", "STATUS", "FLIGHT-MODE"]

export function Ship({ ship, menu }: ShipProps) {

    return (
        <div id={ship.symbol} class="flex flex-col justify-between border border-emerald-500 rounded bg-slate-800 text-emerald-100 p-6 shadow-md shadow-emerald-900">
            {(menu === "registration" || null) && (
                <div>
                    <section>
                        <h3 class="font-bold text-2xl text-amber-400 mb-4">REGISTRATION</h3>
                        <div class="flex">
                            <ul class="font-semibold text-lg gap-2 mr-8">
                                {registrationLabels.map((label) =>
                                    <li>{label.toUpperCase()}</li>
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
            )}
            {(menu === "nav" || null) && (
                <div class="flex gap-8">
                    <section>

                        <h3 class="font-bold text-2xl text-amber-400 mb-4">NAVIGATION</h3>
                        <div class="flex">
                            <ul class="font-semibold text-lg gap-2 mr-8">
                                {navLabels.map((label) =>
                                    <li>{label.toUpperCase()}</li>
                                )}
                            </ul>
                            <ul class="font-semibold text-lg gap-2 italic text-emerald-600">
                                <li>{ship.nav.waypointSymbol}</li>
                                <li>{ship.nav.status}</li>
                                <li>{ship.nav.flightMode}</li>
                            </ul>
                        </div>
                    </section>
                    <section>

                        <h3 class="font-bold text-2xl text-amber-400 mb-4">ROUTE</h3>
                        <div>

                        </div>
                    </section>
                    
                </div>
            )}

            <div id="hotbar" class="mt-4 flex items-center gap-6">
                <i hx-get={`/ships?symbol=${ship.symbol}&menu=registration`} hx-target={`#${ship.symbol}`} hx-swap="outerHTML" class={`${menu === "registration" ? "border-amber-300" : "border-emerald-500"} fa-solid fa-rocket bg-slate-700  border p-2 rounded scale-125`}></i>
                <i hx-get={`/ships?symbol=${ship.symbol}&menu=nav`} hx-target={`#${ship.symbol}`} hx-swap="outerHTML" class={`${menu === "nav" ? "border-amber-300" : "border-emerald-500"} fa-solid fa-location-crosshairs bg-slate-700  border p-2 rounded scale-125`}></i>
                <i hx-get={`/ships?symbol=${ship.symbol}&menu=tech`} hx-target={`#${ship.symbol}`} hx-swap="outerHTML" class={`${menu === "tech" ? "border-amber-300" : "border-emerald-500"} fa-solid fa-wrench bg-slate-700  border p-2 rounded scale-125`}></i>
                <i hx-get={`/ships?symbol=${ship.symbol}&menu=cargo`} hx-target={`#${ship.symbol}`} hx-swap="outerHTML" class={`${menu === "cargo" ? "border-amber-300" : "border-emerald-500"} fa-solid fa-cubes bg-slate-700  border p-2 rounded scale-125`}></i>
            </div>
        </div>
    );
};