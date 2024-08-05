
import Layout from "@/app/_components/layoutComponent/layout";
import PeersDetails from "../peers";
import { Suspense } from "react";
import Loading from "@/app/_components/loading";

export default async function Page({ params }: { params: { slug: string } }) {

  const asn_number = params.slug;
  return (
    <Layout activeOption="Peers" sidebarOpen={false} slug={asn_number}>
      <Suspense fallback={<Loading/>}>
      <PeersDetails asn_number={asn_number} />
      </Suspense>
    </Layout >
  );
}
