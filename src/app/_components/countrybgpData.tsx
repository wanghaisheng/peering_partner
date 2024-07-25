'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoMdCheckmarkCircle, IoMdRemoveCircle } from 'react-icons/io';
import CountrySelector from '../_components/countrySelection/selector';
import { SelectMenuOption } from '../_components/countrySelection/types';
import { COUNTRIES } from '../_components/countrySelection/countries';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'


interface CountryGPDataProps {
  countrybgpdata: Record<string, any>;
  countrycode: string;

}


// res_asn && <pre>{JSON.stringify(res_asn, null, 2)}</pre>

export default function CountryBGPData({
  countrybgpdata, countrycode
}: CountryGPDataProps) {



  const Bgpdata: React.FC = () => {



    const data = countrybgpdata.data.map((item: any = {}) => ({
      asn: item.asn,
      description: item.description,
      ipv4_prefixes: item.ipv4_prefixes,
      ipv6_prefixes: item.ipv6_prefixes,
      ipv4_peers: item.ipv4_peers,
      ipv6_peers: item.ipv6_peers,
      date_allocated: item.date_allocated,
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

    const sortedData = [...data].sort((a, b) => {
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


    return (
      <div>
        <table className="min-w-full bg-white border-t border-b border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                ASN
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                IPv4 Prefixes
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                IPv6 Prefixes
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                IPv4 Peers
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                IPv6 Peers
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                Date Allocated
              </th>

            </tr>
          </thead>
          <tbody className="bg-white">
            {sortedData.map((item: any = {}) => (
              <tr key={item.asn}>
                <td >
                  <div className="flex items-center">
                    <div>
                      <div className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/AS${item.asn}`}>AS{item.asn}</Link></div>

                    </div>
                  </div>
                </td>
                <td >
                  <div className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.description}</div>
                </td>
                <td >
                  <div className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.ipv4_prefixes}</div>
                </td>
                <td >
                  <div className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.ipv6_prefixes}</div>
                </td>
                <td >
                  <div className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.ipv4_peers}</div>
                </td>
                <td >
                  <div className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.ipv6_peers}</div>
                </td>
                <td >
                  <div className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.date_allocated}</div>
                </td>
              </tr>
            ))}
          </tbody>







        </table>
      </div>


    );

  };


  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState<string>(countrycode);

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




  return (
    <div className="flex flex-row w-full">



      {/* Information Box */}
      <div className=" p-4 border border-gray-150 w-full">

        <div className="header-row pt-12 pb-4">
          <h1 className="text-gray-600 text-4xl">
            <img src={`https://bgpview.io/assets/flags/shiny/32/${countrycode}.png`} alt="Flag" className="inline-block" /> {countrycode} ASN Summary & IP addresses

          </h1>
          <h2 className="text-gray-600 text-2xl">Full list of {countrycode} IP ranges</h2>
          <div className="text-l text-gray-400 font-bold p-1 inline-block"> This {countrycode} IP list includes all {countrycode} ASNs assigned, and the complete list of {countrycode} IP addresses list by IP range
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


          <Bgpdata />
        </div>
      </div>
    </div>
  );
}
