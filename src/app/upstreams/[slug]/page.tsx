import Navbar from "../../_components/navbar";
import Footer from "../../_components/footer";
import ASNSideNavbar from "../../_components/asnSideNavbar";

import AsnDetailedInfo from "../../_components/asnDetailedInfo";
import AsnHeaderInfo from "../../_components/asnHeaderInfo";
import { getASNData, getPeersData, getPrefixData, getUpstreamData, getDownstreamData, getIXData, getWhoIsData } from '../../api/bgp/bgpApi';

import UpstreamsDetailsInfo from "../../_components/upstreamsDetailsInfo";



export default async function Page({ params }: { params: { slug: string } }) {

    const asn_number = params.slug;

    // Fetch data using the functions from the api folder

    const res_asn_upstreams = await getUpstreamData(asn_number);





    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
                <div style={{ top: 0, left: 0, zIndex: 1, height: "100vh" }}>
                    <ASNSideNavbar activeOption="Upstreams" sidebarOpen={true} slug={asn_number} />
                </div>

                <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                    <div className="fixed top-0 left-0 right-0 z-20 bg-white shadow">
                        <Navbar />
                    </div>







                    <div className="mt-4 pt-24 md:mt-8 lg:mt-12 mx-4 md:mx-0 pl-8 overflow-y-auto flex-grow">
                        {/* Adjusted the mx value for smaller screens */}
                        <UpstreamsDetailsInfo res_upstreams={res_asn_upstreams} asn_number={asn_number} />
                        <hr />

                    </div>






                    <Footer />
                </main>
            </div>
        </div>
    );
}
