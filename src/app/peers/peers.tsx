
import { ApiFetcher } from '../api/bgp/bgpApi';
import PeersDetailsInfo from '../_components/peersDetailedInfo';
import AsnHeaderInfo from '../_components/asnHeaderInfo';
interface PeersDetailsProps {
    asn_number: string | null;
}

const Fetcher = ApiFetcher.getInstance();

export default async function PeersDetails({ asn_number }: PeersDetailsProps) {

    if (!asn_number) {
        return;
    }
    const res_asn = await Fetcher.getASNData(asn_number);
    const res_asn_prefixes = await Fetcher.getPrefixData(asn_number);
    const res_asn_peers = await Fetcher.getPeersData(asn_number);
    return (
        <>
            <div className="w-full border border-white-150 bg-white mb-4 p-4">
                <AsnHeaderInfo res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes} />
            </div>
            <div className="w-full border border-white-150 bg-white mb-4 p-4 overflow-auto md:overflow-hidden">
                <PeersDetailsInfo
                    res_peers={res_asn_peers}
                />
            </div>
        </>
    );
}
