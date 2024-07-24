'use client'
import React, { useState } from 'react';
import PrefixesTable from './prefixesTable';

interface PrefixesDetailsInfoProps {
  res_prefixes: Record<string, any>;
}


export default function PeersDetailsInfo({ res_prefixes }: PrefixesDetailsInfoProps) {

  const [selectedOptionPrefixes, setSelectedOptionPrefixes] = useState<'IPv4' | 'IPv6'>('IPv4');

  const iPv4data = res_prefixes?.data?.ipv4_prefixes?.map((item: any) => ({
    country: item.country_code,
    announcedPrefix: item.prefix,
    description: item.description,
    validROA: item.roa_status,
    parentPrefix: item.parent.prefix,
    RIR: item.parent.rir_name,
  }));

  const iPv6data = res_prefixes?.data?.ipv6_prefixes?.map((item: any) => ({
    country: item.country_code,
    announcedPrefix: item.prefix,
    description: item.description,
    validROA: item.roa_status,
    parentPrefix: item.parent.prefix,
    RIR: item.parent.rir_name,
  }));

  return (
    <div>
      <div className="lg:w-full md:overflow-hidden overflow-scroll">
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
          {selectedOptionPrefixes === 'IPv4' && (
            <PrefixesTable data={iPv4data} ipvType="IPv4" />
          )}

          {selectedOptionPrefixes === 'IPv6' && (
            <PrefixesTable data={iPv6data} ipvType="IPv6" />

          )}
        </div>
      </div>
    </div>
  )
}