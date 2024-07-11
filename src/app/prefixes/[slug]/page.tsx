import Navbar from "../../_components/navbar";
import Footer from "../../_components/footer";
import ASNSideNavbar from "../../_components/asnSideNavbar";

import AsnDetailedInfo from "../../_components/asnDetailedInfo";
import AsnHeaderInfo from "../../_components/asnHeaderInfo";
import { getASNData, getPeersData, getPrefixData, getUpstreamData, getDownstreamData, getIXData, getWhoIsData } from '../../api/bgp/bgpApi';

import PrefixesDetailsInfo from "../../_components/prefixesDetailedinfo";



export default async function Page({ params }: { params: { slug: string } }) {

    const asn_number = params.slug;

    // Fetch data using the functions from the api folder

    //const res_asn_prefixes = await getPrefixData(asn_number);

    const [res_asn, res_asn_peers, res_asn_prefixes] = await
    Promise.all([getASNData(asn_number), getPeersData(asn_number), getPrefixData(asn_number)]);


    return (
        <div className="flex flex-col min-h-screen ">
            <div className="md:flex flex-row min-h-screen bg-white text-gray-800 overflow-hidden">
                <div className="fixed md:static top-0 left-0 z-10 md:z-1 h-full md:h-auto">
                    <ASNSideNavbar activeOption="Prefixes" sidebarOpen={false} slug={asn_number} />
                </div>

                <main className="flex flex-col md:ml-0 transition-all duration-150 ease-in flex-grow">
                    <div className="fixed top-0 left-0 right-0 z-20 bg-white shadow">
                        <Navbar />
                    </div>

                    <div className="mt-4 md:pt-24 md:mt-8 lg:mt-12 mx-4 md:pl-8 overflow-y-auto flex-grow pt-24 md:mx-0 pl-12 overflow-auto">
                        {/* Adjusted the mx value for smaller screens */}
                        <PrefixesDetailsInfo res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes} asn_number={asn_number} />
                        <hr />
                    </div>

                    <Footer />
                </main>
            </div>
        </div>
    );
}
