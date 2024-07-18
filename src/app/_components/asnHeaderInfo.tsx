'use client'
import React, { useState } from 'react';


interface AsnHeaderInfoProps {
  res_asn: Record<string, any>; // This type assumes that the JSON data can be of any shape
  res_peers: Record<string, any>;
  res_prefixes: Record<string, any>;
}


export default function AsnHeaderInfo({ res_asn, res_peers, res_prefixes }: AsnHeaderInfoProps) {
  
  const ipv4Count = res_peers.data?.ipv4_peers?.length || 0;
  const ipv6Count = res_peers.data?.ipv6_peers?.length || 0;

  const totalPeersCount = ipv4Count + ipv6Count;
  const ipv4Prefixes = res_prefixes.data?.ipv4_prefixes?.length || 0;
  const ipv6Prefixes = res_prefixes.data?.ipv6_prefixes?.length || 0;
  const totalPrefixes = ipv4Prefixes + ipv6Prefixes;

  return (
    <div>
      {/* Main Header */}
      <div className="md:flex">

        <div className="w-1/8 pt-4 ">
          
          <div className="flag-icon">
            <img className="pull-left title-flag" width="78" height="78" src={`https://bgpview.io/assets/flags/shiny/64/${res_asn?.data?.country_code}.png`} title="<?php echo $country_name; ?>" />
            
          </div>  
        </div>

        <div className="md:w-2/3 md:p-4">
          <div className="text-4xl ">
            <p>AS{res_asn?.data?.asn} {res_asn?.data?.description_short}</p>
          </div>
          <div className="text-xl font-bold">
            <p className="text-gray-300">{res_asn?.data?.name}</p>
          </div>

        </div>
        <div className="lg:block hidden my-auto">
          <a className="text-white font-bold py-4 px-3 rounded inline-block" style={{background: "#30acbc"}} href="https://www.cloudflare.com" target="_blank" rel="nofollow noopener noreferrer">Company Website</a>
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