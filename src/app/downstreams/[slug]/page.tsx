
import Layout from '@/app/_components/layoutComponent/layout';
import DownstreamsDetails from '../downstreams';
import Loading from '@/app/_components/loading';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { slug: string } }) {

    const asn_number = params.slug;

    return (
        <Layout activeOption="Downstream" sidebarOpen={false} slug={asn_number}>
            <Suspense fallback={<Loading/>}>
                <DownstreamsDetails asn_number={asn_number} />
            </Suspense>
        </Layout>
    );
}
