
import { getIXData, getASNData, getPeersData, getPrefixData } from "@/app/api/bgp/bgpApi";
import AsnHeaderInfo from "@/app/_components/asnHeaderInfo";
import Layout from "@/app/_components/layout";
import IXListInfo from "@/app/_components/ixListInfo";


export default async function Page({ params }: { params: { slug: string } }) {
  const asn_number = params.slug;
  const res_asn = await getASNData(asn_number);
  const res_asn_peers = await getPeersData(asn_number);
  const res_asn_prefixes = await getPrefixData(asn_number);
  const res_asn_ix = await getIXData(asn_number);

  
  return (
    <Layout activeOption="IX" sidebarOpen={false} slug={asn_number}>
      <div className="w-full border border-gray-150 bg-white mb-4 p-4">
        <AsnHeaderInfo res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes} />
      </div>
      {/* IxList Component */}
      <div className="w-full border border-gray-150 bg-white mb-4 p-4">
        <IXListInfo res_ix={res_asn_ix} />
      </div>
    </Layout>
  );
}
