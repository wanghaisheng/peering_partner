import Navbar from "../../_components/navbar";
import Footer from "../../_components/footer";

async function getData(asn: string) {
  const res = await fetch(`https://api.bgpview.io/asn/${asn}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Page({ params }: { params: { slug: string } }) {
  const asn = params.slug;

  // Fetch data when the component is being rendered on the server side
  const data = await getData(asn);

  return (
    <div>

      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black ">


        {/* Three-Part Layout */}
        <div className="flex flex-col w-full max-w-screen-xl mt-4 pt-14">
          {/* Main Header */}
          <div className="flex">

            <div className="w-1/6 p-4">

              <div className="flag-icon">Flag</div>
            </div>


            <div className="w-2/3 p-4">
              <div className="mb-4 text-center">
                <h1 className="text-4xl font-bold">ASN Search</h1>
              </div>
              <div className="text-lg">
                <p>Some details about the search...</p>
              </div>
            </div>


            <div className="w-1/6 p-4 ml-auto">
              fdsa
            </div>
          </div>


          {/* Flex Row for Sidebar and Information Box */}
          <div className="flex flex-row w-full">
            {/* Side Navbar */}
            <div className="w-1/4 bg-gray-300 p-4">
              {/* Add content for the side navbar */}
              <p>Sidebar content goes here</p>
            </div>

            {/* Information Box */}
            <div className="w-3/4 p-4">
              {/* Add content for the information box */}
              {data && (
                <pre>
                  {JSON.stringify(data, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </div>


      </div>
      <Footer />
    </div>
  );
}
