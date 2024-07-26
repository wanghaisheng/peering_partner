
import { ApiFetcher } from '../api/bgp/bgpApi';
import PeersDetailsInfo from '../_components/peersDetailedInfo';

interface PeersDetailsProps {
    asn_number: string | null;
}

const Fetcher = ApiFetcher.getInstance();

export default async function PeersDetails({asn_number}: PeersDetailsProps) {

    if(!asn_number) {
        return;
    }

    console.log('peers');
    const res_asn_peers = await Fetcher.getPeersData(asn_number);
    console.log('peers getPeersData');
    return (
        <div className="w-full bg-white mb-4 p-4 overflow-auto md:overflow-hidden">
            <PeersDetailsInfo
                res_peers={res_asn_peers}
            />
        </div>
    );
}
