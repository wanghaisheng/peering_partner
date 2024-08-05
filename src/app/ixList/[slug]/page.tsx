
import Layout from "@/app/_components/layoutComponent/layout";
import IXListDetails from "../ixList";

export default async function Page({ params }: { params: { slug: string } }) {
  const asn_number = params.slug;

  return (
    <Layout activeOption="IX" sidebarOpen={false} slug={asn_number}>
      <div className="w-full border border-gray-150 bg-white mb-4 p-4">
          <IXListDetails asn_number={asn_number} />
      </div>
    </Layout>
  );
}
