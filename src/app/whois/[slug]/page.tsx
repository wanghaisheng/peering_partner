
import { getASNData, getPeersData, getPrefixData, getWhoIsData } from "@/app/api/bgp/bgpApi";
import Layout from "@/app/_components/layout";
import Loading from "@/app/_components/loading";
import { lazy, Suspense } from "react";

const RawWhoIsInfo = lazy(() => import('@/app/_components/whoIsInfo'));

export default async function Page({ params }: { params: { slug: string } }) {

  const asn_number = params.slug;
  const res_asn = await getASNData(asn_number);
  const res_asn_peers = await getPeersData(asn_number);
  const res_asn_prefixes = await getPrefixData(asn_number);
  const res_asn_whois = await getWhoIsData(asn_number);


  return (
    <Layout activeOption="Raw Whois" sidebarOpen={false} slug={asn_number} res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes}>
      <div className="w-full border border-white-150 bg-white mb-4 p-4">
        <Suspense fallback={<Loading />}>
          <RawWhoIsInfo res_whois={res_asn_whois} />
        </Suspense>
      </div>
    </Layout>
  );
}
