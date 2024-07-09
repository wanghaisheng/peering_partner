import Navbar from "../../_components/navbar";
import Footer from "../../_components/footer";
import { getUniquePrefixData } from "../../api/prefix/prefixapi";
import UniquePrefix from "../../_components/uniquePrefix";
import PrefixHeaderInfo from "@/app/_components/prefixHeaderInfo";





export default async function Page({ params }: { params: { slug: string } }) {

  const prefix = params.slug;
  console.log(prefix);
  const res_prefix = await getUniquePrefixData(prefix);





  return (
    <div>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2, background: "#fff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-start min-h-screen bg-white text-black pt-6 " style={{ marginTop: "120px" }}>


        {/* Three-Part Layout */}
        <div className="flex flex-col w-full max-w-screen-xl sticky top-0">

          <PrefixHeaderInfo res_prefix={res_prefix} />

          <hr></hr>
          <UniquePrefix res_prefix={res_prefix} />
        </div>


      </div>
      <Footer />
    </div>
  );
}
