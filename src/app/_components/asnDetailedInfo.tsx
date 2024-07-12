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
import External_link from '../../../public/download (1).png';
import ASNHeader from './asnHeaderInfo';





interface AsnDetailedInfoProps {
  res_asn: Record<string, any>;
  res_peers: Record<string, any>;
  res_prefixes: Record<string, any>;
  res_upstreams: Record<string, any>;
  res_downstreams: Record<string, any>;
  res_ix: Record<string, any>;
}


// res_asn && <pre>{JSON.stringify(res_asn, null, 2)}</pre>

export default function AsnDetailedInfo({
  res_asn,
  res_peers,
  res_prefixes,
  res_upstreams,
  res_downstreams,
  res_ix,
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

  // Ensure that the response structure is as expected
  //res_peers.data = res_peers.data || {};
  const ipv4Count = res_peers?.data?.ipv4_peers?.length || 0;
  const ipv6Count = res_peers?.data?.ipv6_peers?.length || 0;

  const totalPeersCount = ipv4Count + ipv6Count;

  //res_prefixes.data = res_prefixes.data || {};
  // Ensure that the response structure is as expected
  const ipv4Prefixes = res_prefixes?.data?.ipv4_prefixes?.length || 0;
  const ipv6Prefixes = res_prefixes?.data?.ipv6_prefixes?.length || 0;
  const totalPrefixes = ipv4Prefixes + ipv6Prefixes;

  //res_upstreams.data = res_upstreams.data || {};
  const ipv4Upstreams = res_upstreams?.data?.ipv4_upstreams?.length || 0;
  const ipv6Upstreams = res_upstreams?.data?.ipv6_upstreams?.length || 0;

  //res_downstreams.data = res_downstreams.data || {};
  const ipv4Downstreams = res_downstreams?.data?.ipv4_downstreams?.length || 0;
  const ipv6Downstreams = res_downstreams?.data?.ipv6_downstreams?.length || 0;

  const totalIX = res_ix.data?.length || 0;

  const ASNSummary = () => {
    return (
      <div>
        <div className="header-row pt-2 pb-4">
          <h1 className="font-bold text-2xl">AS{res_asn?.data?.asn} Summary</h1>
        </div>

        {/* Two Columns */}
        <div className="md:flex">
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

  const ASNNetwork = () => {
    return (
    <div>
      <div className="header-row pt-2 pb-4">
        <h1 className="font-bold text-2xl">AS{res_asn?.data?.asn} Network</h1>
      </div>
      <div className="md:flex">
        <div className="flex-1">
          <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IPV4 PREFIXES:</h2><b>{ipv4Prefixes}</b></div>
          <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IPV4 PEERS:</h2><b>{ipv4Count}</b></div>
          <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IPV4 UPSTREAMS:</h2><b>{ipv4Upstreams}</b></div>
          <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IPV4 DOWNSTREAMS:</h2><b>{ipv4Downstreams}</b></div>
        </div>
        <div className="flex-1">
          <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IPV6 PREFIXES:</h2><b>{ipv6Prefixes}</b></div>
          <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IPV6 PEERS:</h2><b>{ipv6Count}</b></div>
          <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IPV6 UPSTREAMS:</h2><b>{ipv6Upstreams}</b></div>
          <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IPV6 DOWNSTREAMS:</h2><b>{ipv6Downstreams}</b></div>
        </div>
      </div>
      <hr />
    </div>
    )
  }

  const ASNContacts = () => {
    return (
      <div>
        <div className="header-row pt-2 pb-4">
          <h1 className="font-bold text-2xl">Contacts</h1>
        </div>
        <div className="md:flex">
            <div className="flex-1">
              <div>
                <h2 className="text-l text-gray-400 font-bold p-1 block">EMAIL CONTACTS:</h2>
                {res_asn?.data?.email_contacts?.map((email: any) => (
                  <b className="block" key={`${email}`}>
                    {email}
                  </b>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div>
                <h2 className="text-l text-gray-400 font-bold p-1 block">ABUSE CONTACTS:</h2>
                {res_asn?.data?.abuse_contacts?.map((abuse: any) => (
                  <b className="block" key={`${abuse}`}>
                    {abuse}
                  </b>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div>
                <h2 className="text-l text-gray-400 font-bold p-1 block">ADDRESS:</h2>
                {res_asn?.data?.owner_address?.map((address: any) => (
                  <b className="block" key={`${address}`}>
                    {address}
                  </b>
                ))}
              </div>
            </div>
        </div>
        <hr />
      </div>
    );
  }

  return (
    <div className="bg-white-150">


      {/* Information Box */}
      <div className="md:p-4 border border-white-150">
        {/* Add content for the information box */}
        <div className="flex flex-wrap">
          {/* First Row */}
          <div className="w-full border border-white-150 bg-white mb-4 p-4">
            {/* Content for the first column (3/4 width) */}
            <ASNHeader 
              res_asn={res_asn}
              res_peers={res_peers}
              res_prefixes={res_prefixes}
            />
          </div>
          <div className="w-full border border-white-150 bg-white mb-4 p-4">
            <div>
                {/* Content for the second column (3/4 width) */}
                <ASNSummary />
              </div>
              <div>
                <ASNNetwork/>
              </div>
              <div>
                <ASNContacts />
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
