
import Loading from "@/app/_components/loading";
import { getASNData, getPeersData, getPrefixData } from '../../api/bgp/bgpApi';

// import PrefixesDetailsInfo from "../../_components/prefixesDetailedinfo";

import Layout from "@/app/_components/layout";
import React, { Suspense, lazy } from 'react';
const PrefixesDetailsInfo = lazy(() => import('../../_components/prefixesDetailedinfo'));


export default async function Page({ params }: { params: { slug: string } }) {

    const asn_number = params.slug;
    const res_asn = await getASNData(asn_number);
    const res_asn_peers = await getPeersData(asn_number);
    const res_asn_prefixes = await getPrefixData(asn_number);
    return (
        <Layout activeOption="Prefixes" sidebarOpen={false} slug={asn_number} res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes}>
            <div className="w-full border border-white-150 bg-white mb-4 p-4">
                <Suspense fallback={<Loading />}>
                    <PrefixesDetailsInfo
                        res_prefixes={res_asn_prefixes}
                    />
                </Suspense>
            </div>
        </Layout>
    );
}
