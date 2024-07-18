import { getSVGData, getASNData, getPeersData, getPrefixData } from "@/app/api/bgp/bgpApi";
import AsnHeaderInfo from "@/app/_components/asnHeaderInfo";
import Layout from "@/app/_components/layout";

export default async function Page({ params }: { params: { slug: string } }) {

  const asn_number = params.slug;

  const res_asn = await getASNData(asn_number);
  const res_asn_peers = await getPeersData(asn_number);
  const res_asn_prefixes = await getPrefixData(asn_number);
  const svgContent = await getSVGData(asn_number);


  return (
    <Layout activeOption="Graph" sidebarOpen={false} slug={asn_number}>
      <div className="w-full border border-white-150 bg-white mb-4 p-4">
        {/* Content for the first column (3/4 width) */}
        <AsnHeaderInfo
          res_asn={res_asn}
          res_peers={res_asn_peers}
          res_prefixes={res_asn_prefixes}
        />
      </div>
      <div className="w-full border border-white-150 bg-white mb-4 p-4">
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
      </div>
    </Layout>
  );
}
