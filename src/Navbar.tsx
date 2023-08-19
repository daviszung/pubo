import * as elements from "typed-html";

type NavbarProps = {
    current: string;
};

export function Navbar({ current }: NavbarProps) {

    return (
        <nav class="flex items-center px-32 border-b border-emerald-900">
            <div class="flex py-4 gap-4">
                <button hx-get="/dashboard/agent" hx-target="#app" class={`${current === "agent" ? "text-amber-300" : "text-slate-700"} px-6 py-2 text-xl font-bold`}>AGENT</button>
                <button hx-get="/dashboard/contracts" hx-target="#app" class={`${current === "contracts" ? "text-amber-300" : "text-slate-700"} px-6 py-2 text-xl font-bold`}>CONTRACTS</button>
                <button hx-get="/dashboard/ships" hx-target="#app" class={`${current === "ships" ? "text-amber-300" : "text-slate-700"} px-6 py-2 text-xl font-bold`}>SHIPS</button>
                <button hx-get="/dashboard/navigation" hx-target="#app" class={`${current === "navigation" ? "text-amber-300" : "text-slate-700"} px-6 py-2 text-xl font-bold`}>NAVIGATION</button>
                <button hx-get="/dashboard/system" hx-target="#app" class={`${current === "system" ? "text-amber-300" : "text-slate-700"} px-6 py-2 text-xl font-bold`}>SYSTEM</button>
            </div>
        </nav>
    );
};
