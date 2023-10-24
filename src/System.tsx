import * as elements from "typed-html"
import { Waypoint, WaypointType } from "./Waypoint"


export function System({ data }: { data: Array<WaypointType>}){

    console.log(data);
    return (
        <div>
            <div class="fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] w-fit flex items-center gap-2 font-semibold">
                <input name="symbol" type="text" placeholder="ENTER SYSTEM ID" hx-get="/system" hx-trigger="keypress[key=='Enter'] from:body" hx-target="#systemMain" class="systemIDInput p-2 border-2 border-emerald-900 italic rounded bg-slate-900 text-emerald-100 outline-none" />
            </div>
            {/* <section class="flex justify-between items-center mb-6">
                <select onChange={(event) => {
                    const value = event.target.value;
                    if (value !== "ALL") {
                        setDisplayedWaypoints(findTrait(value, waypointsList));
                    } else {
                        setDisplayedWaypoints(waypointsList);
                    }
                }} className=" rounded bg-slate-800 p-2 px-6 appearance-none font-semibold border-2 border-emerald-900 text-emerald-100 outline-none">
                    <option value="ALL">ALL</option>
                    <option value="MARKETPLACE">MARKETPLACE</option>
                    <option value="SHIPYARD">SHIPYARD</option>
                </select>
                <input type="text" onKeyDown={(event) => { if (event.key === "Enter") handleSystemIDInput(); }} placeholder={systemID} className="systemIDInput p-2 border-2 border-emerald-900 italic rounded bg-slate-900 text-emerald-100 outline-none" />

            </section> */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {data.map((waypoint) => <Waypoint waypoint={waypoint} />)}
            </div>
        </div>
    );
};
