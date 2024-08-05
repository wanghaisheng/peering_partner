
import {getASNData, getPeersData, getPrefixData, getIXData} from '../api/bgp/bgpApi';
import IXListInfo from "../_components/ixListInfo";
import AsnHeaderInfo from "../_components/asnHeaderInfo";
interface IXListDetailsProps {
    asn_number: string | null;
}


const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const DELAY = 2000;
export default async function IXListDetails({ asn_number }: IXListDetailsProps) {

    if (!asn_number) {
        return;
    }
    const res_asn = await getASNData(asn_number);
    await delay(DELAY);
    const res_asn_peers = await getPeersData(asn_number);
    await delay(DELAY);
    const res_asn_prefixes = await getPrefixData(asn_number);
    await delay(DELAY);
    const res_asn_ix = await getIXData(asn_number);
    await delay(DELAY);

    return (
        <>
            <div className="w-full border border-white-150 bg-white mb-4 p-4">
                <AsnHeaderInfo res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes} />
            </div>
            <div className="w-full border border-white-150 bg-white mb-4 p-4 overflow-auto md:overflow-hidden">
                <IXListInfo res_ix={res_asn_ix} />
            </div>
        </>
    );
}
