
import Layout from "@/app/_components/layoutComponent/layout";
import PrefixesDetails from "../prefixes";

export default async function Page({ params }: { params: { slug: string } }) {

    const asn_number = params.slug;

    return (
        <Layout activeOption="Prefixes" sidebarOpen={false} slug={asn_number}>
            <div className="w-full border border-white-150 bg-white mb-4 p-4">
                    <PrefixesDetails asn_number={asn_number}/>
            </div>
        </Layout>
    );
}
