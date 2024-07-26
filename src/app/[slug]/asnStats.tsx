// AsnStats.tsx
import { ApiFetcher } from '../api/bgp/bgpApi';
import AsnDetailedInfo from '../_components/asnDetailedInfo';

interface AsnStatsProps {
  asn: string | null;
}

const fetcher = ApiFetcher.getInstance(); // Ensure you're using the singleton instance

export default async function AsnStats({ asn }: AsnStatsProps) {
  if (!asn) {
    return <div>No ASN provided</div>;
  }
    // Fetch data sequentially
    const res_asn = await fetcher.getASNData(asn);
    console.log('Fetched ASN data');
    
    const res_asn_peers = await fetcher.getPeersData(asn);
    console.log('Fetched ASN peers data');
    
    const res_asn_prefixes = await fetcher.getPrefixData(asn);
    console.log('Fetched ASN prefixes data');
    
    const res_asn_upstreams = await fetcher.getUpstreamData(asn);
    console.log('Fetched ASN upstreams data');
    
    const res_asn_downstreams = await fetcher.getDownstreamData(asn);
    console.log('Fetched ASN downstreams data');
    
    const res_asn_ix = await fetcher.getIXData(asn);
    console.log('Fetched ASN IX data');

    return (
      <div className="w-full bg-white mb-4 p-4 overflow-auto md:overflow-hidden">
        <AsnDetailedInfo
          res_asn={res_asn}
          res_peers={res_asn_peers}
          res_prefixes={res_asn_prefixes}
          res_upstreams={res_asn_upstreams}
          res_downstreams={res_asn_downstreams}
          res_ix={res_asn_ix}
        />
      </div>
    );
}
