
import Layout from "@/app/_components/layoutComponent/layout";
import Loading from '@/app/_components/loading';
import { Suspense } from 'react';
import PeersDetails from "../peers";

export default async function Page({ params }: { params: { slug: string } }) {

  const asn_number = params.slug;
  return (
    <Layout activeOption="Peers" sidebarOpen={false} slug={asn_number}>
      <div className="w-full border border-white-150 bg-white mb-4 p-4">
        <Suspense fallback={<Loading />}>
          <PeersDetails asn_number={asn_number}/>
        </Suspense>
      </div>
    </Layout >  
  );
}
