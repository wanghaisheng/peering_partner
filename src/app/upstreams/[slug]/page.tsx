import React, { Suspense } from 'react';
import Layout from '@/app/_components/layoutComponent/layout';
import Loading from '@/app/_components/loading';
import UpstreamsDetails from '../upstreams';

export default async function Page({ params }: { params: { slug: string } }) {

    const asn_number = params.slug;

    return (
        <Layout activeOption="Upstreams" sidebarOpen={false} slug={asn_number}>
            <Suspense fallback={<Loading />}>
                <UpstreamsDetails asn_number={asn_number} />
            </Suspense>
        </Layout>
    );
}
