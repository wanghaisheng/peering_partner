
import Navbar from "../../_components/navbar";
import SideNavbar from "../../_components/sideNavbar";
import Footer from "../../_components/footer";
import NameResults from "../../_components/nameResults";
import ASNSideNavbar from "@/app/_components/asnSideNavbar";
import { getIXData, getASNData, getPeersData, getPrefixData} from "@/app/api/bgp/bgpApi";
import Link from "next/link";
import AsnHeader from "@/app/_components/asnHeaderInfo";


export default async function Page({ params }: { params: { slug: string } }) {
  const asn_number = params.slug;
  //const res_asn_ix = await getIXData(asn_number);
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const res_asn = await getASNData(asn_number);
    await delay(250); // Delay for 1000 milliseconds (1 second)
    const res_asn_peers = await getPeersData(asn_number);
    await delay(250);
    const res_asn_prefixes = await getPrefixData(asn_number);
    await delay(250);
    const res_asn_ix = await getIXData(asn_number);
    await delay(250);

  // const [res_asn, res_asn_peers, res_asn_prefixes, res_asn_ix] = await Promise.all([getASNData(asn_number), getPeersData(asn_number), getPrefixData(asn_number), getIXData(asn_number)]);

  const data = res_asn_ix?.data?.map((item: any) => ({
    country: item.country_code,
    ix: item.name,
    name: item.name_full,
    ix_id: item.ix_id,
    ipv4_address: item.ipv4_address,
    ipv6_address: item.ipv6_address,
    speed: item.speed,

  }));

  return (
    // <div>
    //   <div style={{ position: "fixed", top: 0, left: 0, zIndex: 1, height: "100vh" }}>
    //     <ASNSideNavbar slug={asn_number} sidebarOpen={false} activeOption="IX" />
    //   </div>
    //   <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2, background: "#fff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
    //     <Navbar />
    //   </div>
    //   <div className="md:flex flex-col items-center justify-start min-h-screen bg-white text-black pt-6 mt-24 overflow-auto">
    //     {/* Three-Part Layout */}
    //       <div className="w-3/4 ml-12 border border-gray-150 bg-white mb-4 p-4">
    //           <AsnHeader res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes}/>
    //       </div>
    //     <div className="flex flex-col max-w-screen-xl sticky top-0">
    //       <div className="mt-4 md:mt-8 lg:mt-12 overflow-y-auto ml-12 mr-2 md:ml-20 lg:ml-32 2xl:mx-0 p-4 border-black over">
    //         <table className="min-w-full bg-white border-t border-b border-gray-300">
    //           <thead>
    //             <tr>
    //               <th className="border-b border-gray-300 px-4 py-2 text-center">Country</th>
    //               <th className="border-b border-gray-300 px-4 py-2 text-center">IX</th>
    //               <th className="border-b border-gray-300 px-4 py-2 text-center">Name</th>
    //               <th className="border-b border-gray-300 px-4 py-2 text-center">IPv4</th>
    //               <th className="border-b border-gray-300 px-4 py-2 text-center">IPv6</th>
    //               <th className="border-b border-gray-300 px-4 py-2 text-center">Port Speed</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {data?.map((item: any, index: number) => (
    //               <tr key={index}>
    //                 <td className="border-b border-gray-300 px-4 py-2"><img src={`https://bgpview.io/assets/flags/shiny/24/${item.country}.png`} alt="Flag" className="inline-block" />
    //                 </td>
    //                 <td className="border-b border-gray-300 px-4 py-2 " style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/ix/${item.ix_id}`}>{item.ix}</Link></td>
    //                 <td className="border-b border-gray-300 px-4 py-2" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/ix/${item.ix_id}`}>{item.name}</Link></td>
    //                 <td className="border-b border-gray-300 px-4 py-2" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/ip/${item.ipv4_address}`}>{item.ipv4_address}</Link></td>
    //                 <td className="border-b border-gray-300 px-4 py-2" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/ip/${item.ipv6_address}`}>{item.ipv6_address}</Link></td>
    //                 <td className="border-b text-gray-400  px-4 py-2" style={{ whiteSpace: 'nowrap' }}>{(item.speed / 1000)} Gbps</td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //             {!data?.length?(<div className="border-b border-gray-300 px-4 py-2">No Data Available.</div>):(<></>)}
    //       </div>
    //     </div>
    //   </div>
    //   <Footer />
    // </div>
    
    <div className="flex flex-col min-h-screen ">
      <div className="md:flex flex-row min-h-screen bg-white text-gray-800 overflow-hidden">
          <div className="fixed md:static top-0 left-0 z-10 md:z-1 h-full md:h-auto">
              <ASNSideNavbar activeOption="IX" sidebarOpen={false} slug={asn_number} />
          </div>

          <main className="flex flex-col md:ml-0 transition-all duration-150 ease-in flex-grow">
          <   div className="fixed top-0 left-0 right-0 z-20 bg-white shadow">
                  <Navbar />
              </div>

              <div className="mt-4 md:pt-24 md:mt-8 lg:mt-12 mx-4 md:pl-8 overflow-y-auto flex-grow pt-24 md:mx-0 pl-12 overflow-auto">
                  {/* Adjusted the mx value for smaller screens */}
                  <div className="w-full p-4 border border-gray-150">
                    <div className="w-full border border-gray-150 bg-white mb-4 p-4">
                        <AsnHeader res_asn={res_asn} res_peers={res_asn_peers} res_prefixes={res_asn_prefixes}/>
                    </div>

                  <div className="overflow-y-auto bg-white border-1 border-gray-150">
                    <div className="w-full border border-gray-150 bg-white mb-4 p-4">
                    <div>
                    <table className="min-w-full border-t border-b bg-white">
                      <thead>
                        <tr>
                          <th className="border-b border-gray-300 px-4 py-2 text-center">Country</th>
                          <th className="border-b border-gray-300 px-4 py-2 text-center">IX</th>
                          <th className="border-b border-gray-300 px-4 py-2 text-center">Name</th>
                          <th className="border-b border-gray-300 px-4 py-2 text-center">IPv4</th>
                          <th className="border-b border-gray-300 px-4 py-2 text-center">IPv6</th>
                          <th className="border-b border-gray-300 px-4 py-2 text-center">Port Speed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="border-b border-gray-300 px-4 py-2"><img src={`https://bgpview.io/assets/flags/shiny/24/${item.country}.png`} alt="Flag" className="inline-block" />
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2 " style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/ix/${item.ix_id}`}>{item.ix}</Link></td>
                    <td className="border-b border-gray-300 px-4 py-2" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/ix/${item.ix_id}`}>{item.name}</Link></td>
                    <td className="border-b border-gray-300 px-4 py-2" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/ip/${item.ipv4_address}`}>{item.ipv4_address}</Link></td>
                    <td className="border-b border-gray-300 px-4 py-2" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/ip/${item.ipv6_address}`}>{item.ipv6_address}</Link></td>
                    <td className="border-b text-gray-400  px-4 py-2" style={{ whiteSpace: 'nowrap' }}>{(item.speed / 1000)} Gbps</td>
                  </tr>
                ))}
              </tbody>
            </table>
                {!data?.length?(<div className="border-b border-gray-300 px-4 py-2">No Data Available.</div>):(<></>)}
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
