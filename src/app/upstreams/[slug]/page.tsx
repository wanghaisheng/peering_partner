
import { getASNData, getPeersData, getPrefixData, getUpstreamData } from '../../api/bgp/bgpApi';
import Layout from "@/app/_components/layout";
import { lazy, Suspense } from "react";
import Loading from "@/app/_components/loading";

const UpstreamsDetailsInfo = lazy(() => import('../../_components/upstreamsDetailsInfo'));


export default async function Page({ params }: { params: { slug: string } }) {

    const asn_number = params.slug;
    const res_asn = await getASNData(asn_number);
    const res_asn_peers = await getPeersData(asn_number);
    const res_asn_prefixes = await getPrefixData(asn_number);
    const res_asn_upstreams = await getUpstreamData(asn_number);
    
    return (
        <Layout activeOption="Upstreams" sidebarOpen={false} slug={asn_number} res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes}>
            <div className="w-full border border-white-150 bg-white mb-4 p-4">
                <Suspense fallback={<Loading />}>
                    <UpstreamsDetailsInfo res_upstreams={res_asn_upstreams} />
                </Suspense>
            </div>
        </Layout>                    
    );
}
