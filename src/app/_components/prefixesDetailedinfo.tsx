'use client'

import External_link from '../../../public/download (1).png'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import Datepicker from "react-tailwindcss-datepicker";
import Link from 'next/link';
import { IoMdCheckmarkCircle, IoMdRemoveCircle } from 'react-icons/io';


interface PrefixesDetailsInfoProps {
  res_prefixes: Record<string, any>;
  asn_number: string;
}


export default function PeersDetailsInfo({ res_prefixes, asn_number }: PrefixesDetailsInfoProps) {

  res_prefixes.data = res_prefixes.data || {};
  // Ensure that the response structure is as expected
  const ipv4Prefixes = res_prefixes.data.ipv4_prefixes?.length || 0;
  const ipv6Prefixes = res_prefixes.data.ipv6_prefixes?.length || 0;
  const totalPrefixes = ipv4Prefixes + ipv6Prefixes;

  const [selectedOptionPrefixes, setSelectedOptionPrefixes] = useState<'IPv4' | 'IPv6'>('IPv4');



  const [value, setValue] = useState({
    startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days before
    endDate: new Date(),
  });

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  }


  useEffect(() => {
    const chartDom = document.getElementById('peers');
    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: 'Prefixes Count',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: ipv4Prefixes, name: 'IPv4' },
            { value: ipv6Prefixes, name: 'IPv6' },
          ],
        },
      ],
    };

    option && myChart.setOption(option);

    // Cleanup function
    return () => {
      myChart.dispose();
    };
  }, []); // Run only once on mount



  const Ipv4PrefixsTable: React.FC = () => {
    res_prefixes.data = res_prefixes.data || {};
    const data = res_prefixes?.data?.ipv4_prefixes?.map((item: any) => ({
      country: item.country_code,
      announcedPrefix: item.prefix,
      description: item.description,
      validROA: item.roa_status,
      parentPrefix: item.parent.prefix,
      RIR: item.parent.rir_name,
    }));



    const PaginationArrow = ({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) => (
      <div
        className="cursor-pointer p-2 rounded-full  text-white text-2xl"
        onClick={onClick}
      >
        {direction === 'prev' ? (<div className="flex items-center px-4 py-2 text-gray-500 bg-gray-300 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19V5m5 5l-5-5-5 5" />
        </svg></div>) : (<div className="flex items-center px-4 py-2 text-gray-500 bg-gray-300 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m-5-5l5 5 5-5" />
          </svg></div>)}
      </div>
    );



    const itemsPerPage = 15;
    const [currentPage, setCurrentPage] = useState(1);



    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data?.slice(startIndex, endIndex);

    const totalPages = Math.ceil(data?.length / itemsPerPage);

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
              <th className="border-b border-gray-300 px-4 py-2 text-center">Announced Prefix</th>
              <th className="border-b border-gray-300 px-4 py-2 text-center">Description</th>
              <th className="border-b border-gray-300 px-4 py-2 text-center">Valid ROA</th>
              <th className="border-b border-gray-300 px-4 py-2 text-center">Parent Prefix</th>
              <th className="border-b border-gray-300 px-4 py-2 text-center">RIR</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((item: any, index: number) => (
              <tr key={index}>
                <td className="border-b border-gray-300 px-4 py-2 text-center"><img src={`https://bgpview.io/assets/flags/shiny/24/${item.country}.png`} alt="Flag" className="inline-block" />
                </td>

                <td className="border-b border-gray-300 px-4 py-2 text-center" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/prefix/${item.announcedPrefix}`}>{item.announcedPrefix}</Link></td>


                <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold">{item.description}</td>
                <td className="border-b border-gray-300 px-4 py-2 text-center">
                  {item.validROA === 'Valid' ? (
                    <IoMdCheckmarkCircle size={20} color="green" /> // Customize size and color for Valid
                  ) : (
                    <IoMdRemoveCircle size={20} color="red" /> // Customize size and color for Invalid
                  )}
                </td>

                <td className="border-b border-gray-300 px-4 py-2 text-center" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/prefix/${item.parentPrefix}`}>{item.parentPrefix}</Link></td>

                <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold">{item.RIR}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <PaginationArrow direction="prev" onClick={handlePrevPage} />

            <PaginationArrow direction="next" onClick={handleNextPage} />
          </div>
        )}
      </div>
    );

  };

  const Ipv6PrefixsTable: React.FC = () => {
    const data = res_prefixes.data.ipv6_prefixes.map((item: any) => ({
      country: item.country_code,
      announcedPrefix: item.prefix,
      description: item.description,
      validROA: item.roa_status,
      parentPrefix: item.parent.prefix,
      RIR: item.parent.rir_name,
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
              <th className="border-b border-gray-300 px-4 py-2 text-center">Announced Prefix</th>
              <th className="border-b border-gray-300 px-4 py-2 text-center">Description</th>
              <th className="border-b border-gray-300 px-4 py-2 text-center">Valid ROA</th>
              <th className="border-b border-gray-300 px-4 py-2 text-center">Parent Prefix</th>
              <th className="border-b border-gray-300 px-4 py-2 text-center">RIR</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item: any, index: number) => (
              <tr key={index}>
                <td className="border-b border-gray-300 px-4 py-2 text-center"><img src={`https://bgpview.io/assets/flags/shiny/24/${item.country}.png`} alt="Flag" className="inline-block" />
                </td>

                <td className="border-b border-gray-300 px-4 py-2 text-center" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/prefix/${item.announcedPrefix}`}>{item.announcedPrefix}</Link></td>


                <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold">{item.description}</td>
                <td className="border-b border-gray-300 px-4 py-2 text-center">{item.validROA}</td>

                <td className="border-b border-gray-300 px-4 py-2 text-center" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/prefix/${item.parentPrefix}`}>{item.parentPrefix}</Link></td>

                <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold">{item.RIR}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <PaginationArrow direction="prev" onClick={handlePrevPage} />

            <PaginationArrow direction="next" onClick={handleNextPage} />
          </div>
        )}
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
      <div className="w-full p-4 border border-gray-150">


        {/* Add content for the information box */}
        <div className="flex flex-wrap">

          {/* First Row */}
          <div className="w-full md:w-1/4 p-4 ">
            {/* Content for the first column (1/4 width) */}
            <div className="md:flex md:flex-wrap">
              <div className="w-full p-4 bg-white border border-gray-150 mb-4">
                {/* Content for the first sub-row within the second column */}
                <div className={`w-full p-4 bg-white  mb-4 pb-1 `}

                >
                  <a href={`/prefixes/${asn_number}`} rel="noopener noreferrer">
                    {/* Content for the first sub-row within the second column */}
                    <div className="flex items-center m-2">
                      <b className="mr-2 hover:text-blue-500 underline">{asn_number} PREFIXES</b>
                      <Image src={External_link} alt="Logo" width={20} height={20} />
                    </div>
                  </a>
                </div>





                <div className="flex flex-wrap">
                  <div id="peers" className="w-56 h-56"></div>
                  <div>
                    <div className="mb-4">
                      <h2 className="text-l text-gray-400 font-bold p-1 inline-block">IPV4 PREFIXES:</h2>
                      <b>{ipv4Prefixes}</b>
                    </div>

                    <div>
                      <h2 className="text-l text-gray-400 font-bold p-1 inline-block">IPV6 PREFIXES:</h2>
                      <b>{ipv6Prefixes}</b>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="w-full md:w-3/4 p-4 border border-gray-150">
            {/* Content for the second column (3/4 width) */}
            <p>Second Column Content</p>
          </div>



          {/* Third Row */}
          <div className="w-full p-4 max-w-screen-lg mx-auto overflow-x-auto" style={{ maxWidth: '1930px' }}>
            {/* Content for the third row (full width) */}
            <div className="col-sm-10 box">
              <div className="flex mb-4">
                <div
                  className={`cursor-pointer p-2 ${selectedOptionPrefixes === 'IPv4' ? 'border-b-0 border' : ''}`}
                  style={{ color: selectedOptionPrefixes === 'IPv4' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                  onClick={() => setSelectedOptionPrefixes('IPv4')}
                >
                  IPv4 Prefixes
                </div>
                <div
                  className={`cursor-pointer p-2 ${selectedOptionPrefixes === 'IPv6' ? 'border-b-0 border' : ''}`}
                  style={{ color: selectedOptionPrefixes === 'IPv6' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                  onClick={() => setSelectedOptionPrefixes('IPv6')}
                >
                  IPv6 Prefixes
                </div>

              </div>

              {selectedOptionPrefixes === 'IPv4' && <Ipv4PrefixsTable />}
              {selectedOptionPrefixes === 'IPv6' && <Ipv6PrefixsTable />}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}