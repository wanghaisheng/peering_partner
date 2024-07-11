import Navbar from "../../_components/navbar";
import SideNavbar from "../../_components/sideNavbar";
import Footer from "../../_components/footer";
import NameResults from "../../_components/nameResults";
import ASNSideNavbar from "@/app/_components/asnSideNavbar";
import { getASNData, getPeersData, getPrefixData, getUpstreamData, getDownstreamData, getIXData, getWhoIsData } from "@/app/api/bgp/bgpApi";
import AsnHeader from "@/app/_components/asnHeaderInfo";

export default async function Page({ params }: { params: { slug: string } }) {

  const asn_number = params.slug;

  //const res_asn_whois = await getWhoIsData(asn); 

  const [res_asn, res_asn_peers, res_asn_prefixes, res_asn_whois] = await
  Promise.all([getASNData(asn_number), getPeersData(asn_number), getPrefixData(asn_number), getWhoIsData(asn_number)]);

  const data = res_asn_whois; 

  return (
    // <div>
    //   <div style={{ position: "fixed", top: 0, left: 0, zIndex: 1, height: "100vh" }}>
    //     <ASNSideNavbar slug={asn_number} sidebarOpen={false}activeOption="Raw Whois"  />
    //   </div>
    //   <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2, background: "#fff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
    //     <Navbar />
    //   </div>
      
    //   <div className="lg:flex flex-col items-center justify-start min-h-screen bg-white text-black pt-6 mt-24">
    //     <div className="w-full p-4 border border-gray-150">
    //       <div className="w- mx-20 border border-gray-150 bg-white mb-4 mt-4 p-4">
    //           <AsnHeader res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes}/>
    //       </div>
    //     </div>
    //     {/* Three-Part Layout */}
    //     <div className="">
    //       <div className="mt-4 md:mt-8 lg:mt-12 overflow-y-auto ml-12 mr-2 md:ml-20 xl:mx-0 bg-gray-200 border-2 p-4 border-black">
    //         <div>
    //           <pre className="p-4 rounded-lg ">
    //             {/* Render data on the screen */}
    //             {data.map((entry: any, index: any) => (
    //               <div key={index} className="text-black-100">
    //                 {/* Skip the first time when entry.type === 'comments' */}
    //                 {entry.type === 'comments' && index === 0 ? null : (
    //                   <>
    //                     {entry.type === 'object' && (
    //                       <div>
    //                         {/* Render object information */}
    //                         {entry.attributes.map((attribute: any, attributeIndex: number) => (
    //                           <div key={attributeIndex}>
    //                             {`${attribute.name}: ${attribute.values?.join(', ')}`}
    //                           </div>
    //                         ))}
    //                         <div>--------------------------</div>
    //                         <br />
    //                         <br />
    //                       </div>
    //                     )}
    //                     {entry.type === 'comments' && (
    //                       <div>
    //                         {/* Render comments */}
    //                         <div dangerouslySetInnerHTML={{ __html: entry.comments.join('<br />') }} />
    //                       </div>
    //                     )}
    //                   </>
    //                 )}
    //               </div>
    //             ))}
    //           </pre>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <Footer />
    // </div>

      <div className="flex flex-col min-h-screen ">
      <div className="md:flex flex-row min-h-screen bg-white text-gray-800 overflow-hidden">
          <div className="fixed md:static top-0 left-0 z-10 md:z-1 h-full md:h-auto">
              <ASNSideNavbar activeOption="Raw Whois" sidebarOpen={false} slug={asn_number} />
          </div>

          <main className="flex flex-col md:ml-0 transition-all duration-150 ease-in flex-grow">
          <   div className="fixed top-0 left-0 right-0 z-20 bg-white shadow">
                  <Navbar />
              </div>

              <div className="mt-4 md:pt-24 md:mt-8 lg:mt-12 mx-4 md:pl-8 overflow-y-auto flex-grow pt-24 md:mx-0 pl-12 overflow-auto">
                  {/* Adjusted the mx value for smaller screens */}
                  <div className="w-full p-4 border border-gray-150">
                    <div className="w-full border border-gray-150 bg-white mb-8 p-4">
                        <AsnHeader res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes}/>
                    </div>
                  
                  <div className="overflow-y-auto bg-white border p-6 border-gray-150">
                    <div className="w-full border border-gray-400 rounded-md bg-gray-200 mb-4 p-4">
                    <div>
                      <pre className="p-4 rounded-lg ">
                        {/* Render data on the screen */}
                        {data.map((entry: any, index: any) => (
                      <div key={index} className="text-black-100">
                        {/* Skip the first time when entry.type === 'comments' */}
                        {entry.type === 'comments' && index === 0 ? null : (
                          <>
                            {entry.type === 'object' && (
                              <div>
                                {/* Render object information */}
                                {entry.attributes.map((attribute: any, attributeIndex: number) => (
                                  <div key={attributeIndex}>
                                    {`${attribute.name}: ${attribute.values?.join(', ')}`}
                                  </div>
                                ))}
                                <div>--------------------------</div>
                                <br />
                                <br />
                              </div>
                            )}
                            {entry.type === 'comments' && (
                              <div>
                                {/* Render comments */}
                                <div dangerouslySetInnerHTML={{ __html: entry.comments.join('<br />') }} />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                      </pre>
                    </div>
                  </div>
                 </div>
              </div>
              </div>
              <Footer />
          </main>
      </div>
    </div>
  );
}
