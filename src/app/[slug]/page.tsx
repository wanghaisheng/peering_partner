
import Layout from '../_components/layoutComponent/layout';
import AsnStats from './asnStats';

export default async function Page({ params }: { params: { slug: string } }) {

  const asn = params.slug;

  return (
    <Layout activeOption="ASN Stats" sidebarOpen={false} slug={asn}>
          <AsnStats asn={asn} />
    </Layout>
  );
}
