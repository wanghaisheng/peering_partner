import { Suspense } from "react";
import Layout from "@/app/_components/layoutComponent/layout";
import IXListDetails from "../ixList";
import Loading from "@/app/_components/loading";

export default async function Page({ params }: { params: { slug: string } }) {
  const asn_number = params.slug;

  return (
    <Layout activeOption="IX" sidebarOpen={false} slug={asn_number}>
        <Suspense fallback={<Loading/>}>
          <IXListDetails asn_number={asn_number} />
        </Suspense>
    </Layout>
  );
}
