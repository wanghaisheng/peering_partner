import TrafficDetailedPage from "../../_components/trafficComponents/trafficDetailed"
import Navbar from "../../_components/navbar";
import SideNavbar from "../../_components/sideNavbar";
import Footer from "../../_components/footer";
// import { getWorldData } from "../../api/countryStats/countryapi";
import WorldData from "../../_components/worldbgpData"



export default async function TrafficPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;



 
  return (
    <div className="h-screen overflow-y-auto">
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <div style={{ top: 0, left: 0, zIndex: 1, height: "100vh" }}>
          <SideNavbar activeOption="Live Internet Traffic" sidebarOpen={false} />
        </div>

        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1) text-white" }}>
            <Navbar />
          </div>

          <div className="mt-4 pt-16 md:mt-8 lg:mt-12 mx-4 md:mx-0">
            <TrafficDetailedPage 
              slug={slug}
            />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}
