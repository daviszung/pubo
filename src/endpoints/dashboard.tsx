import * as elements from "typed-html";
import { Navbar } from "../Navbar";
import { DataList } from "../DataList";
import { Contract } from "../Contract";

import { getAgentDetails } from "../spaceAPI/agent";
import { getMyContracts } from "../spaceAPI/contracts";
import { getShips } from "../spaceAPI/ships";

import { Menu, Ship } from "../Ship";

export const dashboardEndpoints = {
    agent: async () => {

        const agent = await getAgentDetails();
        if (!agent) {
            return <div>agent error lol</div>;
        }
        return (<div class="min-h-screen bg-slate-900 text-white">
            <Navbar current="agent" />
            <main class="px-32 py-10">
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
                <main class="px-32 py-10">
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
                <main class="px-32 py-10 flex flex-col gap-6">
                    <div class="font-bold text-2xl text-amber-400">SHIPS</div>
                    {ships.map(ship => <Ship ship={ship} menu="registration"/>)}
                </main>
            </div >
        );
    },
    navigation: () => (
        <div class="min-h-screen bg-slate-900 text-white">
            <Navbar current="navigation" />
            <main class="px-32 py-10">
                navigation
            </main>
        </div>
    ),
    system: () => (
        <div class="min-h-screen bg-slate-900 text-white">
            <Navbar current="system" />
            <main class="px-32 py-10">
                system
            </main>
        </div>
    ),
};