
// import {getASNData, getPeersData, getPrefixData } from '../api/bgp/bgpApi';
import AsnHeaderInfo from '../_components/asnHeaderInfo';
import PeersDetailsInfo from '../_components/peersDetailedInfo';
import { ApiFetcher } from '../api/bgp/bgpApi';

const Fetcher = ApiFetcher.getInstance();
interface PeersDetailsProps {
    asn_number: string | null;
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const DELAY = 750;

export default async function PeersDetails({ asn_number }: PeersDetailsProps) {

    if (!asn_number) {
        return;
    }
    const res_asn = await Fetcher.getASNData(asn_number);
    // console.log('peers' + asn_number);
    // await delay(DELAY);
    const res_asn_prefixes = await Fetcher.getPrefixData(asn_number);
    // console.log('peers' + asn_number);
    // await delay(DELAY);
    const res_asn_peers = await Fetcher.getPeersData(asn_number);
    // console.log('peers' + asn_number);
    // await delay(DELAY);
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
