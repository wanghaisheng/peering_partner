
import { ApiFetcher } from '../api/bgp/bgpApi';
import UpstreamDetailsInfo from '../_components/upstreamsDetailsInfo';

interface UpstreamDetailsProps {
    asn_number: string | null;
}

const Fetcher = ApiFetcher.getInstance();

export default async function UpstreamsDetails({asn_number}: UpstreamDetailsProps) {

    if(!asn_number) {
        return;
    }
    console.log('upstreams');
    const res_asn_Upstreams = await Fetcher.getUpstreamData(asn_number);
    console.log('res_asn_Upstreams');
    return (
        <div className="w-full bg-white mb-4 p-4 overflow-auto md:overflow-hidden">
            <UpstreamDetailsInfo
                res_upstreams={res_asn_Upstreams}
            />
        </div>
    );
}
