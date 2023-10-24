import { Navbar } from "../Navbar";
import { DataList } from "../DataList";
import { Contract } from "../Contract";

import { getAgentDetails } from "../spaceAPI/agent";
import { getMyContracts } from "../spaceAPI/contracts";
import { getShips } from "../spaceAPI/ships";

import { Ship } from "../Ship";

export const dashboardEndpoints = {
    agent: async () => {

        const agent = await getAgentDetails();
        if (!agent) {
            return <div>agent error lol</div>;
        }
        return (<div class="min-h-screen bg-slate-900 text-white">
            <Navbar current="agent" />
            <main class="px-8 xl:px-32 py-10">
                <DataList labels={["SYMBOL", "HQ", "CREDITS", "FACTION"]} data={[agent.symbol, agent.headquarters, agent.credits, agent.startingFaction]} />
            </main>
        </div>);
    },
    contracts: async () => {
        const contracts = await getMyContracts();
        if (!contracts) {
            return <div>contract error lol</div>;
        };

        const meta = contracts.meta;

        return (
            <div class="min-h-screen bg-slate-900 text-white">
                <Navbar current="contracts" />
                <main class="px-8 xl:px-32 py-10">
                    <div class="font-bold text-2xl text-amber-400 my-4">META DATA</div>
                    <DataList labels={["TOTAL", "PAGE", "LIMIT"]} data={[meta.total, meta.page, meta.limit]} />
                    <div class="font-bold text-2xl text-amber-400 my-4">CONTRACTS</div>
                    {contracts.data.map(contract =>
                        <Contract contract={contract} />)}
                </main>
            </div>);
    },
    ships: async () => {
        const ships = await getShips();
        if (!ships) {
            return <div>ship fetching error</div>
        }

        return (
            <div class="min-h-screen bg-slate-900 text-white" >
                <Navbar current="ships" />
                <main class="px-8 xl:px-32 py-10 flex flex-col gap-6">
                    <div class="font-bold text-2xl text-amber-400">SHIPS</div>
                    {ships.map(ship => <Ship ship={ship} menu="registration"/>)}
                </main>
            </div >
        );
    },
    navigation: () => (
        <div class="min-h-screen bg-slate-900 text-white">
            <Navbar current="navigation" />
            <main class="px-8 xl:px-32 py-10">
                navigation
            </main>
        </div>
    ),
    system: () => (
        <div class="min-h-screen bg-slate-900 text-white">
            <Navbar current="system" />
            <main id="systemMain" class="px-8 xl:px-32 py-8">
                <div class="fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] w-fit flex items-center gap-2 font-semibold">
                    <input name="symbol" type="text" placeholder="ENTER SYSTEM ID" hx-get="/system" hx-trigger="keypress[key=='Enter'] from:body" hx-target="#systemMain" class="systemIDInput p-2 border-2 border-emerald-900 italic rounded bg-slate-900 text-emerald-100 outline-none" />
                </div>
            </main>
        </div>
    ),
};