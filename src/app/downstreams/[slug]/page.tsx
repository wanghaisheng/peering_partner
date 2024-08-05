import React, { Suspense} from 'react';
import Layout from '@/app/_components/layoutComponent/layout';
import DownstreamsDetails from '../downstreams';

export default async function Page({ params }: { params: { slug: string } }) {

    const asn_number = params.slug;

    return (
        <Layout activeOption="Downstream" sidebarOpen={false} slug={asn_number}>
                <DownstreamsDetails asn_number={asn_number} />
        </Layout>
    );
}
