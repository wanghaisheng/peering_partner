import { ApiFetcher } from "@/app/api/bgp/bgpApi";

interface GraphProps {
    asn_number: string | null;
}

const Fetcher = ApiFetcher.getInstance();

export default async function Graph({ asn_number }: GraphProps) {

    if (!asn_number)
        return;

    const svgContent = await Fetcher.getSvgData(asn_number);

    return (
        <div className="w-full bg-white mb-4 p-4">
            {svgContent ? (
                <div id="content-graph" dangerouslySetInnerHTML={{ __html: svgContent }} />
            ) : (
                <div>
                    No Data Available.
                </div>
            )}
        </div>
    );
}
