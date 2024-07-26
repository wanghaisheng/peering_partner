
import { ApiFetcher } from '../api/bgp/bgpApi';
import WhoIsDetailInfo from '../_components/whoIsInfo';

interface WhoIsDetailsProps {
    asn_number: string | null;
}

const Fetcher = ApiFetcher.getInstance();

export default async function WhoIsDetails({asn_number}: WhoIsDetailsProps) {

    if(!asn_number) {
        return;
    }
    const res_asn_whois = await Fetcher.getWhoIsData(asn_number);

    return (
        <div className="w-full bg-white mb-4 p-4 overflow-auto md:overflow-hidden">
            <WhoIsDetailInfo
                res_whois={res_asn_whois}
            />
        </div>
    );
}
