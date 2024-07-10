import Navbar from "../_components/navbar";
import Footer from "../_components/footer";
import ASNSideNavbar from "../_components/asnSideNavbar";

import AsnDetailedInfo from "../_components/asnDetailedInfo";
import AsnHeaderInfo from "../_components/asnHeaderInfo";
import { getASNData, getPeersData, getPrefixData, getUpstreamData, getDownstreamData, getIXData, getWhoIsData } from '../api/bgp/bgpApi';
import { useEffect } from "react";
import { getbgpSearchData } from "../api/bgpSeach/bgpSearchApi";





export default async function Page({ params }: { params: { slug: string } }) {

  const asn = params.slug;

  // Fetch data using the functions from the api folder
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const res_asn = await getASNData(asn);
  await delay(250); // Delay for 1000 milliseconds (1 second)
  const res_asn_peers = await getPeersData(asn);
  await delay(250);
  const res_asn_prefixes = await getPrefixData(asn);
  await delay(250);
  const res_asn_upstreams = await getUpstreamData(asn);
  await delay(250);
  const res_asn_downstreams = await getDownstreamData(asn);
  await delay(250);
  const res_asn_ix = await getIXData(asn);
  await delay(400);
  const res_asn_whois = await getWhoIsData(asn);
  await delay(400);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <div className="fixed md:static top-0 left-0 z-10 md:z-1 h-full md:h-auto">
          <ASNSideNavbar   activeOption="ASN Stats" sidebarOpen={false} slug={asn} />
        </div>

        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <div className="fixed top-0 left-0 right-0 z-20 bg-white shadow">
            <Navbar />
          </div>

          <div className="mt-4 pt-24 md:mt-8 lg:mt-12 md:mx-0 pl-8 overflow-y-auto flex-grow">
            <hr/>
            <AsnDetailedInfo
              res_asn={res_asn}
              res_peers={res_asn_peers}
              res_prefixes={res_asn_prefixes}
              res_upstreams={res_asn_upstreams}
              res_downstreams={res_asn_downstreams}
              res_ix={res_asn_ix}
              asn_number={asn}
              res_whois={res_asn_whois}
            />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}
