// import {getASNData, getPeersData, getPrefixData, getSVGData} from '../api/bgp/bgpApi';
import AsnHeaderInfo from "../_components/asnHeaderInfo";
import ErrorComponent from "../_components/errorComponent";
import { ApiFetcher } from '../api/bgp/bgpApi';

const Fetcher = ApiFetcher.getInstance();
interface GraphProps {
    asn_number: string | null;
}


const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const DELAY = 750;
export default async function Graph({ asn_number }: GraphProps) {

    if (!asn_number)
        return;

    const svgContent = await Fetcher.getSvgData(asn_number);
    // await delay(DELAY);
    const res_asn = await Fetcher.getASNData(asn_number);
    // await delay(DELAY);
    const res_asn_prefixes = await Fetcher.getPrefixData(asn_number);
    // await delay(DELAY);
    const res_asn_peers = await Fetcher.getPeersData(asn_number);
    // await delay(DELAY);

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
