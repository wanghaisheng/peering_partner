import { ApiFetcher } from "@/app/api/bgp/bgpApi";
import AsnHeaderInfo from "../_components/asnHeaderInfo";
interface GraphProps {
    asn_number: string | null;
}

const Fetcher = ApiFetcher.getInstance();

export default async function Graph({ asn_number }: GraphProps) {

    if (!asn_number)
        return;

    const svgContent = await Fetcher.getSvgData(asn_number);
    const res_asn = await Fetcher.getASNData(asn_number);
    const res_asn_prefixes = await Fetcher.getPrefixData(asn_number);
    const res_asn_peers = await Fetcher.getPeersData(asn_number);

    return (
        <>
            <div className="w-full border border-white-150 bg-white mb-4 p-4">
                <AsnHeaderInfo res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes} />
            </div>
            <div className="w-full border border-white-150 bg-white mb-4 p-4">
                {svgContent ? (
                    <div id="content-graph" dangerouslySetInnerHTML={{ __html: svgContent }} />
                ) : (
                    <div>
                        No Data Available.
                    </div>
                )}
            </div>
        </>
    );
}
