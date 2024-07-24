'use client';
import Link from "next/link";

interface IXListProps {
    res_ix: Record<string, any>;
}

export default function IXListInfo({ res_ix }: IXListProps) {

    const data = res_ix?.data?.map((item: any) => ({
        country: item.country_code,
        ix: item.name,
        name: item.name_full,
        ix_id: item.ix_id,
        ipv4_address: item.ipv4_address,
        ipv6_address: item.ipv6_address,
        speed: item.speed,

    }));

    return (
        <div className="overflow-y-auto bg-white border-1 border-gray-150">
            <table className="min-w-full border-t border-b bg-white">
                <thead>
                    <tr>
                        <th className="border-b border-gray-300 px-4 py-2 text-center">Country</th>
                        <th className="border-b border-gray-300 px-4 py-2 text-center">IX</th>
                        <th className="border-b border-gray-300 px-4 py-2 text-center">Name</th>
                        <th className="border-b border-gray-300 px-4 py-2 text-center">IPv4</th>
                        <th className="border-b border-gray-300 px-4 py-2 text-center">IPv6</th>
                        <th className="border-b border-gray-300 px-4 py-2 text-center">Port Speed</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item: any, index: number) => (
                        <tr key={index}>
                            <td className="border-b border-gray-300 px-4 py-2">
                                <img src={`https://bgpview.io/assets/flags/shiny/24/${item.country}.png`} alt="Flag" className="inline-block" />
                            </td>
                            <td className="border-b border-gray-300 px-4 py-2 " style={{ color: 'rgba(37, 169, 189, 0.97)' }}>
                                <Link href={`/ix/${item.ix_id}`}>{item.ix}</Link>
                            </td>
                            <td className="border-b border-gray-300 px-4 py-2" style={{ color: 'rgba(37, 169, 189, 0.97)' }}>
                                <Link href={`/ix/${item.ix_id}`}>{item.name}</Link>
                            </td>
                            <td className="border-b border-gray-300 px-4 py-2" style={{ color: 'rgba(37, 169, 189, 0.97)' }}>
                                <Link href={`/ip/${item.ipv4_address}`}>{item.ipv4_address}</Link>
                            </td>
                            <td className="border-b border-gray-300 px-4 py-2" style={{ color: 'rgba(37, 169, 189, 0.97)' }}>
                                <Link href={`/ip/${item.ipv6_address}`}>{item.ipv6_address}</Link>
                            </td>
                            <td className="border-b text-gray-400  px-4 py-2" style={{ whiteSpace: 'nowrap' }}>
                                {(item.speed / 1000)} Gbps
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {!data?.length ? (<div className="border-b border-gray-300 px-4 py-2">No Data Available.</div>) : null}
        </div>
    );
}