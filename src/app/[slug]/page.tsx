
import { Suspense } from 'react'
import Layout from '../_components/layoutComponent/layout';
import Loading from '../_components/loading';
import AsnStats from './asnStats';

export default async function Page({ params }: { params: { slug: string } }) {

  const asn = params.slug;

  return (
    <Layout activeOption="ASN Stats" sidebarOpen={false} slug={asn}>
        <div className="w-full border border-white-150 bg-white mb-4 p-4 overflow-auto md:overflow-hidden">
          <Suspense fallback={<Loading />}>
              <AsnStats asn={asn} />
          </Suspense>
        </div>
    </Layout>
  );
}
