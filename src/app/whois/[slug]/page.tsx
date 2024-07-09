import Navbar from "../../_components/navbar";
import SideNavbar from "../../_components/sideNavbar";
import Footer from "../../_components/footer";
import NameResults from "../../_components/nameResults";
import ASNSideNavbar from "@/app/_components/asnSideNavbar";
import { getWhoIsData } from "@/app/api/bgp/bgpApi";


export default async function Page({ params }: { params: { slug: string } }) {

  const asn = params.slug;

  const res_asn_whois = await getWhoIsData(asn);
  const data = res_asn_whois;




  return (
    <div>
      <div style={{ position: "fixed", top: 0, left: 0, zIndex: 1, height: "100vh" }}>
        <ASNSideNavbar slug={asn} sidebarOpen={true} activeOption="Raw Whois"  />
      </div>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2, background: "#fff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-start min-h-screen bg-white text-black pt-6 " style={{ marginTop: "120px" }}>
        {/* Three-Part Layout */}
        <div className="flex flex-col  max-w-screen-xl sticky top-0">
          <div className="mt-4 md:mt-8 lg:mt-12 overflow-y-auto mx-20 md:mx-0">
          <div>
        <pre className="bg-gray-200 p-4 rounded-lg ">
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
      <Footer />
    </div>
  );
}
