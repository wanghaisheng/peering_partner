
import { getASNData, getPeersData, getPrefixData, getWhoIsData } from "@/app/api/bgp/bgpApi";
import AsnHeaderInfo from "@/app/_components/asnHeaderInfo";
import Layout from "@/app/_components/layout";
import RawWhoIsInfo from "@/app/_components/whoIsInfo";


export default async function Page({ params }: { params: { slug: string } }) {

  const asn_number = params.slug;
  const res_asn = await getASNData(asn_number);

  const res_asn_peers = await getPeersData(asn_number);

  const res_asn_prefixes = await getPrefixData(asn_number);

  const res_asn_whois = await getWhoIsData(asn_number);


  return (
    <Layout activeOption="Raw Whois" sidebarOpen={false} slug={asn_number}>
      <div className="w-full border border-white-150 bg-white mb-4 p-4">
        <AsnHeaderInfo
          res_asn={res_asn}
          res_peers={res_asn_peers}
          res_prefixes={res_asn_prefixes}
        />
      </div>

      <div className="w-full border border-white-150 bg-white mb-4 p-4">
        <RawWhoIsInfo res_whois={res_asn_whois} />
      </div>
    </Layout>
  );
}
