'use client'

import External_link from '../../../public/download (1).png'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import Datepicker from "react-tailwindcss-datepicker";
import Link from 'next/link';
import { IoMdCheckmarkCircle, IoMdRemoveCircle } from 'react-icons/io';
import AsnHeader from './asnHeaderInfo';
import ASNTables from './asnTable';


interface PrefixesDetailsInfoProps {
  res_downstreams: Record<string, any>;
  asn_number: string;
  res_prefixes: Record<string, any>;
  res_asn: Record<string, any>;
  res_peers: Record<string, any>;
}


export default function DownstreamsDetailsInfo({ res_downstreams, asn_number, res_prefixes, res_asn, res_peers }: PrefixesDetailsInfoProps) {


  const ipv4Downstreams = res_downstreams?.data?.ipv4_downstreams?.length || 0;
  const ipv6Downstreams = res_downstreams?.data?.ipv6_downstreams?.length || 0;

  const [selectedOptionDownstreams, setSelectedOptionDownstreams] = useState<'IPv4' | 'IPv6'>('IPv4');


  const iPv6data = res_downstreams?.data?.ipv6_downstreams?.map((item: any) => ({
    country: item.country_code,
    asn: item.asn,
    name: item.name,
    description: item.description,
    ipv4: res_downstreams?.data?.ipv4_downstreams?.some((ipv4Item: any) => ipv4Item.asn === item.asn),
  }));

  const iPv4data = res_downstreams?.data?.ipv4_downstreams?.map((item: any) => ({
    country: item.country_code,
    asn: item.asn,
    name: item.name,
    description: item.description,
    ipv6: res_downstreams?.data?.ipv6_downstreams?.some((ipv6Item: any) => ipv6Item.asn === item.asn),
  }));

  const [value, setValue] = useState({
    startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days before
    endDate: new Date(),
  });

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  }


  // useEffect(() => {
  //   const chartDom = document.getElementById('peers');
  //   const myChart = echarts.init(chartDom);

  //   const option = {
  //     tooltip: {
  //       trigger: 'item',
  //     },
  //     legend: {
  //       top: '5%',
  //       left: 'center',
  //     },
  //     series: [
  //       {
  //         name: 'Downstream Data of',
  //         type: 'pie',
  //         radius: ['40%', '70%'],
  //         avoidLabelOverlap: false,
  //         itemStyle: {
  //           borderRadius: 10,
  //           borderColor: '#fff',
  //           borderWidth: 2,
  //         },
  //         label: {
  //           show: false,
  //           position: 'center',
  //         },
  //         emphasis: {
  //           label: {
  //             show: true,
  //             fontSize: 40,
  //             fontWeight: 'bold',
  //           },
  //         },
  //         labelLine: {
  //           show: false,
  //         },
  //         data: [
  //           { value: ipv4Downstreams, name: 'IPv4' },
  //           { value: ipv6Downstreams, name: 'IPv6' },
  //         ],
  //       },
  //     ],
  //   };

  //   option && myChart.setOption(option);

  //   // Cleanup function
  //   return () => {
  //     myChart.dispose();
  //   };
  // }, []); // Run only once on mount



  const Ipv4DownstreamsTable: React.FC = () => {

    const ipv6Data = res_downstreams?.data?.ipv6_downstreams;
    const data = res_downstreams?.data?.ipv4_downstreams.map((item: any) => ({
      country: item.country_code,
      asn: item.asn,
      name: item.name,
      description: item.description,
      ipv6Asn: ipv6Data.some((ipv6Item: any) => ipv6Item.asn === item.asn),
    }));
    // const PaginationArrow = ({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) => (
    //   <div
    //     className="cursor-pointer p-2 rounded-full  text-white text-2xl"
    //     onClick={onClick}
    //   >
    //     {direction === 'prev' ? (<div className="flex items-center px-4 py-2 text-gray-500 bg-gray-300 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19V5m5 5l-5-5-5 5" />
    //     </svg></div>) : (<div className="flex items-center px-4 py-2 text-gray-500 bg-gray-300 rounded-md">
    //       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m-5-5l5 5 5-5" />
    //       </svg></div>)}
    //   </div>
    // );



    // const itemsPerPage = 15;
    // const [currentPage, setCurrentPage] = useState(1);



    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const paginatedData = data?.slice(startIndex, endIndex);

    // const totalPages = Math.ceil(data?.length / itemsPerPage);

    // const handlePrevPage = () => {
    //   if (currentPage > 1) {
    //     setCurrentPage(currentPage - 1);
    //   }
    // };

    // const handleNextPage = () => {
    //   if (currentPage < totalPages) {
    //     setCurrentPage(currentPage + 1);
    //   }
    // };


    return (
      <div>
        <table className="min-w-full bg-white border-t border-b border-gray-300">
          <thead>
            <tr>
              <th className="border-b border-gray-300 px-4 py-2 text-center">Country</th>
              <th className="border-b border-gray-300 px-4 py-2 text-center">ASN</th>
              <th className="border-b border-gray-300 px-4 py-2 text-center">Name</th>
              <th className="border-b border-gray-300 px-4 py-2 text-center">Description</th>
              <th className="border-b border-gray-300 px-4 py-2 text-center">IPv6</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: any, index: number) => (
              <tr key={index}>
                <td className="border-b border-gray-300 px-4 py-2 text-center"><img src={`https://bgpview.io/assets/flags/shiny/24/${item.country}.png`} alt="Flag" className="inline-block" />
                </td>

                <td className="border-b border-gray-300 px-4 py-2 text-center" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`${item.asn}`}>AS{item.asn}</Link></td>


                <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold text-center">{item.name}</td>


                <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold" style={{ wordBreak: 'break-word'}} >{item.description}</td>

                <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold">
                  {item.ipv6Asn ? (
                    <span role="img" aria-label="check-mark">
                      ✔️
                    </span>
                  ) : (
                    <span role="img" aria-label="cross-mark">
                      ❌
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <PaginationArrow direction="prev" onClick={handlePrevPage} />

            <PaginationArrow direction="next" onClick={handleNextPage} />
          </div>
        )} */}
      </div>
    );

  };


  const Ipv6DownstreamsTable: React.FC = () => {
    const ipv4Data = res_downstreams.data.ipv4_downstreams;

    const data = res_downstreams.data.ipv6_downstreams.map((item: any) => ({
      country: item.country_code,
      asn: item.asn,
      name: item.name,
      description: item.description,
      ipv4Asn: ipv4Data.some((ipv4Item: any) => ipv4Item.asn === item.asn),
    }));

    const PaginationArrow = ({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) => (
      <div
        className="cursor-pointer p-2 rounded-full  text-white text-2xl"
        onClick={onClick}
      >
        {direction === 'prev' ? (<div className="flex items-center px-4 py-2 text-gray-500 bg-gray-300 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
        </div>) : (<div className="flex items-center px-4 py-2 text-gray-500 bg-gray-300 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg></div>)}
      </div>
    );



    const itemsPerPage = 15;
    const [currentPage, setCurrentPage] = useState(1);



    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };


    return (
      <div>
        <table className="min-w-full bg-white border-t border-b border-gray-300">
          <thead>
            <tr>
              <th className="border-b border-gray-300 px-4 py-2 text-center">Country</th>
              <th className="border-b border-gray-300 px-4 py-2 text-center">ASN</th>
              <th className="border-b border-gray-300 px-4 py-2 text-center">Name</th>
              <th className="border-b border-gray-300 px-4 py-2 text-center">Description</th>
              <th className="border-b border-gray-300 px-4 py-2 text-center">IPv4</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: number) => (
              <tr key={index}>
                <td className="border-b border-gray-300 px-4 py-2 text-center"><img src={`https://bgpview.io/assets/flags/shiny/24/${item.country}.png`} alt="Flag" className="inline-block" />
                </td>

                <td className="border-b border-gray-300 px-4 py-2 text-center" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`${item.asn}`}>AS{item.asn}</Link></td>


                <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold text-center">{item.name}</td>


                <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold" style={{ wordBreak: 'break-word'}} >{item.description}</td>

                <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold">
                  {item.ipv4Asn ? (
                    <span role="img" aria-label="check-mark">
                      ✔️
                    </span>
                  ) : (
                    <span role="img" aria-label="cross-mark">
                      ❌
                    </span>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <PaginationArrow direction="prev" onClick={handlePrevPage} />

            <PaginationArrow direction="next" onClick={handleNextPage} />
          </div>
        )} */}
      </div>
    );

  };


  return (
    <div>

      {/* <div className="absolute right-0 z-50 w-2/12 p-8 pt-12">
                <label className="block text-sm font-medium text-gray-700">
                    Select a date
                </label>
                <Datepicker
                    primaryColor={"blue"}
                    value={value}
                    onChange={handleValueChange}
                    showShortcuts={true}
                />
            </div> */}
          {/* Third Row */}
          <div className="w-full md:overflow-hidden overflow-scroll">
            {/* Content for the third row (full width) */}
              <div className="col-sm-10 box">
                <div className="flex mb-4">
                  <div
                    className={`cursor-pointer p-2 ${selectedOptionDownstreams === 'IPv4' ? 'border-b-0 border' : ''}`}
                    style={{ color: selectedOptionDownstreams === 'IPv4' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                    onClick={() => setSelectedOptionDownstreams('IPv4')}
                  >
                    IPv4 Downstreams
                  </div>
                  <div
                    className={`cursor-pointer p-2 ${selectedOptionDownstreams === 'IPv6' ? 'border-b-0 border' : ''}`}
                    style={{ color: selectedOptionDownstreams === 'IPv6' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                    onClick={() => setSelectedOptionDownstreams('IPv6')}
                  > 
                  
                    IPv6 Downstreams
                    
                  </div>
                  
                </div>
                {selectedOptionDownstreams === 'IPv4' && (
                  <ASNTables data={iPv4data} ipvType="IPv4" />
                )}
                
                {selectedOptionDownstreams === 'IPv6' && (
                  <ASNTables data={iPv6data} ipvType="IPv6" />
                )}                
                {/* {selectedOptionDownstreams === 'IPv4' && <Ipv4DownstreamsTable />}
                {selectedOptionDownstreams === 'IPv6' && <Ipv6DownstreamsTable />} */}
              </div>
            </div>
          </div>
  )
}