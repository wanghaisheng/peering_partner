
import Layout from "@/app/_components/layoutComponent/layout";
import PeersDetails from "../peers";

export default async function Page({ params }: { params: { slug: string } }) {

  const asn_number = params.slug;
  return (
    <Layout activeOption="Peers" sidebarOpen={false} slug={asn_number}>
      <div className="w-full border border-white-150 bg-white mb-4 p-4">
          <PeersDetails asn_number={asn_number}/>
      </div>
    </Layout >  
  );
}
