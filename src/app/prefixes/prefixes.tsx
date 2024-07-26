
import { ApiFetcher } from '../api/bgp/bgpApi';
import PrefixesDetailedInfo from '../_components/prefixesDetailedinfo';

interface PrefixesDetailsProps {
    asn_number: string | null;
}

const Fetcher = ApiFetcher.getInstance();

export default async function PrefixesDetails({asn_number}: PrefixesDetailsProps) {

    if(!asn_number) {
        return;
    }
    const res_asn_prefixes = await Fetcher.getPrefixData(asn_number);

    return (
        <div className="w-full bg-white mb-4 p-4 overflow-auto md:overflow-hidden">
            <PrefixesDetailedInfo
                res_prefixes={res_asn_prefixes}
            />
        </div>
    );
}
