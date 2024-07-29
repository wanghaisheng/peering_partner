
import { ApiFetcher } from '../../api/bgp/bgpApi';
import AsnHeaderInfo from '../asnHeaderInfo';

interface AsnHeaderProps {
    asn: string | null;
}

const Fetcher = ApiFetcher.getInstance();

export default async function Header({asn}: AsnHeaderProps) {

    const asn_number = asn;
    if(!asn_number) {
        return;
    }
    const res_asn = await Fetcher.getASNData(asn_number);
    const res_asn_peers = await Fetcher.getPeersData(asn_number);
    const res_asn_prefixes = await Fetcher.getPrefixData(asn_number);
    return (
        <AsnHeaderInfo res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes} />
    );
}
