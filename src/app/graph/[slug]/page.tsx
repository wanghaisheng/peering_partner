import { getSVGData, getASNData, getPeersData, getPrefixData } from "@/app/api/bgp/bgpApi";
import Layout from "@/app/_components/layout";

export default async function Page({ params }: { params: { slug: string } }) {

  const asn_number = params.slug;
  const svgContent = await getSVGData(asn_number);
  const res_asn = await getASNData(asn_number);
  const res_asn_peers = await getPeersData(asn_number);
  const res_asn_prefixes = await getPrefixData(asn_number);

  return (
    <Layout activeOption="Graph" sidebarOpen={false} slug={asn_number} res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes}>
        <div className="w-full border border-white-150 bg-white mb-4 p-4">
          {/*graph component*/}
          {svgContent ? (
            <div id="content-graph" dangerouslySetInnerHTML={{ __html: svgContent }} />
          ) : (
            <div>
              No Data Available.
            </div>
          )}
        </div>
    </Layout>
  );
}
