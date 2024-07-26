import { Suspense } from "react";
import Layout from "@/app/_components/layoutComponent/layout";
import Graph from "../graph";
import Loading from "@/app/_components/loading";

export default async function Page({ params }: { params: { slug: string } }) {

  const asn_number = params.slug;

  return (
    <Layout activeOption="Graph" sidebarOpen={false} slug={asn_number}>
      <div className="w-full border border-white-150 bg-white mb-4 p-4">
        <Suspense fallback={<Loading />}>
          <Graph asn_number={asn_number} />
        </Suspense>
      </div>
    </Layout>
  );
}
