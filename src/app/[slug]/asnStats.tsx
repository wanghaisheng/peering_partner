
// import {getASNData, getPeersData, getPrefixData, getUpstreamData, getIXData } from '../api/bgp/bgpApi';
import AsnDetailedInfo from '../_components/asnDetailedInfo';
import AsnHeaderInfo from '../_components/asnHeaderInfo';
import { ApiFetcher } from '../api/bgp/bgpApi';

const Fetcher = ApiFetcher.getInstance();
interface AsnStatsProps {
  asn: string | null;
}

// const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
// const DELAY = 750;
export default async function AsnStats({ asn }: AsnStatsProps) {
  if (!asn) {
    return <div>No ASN provided</div>;
  }
  const res_asn = await Fetcher.getASNData(asn);
  // console.log(asn);
  // await delay(DELAY);
  const res_asn_peers = await Fetcher.getPeersData(asn);
  // console.log(asn);
  // await delay(DELAY);
  const res_asn_prefixes = await Fetcher.getPrefixData(asn);
  // console.log(asn);
  // await delay(DELAY);
  const res_asn_upstreams = await Fetcher.getUpstreamData(asn);
  // console.log(asn);
  // await delay(DELAY);
  const res_asn_ix = await Fetcher.getIXData(asn);
  // console.log(asn);
  // await delay(DELAY);

  return (
    <>
      <div className="w-full border border-white-150 bg-white mb-4 p-4">
        <AsnHeaderInfo res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes} />
      </div>
      <div className="w-full border border-white-150 bg-white mb-4 p-4 overflow-auto md:overflow-hidden">
        <AsnDetailedInfo
          res_asn={res_asn}
          res_peers={res_asn_peers}
          res_prefixes={res_asn_prefixes}
          res_upstreams={res_asn_upstreams}
          res_ix={res_asn_ix}
        />
      </div>
    </>
  );
}