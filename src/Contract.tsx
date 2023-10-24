import { Contract } from "./spaceAPI/contracts";

type ContractProps = {
    contract: Contract;
};

export function timeUntilTime(deadline: string) {
    const currentTime = new Date();

    const dateDeadline = new Date(deadline);

    const timeDifference = dateDeadline.getTime() - currentTime.getTime();

    const millisecondsInSecond = 1000;
    const millisecondsInMinute = 60 * millisecondsInSecond;
    const millisecondsInHour = 60 * millisecondsInMinute;
    const millisecondsInDay = 24 * millisecondsInHour;

    const days = Math.floor(timeDifference / millisecondsInDay);
    const hours = Math.floor((timeDifference % millisecondsInDay) / millisecondsInHour);
    const minutes = Math.floor((timeDifference % millisecondsInHour) / millisecondsInMinute);

    return `${days}d ${hours}h ${minutes}m`;
}

const acceptedColors = {
    "PENDING": "text-amber-600",
    "ACCEPTED": "text-emerald-600"
};

const statusColors = {
    "INCOMPLETE": "text-amber-600",
    "COMPLETE": "text-emerald-600"
};

export function Contract({ contract }: ContractProps) {

    const contractStatus = contract.fulfilled ? "COMPLETE" : "INCOMPLETE";
    const acceptedStatus = contract.accepted ? "ACCEPTED" : "PENDING";

    const terms = contract.terms;

    return (
        <div id={contract.id} class="w-fit flex justify-between gap-16 border border-emerald-500 rounded bg-slate-800 text-emerald-100 p-6 shadow-md shadow-emerald-900">
            <div>
                <h2 class=" text-amber-300 font-bold text-xl mb-2">CONTRACT</h2>
                <div class="flex">
                    <ul class="font-semibold text-lg gap-2 mr-8">
                        <li>ID</li>
                        <li>FACTION</li>
                        <li>TYPE</li>
                        <li>ACCEPTED</li>
                        <li>STATUS</li>
                        <li>EXPIRES</li>
                    </ul>
                    <ul class="font-semibold text-lg gap-2 italic text-emerald-600">
                        <li>{contract.id}</li>
                        <li>{contract.factionSymbol}</li>
                        <li>{contract.type}</li>
                        <li class={`${acceptedColors[acceptedStatus]}`}>{acceptedStatus}</li>
                        <li class={`${statusColors[contractStatus]}`}>{contractStatus}</li>
                        <li class="text-amber-600">{timeUntilTime(contract.expiration)}</li>
                    </ul>
                </div>
            </div>
            <div>
                <h2 class="text-amber-300 font-bold text-xl mb-2">TERMS</h2>
                <div class="flex">
                    <ul class="font-semibold text-lg gap-2 mr-8">
                        <li>PAYMENT</li>
                        <li>TRADE-SYM</li>
                        <li>DESTINATION-SYM</li>
                        <li>UNITS</li>
                        <li>DEADLINE</li>
                    </ul>
                    <ul class="font-semibold text-lg gap-2 italic text-emerald-600">
                        <li class="text-amber-300">{terms.payment.onAccepted.toLocaleString()} | {terms.payment.onFulfilled.toLocaleString()}</li>
                        <li>{terms.deliver[0].tradeSymbol}</li>
                        <li>{terms.deliver[0].destinationSymbol}</li>
                        <li>{terms.deliver[0].unitsFulfilled} / {terms.deliver[0].unitsRequired}</li>
                        <li class="text-amber-600">{timeUntilTime(terms.deadline)}</li>
                    </ul>
                </div>
            </div>
            {(!contract.accepted || null) && (
                <div class="flex flex-col">
                    <i hx-post={`/contracts/accept/${contract.id}`} class="cursor-pointer fa-solid fa-handshake fa-2x flex items-center justify-center" />
                </div>
            )}
        </div>

    );
};
