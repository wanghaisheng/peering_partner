import Navbar from "../../_components/navbar";
import SideNavbar from "../../_components/sideNavbar";
import Footer from "../../_components/footer";
import { getbgpSearchData } from "../../api/bgpSeach/bgpSearchApi";
import NameResults from "../../_components/nameResults";
import { ApiFetcher } from "@/app/api/bgp/bgpApi";

const Fetcher = ApiFetcher.getInstance();


export default async function Page({ params }: { params: { slug: string } }) {

  const name = params.slug;

  const bgpSearcdata = await Fetcher.getbgpSearchData(name);

  return (
    <div>
      <div style={{ position: "fixed", top: 0, left: 0, zIndex: 1, height: "100vh" }}>
        <SideNavbar activeOption="ASN Stats" />
      </div>



      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2, background: "#fff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-start min-h-screen bg-white text-black pt-6 " style={{ marginTop: "120px" }}>


        {/* Three-Part Layout */}
        <div className="flex flex-col  max-w-screen-xl sticky top-0">


          <div className="mt-4 md:mt-8 lg:mt-12 overflow-y-auto mx-20 md:mx-0">
            <NameResults bgpSearcdata={bgpSearcdata} />
          </div>


        </div>


      </div>
      <Footer />
    </div>
  );
}
