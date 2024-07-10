'use client'
import Navbar from "../../_components/navbar";
import SideNavbar from "../../_components/sideNavbar";
import Footer from "../../_components/footer";
import NameResults from "../../_components/nameResults";
import ASNSideNavbar from "@/app/_components/asnSideNavbar";
import { getIXData, getASNData, getPeersData, getPrefixData } from "@/app/api/bgp/bgpApi";
import Link from "next/link";
import AsnHeader from "@/app/_components/asnHeaderInfo";
import { useEffect ,useState } from "react";
export default function Page({ params }: { params: { slug: string } }) {
    const asn_number = params.slug;

    const [svgContent, setSvgContent] = useState<string | null>(null);

    // const [res_asn, res_asn_peers, res_asn_prefixes, res_asn_ix] = await
    // Promise.all([getASNData(asn_number), getPeersData(asn_number), getPrefixData(asn_number), getIXData(asn_number)]);

    useEffect(() => {
      const fetchSvg = async () => {
        try {
                    const response = await fetch(`https://api.bgpview.io/assets/graphs/${asn_number}_Combined.svg`);
          const svgText = await response.text();
          // Update xlink:href attribute for every <a> tag
          const modifiedSvg = svgText.replace(/xlink:href="https:\/\/bgpview\.io\/asn\//g, 'xlink:href="/AS');
          setSvgContent(modifiedSvg);
        } catch (error) {
          console.error('Error fetching SVG:', error);
        }
      };

      fetchSvg();
    }, []);

    

  return (
    <div>
      <div style={{ position: "fixed", top: 0, left: 0, zIndex: 1, height: "100vh" }}>
        <ASNSideNavbar slug={asn_number} sidebarOpen={false} activeOption="Graph"  />
      </div>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2, background: "#fff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <Navbar />
      </div>
      <div className="flex w-ful flex-col items-center justify-start min-h-screen bg-white text-black pt-6 mt-24 ">
        {/* Three-Part Layout */}
          <div className="w-3/4 ml-12 border border-gray-150 bg-white mb-4 p-4">
              {/* <AsnHeader res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes}/> */}
          </div>
        <div className="flex flex-col  max-w-full sticky top-0">
          <div className="mt-4 md:mt-8 lg:mt-12 overflow-y-auto mx-20 md:mx-0">
            
          <div className="col-sm-10 box" style={{ overflow: 'hidden' }}>


        {svgContent ? (
          <div style={{ maxWidth: '100%', overflowX: 'auto' }} dangerouslySetInnerHTML={{ __html: svgContent }} />
        ):(
          <div>
            No Data Available.
          </div>
        )}
      </div>

          </div>


        </div>


      </div>
      <Footer />
    </div>
  );
}
