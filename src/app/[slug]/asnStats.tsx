
import { ApiFetcher } from '../api/bgp/bgpApi';
import AsnDetailedInfo from '../_components/asnDetailedInfo';
import AsnHeaderInfo from '../_components/asnHeaderInfo';
interface AsnStatsProps {
  asn: string | null;
}

const fetcher = ApiFetcher.getInstance(); // Ensure you're using the singleton instance

export default async function AsnStats({ asn }: AsnStatsProps) {
  if (!asn) {
    return <div>No ASN provided</div>;
  }
  const res_asn = await fetcher.getASNData(asn);
  const res_asn_peers = await fetcher.getPeersData(asn);
  const res_asn_prefixes = await fetcher.getPrefixData(asn);
  const res_asn_upstreams = await fetcher.getUpstreamData(asn);
  const res_asn_ix = await fetcher.getIXData(asn);

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