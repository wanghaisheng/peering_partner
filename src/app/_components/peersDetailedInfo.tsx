'use client'
import React, { useState } from 'react';
import ASNTables from './asnTable';
interface PeersDetailsInfoProps {
    res_peers: Record<string, any>;
}


export default function PeersDetailsInfo({ res_peers }: PeersDetailsInfoProps) {
    const [selectedOptionPeers, setSelectedOptionPeers] = useState<'IPv4' | 'IPv6'>('IPv4');

    const iPv6data = res_peers?.data?.ipv6_peers?.map((item: any) => ({
        country: item.country_code,
        asn: item.asn,
        name: item.name,
        description: item.description,
        ipv4: res_peers?.data?.ipv4_peers?.some((ipv4Item: any) => ipv4Item.asn === item.asn),
    }));

    const iPv4data = res_peers?.data?.ipv4_peers?.map((item: any) => ({
        country: item.country_code,
        asn: item.asn,
        name: item.name,
        description: item.description,
        ipv6: res_peers?.data?.ipv6_peers?.some((ipv6Item: any) => ipv6Item.asn === item.asn),
    }));



    return (
        <div>
            <div className="lg:w-full overflow-scroll md:overflow-hidden">
                {/* Content for the third row (full width) */}
                <div className="col-sm-10 box">
                    <div className="flex mb-4">
                        <div
                            className={`cursor-pointer p-2 ${selectedOptionPeers === 'IPv4' ? 'border-b-0 border' : ''}`}
                            style={{ color: selectedOptionPeers === 'IPv4' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                            onClick={() => setSelectedOptionPeers('IPv4')}
                        >
                            IPv4 Peers
                        </div>
                        <div
                            className={`cursor-pointer p-2 ${selectedOptionPeers === 'IPv6' ? 'border-b-0 border' : ''}`}
                            style={{ color: selectedOptionPeers === 'IPv6' ? 'rgba(37, 169, 189, 0.97)' : '' }}
                            onClick={() => setSelectedOptionPeers('IPv6')}
                        >
                            IPv6 Peers
                        </div>

                    </div>
                    {selectedOptionPeers === 'IPv4' && (
                        <ASNTables data={iPv4data} ipvType="IPv4" />
                    )}

                    {selectedOptionPeers === 'IPv6' && (
                        <ASNTables data={iPv6data} ipvType="IPv6" />
                    )}

                </div>
            </div>
        </div>
    )
}