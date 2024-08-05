
import Layout from "@/app/_components/layoutComponent/layout";
import PeersDetails from "../peers";

export default async function Page({ params }: { params: { slug: string } }) {

  const asn_number = params.slug;
  return (
    <Layout activeOption="Peers" sidebarOpen={false} slug={asn_number}>
      <PeersDetails asn_number={asn_number} />
    </Layout >
  );
}
