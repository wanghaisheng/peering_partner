
import { ApiFetcher } from '../api/bgp/bgpApi';
import DownstreamsDetailsInfo from '../_components/downstreamDetailsInfo';

interface DownstreamsDetailsProps {
    asn_number: string | null;
}

const Fetcher = ApiFetcher.getInstance();

export default async function DownstreamsDetails({asn_number}: DownstreamsDetailsProps) {

    if(!asn_number) {
        return;
    }
    console.log('downstreams');
    const res_asn_downstreams = await Fetcher.getDownstreamData(asn_number);
    console.log('res_asn_downstreams');

    return (
        <div className="w-full bg-white mb-4 p-4 overflow-auto md:overflow-hidden">
            <DownstreamsDetailsInfo
                res_downstreams={res_asn_downstreams}
            />
        </div>
    );
}
