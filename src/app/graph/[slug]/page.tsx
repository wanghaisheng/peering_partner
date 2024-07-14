// 'use client'
import Navbar from "../../_components/navbar";
import SideNavbar from "../../_components/sideNavbar";
import Footer from "../../_components/footer";
import NameResults from "../../_components/nameResults";
import ASNSideNavbar from "@/app/_components/asnSideNavbar";
import { getSVGData, getASNData, getPeersData, getPrefixData } from "@/app/api/bgp/bgpApi";
import Link from "next/link";
import AsnHeader from "@/app/_components/asnHeaderInfo";
import { useEffect ,useState } from "react";


export default async function Page({ params }: { params: { slug: string } }) {
  
    const asn_number = params.slug;

    // const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    // const res_asn = await getASNData(asn_number);
    // await delay(250); // Delay for 1000 milliseconds (1 second)
    // const res_asn_peers = await getPeersData(asn_number);
    // await delay(250);
    // const res_asn_prefixes = await getPrefixData(asn_number);
    // await delay(250);
    // const svgContent = await getSVGData(asn_number);
    // await delay(250);

    const [res_asn, res_asn_peers, res_asn_prefixes, svgContent] = await Promise.all([getASNData(asn_number), getPeersData(asn_number), getPrefixData(asn_number), getSVGData(asn_number)]);

    //const [svgContent, setSvgContent] = useState<string | null>(null);

    // const [res_asn, setResAsn] = useState<Record<string, any> | null>(null);
    // const [res_asn_peers, setResAsnPeers] = useState<Record<string, any> | null>(null);
    // const [res_asn_prefixes, setResAsnPrefixes] = useState<Record<string, any> | null>(null);
    
    // const [res_asn, res_asn_peers, res_asn_prefixes, res_asn_ix] = await
    // Promise.all([getASNData(asn_number), getPeersData(asn_number), getPrefixData(asn_number), getIXData(asn_number)]);
    
    //console.log(response);
    
    //console.log(svgText);
    // Update xlink:href attribute for every <a> tag
    
    // useEffect(() => {
    //   const fetchSvg = async () => {
    //     try {
          
    //       console.log(modifiedSvg);
    //       setSvgContent(modifiedSvg);
    //     } catch (error) {
    //       console.error('Error fetching SVG:', error);
    //     }
    //   };

    //   fetchSvg();
    // }, []);
    // const fetchData = async () => {
    //     try {
    //       const [asnData, peersData, prefixesData] = await Promise.all([
    //         getASNData(asn_number),
    //         getPeersData(asn_number),
    //         getPrefixData(asn_number),
    //       ]);
  
    //       setResAsn(asnData);
    //       setResAsnPeers(peersData);
    //       setResAsnPrefixes(prefixesData);
    //     } catch (error) {
    //       console.error('Error fetching BGP data:', error);
    //     }
    //   };
  
    //   fetchData();

  return (
    // <div>
    //   <div style={{ position: "fixed", top: 0, left: 0, zIndex: 1, height: "100vh" }}>
    //     <ASNSideNavbar slug={asn_number} sidebarOpen={false} activeOption="Graph"  />
    //   </div>
    //   <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2, background: "#fff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
    //     <Navbar />
    //   </div>
    //   <div className="mt-4 md:pt-24 md:mt-8 lg:mt-12 mx-4 md:pl-8 bg-white overflow-y-auto flex-grow pt-24 md:mx-0 pl-12 overflow-hidden">
    //     {/* Three-Part Layout */}
    //     <div className="w-full border border-gray-150 bg-white mb-4 p-4">
    //                     <AsnHeader res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes}/>
    //                 </div>
    //     <div className="w-full overflow-y-auto bg-white border-1 border-gray-150 mb-4">
    //       <div className="w-full border border-gray-150 bg-white mb-4">
            
          


    //   </div>
    //   <Footer />
    // </div>
    <div className="flex flex-col min-h-screen ">
    <div className="md:flex flex-row min-h-screen bg-white text-gray-800 overflow-hidden">
      <div className="fixed md:static top-0 left-0 z-10 md:z-1 h-full md:h-auto">
          <ASNSideNavbar activeOption="Graph" sidebarOpen={false} slug={asn_number} />
      </div>

      <main className="flex flex-col md:ml-0 transition-all duration-150 ease-in flex-grow">
        <div className="fixed top-0 left-0 right-0 z-20 bg-white shadow">
          <Navbar />
        </div>

        <div className="mt-4 md:pt-24 md:mt-8 lg:mt-12 mx-4 md:pl-8 overflow-y-auto flex-grow pt-24 md:mx-0 pl-12 overflow-auto">
          {/* Adjusted the mx value for smaller screens */}
          <div className="w-full p-4 border border-gray-150">
                    <div className="w-full border border-gray-150 bg-white mb-4 p-4">
                        <AsnHeader res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes}/>
                    </div>
          <div className="col-sm-10 box w-full border border-gray-150 bg-white mb-4 p-4" data-combined-graph-url="https://api.bgpview.io/assets/graphs/AS13335_Combined.svg" >
            {svgContent ? (
              <div id="content-graph" dangerouslySetInnerHTML={{ __html: svgContent }} />
            ):(
              <div>
                No Data Available.
              </div>
            )}
          </div>
        </div>
        </div>
        <Footer />
      </main>
    </div>
  </div>
  );
}
