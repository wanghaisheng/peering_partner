import Link from "next/link";


interface IPDetailsProps {
  res_ip: Record<string, any>; // This type assumes that the JSON data can be of any shape

}


export default function UniqueIP({ res_ip }: IPDetailsProps) {


  // Ensure that the response structure is as expected



  return (
    <div className="w-full bg-white">
      <div className=" pb-4">
        {/* Main Header */}
        <div className="w-full border bg-white p-4">

          <div className="w-1/8 pt-4 ">

            {/* <div className="flag-icon">
                        <img className="pull-left title-flag" width="78" height="78" src={`https://bgpview.io/assets/flags/shiny/64/${res_ip.data.rir_allocation.country_code}.png`} title="?" />

                    </div> */}
          </div>

          <div className="w-2/3 p-4">
            <div className="text-4xl ">
              <p>{res_ip.data.ip} </p>
            </div>
            <div className="text-xl font-bold">
              <p className="text-gray-300">{res_ip.data.ptr_record}</p>
            </div>

          </div>






        </div>
      </div>


      <div className="border border-white-150 p-2">


        <div className="header-row pt-12 pb-4">
          <h1 className="text-gray-700 text-2xl">RIR Allocation Summary</h1>
        </div>


        <div className="flex">

          <div className="flex-1 pb-4">
            <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">PREFIX:</h2><b>{res_ip.data.ip}</b></div>
            <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IP ADDRESS:</h2><b>{res_ip.data.rir_allocation.ip}</b></div>
            {/* <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IX WEBSITE:</h2><b>{res_ip.data.website}</b></div>
                    <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IX STATISTICS:</h2><b>{res_ip.data.url_stats}</b></div>

                    <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">CITY:</h2><b>{res_ip.data.city}</b></div>
                    <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">MEMBERS:</h2><b>{res_ip.data.members_count}</b></div> */}



          </div>

          <div className="flex-1">
            <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">REGIONAL REGISTRY:</h2><b>{res_ip.data.rir_allocation.rir_name}</b></div>
            <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">ALLOCATION STATUS:</h2><b>{res_ip.data.rir_allocation.allocation_status}</b></div>
            <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">ALLOCATION DATE:</h2><b>

              {
                (() => {
                  const asnDate = new Date(res_ip.data.rir_allocation.date_allocated);
                  const year = asnDate.getFullYear();
                  const monthNum = asnDate.getMonth() + 1; // JavaScript months are 0-based
                  const dateObj = new Intl.DateTimeFormat('en', { month: 'long' }).formatToParts(asnDate);
                  const monthName = dateObj.find((part: any) => part.type === 'month')?.value || 'UnknownMonth';

                  const day = asnDate.getDate();

                  const lastDigit = day % 10;
                  let suffix;
                  if (day === 11 || day === 12 || day === 13) {
                    suffix = 'th';
                  } else if (lastDigit === 1) {
                    suffix = 'st';
                  } else if (lastDigit === 2) {
                    suffix = 'nd';
                  } else if (lastDigit === 3) {
                    suffix = 'rd';
                  } else {
                    suffix = 'th';
                  }

                  return (
                    <>
                      {day}<sup>{suffix}</sup>{monthName} {year}
                    </>
                  );
                })()
              }
            </b></div>


          </div>

        </div>








      </div>

    </div>



  );
}