'use client'
import React from 'react';

interface AsnDetailedInfoProps {
  res_asn: Record<string, any> | null;
  res_peers: Record<string, any> | null;
  res_prefixes: Record<string, any> | null;
  res_upstreams: Record<string, any> | null;
  res_ix: Record<string, any> | null;
}


// res_asn && <pre>{JSON.stringify(res_asn, null, 2)}</pre>

export default function AsnDetailedInfo({
  res_asn,
  res_peers,
  res_prefixes,
  res_upstreams,
  res_ix,
}: AsnDetailedInfoProps) {

  const ipv4Count = res_peers?.data?.ipv4_peers?.length || 0;
  const ipv6Count = res_peers?.data?.ipv6_peers?.length || 0;
  const ipv4Prefixes = res_prefixes?.data?.ipv4_prefixes?.length || 0;
  const ipv6Prefixes = res_prefixes?.data?.ipv6_prefixes?.length || 0;
  const ipv4Upstreams = res_upstreams?.data?.ipv4_upstreams?.length || 0;
  const ipv6Upstreams = res_upstreams?.data?.ipv6_upstreams?.length || 0;


  const totalIX = res_ix?.data?.length || 0;

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
                let dateObj: any = {};
                let monthName = '';
                const day = asnDate.getDate();

                try {
                  dateObj = new Intl.DateTimeFormat('en', { month: 'long' }).formatToParts(asnDate);
                  monthName = dateObj.find((part: any) => part.type === 'month')?.value || 'UnknownMonth';
                } catch (error) {
                  console.log("invalid date", error)
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
          </div>
          <div className="flex-1">
            <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IPV6 PREFIXES:</h2><b>{ipv6Prefixes}</b></div>
            <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IPV6 PEERS:</h2><b>{ipv6Count}</b></div>
            <div><h2 className="text-l text-gray-400 font-bold p-1 inline-block">IPV6 UPSTREAMS:</h2><b>{ipv6Upstreams}</b></div>
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
      <div>
        <ASNSummary />
      </div>
      <div>
        <ASNNetwork />
      </div>
      <div>
        <ASNContacts />
      </div>
    </div>
  );
}
