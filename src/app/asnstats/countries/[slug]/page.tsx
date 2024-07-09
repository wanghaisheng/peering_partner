import Navbar from "../../../_components/navbar";
import Footer from "../../../_components/footer";
import { getCountryData } from "../../../api/countryStats/countryapi";
import CountryBGPData from "../../../_components/countrybgpData";
import ASNSideNavbar from "../../../_components/asnSideNavbar";



export default async function Page({ params }: { params: { slug: string } }) {

  const countrycode = params.slug;

  console.log(countrycode)


  const countrybgpdata = await getCountryData(countrycode);





  return (

    <div className="h-screen " >
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <div style={{ top: 0, left: 0, zIndex: 1, height: "100vh" }}>
          <ASNSideNavbar activeOption="ASN Stats" sidebarOpen={false} slug={countrycode} />
        </div>

        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in" >




          <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1) text-white" }}>
            <Navbar />
          </div>







          <div className="mt-4 pt-24 md:mt-8 lg:mt-12 overflow-y-auto mx-4 md:mx-0 pl-8">
            {/* Adjusted the mx value for smaller screens */}


            <CountryBGPData countrybgpdata={countrybgpdata} countrycode={countrycode} />

          </div>






          <Footer />
        </main>
      </div>
    </div>
  );
}
