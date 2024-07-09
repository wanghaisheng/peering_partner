interface UniquePrefixProps {
  res_prefix: Record<string, any>;
}



export default function PrefixHeaderInfo({ res_prefix }: UniquePrefixProps) {
  res_prefix.data = res_prefix.data || {};
  const total_ASN = res_prefix.data.asns?.length || 0;


  // Ensure that the response structure is as expected
  const ipv4Prefixes = res_prefix.data.ipv4_prefixes?.length || 0;
  const ipv6Prefixes = res_prefix.data.ipv6_prefixes?.length || 0;
  const totalPrefixes = ipv4Prefixes + ipv6Prefixes;

  return (
    <div>
      {/* Main Header */}
      <div className="flex">

        <div className="w-1/8 pt-4 ">

          <div className="flag-icon">
            <img className="pull-left title-flag" width="78" height="78" src={`https://bgpview.io/assets/flags/shiny/64/${res_prefix.data.country_codes.whois_country_code}.png`} title="<?php echo $country_name; ?>" />

          </div>
        </div>

        <div className="w-2/3 p-4">
          <div className="text-4xl ">
            <p>{res_prefix.data.prefix}</p>
          </div>
          <div className="text-xl font-bold">
            <p className="text-gray-300">{res_prefix.data.description_short}</p>
          </div>

        </div>






      </div>
      <hr></hr>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/4 p-2">
          <strong>Announcing ASNs:</strong> {total_ASN}
        </div>
        <div className="w-full sm:w-1/4 p-2">
          <strong>Parent Prefix:</strong> {res_prefix.data.rir_allocation.prefix}
        </div>
        <div className="w-full sm:w-1/4 p-2">
          <strong>Abuse:</strong> {res_prefix.data.abuse_contacts}
        </div>
        <div className="w-full sm:w-1/4 p-2">
          <strong>RIR:</strong> {res_prefix.data.rir_allocation.rir_name}
        </div>

      </div>
    </div>

  );
}