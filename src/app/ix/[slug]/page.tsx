import Navbar from "../../_components/navbar";
import Footer from "../../_components/footer";
import { getUniqueIXData } from "../../api/ix/ixapi";
import UniqueIX from "@/app/_components/uniqueIX";
import ASNSideNavbar from "@/app/_components/asnSideNavbar";



export default async function Page({ params }: { params: { slug: string } }) {

  const ix = params.slug;

  const res_ix = await getUniqueIXData(ix);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="md:flex flex-row min-h-screen bg-white text-gray-800 overflow-hidden">
        {/* <div className={`fixed top-5 left-0 z-10 md:z-1 h-full md:h-auto`}>
          <ASNSideNavbar activeOption="IX" sidebarOpen={false} slug={ix} />
        </div> */}
        <main className="flex flex-col md:ml-0 transition-all duration-150 ease-in flex-grow overflow-x-hidden">
          <div className="fixed top-0 left-0 right-0 z-20 bg-white shadow">
            <Navbar />
          </div>
          <div className="mt-4 md:pt-24 md:mt-8 lg:mt-12 flex-grow pt-24 md:mx-0 pl-12 pr-2 md:px-24">
            <div className="p-2 md:p-4 border border-white-150">
              {/* Add content for the information box */}

              <div className="md:flex md:flex-wrap">
                <div className="w-full bg-white mb-4">
                  <UniqueIX res_ix={res_ix} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
