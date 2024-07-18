import React from 'react';
import Link from 'next/link';

interface StreamTablesProps {
  data: Record<string, any>; 
  ipvType: 'IPv6' | 'IPv4'; 
}

const ASNTables: React.FC<StreamTablesProps> = ({ data, ipvType }) => {
  const isIpv6Table = ipvType === 'IPv6'; 

  const tableHeaders = Object.keys(data?.[0] || {}).map((key, index) => (
    <th key={index} className="border-b border-gray-300 px-4 py-2 text-center capitalize">
      {key}
    </th>
  ));

  return (
    <div>
      <table className="min-w-full bg-white border-t border-b border-gray-300">
        <thead>
          <tr>
            {tableHeaders}
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any, index: number) => (
            <tr key={index}>
              <td className="border-b border-gray-300 px-4 py-2 text-center">
                <img src={`https://bgpview.io/assets/flags/shiny/24/${item.country}.png`} alt="Flag" className="inline-block" />
              </td>
              <td className="border-b border-gray-300 px-4 py-2 text-center" style={{ color: 'rgba(37, 169, 189, 0.97)' }}>
                <Link href={`${item.asn}`}>AS{item.asn}</Link>
              </td>
              <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold text-center">{item.name}</td>
              <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold text-center" style={{ wordBreak: 'break-word' }}>{item.description}</td>
              <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold text-center">
                {isIpv6Table ? (item.ipv4? (
                    <span role="img" aria-label="check-mark">
                      ✔️
                    </span>
                  ) : (
                    <span role="img" aria-label="cross-mark">
                      ❌
                    </span>
                  )) : (item.ipv6? (
                    <span role="img" aria-label="check-mark">
                      ✔️
                    </span>
                  ) : (
                    <span role="img" aria-label="cross-mark">
                      ❌
                    </span>
                  ))
                  }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ASNTables;
