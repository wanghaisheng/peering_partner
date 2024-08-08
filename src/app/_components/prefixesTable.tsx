'use client';
import React from 'react';
import { IoMdCheckmarkCircle, IoMdRemoveCircle } from 'react-icons/io';

interface StreamTablesProps {
  data: Record<string, any>;
  ipvType: 'IPv6' | 'IPv4';
}

const PrefixesTable = ({ data, ipvType } : StreamTablesProps) => {

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }
  
  const tableHeaders = Object?.keys(data[0]!).map((key, index) => (
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
        {data.map((item: any, index: number) => (
              <tr key={index}>
                <td className="border-b border-gray-300 px-4 py-2 text-center"><img src={`https://bgpview.io/assets/flags/shiny/24/${item.country}.png`} alt="Flag" className="inline-block" />
                </td>

                <td className="border-b border-gray-300 px-4 py-2 text-center" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><a href={`/prefix/${item.announcedPrefix}`}>{item.announcedPrefix}</a></td>


                <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold text-center" style={{ wordBreak: 'break-word' }}>{item.description}</td>
                <td className="border-b border-gray-300 px-4 py-2 text-center">{item.validROA === 'Valid' ? (
                    <IoMdCheckmarkCircle size={20} color="green" /> 
                  ) : (
                    <IoMdRemoveCircle size={20} color="red" /> 
                  )}
                </td>

                <td className="border-b border-gray-300 px-4 py-2 text-center" style={{ color: 'rgba(37, 169, 189, 0.97)' }}><a href={`/prefix/${item.parentPrefix}`}>{item.parentPrefix}</a></td>

                <td className="border-b border-gray-300 px-4 py-2 text-gray-400 font-bold text-center">{item.RIR}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrefixesTable;
