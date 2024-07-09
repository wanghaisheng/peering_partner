
import Navbar from "../../_components/navbar";
import SideNavbar from "../../_components/sideNavbar";
import Footer from "../../_components/footer";
import NameResults from "../../_components/nameResults";
import ASNSideNavbar from "@/app/_components/asnSideNavbar";
import { getIXData } from "@/app/api/bgp/bgpApi";
import Link from "next/link";
export default async function Page({ params }: { params: { slug: string } }) {

  const asn = params.slug;
  const res_asn_ix = await getIXData(asn);
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
    <div>
      <div style={{ position: "fixed", top: 0, left: 0, zIndex: 1, height: "100vh" }}>
        <ASNSideNavbar slug={asn} sidebarOpen={false} activeOption="IX" />
      </div>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2, background: "#fff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-start min-h-screen bg-white text-black pt-6 " style={{ marginTop: "120px" }}>
        {/* Three-Part Layout */}
        <div className="flex flex-col  max-w-screen-xl sticky top-0">
          <div className="mt-4 md:mt-8 lg:mt-12 overflow-y-auto mx-20 md:mx-0">
            <table className="min-w-full bg-white border-t border-b border-gray-300">
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
      <Footer />
    </div>
  );
}
