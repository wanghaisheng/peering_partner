
import { ApiFetcher } from '../api/bgp/bgpApi';
import DownstreamsDetailsInfo from '../_components/downstreamDetailsInfo';
import AsnHeaderInfo from '../_components/asnHeaderInfo';
interface DownstreamsDetailsProps {
    asn_number: string | null;
}

const Fetcher = ApiFetcher.getInstance();

export default async function DownstreamsDetails({asn_number}: DownstreamsDetailsProps) {

    if(!asn_number) {
        return;
    }
    console.log('downstreams');
    const res_asn = await Fetcher.getASNData(asn_number);
    console.log('res_asn');
    const res_asn_peers = await Fetcher.getPeersData(asn_number);
    console.log('res_asn_peers');
    const res_asn_prefixes = await Fetcher.getPrefixData(asn_number);
    const res_asn_downstreams = await Fetcher.getDownstreamData(asn_number);
    console.log('res_asn_downstreams');

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
