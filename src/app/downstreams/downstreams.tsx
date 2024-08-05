
import {getASNData, getPeersData, getPrefixData, getDownstreamData} from '../api/bgp/bgpApi';
import DownstreamsDetailsInfo from '../_components/downstreamDetailsInfo';
import AsnHeaderInfo from '../_components/asnHeaderInfo';
interface DownstreamsDetailsProps {
    asn_number: string | null;
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const DELAY = 2000;
export default async function DownstreamsDetails({asn_number}: DownstreamsDetailsProps) {

    if(!asn_number) {
        return;
    }
    const res_asn = await getASNData(asn_number);
    await delay(DELAY);
    const res_asn_peers = await getPeersData(asn_number);
    await delay(DELAY);
    const res_asn_prefixes = await getPrefixData(asn_number);
    await delay(DELAY);
    const res_asn_downstreams = await getDownstreamData(asn_number);
    await delay(DELAY);

    return (
        <>
        <div className="w-full border border-white-150 bg-white mb-4 p-4">
        <AsnHeaderInfo res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes} />
      </div>
        <div className="w-full border border-white-150 bg-white mb-4 p-4 overflow-auto md:overflow-hidden">
            <DownstreamsDetailsInfo
                res_downstreams={res_asn_downstreams}
            />
        </div>
        </>
    );
}
