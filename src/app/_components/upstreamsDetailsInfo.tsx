'use client'
import React, { useState } from 'react';
import ASNTables from './asnTable';

interface PrefixesDetailsInfoProps {
  res_upstreams: Record<string, any>;
}


export default function UpstreamsDetailsInfo({ res_upstreams }: PrefixesDetailsInfoProps) {

  const [selectedOptionUpstreams, setSelectedOptionUpstreams] = useState<'IPv4' | 'IPv6'>('IPv4');

  const iPv6data = res_upstreams?.data?.ipv6_upstreams?.map((item: any) => ({
    country: item.country_code,
    asn: item.asn,
    name: item.name,
    description: item.description,
    ipv4: res_upstreams?.data?.ipv4_upstreams?.some((ipv4Item: any) => ipv4Item.asn === item.asn),
  }));

  const iPv4data = res_upstreams?.data?.ipv4_upstreams?.map((item: any) => ({
    country: item.country_code,
    asn: item.asn,
    name: item.name,
    description: item.description,
    ipv6: res_upstreams?.data?.ipv6_upstreams?.some((ipv6Item: any) => ipv6Item.asn === item.asn),
  }));

  return (
    <div>
          <div className="lg:w-full md:overflow-hidden overflow-scroll">
              <div className="col-sm-10 box">
                <div className="flex mb-4">
                  <div
                    className={`cursor-pointer p-2 ${selectedOptionUpstreams === 'IPv4' ? 'border-b-0 border' : ''}`}
                    style={{ color: selectedOptionUpstreams === 'IPv4' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                    onClick={() => setSelectedOptionUpstreams('IPv4')}
                  >
                    IPv4 Upstreams
                  </div>
                  <div
                    className={`cursor-pointer p-2 ${selectedOptionUpstreams === 'IPv6' ? 'border-b-0 border' : ''}`}
                    style={{ color: selectedOptionUpstreams === 'IPv6' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                    onClick={() => setSelectedOptionUpstreams('IPv6')}
                  >
                    IPv6 Upstreams
                  </div>

                </div>
                {selectedOptionUpstreams === 'IPv4' && (
                  <ASNTables data={iPv4data} ipvType="IPv4" />
                )}
                
                {selectedOptionUpstreams === 'IPv6' && (
                  <ASNTables data={iPv6data} ipvType="IPv6" />
                )} 
              </div>
            </div>
          </div>
  )
}