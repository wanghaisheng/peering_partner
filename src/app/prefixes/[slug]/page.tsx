
import Layout from "@/app/_components/layoutComponent/layout";
import PrefixesDetails from "../prefixes";

export default async function Page({ params }: { params: { slug: string } }) {

    const asn_number = params.slug;

    return (
        <Layout activeOption="Prefixes" sidebarOpen={false} slug={asn_number}>
            <PrefixesDetails asn_number={asn_number} />
        </Layout>
    );
}
