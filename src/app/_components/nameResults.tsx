'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoMdCheckmarkCircle, IoMdRemoveCircle } from 'react-icons/io';



interface BGPSearchDataProps {
    bgpSearcdata: Record<string, any>;

}




// res_asn && <pre>{JSON.stringify(res_asn, null, 2)}</pre>

export default function NameResults({
    bgpSearcdata
}: BGPSearchDataProps) {

    const [selectedOption, setSelectedOption] = useState<'ASN' | 'IPv4 Prefixes' | 'IPv6 Prefixes' | 'Internet Exchanges'>('ASN');

    // Use useEffect to set the initial selectedOption based on available data
    useEffect(() => {
        bgpSearcdata.data = bgpSearcdata.data || {};
        if (bgpSearcdata.data.asns.length > 0) {
            setSelectedOption('ASN');
        } else if (bgpSearcdata.data.ipv4_prefixes.length > 0) {
            setSelectedOption('IPv4 Prefixes');
        } else if (bgpSearcdata.data.ipv6_prefixes.length > 0) {
            setSelectedOption('IPv6 Prefixes');
        } else if (bgpSearcdata.data.internet_exchanges.length > 0) {
            setSelectedOption('Internet Exchanges');
        }
    }, [bgpSearcdata]);

    const ASNData = bgpSearcdata.data.asns.map((item: any) => ({
        asn: item.asn,
        name: item.name,
        description: item.description,
        country_code: item.country_code,
        rir_name: item.rir_name,
    }));



    const ASN: React.FC = () => {



        return (
            <div>
                <table className="min-w-full bg-white border-t border-b border-gray-300">
                    <thead>
                        <tr>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                Country
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                ASN
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                Name
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                Description
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                RIR
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {ASNData.map((item: any, index: any) => (
                            <tr key={index}>
                                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">
                                    <Link href={`/reports/countries/${item.country_code}`}>
                                        <img src={`https://bgpview.io/assets/flags/shiny/24/${item.country_code}.png`} alt="Flag" className="inline-block" />
                                    </Link>
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2 " style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/AS${item.asn}`}>{item.asn}</Link></td>
                                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.name}</td>
                                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.description}</td>
                                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.rir_name}</td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>

        );

    };

    const IPv4PrefixesData = ((bgpSearcdata.data || {}).ipv4_prefixes || []).map((item: any) => ({
        prefix: item.prefix,
        name: item.name,
        description: item.description,
        country_code: item.country_code,
        parent_prefix: item.parent_prefix,
        rir_name: item.rir_name,
    }));

    const IPv4Prefixes: React.FC = () => {





        return (
            <div>
                <table className="min-w-full bg-white border-t border-b border-gray-300">
                    <thead>
                        <tr>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                Country
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                Prefix
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                Name
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                Description
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                Parent Prefix
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                RIR
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {IPv4PrefixesData.map((item: any, index: any) => (
                            <tr key={index}>
                                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">
                                    <Link href={`/reports/countries/${item.country_code}`}>
                                        <img src={`https://bgpview.io/assets/flags/shiny/24/${item.country_code}.png`} alt="Flag" className="inline-block" />
                                    </Link>
                                </td> 
                                <td className="border-b border-gray-300 px-4 py-2 " style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link  href={`prefix/${item.prefix}`} as={`/prefix/${item.prefix}`}>{item.prefix}</Link></td>
                                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.name}</td>
                                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.description}</td>
                                <td className="border-b border-gray-300 px-4 py-2 " style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`prefix/${item.parent_prefix}`} as={`/prefix/${item.parent_prefix}`}>{item.parent_prefix}</Link></td>
                                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.rir_name}</td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>

        );

    };

    const IPv6PrefixesData = bgpSearcdata.data.ipv6_prefixes.map((item: any) => ({
        prefix: item.prefix,
        name: item.name,
        description: item.description,
        country_code: item.country_code,
        parent_prefix: item.parent_prefix,
        rir_name: item.rir_name,
    }));

    const IPv6Prefixes: React.FC = () => {







        return (
            <div>
                <table className="min-w-full bg-white border-t border-b border-gray-300">
                    <thead>
                        <tr>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                Country
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                Prefix
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                Name
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                Description
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                Parent Prefix
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                RIR
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {IPv6PrefixesData.map((item: any, index: any) => (
                            <tr key={index}>
                                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">
                                    <Link href={`/reports/countries/${item.country_code}`}>
                                        <img src={`https://bgpview.io/assets/flags/shiny/24/${item.country_code}.png`} alt="Flag" className="inline-block" />
                                    </Link>
                                </td><td className="border-b border-gray-300 px-4 py-2 " style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`prefix/${item.prefix}`} as={`/prefix/${item.prefix}`}>{item.prefix}</Link></td>
                                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.name}</td>
                                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.description}</td>
                                <td className="border-b border-gray-300 px-4 py-2 " style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`prefix/${item.parent_prefix}`} as={`/prefix/${item.parent_prefix}`}>{item.parent_prefix}</Link></td>
                                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.rir_name}</td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>

        );

    };

    const InternetExchangesData = bgpSearcdata.data.internet_exchanges.map((item: any) => ({
        ix_id: item.ix_id,
        name: item.name,
        name_full: item.name_full,
        city: item.city,
        country_code: item.country_code,
        ipv4_address: item.ipv4_address,
        ipv6_address: item.ipv6_address,
    }));




    const InternetExchanges: React.FC = () => {








        return (
            <div>
                <table className="min-w-full bg-white border-t border-b border-gray-300">
                    <thead>
                        <tr>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                Country
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                IX
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                Full Name
                            </th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center" >
                                CIty
                            </th>

                        </tr>
                    </thead>
                    <tbody>

                        {InternetExchangesData.map((item: any, index: any) => (
                            <tr key={index}>
                                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">
                                    <Link href={`/reports/countries/${item.country_code}`}>
                                        <img src={`https://bgpview.io/assets/flags/shiny/24/${item.country_code}.png`} alt="Flag" className="inline-block" />
                                    </Link>
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2 " style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/ix/${item.ix_id}`}>{item.name}</Link></td>
                                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.name_full}</td>
                                <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{item.city}</td>
                            </tr>
                        ))}



                    </tbody>
                </table>
            </div>

        );

    };









    return (
        <div className="flex flex-row w-full">



            {/* Information Box */}
            <div className=" p-4 border border-gray-150">

                <div className="header-row pt-12 pb-4">
                    <h1 className="text-gray-600 text-4xl">Search Results for your specified search</h1>
                    {/* <div className="text-l text-gray-400 font-bold p-1 inline-block"> Explore the most complete BGP map. Discover a full list of IP allocations by countries, including allocated ASNs, IPv4, IPV6, and prefixes.
          </div> */}

                </div>
                {/* Add content for the information box */}
                <div className="col-sm-10 box">
                    <div className="flex mb-4">

                        {ASNData.length > 0 ? (
                            <div
                                className={`cursor-pointer p-4 text-bold ${selectedOption === 'ASN' ? 'border-b-0 border' : ''}`}
                                style={{ color: selectedOption === 'ASN' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                                onClick={() => setSelectedOption('ASN')}
                            >
                                ASN
                            </div>
                        ) : null}

                        {IPv4PrefixesData.length > 0 ? (
                            <div
                                className={`cursor-pointer p-4 text-bold ${selectedOption === 'IPv4 Prefixes' ? 'border-b-0 border' : ''}`}
                                style={{ color: selectedOption === 'IPv4 Prefixes' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                                onClick={() => setSelectedOption('IPv4 Prefixes')}
                            >
                                IPv4 Prefixes
                            </div>
                        ) : null}
                        {IPv6PrefixesData.length > 0 ? (
                            <div
                                className={`cursor-pointer p-4 text-bold ${selectedOption === 'IPv6 Prefixes' ? 'border-b-0 border' : ''}`}
                                style={{ color: selectedOption === 'IPv6 Prefixes' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                                onClick={() => setSelectedOption('IPv6 Prefixes')}
                            >
                                IPv6 Prefixes
                            </div>
                        ) : null}
                        {InternetExchangesData.length > 0 ? (
                            <div
                                className={`cursor-pointer p-4 text-bold ${selectedOption === 'Internet Exchanges' ? 'border-b-0 border' : ''}`}
                                style={{ color: selectedOption === 'Internet Exchanges' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                                onClick={() => setSelectedOption('Internet Exchanges')}
                            >
                                Internet Exchanges
                            </div>
                        ) : null}




                    </div>

                    {selectedOption === 'ASN' && <ASN />}
                    {selectedOption === 'IPv4 Prefixes' && <IPv4Prefixes />}
                    {selectedOption === 'IPv6 Prefixes' && <IPv6Prefixes />}
                    {selectedOption === 'Internet Exchanges' && <InternetExchanges />}

                </div>
            </div>
        </div>
    );
}
