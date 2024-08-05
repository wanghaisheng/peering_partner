
import Layout from '../_components/layoutComponent/layout';
import AsnStats from './asnStats';
import Loading from '../_components/loading';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { slug: string } }) {

  const asn = params.slug;

  return (
    <Layout activeOption="ASN Stats" sidebarOpen={false} slug={asn}>
      <Suspense fallback={<Loading/>}>
          <AsnStats asn={asn} />
      </Suspense>
    </Layout>
  );
}
