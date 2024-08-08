import Navbar from "../_components/navbar";
import SideNavbar from "../_components/sideNavbar";
import Footer from "../_components/footer";
import { getWorldData } from "../api/countryStats/countryapi";
import WorldData from "../_components/worldbgpData"
import { backendURL } from "../api/backendURL";



export default async function Page({ params }: { params: { slug: string } }) {

  let bgpdata = [];
  try{
    const response = await fetch(`https://api.bgpview.io/reports/countries`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${errorText}`);
    }
    const jsonData = await response.json();
    bgpdata = jsonData;
  }catch(err){
    throw err;
  }
  return (
    <div className="h-screen " >
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <div style={{ top: 0, left: 0, zIndex: 1, height: "100vh" }}>
          <SideNavbar activeOption="ASN Stats" sidebarOpen={false} />
        </div>
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in" >
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1) text-white" }}>
            <Navbar />
          </div>
          <div className="mt-4 pt-8 md:mt-8 lg:mt-12 overflow-y-auto mx-4 md:mx-0">
            {/* Adjusted the mx value for smaller screens */}
            <WorldData bgpdata={bgpdata} />
          </div>
          <Footer />
        </main>
      </div>
    </div>


  );
}
