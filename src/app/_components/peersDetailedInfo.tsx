'use client'

import External_link from '../../../public/download (1).png'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import Datepicker from "react-tailwindcss-datepicker";
import Link from 'next/link';
import AsnHeader from './asnHeaderInfo';
import ASNTables from './asnTable';
interface PeersDetailsInfoProps {
    res_peers: Record<string, any>;
    asn_number: string; // This type assumes that the JSON data can be of any shape
    res_prefixes: Record<string, any>;
    res_asn: Record<string, any>;
}


export default function PeersDetailsInfo({ res_asn, res_peers, asn_number, res_prefixes }: PeersDetailsInfoProps) {

    res_peers.data = res_peers.data || {};
    const ipv4Count = res_peers.data.ipv4_peers?.length || 0;
    const ipv6Count = res_peers.data.ipv6_peers?.length || 0;
    const [selectedOptionPeers, setSelectedOptionPeers] = useState<'IPv4' | 'IPv6'>('IPv4');

    const iPv6data = res_peers?.data?.ipv6_peers?.map((item: any) => ({
        country: item.country_code,
        asn: item.asn,
        name: item.name,
        description: item.description,
        ipv4: res_peers?.data?.ipv4_peers?.some((ipv4Item: any) => ipv4Item.asn === item.asn),
    }));

    const iPv4data = res_peers?.data?.ipv4_peers?.map((item: any) => ({
        country: item.country_code,
        asn: item.asn,
        name: item.name,
        description: item.description,
        ipv6: res_peers?.data?.ipv6_peers?.some((ipv6Item: any) => ipv6Item.asn === item.asn),
    }));

    const totalPeersCount = ipv4Count + ipv6Count;

    const [value, setValue] = useState({
        startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days before
        endDate: new Date(),
    });

    const handleValueChange = (newValue: any) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }

    const Ipv4PeersTable: React.FC = () => {
        res_peers.data = res_peers.data || {};
        const ipv6Data = res_peers.data.ipv6_peers;



        const data = res_peers.data.ipv4_peers.map((item: any) => ({
            country: item.country_code,
            asn: item.asn,
            name: item.name,
            description: item.description,
            ipv6Asn: ipv6Data.some((ipv6Item: any) => ipv6Item.asn === item.asn),
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
                            <th className="border-b border-gray-300 px-4 py-2 text-center">IPv6</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.reverse().map((item: any, index: number) => (
                            <tr key={index}>
                                <td className="border-b border-gray-300 px-4 py-2 text-center">
                                    <img src={`https://bgpview.io/assets/flags/shiny/24/${item.country}.png`} alt="Flag" className="inline-block" />
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2 text-center" style={{ color: 'rgba(37, 169, 189, 0.97)' }}>
                                    <Link href={`${item.asn}`}>AS{item.asn}</Link>
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold text-center">{item.name}</td>
                                <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold" style={{ wordBreak: 'break-word' }} >{item.description}</td>
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

    const Ipv6PeersTable: React.FC = () => {
        res_peers.data = res_peers.data || {};
        const ipv4Data = res_peers.data.ipv4_peers;

        const data = res_peers.data.ipv6_peers.map((item: any) => ({
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
                        {data.reverse().map((item: any, index: number) => (
                            <tr key={index}>
                                <td className="border-b border-gray-300 px-4 py-2 text-center"><img src={`https://bgpview.io/assets/flags/shiny/24/${item.country}.png`} alt="Flag" className="inline-block" />
                                </td>

                                <td className="border-b border-gray-300 px-4 py-2 text-center" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`${item.asn}`}>AS{item.asn}</Link></td>


                                <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold text-center">{item.name}</td>


                                <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold" style={{ wordBreak: 'break-word' }} >{item.description}</td>

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
            <div className="">


                {/* Add content for the information box */}
                {/* First Row */}
                {/*  */}



                {/* Third Row */}
                <div className="lg:w-full overflow-scroll md:overflow-hidden">
                    {/* Content for the third row (full width) */}
                    <div className="col-sm-10 box">
                        <div className="flex mb-4">
                            <div
                                className={`cursor-pointer p-2 ${selectedOptionPeers === 'IPv4' ? 'border-b-0 border' : ''}`}
                                style={{ color: selectedOptionPeers === 'IPv4' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                                onClick={() => setSelectedOptionPeers('IPv4')}
                            >
                                IPv4 Peers
                            </div>
                            <div
                                className={`cursor-pointer p-2 ${selectedOptionPeers === 'IPv6' ? 'border-b-0 border' : ''}`}
                                style={{ color: selectedOptionPeers === 'IPv6' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                                onClick={() => setSelectedOptionPeers('IPv6')}
                            >
                                IPv6 Peers
                            </div>

                        </div>
                        {selectedOptionPeers === 'IPv4' && (
                            <ASNTables data={iPv4data} ipvType="IPv4" />
                        )}

                        {selectedOptionPeers === 'IPv6' && (
                            <ASNTables data={iPv6data} ipvType="IPv6" />
                        )}
                        {/* {selectedOptionPeers === 'IPv4' && <Ipv4PeersTable />}
                        {selectedOptionPeers === 'IPv6' && <Ipv6PeersTable />} */}
                    </div>
                </div>
            </div>
        </div>
    )
}