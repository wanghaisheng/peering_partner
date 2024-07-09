'use client'

import CountrySelector from './countrySelection/selector';
import { SelectMenuOption } from './countrySelection/types';
import { COUNTRIES } from './countrySelection/countries';
import React, { useState } from 'react';
import Datepicker from "react-tailwindcss-datepicker";


interface AsnHeaderInfoProps {
  res_asn: Record<string, any>; // This type assumes that the JSON data can be of any shape
  res_peers: Record<string, any>;
  res_prefixes: Record<string, any>;
}


export default function AsnHeaderInfo({ res_asn, res_peers, res_prefixes }: AsnHeaderInfoProps) {



  return (
    <div>
      {/* Main Header */}
      {/* <div className="flex">

        <div className="w-1/8 pt-4 ">

          <div className="flag-icon">
            <img className="pull-left title-flag" width="78" height="78" src={`https://bgpview.io/assets/flags/shiny/64/${res_asn.data.country_code}.png`} title="<?php echo $country_name; ?>" />

          </div>
        </div>

        <div className="w-2/3 p-4">
          <div className="text-4xl ">
            <p>AS{res_asn.data.asn} {res_asn.data.description_short}</p>
          </div>
          <div className="text-xl font-bold">
            <p className="text-gray-300">{res_asn.data.name}</p>
          </div>

        </div>




        <div className="w-1/6 p-4 ml-auto">
        {/* <label className="block text-sm font-medium text-gray-700">
                        Select a date
                    </label>
                    <Datepicker
                        primaryColor={"blue"}
                        value={value}
                        onChange={handleValueChange}
                        showShortcuts={true}
                    /> 


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
         
          {
            (() => {
              const asnDate = new Date(res_asn.data.rir_allocation.date_allocated);
              const year = asnDate.getFullYear();
              const monthNum = asnDate.getMonth() + 1; // JavaScript months are 0-based
              const dateObj = new Intl.DateTimeFormat('en', { month: 'long' }).formatToParts(asnDate);
              const monthName = dateObj.find(part => part.type === 'month')?.value || 'UnknownMonth';

              const day = asnDate.getDate();

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

      </div>*/}
    </div>

  );
}