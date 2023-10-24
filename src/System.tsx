import { Waypoint, WaypointType } from "./Waypoint"


export function System({ data }: { data: Array<WaypointType>}){

    return (
        <div class="flex flex-col gap-4">
            <div class="flex items-center justify-end font-semibold">
                <input name="symbol" type="text" placeholder="ENTER SYSTEM ID" hx-get="/system" hx-trigger="keypress[key=='Enter'] from:body" hx-target="#systemMain" class="systemIDInput p-2 border-2 border-emerald-900 italic rounded bg-slate-900 text-emerald-100 outline-none" />
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {data.map((waypoint) => <Waypoint waypoint={waypoint} />)}
            </div>
        </div>
    );
};
