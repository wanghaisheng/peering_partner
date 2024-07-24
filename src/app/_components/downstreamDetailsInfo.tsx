'use client'

import React, { useEffect, useState } from 'react';
import ASNTables from './asnTable';
interface PrefixesDetailsInfoProps {
  res_downstreams: Record<string, any>;
}

export default function DownstreamsDetailsInfo({ res_downstreams }: PrefixesDetailsInfoProps) {

  const [selectedOptionDownstreams, setSelectedOptionDownstreams] = useState<'IPv4' | 'IPv6'>('IPv4');


  const iPv6data = res_downstreams?.data?.ipv6_downstreams?.map((item: any) => ({
    country: item.country_code,
    asn: item.asn,
    name: item.name,
    description: item.description,
    ipv4: res_downstreams?.data?.ipv4_downstreams?.some((ipv4Item: any) => ipv4Item.asn === item.asn),
  }));

  const iPv4data = res_downstreams?.data?.ipv4_downstreams?.map((item: any) => ({
    country: item.country_code,
    asn: item.asn,
    name: item.name,
    description: item.description,
    ipv6: res_downstreams?.data?.ipv6_downstreams?.some((ipv6Item: any) => ipv6Item.asn === item.asn),
  }));


  return (
    <div>
      <div className="w-full md:overflow-hidden overflow-scroll">
        <div className="col-sm-10 box">
          <div className="flex mb-4">
            <div
              className={`cursor-pointer p-2 ${selectedOptionDownstreams === 'IPv4' ? 'border-b-0 border' : ''}`}
              style={{ color: selectedOptionDownstreams === 'IPv4' ? 'rgba(37, 169, 189, 0.97)' : '' }}
              onClick={() => setSelectedOptionDownstreams('IPv4')}
            >
              IPv4 Downstreams
            </div>
            <div
              className={`cursor-pointer p-2 ${selectedOptionDownstreams === 'IPv6' ? 'border-b-0 border' : ''}`}
              style={{ color: selectedOptionDownstreams === 'IPv6' ? 'rgba(37, 169, 189, 0.97)' : '' }}
              onClick={() => setSelectedOptionDownstreams('IPv6')}
            >

              IPv6 Downstreams

            </div>

          </div>
          {selectedOptionDownstreams === 'IPv4' && (
            <ASNTables data={iPv4data} ipvType="IPv4" />
          )}

          {selectedOptionDownstreams === 'IPv6' && (
            <ASNTables data={iPv6data} ipvType="IPv6" />
          )}
        </div>
      </div>
    </div>
  )
}