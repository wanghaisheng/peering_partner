import Navbar from "../../_components/navbar";
import Footer from "../../_components/footer";
import { getUniqueIXData } from "../../api/ix/ixapi";
import UniqueIX from "@/app/_components/uniqueIX";




export default async function Page({ params }: { params: { slug: string } }) {

  const ix = params.slug;

  const res_ix = await getUniqueIXData(ix);

  return (
    <div>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2, background: "#fff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-start min-h-screen bg-white text-black pt-6 " style={{ marginTop: "120px" }}>


        {/* Three-Part Layout */}
        <div className="flex flex-col w-full max-w-screen-xl sticky top-0">


          <hr></hr>
          <UniqueIX res_ix={res_ix} />
        </div>


      </div>
      <Footer />
    </div>
  );
}
