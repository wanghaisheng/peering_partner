import { getASNData, getPeersData, getPrefixData, getDownstreamData } from '../../api/bgp/bgpApi';
import React, { Suspense, lazy } from 'react';
import Layout from "@/app/_components/layout";
import Loading from "../../_components/loading";
import AsnHeaderInfo from '../../_components/asnHeaderInfo';
import DownstreamsDetailsInfo from '../../_components/downstreamDetailsInfo';


export default async function Page({ params }: { params: { slug: string } }) {

    const asn_number = params.slug;
    const res_asn = await getASNData(asn_number);
    const res_asn_peers = await getPeersData(asn_number);
    const res_asn_prefixes = await getPrefixData(asn_number);
    const res_asn_downstreams = await getDownstreamData(asn_number);

    return (
        <Layout activeOption="Downstream" sidebarOpen={false} slug={asn_number}>
            <div className="w-full border border-white-150 bg-white mb-4 p-4">
                <Suspense fallback={<Loading />}>
                    <AsnHeaderInfo
                        res_asn={res_asn}
                        res_peers={res_asn_peers}
                        res_prefixes={res_asn_prefixes}
                    />
                </Suspense>
            </div>
            <hr />
            <div className="w-full border border-white-150 bg-white mb-4 p-4 overflow-auto">
                <Suspense fallback={<Loading />}>
                    <DownstreamsDetailsInfo
                        res_downstreams={res_asn_downstreams}
                    />
                </Suspense>
            </div>
        </Layout>
    );
}
