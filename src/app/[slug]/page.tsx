
import { lazy, Suspense } from 'react'
import { getASNData, getPeersData, getPrefixData, getUpstreamData, getDownstreamData, getIXData } from '../api/bgp/bgpApi';
import Layout from "../_components/layout";
import Loading from '../_components/loading';

const AsnDetailedInfo = lazy(() => import('../_components/asnDetailedInfo'));

export default async function Page({ params }: { params: { slug: string } }) {

  const asn = params.slug;

  const res_asn = await getASNData(asn);
  const res_asn_peers = await getPeersData(asn);
  const res_asn_prefixes = await getPrefixData(asn);
  const res_asn_upstreams = await getUpstreamData(asn);
  const res_asn_downstreams = await getDownstreamData(asn);
  const res_asn_ix = await getIXData(asn);

  return (
    <Layout activeOption="ASN Stats" sidebarOpen={false} slug={asn} res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes}>
        <div className="w-full border border-white-150 bg-white mb-4 p-4 overflow-auto md:overflow-hidden">
          <Suspense fallback={<Loading />}>
              <AsnDetailedInfo
                res_asn={res_asn}
                res_peers={res_asn_peers}
                res_prefixes={res_asn_prefixes}
                res_upstreams={res_asn_upstreams}
                res_downstreams={res_asn_downstreams}
                res_ix={res_asn_ix}
              />
          </Suspense>
        </div>
    </Layout>
  );
}
