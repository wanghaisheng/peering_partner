'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoMdCheckmarkCircle, IoMdRemoveCircle } from 'react-icons/io';
import CountrySelector from './countrySelection/selector';
import { SelectMenuOption } from './countrySelection/types';
import { COUNTRIES } from './countrySelection/countries';
import React from 'react';
import Datepicker from "react-tailwindcss-datepicker";
import * as echarts from 'echarts';
import External_link from '../../../public/download (1).png'

interface AsnDetailedInfoProps {
  res_asn: Record<string, any>;
  res_peers: Record<string, any>;
  res_prefixes: Record<string, any>;
  res_upstreams: Record<string, any>;
  res_downstreams: Record<string, any>;
  res_ix: Record<string, any>;
  asn_number: string;
  res_whois: Record<string, any>;
}


// res_asn && <pre>{JSON.stringify(res_asn, null, 2)}</pre>

export default function AsnDetailedInfo({
  res_asn,
  res_peers,
  res_prefixes,
  res_upstreams,
  res_downstreams,
  res_ix,
  asn_number,
  res_whois,
}: AsnDetailedInfoProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>("ASN");
  const [selectedOptionPrefixes, setSelectedOptionPrefixes] = useState<'IPv4' | 'IPv6'>('IPv4');
  const [selectedOptionPeers, setSelectedOptionPeers] = useState<'IPv4 Peers' | 'IPv6 Peers'>('IPv4 Peers');
  const [selectedOptionUpstreams, setSelectedOptionUpstreams] = useState<'IPv4 Upstreams' | 'IPv6 Upstreams'>('IPv4 Upstreams');
  const [selectedOptionDownstreams, setSelectedOptionDownstreams] = useState<'IPv4 Downstreams' | 'IPv6 Downstreams'>('IPv4 Downstreams');
  
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState<SelectMenuOption["value"]>("");
  const [value, setValue] = useState({
    startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days before
    endDate: new Date(),
  });

  console.log(asn_number);
  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  };

  const handleChangeCountry = (newCountry: any) => {
    setCountry(newCountry);
  };
  // Ensure that the response structure is as expected


  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  // Ensure that the response structure is as expected
  res_peers.data = res_peers.data || {};
  const ipv4Count = res_peers.data.ipv4_peers?.length || 0;
  const ipv6Count = res_peers.data.ipv6_peers?.length || 0;
  const totalPeersCount = ipv4Count + ipv6Count;
  //console.log(res_whois);

  res_prefixes.data = res_prefixes.data || {};
  // Ensure that the response structure is as expected
  const ipv4Prefixes = res_prefixes.data.ipv4_prefixes?.length || 0;
  const ipv6Prefixes = res_prefixes.data.ipv6_prefixes?.length || 0;
  const totalPrefixes = ipv4Prefixes + ipv6Prefixes;

  res_upstreams.data = res_upstreams.data || {};
  const ipv4Upstreams = res_upstreams?.data?.ipv4_upstreams?.length || 0;
  const ipv6Upstreams = res_upstreams?.data?.ipv6_upstreams?.length || 0;

  res_downstreams.data = res_downstreams.data || {};
  const ipv4Downstreams = res_downstreams?.data?.ipv4_downstreams?.length || 0;
  const ipv6Downstreams = res_downstreams?.data?.ipv6_downstreams?.length || 0;


  const totalIX = res_ix.data?.length || 0;


  const ASNHeader = () => {
    return (
      <div>
        {/* Main Header */}
        <div className="flex">

          <div className="w-1/8 pt-4 ">

            <div className="flag-icon">
              <img className="pull-left title-flag" width="78" height="78" src={`https://bgpview.io/assets/flags/shiny/64/${res_asn?.data?.country_code}.png`} title="<?php echo $country_name; ?>" />

            </div>
          </div>
          <div className="w-2/3 p-4">
            <div className="text-4xl ">
              <p>AS{res_asn?.data?.asn} {res_asn?.data?.description_short}</p>
            </div>
            <div className="text-xl font-bold">
              <p className="text-gray-300">{res_asn?.data?.name}</p>
            </div>

          </div>
        </div>
        <hr></hr>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/3 p-2">
            <strong>Number of Peers:</strong> {totalPeersCount}
          </div>
          <div className="w-full sm:w-1/3 p-2">
            <strong>Number of Prefixes:</strong> {totalPrefixes}
          </div>
          <div className="w-full sm:w-1/3 p-2">
            { /* Inserted logic from PHP code here */}
            {
              (() => {
                const asnDate = new Date(res_asn?.data?.rir_allocation?.date_allocated);
                const year = asnDate.getFullYear();
                const monthNum = asnDate.getMonth() + 1; // JavaScript months are 0-based

                let dateObj : any = null;
                let monthName = '';
                let day = 0;
                try{
                  dateObj = new Intl.DateTimeFormat('en', { month: 'long' }).formatToParts(asnDate);
                  monthName = (dateObj || []).find((part : any ) => part.type === 'month')?.value || 'UnknownMonth';
                  day = asnDate.getDate();
                }catch(err){
                  console.log("Invalid date obj" , asnDate );
                }

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
                    <strong>ASN Allocated:</strong>
                    {day}<sup>{suffix}</sup>{monthName} {year}
                  </>
                );
              })()
            }
          </div>

        </div>
      </div>)

  }

  const ASNSummary = () => {
    return (
      <div>
        <div className="header-row pt-2 pb-4">
          <h1 className="font-bold text-2xl">AS{res_asn?.data?.asn} Summary</h1>
        </div>

        {/* Two Columns */}
        <div className="flex">
          {/* First Column */}
          <div className="flex-1">
            <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">REGIONAL REGISTRY:</h2><b>{res_asn?.data?.rir_allocation.rir_name}</b></div>
            <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">ALLOCATION STATUS:</h2><b>{res_asn?.data?.rir_allocation.allocation_status}</b></div>
            <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">ALLOCATION DATE:</h2><b>{
              (() => {
                const asnDate = new Date(res_asn?.data?.rir_allocation?.date_allocated);
                const year = asnDate.getFullYear();
                const monthNum = asnDate.getMonth() + 1; // JavaScript months are 0-based
                let dateObj : any = {};
                let monthName = '';
                const day = asnDate.getDate();

                try{
                  dateObj = new Intl.DateTimeFormat('en', { month: 'long' }).formatToParts(asnDate);
                  monthName = dateObj.find((part:any) => part.type === 'month')?.value || 'UnknownMonth';
                }catch(error){
                  console.log("invalid date" , error )
                }


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
            }</b></div>
            <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">ALLOCATED COUNTRY:</h2>
              <b>
                <img src={`https://bgpview.io/assets/flags/shiny/24/${res_asn?.data?.country_code}.png`} alt="Flag" className="inline-block" />
              </b>
            </div>
            {/* Content for Column 1 */}
          </div>

          {/* Second Column */}
          <div className="flex-1">
            {res_asn?.data?.traffic_estimation && (
              <div>
                <h2 className="text-l text-gray-400 font-bold p-1 inline-block">TRAFFIC ESTIMATION:</h2>
                <b>{res_asn?.data?.traffic_estimation}</b>
              </div>
            )}
            {res_asn?.data?.traffic_ratio && (
              <div>
                <h2 className="text-l text-gray-400 font-bold p-1 inline-block">TRAFFIC RATIO:</h2>
                <b>{res_asn?.data?.traffic_ratio}</b>
              </div>
            )}
            {totalIX !== 0 && (
              <div>
                <h2 className="text-l text-gray-400 font-bold p-1 inline-block">INTERNET EXCHANGES:</h2>
                <b>{totalIX}</b>
              </div>
            )}

            {res_asn?.data?.website && (
              <div>
                <h2 className="text-l text-gray-400 font-bold p-1 inline-block">WEBSITE:</h2>
                <b>{res_asn?.data?.website}</b>
              </div>
            )}
            {res_asn?.data?.looking_glass && (
              <div>
                <h2 className="text-l text-gray-400 font-bold p-1 inline-block">LOOKING GLASS:</h2>
                <b>{res_asn?.data?.looking_glass}</b>
              </div>
            )}
            {/* Content for Column 2 */}
          </div>
        </div>
        <hr />
      </div>


    )
  }

  const renderContent = () => {
    switch (selectedOption) {
      case "ASN":
        return (
          <div className="container">
            {/* Header Row */}


            {/* Header Row */}
            <div className="header-row pt-2 pb-4">
              <h1 className="font-bold text-2xl">AS{res_asn.data.asn} Network</h1>
            </div>

            {/* Two Columns */}
            <div className="flex">
              {/* First Column */}
              <div className="flex-1">

                <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block inline-block">IPV4 PREFIXES:</h2><b></b> <b>{ipv4Prefixes}</b></div>
                <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IPV4 PEERS:</h2><b>{ipv4Count}</b></div>
                <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IPV4 UPSTREAMS:</h2><b>{ipv4Upstreams}</b></div>
                {/* Content for Column 1 */}
              </div>

              {/* Second Column */}
              <div className="flex-1">

                <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IPV6 PREFIXES:</h2><b>{ipv6Prefixes}</b></div>
                <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IPV6 PEERS:</h2><b>{ipv6Count}</b></div>
                <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IPV6 UPSTREAMS:</h2><b>{ipv6Upstreams}</b></div>
                {/* Content for Column 2 */}
              </div>
            </div>
            <hr />

            {/* Header Row */}
            <div className="header-row pt-2 pb-4">
              <h1 className="font-bold text-2xl">Contacts</h1>
            </div>

            {/* Three Columns */}
            <div className="flex">
              {/* First Column */}
              <div className="flex-1">
                <h2 className="text-l text-gray-400 font-bold p-1">EMAIL CONTACTS:</h2><b>
                  {res_asn.data.email_contacts.map((contact: string) => (
                    <div key={contact}>{contact}</div>
                  ))}
                </b>
                {/* Content for Column 1 */}
              </div>

              {/* Second Column */}
              <div className="flex-1">
                <h2 className="text-l text-gray-400 font-bold p-1">ABUSE CONTACTS:</h2><b>
                  {res_asn.data.abuse_contacts.map((contact: string) => (
                    <div key={contact}>{contact}</div>
                  ))}
                </b>
                {/* Content for Column 2 */}
              </div>

              {/* Third Column */}
              <div className="flex-1">
                <h2 className="text-l text-gray-400 font-bold p-1">ADDRESS:</h2><b>
                  {res_asn.data.owner_address.map((contact: string) => (
                    <div key={contact}>{contact}</div>
                  ))}
                </b>
                {/* Content for Column 3 */}
              </div>
            </div>
            <hr />
          </div>


        );
      case "prefixes":
        return (

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


          </div>
        );
      case "Peers":
        return (

          <div className="col-sm-10 box">
            <div className="flex mb-4">
              <div
                className={`cursor-pointer p-2 ${selectedOptionPeers === 'IPv4 Peers' ? 'border-b-0 border' : ''}`}
                style={{ color: selectedOptionPeers === 'IPv4 Peers' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                onClick={() => setSelectedOptionPeers('IPv4 Peers')}
              >
                IPv4 Peers
              </div>
              <div
                className={`cursor-pointer p-2 ${selectedOptionPeers === 'IPv6 Peers' ? 'border-b-0 border' : ''}`}
                style={{ color: selectedOptionPeers === 'IPv6 Peers' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                onClick={() => setSelectedOptionPeers('IPv6 Peers')}
              >
                IPv6 Peers
              </div>

            </div>


          </div>
        );;
      case "Upstreams":
        return (
          <div className="col-sm-10 box">
            <div className="flex mb-4">
              <div
                className={`cursor-pointer p-2 ${selectedOptionUpstreams === 'IPv4 Upstreams' ? 'border-b-0 border' : ''}`}
                style={{ color: selectedOptionUpstreams === 'IPv4 Upstreams' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                onClick={() => setSelectedOptionUpstreams('IPv4 Upstreams')}
              >
                IPv4 Upstreams
              </div>
              <div
                className={`cursor-pointer p-2 ${selectedOptionUpstreams === 'IPv6 Upstreams' ? 'border-b-0 border' : ''}`}
                style={{ color: selectedOptionUpstreams === 'IPv6 Upstreams' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                onClick={() => setSelectedOptionUpstreams('IPv6 Upstreams')}
              >
                IPv6 Upstreams
              </div>

            </div>

          </div>

        );
      case "Downstreams":
        return (
          <div className="col-sm-10 box">
            <div className="flex mb-4">
              <div
                className={`cursor-pointer p-2 ${selectedOptionDownstreams === 'IPv4 Downstreams' ? 'border-b-0 border' : ''}`}
                style={{ color: selectedOptionDownstreams === 'IPv4 Downstreams' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                onClick={() => setSelectedOptionDownstreams('IPv4 Downstreams')}
              >
                IPv4 Downstreams
              </div>
              <div
                className={`cursor-pointer p-2 ${selectedOptionDownstreams === 'IPv6 Downstreams' ? 'border-b-0 border' : ''}`}
                style={{ color: selectedOptionDownstreams === 'IPv6 Downstreams' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                onClick={() => setSelectedOptionDownstreams('IPv6 Downstreams')}
              >
                IPv6 Downstreams
              </div>

            </div>


          </div>

        );
      case "Graphs":
        return <div> <Graphs /> </div>;
      case "Raw Whois":
        return <RawWhoIs />;
      case "IX":
        return <IXS />;
      // Add cases for other options as needed
      default:
        return <p>Select an option from the list</p>;
    }
  };


  const Graphs: React.FC = () => {
    const [svgContent, setSvgContent] = useState<string | null>(null);

    useEffect(() => {
      const fetchSvg = async () => {
        try {
          const response = await fetch(`https://api.bgpview.io/assets/graphs/${asn_number}_Combined.svg`);
          const svgText = await response.text();

          // Update xlink:href attribute for every <a> tag
          const modifiedSvg = svgText.replace(/xlink:href="https:\/\/bgpview\.io\/asn\//g, 'xlink:href="/AS');

          setSvgContent(modifiedSvg);
        } catch (error) {
          console.error('Error fetching SVG:', error);
        }
      };

      fetchSvg();
    }, [asn_number]);

    return (
      <div className="col-sm-10 box" style={{ overflow: 'hidden' }}>


        {svgContent && (
          <div style={{ maxWidth: '100%', overflowX: 'auto' }} dangerouslySetInnerHTML={{ __html: svgContent }} />
        )}
      </div>
    );
  };

  const IXS: React.FC = () => {
    const data = res_ix?.data?.map((item: any) => ({
      country: item.country_code,
      ix: item.name,
      name: item.name_full,
      ix_id: item.ix_id,
      ipv4_address: item.ipv4_address,
      ipv6_address: item.ipv6_address,
      speed: item.speed,

    }));
    
    return (
      <table className="min-w-full bg-white border-t border-b border-gray-300">
        <thead>
          <tr>
            <th className="border-b border-gray-300 px-4 py-2 text-center">Country</th>
            <th className="border-b border-gray-300 px-4 py-2 text-center">IX</th>
            <th className="border-b border-gray-300 px-4 py-2 text-center">Name</th>
            <th className="border-b border-gray-300 px-4 py-2 text-center">IPv4</th>
            <th className="border-b border-gray-300 px-4 py-2 text-center">IPv6</th>
            <th className="border-b border-gray-300 px-4 py-2 text-center">Port Speed</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any, index: number) => (
            <tr key={index}>
              <td className="border-b border-gray-300 px-4 py-2"><img src={`https://bgpview.io/assets/flags/shiny/24/${item.country}.png`} alt="Flag" className="inline-block" />
              </td>

              <td className="border-b border-gray-300 px-4 py-2 " style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/ix/${item.ix_id}`}>{item.ix}</Link></td>


              <td className="border-b border-gray-300 px-4 py-2" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/ix/${item.ix_id}`}>{item.name}</Link></td>

              <td className="border-b border-gray-300 px-4 py-2" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/ip/${item.ipv4_address}`}>{item.ipv4_address}</Link></td>


              <td className="border-b border-gray-300 px-4 py-2" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><Link href={`/ip/${item.ipv6_address}`}>{item.ipv6_address}</Link></td>

              <td className="border-b text-gray-400  px-4 py-2" style={{ whiteSpace: 'nowrap' }}>{(item.speed / 1000)} Gbps</td>

            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const RawWhoIs: React.FC = () => {
    const data = res_whois;

    return (
      <div>
        <pre className="bg-gray-200 p-4 rounded-lg ">
          {/* Render data on the screen */}
          {data.map((entry: any, index: any) => (
            <div key={index} className="text-black-100">
              {/* Skip the first time when entry.type === 'comments' */}
              {entry.type === 'comments' && index === 0 ? null : (
                <>
                  {entry.type === 'object' && (
                    <div>
                      {/* Render object information */}
                      {entry.attributes.map((attribute: any, attributeIndex: number) => (
                        <div key={attributeIndex}>
                          {`${attribute.name}: ${attribute.values?.join(', ')}`}
                        </div>
                      ))}
                      <div>--------------------------</div>
                      <br />
                      <br />
                    </div>
                  )}
                  {entry.type === 'comments' && (
                    <div>
                      {/* Render comments */}
                      <div dangerouslySetInnerHTML={{ __html: entry.comments.join('<br />') }} />
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </pre>
      </div>
    );
  };
    return (
    <div className="bg-gray-150">


      {/* Information Box */}
      <div className="p-4 border border-gray-150">
        {/* Add content for the information box */}
        <div className="flex flex-wrap">

          {/* First Row */}
          <div className="w-full md:w-3/4 border border-gray-150 bg-white mb-4 p-4 p-2">
            {/* Content for the first column (1/4 width) */}
            {<ASNHeader />}
          </div>
          <div className="w-full md:w-3/4 p-4 border border-gray-150 bg-white mb-4 p-4">
            <div>
              {/* Content for the second column (3/4 width) */}
              {<ASNSummary />}
            </div>
          </div>
          {/* <div className="w-full md:w-3/4 p-4 border border-gray-150 bg-white mb-4 p-4">
            <div>
              { {<ASNNetwork />} }
            </div>
          </div> */}
          <div className="w-full md:w-3/4 p-4 border border-gray-150 bg-white mb-4 p-4">
            <div>
              {
                /* {<ASNContacts />} */
                renderContent()
              }
            </div>
          </div>

          

        </div>
      </div>
    </div>
  );
}
