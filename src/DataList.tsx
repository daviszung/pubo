type DataListProps = {
    labels: string[];
    data: (string | number)[];
};

export function DataList({ labels, data }: DataListProps) {

    return (
        <div class="flex">
            <ul class="font-semibold text-lg gap-2 mr-8">
                {labels.map((label, index) => 
                <li>{label.toUpperCase()}</li>
                )}
            </ul>
            <ul class="font-semibold text-lg gap-2 italic text-emerald-600 whitespace-nowrap">
                {data.map((data, index) => 
                <li>{data}</li>
                )}
            </ul>
        </div>
    );
};
