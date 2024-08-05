
import Layout from "@/app/_components/layoutComponent/layout";
import PrefixesDetails from "../prefixes";
import Loading from "@/app/_components/loading";
import { Suspense } from "react";

export default async function Page({ params }: { params: { slug: string } }) {

    const asn_number = params.slug;

    return (
        <Layout activeOption="Prefixes" sidebarOpen={false} slug={asn_number}>
            <Suspense fallback={<Loading />}>
                <PrefixesDetails asn_number={asn_number} />
            </Suspense>
        </Layout>
    );
}
