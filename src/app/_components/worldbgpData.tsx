'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoMdCheckmarkCircle, IoMdRemoveCircle } from 'react-icons/io';
import CountrySelector from '../_components/countrySelection/selector';
import { SelectMenuOption } from '../_components/countrySelection/types';
import { COUNTRIES } from '../_components/countrySelection/countries';
import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'




interface WorldBGPDataProps {
  bgpdata: Record<string, any>;

}

interface BgpData {
  country_code: string;
  allocated_asn_count: number;
  allocated_ipv4_ip_count: number;
  allocated_ipv4_prefix_count: number;
  allocated_ipv6_prefix_count: number;
}




// res_asn && <pre>{JSON.stringify(res_asn, null, 2)}</pre>

export default function WorldBGPData({
  bgpdata
}: WorldBGPDataProps) {

  const [selectedOption, setSelectedOption] = useState<'Bgpdata' | 'Heatmap'>('Bgpdata');

  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState<SelectMenuOption["value"]>("");
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(), // Corrected to be of type Date
  });
  const router = useRouter();

  const handleChangeCountry = (newCountry: any) => {
    console.log("Selected Country:", newCountry);
    setCountry(newCountry);
    if(typeof window != 'undefined'){
      if(newCountry==""){
        window.location.href = `/asnstats`;
      }else{
        window.location.href = `/asnstats/countries/${newCountry}`;
      }
    }
  };




  const Bgpdata: React.FC = () => {

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

    const data =bgpdata&&bgpdata.data&&bgpdata.data.map((item: any) => ({
      country_code: item.country_code,
      allocated_asn_count: item.allocated_asn_count,
      allocated_ipv4_prefix_count: item.allocated_ipv4_prefix_count,
      allocated_ipv6_prefix_count: item.allocated_ipv6_prefix_count,
      allocated_ipv4_ip_count: item.allocated_ipv4_ip_count,
    }));



    const [sortColumn, setSortColumn] = useState('allocated_asn_count');
    const [sortOrder, setSortOrder] = useState('asc');

    const toggleSortOrder = () => {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleSort = (column: any) => {
      if (sortColumn === column) {
        toggleSortOrder();
      } else {
        setSortColumn(column);
        setSortOrder('asc');
      }
    };

    const getSortArrow = (column: any) => {
      if (sortColumn === column) {
        return sortOrder === 'asc' ? '🔼' : '🔽';
      }
      return null;
    };

    const sortedData :any=data&& [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    // Use useEffect to set the initial sorting order when the component mounts
    useEffect(() => {
      handleSort('allocated_asn_count');
    }, []);


    console.log('------------------',bgpdata)
    console.log('------------------')

    return (
      <div>
        <table className="min-w-full bg-white border-t border-b border-gray-300">
          <thead>
            <tr>
              <th className="border-b border-gray-300 px-4 py-2 text-center" onClick={() => handleSort('country_code')}>
                Country {getSortArrow('country_code')}
              </th>
              <th className="border-b border-gray-300 px-4 py-2 text-center" onClick={() => handleSort('allocated_asn_count')}>
                Allocated ASNs {getSortArrow('allocated_asn_count')}
              </th>
              <th className="border-b border-gray-300 px-4 py-2 text-center" onClick={() => handleSort('allocated_ipv4_prefix_count')}>
                Allocated IPv4 Prefixes {getSortArrow('allocated_ipv4_prefix_count')}
              </th>
              <th className="border-b border-gray-300 px-4 py-2 text-center" onClick={() => handleSort('allocated_ipv6_prefix_count')}>
                Allocated IPv6 Prefixes {getSortArrow('allocated_ipv6_prefix_count')}
              </th>
              <th className="border-b border-gray-300 px-4 py-2 text-center" onClick={() => handleSort('allocated_ipv4_ip_count')}>
                Allocated IPv4 Addresses {getSortArrow('allocated_ipv4_ip_count')}
              </th>
            </tr>
          </thead>
          <tbody>

            {sortedData&&sortedData.map((item:any, index:any) => (
              <tr key={index}>
                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">
                  <a href={`/asnstats/countries/${item.country_code}`}>
                    <img src={`https://bgpview.io/assets/flags/shiny/24/${item.country_code}.png`} alt="Flag" className="inline-block" />
                  </a>
                </td>
                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.allocated_asn_count?.toLocaleString()}</td>
                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.allocated_ipv4_prefix_count?.toLocaleString()}</td>
                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.allocated_ipv6_prefix_count?.toLocaleString()}</td>
                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.allocated_ipv4_ip_count?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    );

  };

  const Heatmap: React.FC = () => {
    useEffect(() => {
      // Load the Google Charts library
      const loadGoogleCharts = () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
          // After the library is loaded, initialize the charts
          google.charts.load('current', {
            packages: ['geochart'],
          });

          google.charts.setOnLoadCallback(() => {
            // Introduce delay before calling each drawRegionsMap function
            drawRegionsMap('regions_div1', [
              ['country_code', 'Allocated ASNs'],
              ...bgpdata.data.map(({ country_code, allocated_asn_count }: BgpData) => [
                country_code,
                allocated_asn_count,
              ]),
            ]);


            setTimeout(() => {
              drawRegionsMap('regions_div2', [
                ['country_code', 'Allocated IPv4 Addresses'],
                ...bgpdata.data.map(({ country_code, allocated_ipv4_ip_count }: BgpData) => [
                  country_code,
                  allocated_ipv4_ip_count,
                ]),
              ]);
            }, 200);

            setTimeout(() => {
              drawRegionsMap('regions_div3', [
                ['country_code', 'Allocated IPv4 Prefixes'],
                ...bgpdata.data.map(({ country_code, allocated_ipv4_prefix_count }: BgpData) => [
                  country_code,
                  allocated_ipv4_prefix_count,
                ]),
              ]);
            }, 200);

            setTimeout(() => {
              drawRegionsMap('regions_div4', [
                ['country_code', 'Allocated IPv6 Prefixes'],
                ...bgpdata.data.map(({ country_code, allocated_ipv6_prefix_count }: BgpData) => [
                  country_code,
                  allocated_ipv6_prefix_count,
                ]),
              ]);
            }, 200);
          });
        };
      };


      // Draw the GeoChart
      const drawRegionsMap = (elementId: string, chartData: any[]) => {
        const element = document.getElementById(elementId);

        if (element) {
          const data = google.visualization.arrayToDataTable(chartData);

          const options = {
            // Your options here
          };

          const chart = new google.visualization.GeoChart(element);
          google.visualization.events.addListener(chart, 'regionClick', function (eventData: any) {
            const country_code = eventData.region;

            // Perform the redirect based on the country_code
            redirectToExternalURL(country_code);
          });

          chart.draw(data, options);
        } else {
          console.error(`Element with ID ${elementId} not found.`);
        }
      };

      // Load the Google Charts library when the component mounts
      loadGoogleCharts();

      // Cleanup: Remove the script when the component unmounts
      return () => {
        const script = document.querySelector('script[src="https://www.gstatic.com/charts/loader.js"]');
        if (script) {
          script.remove();
        }
      };
    }, []);

    // Function to redirect to an external URL based on the clicked country code
    const redirectToExternalURL = (country_code: string) => {
      // Define your mapping of country codes to external URLs


      // Check if there is a mapping for the clicked country code

      // Perform the redirect
      if(typeof window != 'undefined'){
        window.location.href = `asnstats/countries/${country_code}`;
      }
    };

    return (
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 bg-zinc-100 rounded-md p-4">
        <div className="heatmap-section border border-gray-300 p-2 m-2 rounded-lg">
          <h2 className="text-gray-400 text-2xl"><b><i>ALLOCATED ASNS</i></b></h2>
          <div id="regions_div1"></div>
        </div>
        <div className="heatmap-section border border-gray-300 p-2 m-2 rounded-lg">
          <h2 className="text-gray-400 text-2xl"><b><i>ALLOCATED IPV4 ADDRESSES</i></b></h2>
          <div id="regions_div2"></div>
        </div>
        <div className="heatmap-section border border-gray-300 p-2 m-2 rounded-lg">
          <h2 className="text-gray-400 text-2xl"><b><i>ALLOCATED IPV4 PREFIXES</i></b></h2>
          <div id="regions_div3"></div>
        </div>
        <div className="heatmap-section border border-gray-300 p-2 m-2 rounded-lg">
          <h2 className="text-gray-400 text-2xl"><b><i>ALLOCATED IPV6 PREFIXES</i></b></h2>
          <div id="regions_div4"></div>
        </div>
      </div>

    );
  };






  return (
    <div className="flex flex-row w-full">



      {/* Information Box */}
      <div className=" p-4 border border-gray-150 w-full">


        <div className="header-row pt-12 pb-4">
          <h1 className="text-gray-600 text-4xl">World wide BGP map - Resources Countries Breakdown</h1>

          <div className="text-l text-gray-400 font-bold p-1 inline-block"> Explore the most complete BGP map. Discover a full list of IP allocations by countries, including allocated ASNs, IPv4, IPV6, and prefixes.
          </div>
          <div className={" md:w-96 w-full px-5 mt-5"}>
            <label className="block text-sm font-medium text-gray-700">
              Select a country
            </label>
            <CountrySelector
              id={"country-selector"}
              open={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
              onChange={handleChangeCountry}
              selectedValue={COUNTRIES.find((option) => option.value === country) || COUNTRIES[0]}
            />
          </div>
        </div>
        {/* Add content for the information box */}
        <div className="col-sm-10 box">
          <div className="flex mb-4">

            <div
              className={`cursor-pointer p-2 ${selectedOption === 'Bgpdata' ? 'border-b-0 border' : ''}`}
              style={{ color: selectedOption === 'Bgpdata' ? 'rgba(37, 169, 189, 0.97)' : '' }}
              onClick={() => setSelectedOption('Bgpdata')}
            >
              Table Breakdown
            </div>
            <div
              className={`cursor-pointer p-2 ${selectedOption === 'Heatmap' ? 'border-b-0 border' : ''}`}
              style={{ color: selectedOption === 'Heatmap' ? 'rgba(37, 169, 189, 0.97)' : '' }}
              onClick={() => setSelectedOption('Heatmap')}
            >
              Heatmap
            </div>
          </div>



          {selectedOption === 'Bgpdata' && <Bgpdata />}
          {selectedOption === 'Heatmap' && <Heatmap />}
        </div>
      </div>
    </div>
  );
}
