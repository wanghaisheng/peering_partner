'use client';
import MainPageBG from "../../../public/peering_partnerBG.jpg";
import { useRouter } from 'next/router';
import React, { useCallback, FormEvent, useState, useEffect } from 'react';
import Image from 'next/image';
import PeeringPartnerLogo from '../../../public/Peering-Partner-logo.webp';
import Link from 'next/link';


export default function MainPage() {

  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<{ apiResponse: Array<any> } | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/search?searchText=${searchText}`);

        if (res.ok) {
          const apiData = await res.json();
          setData(apiData);
          setError(null);
        } else {
          const errorData = await res.text();
          console.error(`Failed to fetch data from the API. Status: ${res.status}`);
          setData(null);
          setError(`Failed to fetch data from the API. Status: ${res.status}. ${errorData}`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData(null);
        setError('Error fetching data. Please try again later.');
      }
    };

    fetchData();
  }, [searchText]);

  const handleSearchInputChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const numbers = /^[0-9]+$/;
    let shortCode = '';
    let as = searchText.trim();

    if (as.startsWith('AS') || as.startsWith('as')) {
      if (as.substring(2).match(numbers)) {
        as = as.substring(2);
      }
    }

    let prefix = 0;

    const ipFormat = '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$';

    if (as.includes('/') && (as.includes('.') || as.includes(':'))) {
      if (stringContainsNumber(as)) {
        const str = as.split('/');
        const prefixParts = Array.from(str);

        if (
          prefixParts[0].match(ipFormat) ||
          (checkIfValidIP(prefixParts[0]) === true && +prefixParts[1] >= 0 && +prefixParts[1] <= 255)
        ) {
          prefix = 1;
          shortCode = 'prefix';
        }
      }
    } else {
      if (as.match(ipFormat) || checkIfValidIP(as) === true) {
        shortCode = 'IP';
      }
    }

    if (as.match(numbers)) {
      shortCode = 'ASN';
    }

    const letters = /^[a-zA-Z\s\-.,!?;:'"]+$/;

    if (as.match(letters)) {
      shortCode = 'name';
    }
    var domainPattern = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

					if (as.match(domainPattern)) {
            shortCode = 'domain';
					}
    if(typeof window != 'undefined'){
      switch (shortCode) {
        case 'ASN':
          window.location.href = `/${searchText}`;
          break;
        case 'IP':
          window.location.href = `/ip/${searchText}`;
          break;
        case 'prefix':
          window.location.href = `/prefix/${searchText}`;
          break;
        case 'name':
          window.location.href = `/name/${searchText}`;
          break;
        case 'domain':
          window.location.href = `/domain/${searchText}`;
          break;
        default:
          alert('Invalid Search');
      }
    }else{
      console.log("Window is not defined:.");
    }

  };

  const stringContainsNumber = (search_txt_prefix: string): boolean => {
    let string1 = String(search_txt_prefix);
    for (let i = 0; i < string1.length; i++) {
      if (!isNaN(parseInt(string1.charAt(i))) && !(string1.charAt(i) === '')) {
        return true;
      }
    }
    return false;
  };

  const checkIfValidIP = (str: string): boolean => {
    // Regular expression to check if string is a IPv6 address
    const regexExp = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/gi;
    return regexExp.test(str);
  };
  return (
    <div>
      <div
        className="heading with-bg"
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div className="fusion-title-sc-wrapper">

          <div className="fusion-title title fusion-title-1 fusion-sep-none fusion-title-text fusion-title-size-one fusion-border-below-title" style={{ marginTop: "0px", marginBottom: "0px" }}>
            <video
              className="wp-video-shortcode absolute inset-0 w-full h-full object-cover"
              id="video-55539-2"
              preload="metadata"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                type="video/mp4"
                src="https://github.blog/wp-content/uploads/2020/12/zoomed-in-arcs.h264.mp4?_=2"
              />
              Your browser does not support the video tag.
            </video>

            <h1 className="title-heading-left fusion-responsive-typography-calculated text-black" style={{ margin: "0px", color: "rgb(255, 255, 255)", fontSize: "75px", lineHeight: "1.2" }} data-fontsize="75" data-lineheight="90px">
              <b> Lookup BGP Announcements for <br></br>ASN Networks</b>

            </h1>
          </div>
        </div>

        <div className="fusion-title-sc-wrapper pt-10 ">
          <div className="fusion-title title fusion-title-2 fusion-sep-none fusion-title-text fusion-title-size-three fusion-border-below-title" style={{ marginTop: "0px", marginBottom: "0px" }}>
            <h3 className="title-heading-left fusion-responsive-typography-calculated" style={{ margin: "0px", color: "rgb(255, 255, 255)", fontSize: "24px", lineHeight: "1.2" }} data-fontsize="24" data-lineheight="28.8px">
              <div style={{ fontWeight: 500, lineHeight: "34px", letterSpacing: "1px" }}>
                Fuel your peering partnerships faster with BGP ASN routing insights
              </div>
            </h3>
          </div>
        </div>
        <div className="fusion-title-sc-wrapper pt-10" >
          <div className="fusion-title title fusion-title-2 fusion-sep-none fusion-title-text fusion-title-size-three fusion-border-below-title" style={{ marginTop: "0px", marginBottom: "0px" }}>
            <h3 className="title-heading-left fusion-responsive-typography-calculated" style={{ margin: "0px", color: "rgb(255, 255, 255)", fontSize: "24px", lineHeight: "1.2" }} data-fontsize="24" data-lineheight="28.8px">
              <div style={{ fontWeight: 500, lineHeight: "34px", letterSpacing: "1px" }}>
                <div className="flex-grow md:text-right"> {/* Use md:text-right for medium screens and above */}
                  <form className="relative pr-2 md:pr-32 pl-2 " onSubmit={handleSubmit}>
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>

                      <input
                        type="text"
                        className="block w-full p-4 mr-72 ps-10 text-sm text-gray-900 border border-gray-900 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                        id="searchInput"
                        value={searchText}
                        onChange={handleSearchInputChange}
                        placeholder="Search for Autonomous Sytems, IXPs, domain, and IP"
                        required

                      />
                      <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Search
                      </button>
                    </div>
                    <div className="relative mt-2">
                      {searchText && data && (
                        <div className="absolute z-10 mt-2 w-full max-h-80 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl">
                          <h2 className="p-2 text-sm font-medium text-gray-900 text-left">Search Suggestions:</h2>

                          {searchText.slice(0, 2).toUpperCase() === 'AS' ? (
                            // Render results for letters (autonomous-system type)
                            data.apiResponse
                              .filter(item => item.type === 'autonomous-system')
                              .map((item: { type: string; data: { asn: string; as_name: string } }, index: number) => (
                                <Link href={`/AS${item.data.asn}`} key={index}>
                                  <div className="p-2 text-black flex justify-between hover:bg-gray-100 text-left">
                                    <p className="flex-1 p-2 text-[rgba(37,169,189,0.97)] font-bold">AS{item.data.asn}</p>
                                    <p className="flex-1 text-right text-gray-400 font-bold">{item.data.as_name}</p>
                                    {/* Add any additional fields you want to display */}
                                  </div>
                                </Link>
                              ))
                          ) : searchText[1] && searchText[1].match(/[a-zA-Z]/) ? (
                            // Render results for letters (domain type) and print data for other types
                            data.apiResponse
                              .map((item: any, index: number) => {
                                switch (item.type) {
                                  case 'domain':
                                    return (
                                      <Link href={`/name/${item.data.name}`} key={index}>
                                        <div className="p-2 text-black flex justify-between hover:bg-gray-100 text-left">
                                          <p className="flex-1 p-2 text-[rgba(37,169,189,0.97)] font-bold">{item.data.name}
                                            <br /><div className="text-gray-400">Domain</div></p>
                                          {/* Add more fields based on your needs */}
                                        </div>
                                      </Link>
                                    );
                                  case 'autonomous-system':
                                    return (
                                      <Link href={`/AS${item.data.asn}`} key={index}>
                                        <div className="p-2 text-black flex justify-between hover:bg-gray-100 text-left">
                                          <p className="flex-1 p-2 text-[rgba(37,169,189,0.97)] font-bold">AS{item.data.asn}</p>
                                          <p className="flex-1 text-right text-gray-400 font-bold">{item.data.as_name}</p>
                                          {/* Add any additional fields you want to display */}
                                        </div>
                                      </Link>
                                    );
                                  case 'prefix':
                                    return (
                                      <Link href={`/prefix/${item.data.prefix}`} key={index}>
                                        <div className="p-2 text-black flex justify-between hover:bg-gray-100 text-left">
                                          <p className="flex-1 p-2 text-[rgba(37,169,189,0.97)] font-bold">{item.data.prefix}
                                            <br /><div className="text-gray-400">Prefix of AS{item.data.origin.asn}</div></p>
                                          <p className="flex-1 text-right text-gray-400 font-bold">{item.data.origin.as_name} ({item.data.origin.country_code})</p>
                                          {/* Add more fields based on your needs */}
                                        </div>
                                      </Link>
                                    );
                                  default:
                                    console.log(`Unknown type: ${item.type}`);
                                    return null; // or handle other types as needed
                                }
                              })
                          ) : (
                            // Render results for digits (prefix type)
                            data.apiResponse
                              .filter(item => item.type === 'prefix')
                              .map((item: { type: string; data: { origin: { asn: string; as_name: string; country_code: string; country_name: string }; prefix: string; roa: string; route_object: string; first_seen: string; last_seen: string | null; propagation: number; relative_propagation: number | null; severity: string; info: [number, number] } }, index: number) => (
                                <Link href={`/prefix/${item.data.prefix}`} key={index}>
                                  <div className="p-2 text-black flex justify-between hover:bg-gray-100 text-left">
                                    <p className="flex-1 p-2 text-[rgba(37,169,189,0.97)] font-bold">{item.data.prefix}
                                      <br /><div className="text-gray-400">Prefix of AS{item.data.origin.asn}</div></p>
                                    <p className="flex-1 text-right text-gray-400 font-bold">{item.data.origin.as_name} ({item.data.origin.country_code})</p>
                                    {/* Add more fields based on your needs */}
                                  </div>
                                </Link>
                              ))
                          )}

                          {error && (
                            <div className="mt-2 w-full p-4 bg-red-200 border border-red-500 rounded-lg shadow-lg hover:border-red-700 hover:shadow-xl">
                              <h2 className="text-sm font-medium text-red-800">Error:</h2>
                              <p className="text-red-600">{error}</p>
                            </div>
                          )}
                        </div>
                      )}





                    </div>
                  </form>
                </div>
              </div>
            </h3>
          </div>
        </div>

      </div>


    </div>
  );
}
