'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { IoMdCheckmarkCircle, IoMdRemoveCircle } from 'react-icons/io';


interface UniquePrefixProps {
  res_prefix: Record<string, any>;
}






// res_prefix && <pre>{JSON.stringify(res_prefix, null, 2)}</pre>

export default function UniquePrefix({
  res_prefix
}: UniquePrefixProps) {
  res_prefix.data = res_prefix.data || {};
  const [selectedOption, setSelectedOption] = useState<string | null>("Prefix");

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };



  // Ensure that the response structure is as expected
  const ipv4Prefixes = res_prefix.data.ipv4_prefixes?.length || 0;
  const ipv6Prefixes = res_prefix.data.ipv6_prefixes?.length || 0;
  const totalPrefixes = ipv4Prefixes + ipv6Prefixes;





  const renderContent = () => {
    switch (selectedOption) {
      case "Prefix":
        return (
          <div className="container">
            {/* Header Row */}
            <div className="header-row pt-2 pb-4">
              <h1 className="font-bold text-2xl">Announcing ASNs</h1>
            </div>

            {/* Two Columns */}
            <div className="flex">
              {/* First Column */}

              <table className="min-w-full bg-white border-t border-b border-gray-300">


                <thead>
                  <tr>
                    <th className="border-b border-gray-300 px-4 py-2 text-center">Country</th>
                    <th className="border-b border-gray-300 px-4 py-2 text-center">ASN</th>
                    <th className="border-b border-gray-300 px-4 py-2 text-center">Name</th>
                    <th className="border-b border-gray-300 px-4 py-2 text-center">Description</th>

                  </tr>
                </thead>
                <tbody>
                  {res_prefix.data.asns.map((asn: any) => {
                    const asnCountryName = '...'; // You need to replace this with logic to get the country name
                    const flagUrl = `https://bgpview.io/assets/flags/shiny/32/${asn.country_code}.png`;

                    return (
                      <tr key={asn.asn}>
                        <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold flex items-center justify-center">
                          <img src={flagUrl} width="32" height="32" title={asnCountryName} alt={`${asnCountryName} (${asn.country_code}) Flag`} />
                        </td>
                        <td className="border-b border-gray-300 px-4 py-2 text-center" style={{ color: 'rgba(37, 169, 189, 0.97)' }}>
                          <a href={`/${asn.asn}`}>AS{asn.asn}</a>
                        </td>
                        <td className="border-b border-gray-300 px-4 py-2 text-center ">{asn.name}</td>
                        <td className="border-b border-gray-300 px-4 py-2 text-center ">{asn.description}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

            </div>
            <hr />

            <div className="header-row pt-12 pb-4">
              <h1 className="font-bold text-2xl">{res_prefix.data.prefix} Summary</h1>
            </div>

            {/* Two Columns */}
            <div className="flex">
              {/* First Column */}
              <div className="flex-1">
                <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">PREFIX:</h2><b>{res_prefix.data.prefix}</b></div>
                <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">NAME:</h2><b>{res_prefix.data.name}</b></div>
                <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">DESCRIPTION:</h2><b>{res_prefix.data.description_short}</b></div>

                <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">COUNTRY:</h2>
                  <b>
                    <img src={`https://bgpview.io/assets/flags/shiny/24/${res_prefix.data.country_codes.whois_country_code}.png`} alt="Flag" className="inline-block" />
                  </b>
                </div>
                {/* Content for Column 1 */}
              </div>

              <div className="flex-1">
                <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">REGIONAL REGISTRY:</h2><b>{res_prefix.data.rir_allocation.rir_name}</b></div>
                <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">ALLOCATION STATUS:</h2><b>{res_prefix.data.rir_allocation.allocation_status}</b></div>
                <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">ALLOCATION DATE:</h2><b>{
                  (() => {
                    const asnDate = new Date(res_prefix.data.rir_allocation.date_allocated);
                    const year = asnDate.getFullYear();
                    const monthNum = asnDate.getMonth() + 1; // JavaScript months are 0-based
                    const dateObj = new Intl.DateTimeFormat('en', { month: 'long' }).formatToParts(asnDate);
                    const monthName = dateObj.find((part:any) => part.type === 'month')?.value || 'UnknownMonth';

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
                        {day}<sup>{suffix}</sup> {monthName} {year}
                      </>
                    );
                  })()
                }</b></div>
                <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">PARENT PREFIX:</h2><b>{res_prefix.data.rir_allocation.prefix}</b></div>

                <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">ALLOCATED COUNTRY:</h2>
                  <b>
                    <img src={`https://bgpview.io/assets/flags/shiny/24/${res_prefix.data.country_codes.whois_country_code}.png`} alt="Flag" className="inline-block" />
                  </b>
                </div>
                {/* Content for Column 1 */}
              </div>

            </div>
            <hr />


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
                  {res_prefix.data.email_contacts.map((contact: string) => (
                    <div key={contact}>{contact}</div>
                  ))}
                </b>
                {/* Content for Column 1 */}
              </div>

              {/* Second Column */}
              <div className="flex-1">
                <h2 className="text-l text-gray-400 font-bold p-1">ABUSE CONTACTS:</h2><b>
                  {res_prefix.data.abuse_contacts.map((contact: string) => (
                    <div key={contact}>{contact}</div>
                  ))}
                </b>
                {/* Content for Column 2 */}
              </div>

              {/* Third Column */}
              <div className="flex-1">
                <h2 className="text-l text-gray-400 font-bold p-1">ADDRESS:</h2><b>
                  {res_prefix.data.owner_address.map((contact: string) => (
                    <div key={contact}>{contact}</div>
                  ))}
                </b>
                {/* Content for Column 3 */}
              </div>
            </div>
            <hr />

            <div className="header-row pt-8 pb-4">
              <h1 className="font-bold text-2xl">Summary</h1>
            </div>

            {/* Two Columns */}
            <div className="flex">
              {/* First Column */}
              {res_prefix.data.related_prefixes && res_prefix.data.related_prefixes.length > 0 && (

                <table className="min-w-full bg-white border-t border-b border-gray-300">
                  <thead>
                    <tr>
                      <th className="border-b border-gray-300 px-4 py-2 text-center">Country</th>
                      <th className="border-b border-gray-300 px-4 py-2 text-center">Prefix</th>
                      <th className="border-b border-gray-300 px-4 py-2 text-center">Name</th>
                      <th className="border-b border-gray-300 px-4 py-2 text-center">Description</th>
                      <th className="border-b border-gray-300 px-4 py-2 text-center">ASN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {res_prefix.data.related_prefixes.map((asn: any) => {
                      const asnCountryName = '...'; // Replace this with logic to get the country name
                      const flagUrl = `https://bgpview.io/assets/flags/shiny/32/${asn.country_code}.png`;

                      return (
                        <tr key={asn.asn}>
                          <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold flex items-center justify-center">
                            <img src={flagUrl} width="32" height="32" title={asnCountryName} alt={`${asnCountryName} (${asn.country_code}) Flag`} />
                          </td>
                          <td className="border-b border-gray-300 px-4 py-2 text-center" style={{ color: 'rgba(37, 169, 189, 0.97)' }}>
                            <a href={`/prefix/${asn.prefix}`}>{asn.prefix}</a>
                          </td>
                          <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{asn.name}</td>
                          <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{asn.description}</td>
                          <td className="border-b border-gray-300 px-4 py-2 text-center" style={{ color: 'rgba(37, 169, 189, 0.97)' }}>
                            <a href={`/${asn.asn}`}>AS{asn.asn}</a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

              )}
            </div>

          </div>



        );
      case "Routing":
        return (
          <div className="container">

            <div className="header-row pt-8 pb-4">
              <h1 className="font-bold text-2xl">Summary</h1>
            </div>

            {/* Two Columns */}
            <div className="flex">
              {/* First Column */}
              {res_prefix?.data?.asns?.map((asns: any) => (
                <div key={asns.asn} className="tab-pane active w-full" >
                  <h3>
                    <a href={`/${asns.asn}`}>AS{asns.asn}</a> {asns.description} - Prefix Upstreams
                  </h3>
                  <div className="row">
                    <table className="table table-hover w-full">
                      <thead>
                        <tr>
                          <th className="border-b border-gray-300 px-4 py-2 text-center">Country</th>
                          <th className="border-b border-gray-300 px-4 py-2 text-center">ASN</th>
                          <th className="border-b border-gray-300 px-4 py-2 text-center">Name</th>
                          <th className="border-b border-gray-300 px-4 py-2 text-center">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {asns.prefix_upstreams.map((asn: any) => {
                          const asnCountry = '...'; // Replace with logic to get the country name
                          const flagUrl = `https://bgpview.io/assets/flags/shiny/32/${asn.country_code}.png`;

                          return (
                            <tr key={asn.asn}>
                              <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold flex items-center justify-center">
                                <img src={flagUrl} width="32" height="32" title={asnCountry} alt={`${asnCountry} (${asn.country_code}) Flag`} />
                              </td>
                              <td className="border-b border-gray-300 px-4 py-2 text-center" style={{ color: 'rgba(37, 169, 189, 0.97)' }}>
                                <a href={`../../AS${asn.asn}`}>AS{asn.asn}</a>
                              </td>
                              <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{asn.name}</td>
                              <td className="border-b border-gray-300 px-4 py-2 text-center text-gray-400 font-bold">{asn.description}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );


      // Add cases for other options as needed
      default:
        return <p>Select an option from the list</p>;
    }
  };
















  return (
    <div className="flex flex-row w-full">
      {/* Side Navbar */}
      <div className="w-1/6 text-gray-400">
        {/* Add content for the side navbar */}
        <ul className="list-none">
          <li
            className={`pb-1 ${selectedOption === "Prefix"
              ? "text-[rgba(37,169,189,0.97)] font-bold"
              : ""
              }`}
            onClick={() => handleOptionClick("Prefix")}
          >
            <a href="#Prefix">Prefix</a>
          </li>
          <li
            className={`pb-1 ${selectedOption === "Routing"
              ? "text-[rgba(37,169,189,0.97)] font-bold"
              : ""
              }`}
            onClick={() => handleOptionClick("Routing")}
          >
            <a href="#Routing">Routing</a>
          </li>

        </ul>
      </div>

      {/* Information Box */}
      <div className="w-5/6 p-4 border border-gray-150">
        {/* Add content for the information box */}
        {renderContent()}
      </div>
    </div>
  );
}
