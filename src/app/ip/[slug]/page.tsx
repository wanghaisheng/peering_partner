import Navbar from "../../_components/navbar";
import Footer from "../../_components/footer";
import { getUniqueIPData } from "../../api/ip/ipapi";
import UniqueIP from "@/app/_components/uniqueIP";




export default async function Page({ params }: { params: { slug: string } }) {

  const ip = params.slug;

  const res_ip = await getUniqueIPData(ip);

  return (
    <div className="bg-white min-h-screen">
      <main className="flex flex-col flex-grow text-black  ">
        <div className="fixed top-0 left-0 right-0 z-20 bg-white shadow">
          <Navbar />
        </div>
        <div className="mt-4 md:pt-24 md:mt-8 lg:mt-12 flex-grow pt-24 md:mx-0 pl-12 pr-2 md:px-24  ">
          <div className="md:flex md:flex-wrap">
            <div className="w-full bg-white mb-4 border border-gray-150 p-4">
              <UniqueIP res_ip={res_ip} />
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </main>
    </div>
  );
}
