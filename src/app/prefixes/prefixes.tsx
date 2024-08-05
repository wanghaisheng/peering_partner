import {getASNData, getPeersData, getPrefixData} from '../api/bgp/bgpApi';
import PrefixesDetailedInfo from '../_components/prefixesDetailedinfo';
import AsnHeaderInfo from '../_components/asnHeaderInfo';
interface PrefixesDetailsProps {
    asn_number: string | null;
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const DELAY = 500;

export default async function PrefixesDetails({ asn_number }: PrefixesDetailsProps) {

    if (!asn_number) {
        return;
    }
    const res_asn = await getASNData(asn_number);
    await delay(DELAY);
    const res_asn_prefixes = await getPrefixData(asn_number);
    await delay(DELAY);
    const res_asn_peers = await getPeersData(asn_number);
    await delay(DELAY);

    return (
        <>
            <div className="w-full border border-white-150 bg-white mb-4 p-4">
                <AsnHeaderInfo res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes} />
            </div>
            <div className="w-full border border-white-150 bg-white mb-4 p-4 overflow-auto md:overflow-hidden">
                <PrefixesDetailedInfo
                    res_prefixes={res_asn_prefixes}
                />
            </div>
        </>
    );
}
