import Link from "next/link";


interface IXDetailsProps {
    res_ix: Record<string, any>; // This type assumes that the JSON data can be of any shape

}


export default function UniqueIX({ res_ix }: IXDetailsProps) {


    // Ensure that the response structure is as expected



    return (
        <div className="container">
            <div className=" pb-4">
                {/* Main Header */}
                <div className="flex">

                    <div className="w-1/8 pt-4 ">

                        <div className="flag-icon">
                            <img className="pull-left title-flag" width="78" height="78" src={`https://bgpview.io/assets/flags/shiny/64/${res_ix?.data?.country_code}.png`} title="<?php echo $country_name; ?>" />

                        </div>
                    </div>

                    <div className="w-2/3 p-4">
                        <div className="text-4xl ">
                            <p>{res_ix?.data?.name} </p>
                        </div>
                        <div className="text-xl font-bold">
                            <p className="text-gray-300">{res_ix?.data?.name_full}</p>
                        </div>

                    </div>




                    <div className="w-1/6 p-4 ml-auto">
                        <a href={res_ix?.data?.website} target="_blank">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded" style={{ backgroundColor: '#2c94b3' }}>
                                Company Website
                            </button>
                        </a>


                    </div>

                </div>

                <hr></hr>
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/4 p-2">
                        <strong>Tech Email:</strong> {res_ix?.data?.tech_email}
                    </div>
                    <div className="w-full sm:w-1/4 p-2">
                        <strong>Tech Phone:</strong> {res_ix?.data?.tech_phone}
                    </div>
                    <div className="w-full sm:w-1/4 p-2">
                        <strong>Policy Email:</strong> {res_ix?.data?.policy_email ? res_ix?.data?.policy_email : "Unknown"}
                    </div>
                    <div className="w-full sm:w-1/4 p-2">
                        <strong>Policy Phone:</strong> {res_ix?.data?.policy_phone ? res_ix?.data?.policy_phone : "Unknown"}
                    </div>


                </div>
                <hr></hr>
            </div>


            <div className="border border-gray-300 rounded-lg p-2">
                {/* Header Row */}

                <div className="header-row pt-12 pb-4">
                    <h1 className="text-gray-700 text-2xl">{res_ix?.data?.name} Summary</h1>
                </div>

                {/* Two Columns */}
                <div className="flex">
                    {/* First Column */}
                    <div className="flex-1 pb-4">
                        <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">NAME:</h2><b>{res_ix?.data?.name}</b></div>
                        <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">FULL NAME:</h2><b>{res_ix?.data?.name_full}</b></div>
                        <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IX WEBSITE:</h2><b>{res_ix?.data?.website}</b></div>
                        <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IX STATISTICS:</h2><b>{res_ix?.data?.url_stats}</b></div>

                        <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">CITY:</h2><b>{res_ix?.data?.city}</b></div>
                        <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">MEMBERS:</h2><b>{res_ix?.data?.members_count}</b></div>


                        {/* Content for Column 1 */}
                    </div>

                    <div className="flex-1">
                        <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">TECH EMAIL:</h2><b>{res_ix?.data?.tech_email}</b></div>
                        <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">TECH PHONE:</h2><b>{res_ix?.data?.tech_phone}</b></div>

                        {/* Content for Column 1 */}
                    </div>

                </div>

                <hr />


                <div className="header-row pt-2 pb-4">
                    <h1 className="font-bold text-2xl">{res_ix?.data?.name} Members</h1>
                </div>

                {/* Two Columns */}
                <div className="flex">
                    {/* First Column */}

                    <table className="min-w-full bg-white border-t border-b border-gray-300">
                        <thead>
                            <tr>
                                <th className="border-b border-gray-300 px-4 py-2 text-center">Country</th>
                                <th className="border-b border-gray-300 px-4 py-2 text-center">ASN</th>
                                <th className="border-b border-gray-300 px-4 py-2 text-center">Name</th>
                                <th className="border-b border-gray-300 px-4 py-2 text-center">IPv4</th>
                                <th className="border-b border-gray-300 px-4 py-2 text-center">IPv6</th>
                                <th className="border-b border-gray-300 px-4 py-2 text-center">Port Speed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {res_ix?.data?.members?.map((item: any, index: number) => (
                                <tr key={index}>
                                    <td className="border-b border-gray-300 px-4 py-2 flex items-center justify-center"><img src={`https://bgpview.io/assets/flags/shiny/24/${item.country_code}.png`} alt="Flag" className="inline-block" />
                                    </td>

                                    <td className="border-b border-gray-300 px-4 py-2 text-center " style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/AS${item.asn}`}>AS{item.asn}</Link></td>


                                    <td className="border-b border-gray-300 px-4 py-2 text-center" >{item.name}</td>

                                    <td className="border-b border-gray-300 px-4 py-2 text-center" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/ip/${item.ipv4_address}`}>{item.ipv4_address}</Link></td>


                                    <td className="border-b border-gray-300 px-4 py-2 text-center" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/ip/${item.ipv6_address}`}>{item.ipv6_address}</Link></td>

                                    <td className="border-b text-gray-400  px-4 py-2 text-center" style={{ whiteSpace: 'nowrap' }}>{(item.speed / 1000)} Gbps</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>



            </div>

        </div>



    );
}