import exp from "constants";

export async function getASNData(asn: string) {
  try {

    const res_asn = await fetch(`https://api.bgpview.io/asn/${asn}`);

    if (!res_asn.ok) {
      const errorText = await res_asn.text();
      throw new Error(`Failed to fetch ASN data. Status: ${res_asn.status}, Status Text: ${res_asn.statusText}, Response: ${errorText}`);
    }

    return res_asn.json();
  } catch (error: any) {
    console.error('Error in getASNData:', error.message);
    // throw error; // Re-throw the error for higher-level error handling if needed
  }
}

export async function getPeersData(asn_peers: string) {
  try {

    const res_peers = await fetch(`https://api.bgpview.io/asn/${asn_peers}/peers`);

    if (!res_peers.ok) {
      const errorText = await res_peers.text();
      throw new Error(`Failed to fetch peers data. Status: ${res_peers.status}, Status Text: ${res_peers.statusText}, Response: ${errorText}`);
    }

    return res_peers.json();
  } catch (error: any) {
    console.error('Error in getPeersData:', error.message);
    throw error;
  }
}

export async function getPrefixData(asn_prefixes: string) {
  try {

    const res_prefixes = await fetch(`https://api.bgpview.io/asn/${asn_prefixes}/prefixes`);

    if (!res_prefixes.ok) {
      const errorText = await res_prefixes.text();
      throw new Error(`Failed to fetch prefixes data. Status: ${res_prefixes.status}, Status Text: ${res_prefixes.statusText}, Response: ${errorText}`);
    }

    return res_prefixes.json();
  } catch (error: any) {
    console.error('Error in getPrefixData:', error.message);
    throw error;
  }
}

export async function getUpstreamData(asn_upstreams: string) {
  try {

    const res_upstreams = await fetch(`https://api.bgpview.io/asn/${asn_upstreams}/upstreams`);

    if (!res_upstreams.ok) {
      const errorText = await res_upstreams.text();
      throw new Error(`Failed to fetch upstreams data. Status: ${res_upstreams.status}, Status Text: ${res_upstreams.statusText}, Response: ${errorText}`);
    }

    return res_upstreams.json();
  } catch (error: any) {
    console.error('Error in getUpstreamData:', error.message);
    throw error;
  }
}

export async function getDownstreamData(asn_downstreams: string) {
  try {

    const res_downstreams = await fetch(`https://api.bgpview.io/asn/${asn_downstreams}/downstreams`);

    if (!res_downstreams.ok) {
      const errorText = await res_downstreams.text();
      throw new Error(`Failed to fetch downstreams data. Status: ${res_downstreams.status}, Status Text: ${res_downstreams.statusText}, Response: ${errorText}`);
    }

    return res_downstreams.json();
  } catch (error: any) {
    console.error('Error in getDownstreamData:', error.message);
    throw error;
  }
}

export async function getIXData(asn_ix: string) {
  try {

    const res_ix = await fetch(`https://api.bgpview.io/asn/${asn_ix}/ixs`);

    if (!res_ix.ok) {
      const errorText = await res_ix.text();
      throw new Error(`Failed to fetch IX data. Status: ${res_ix.status}, Status Text: ${res_ix.statusText}, Response: ${errorText}`);
    }

    return res_ix.json();
  } catch (error: any) {
    console.error('Error in getIXData:', error.message);
    throw error;
  }
}


export async function getWhoIsData(asn_whois: string) {
  try {
    console.log(asn_whois)
    const res_whois = await fetch(`https://wq.apnic.net/query?searchtext=${asn_whois}`);

    if (!res_whois.ok) {
      const errorText = await res_whois.text();
      throw new Error(`Failed to fetch WhoIs data. Status: ${res_whois.status}, Status Text: ${res_whois.statusText}, Response: ${errorText}`);
    }



    return res_whois.json();
  } catch (error: any) {
    console.error('Error in getWhoIsData:', error.message);
    throw error;
  }
}

export async function getSVGData(asn_number : string){
  
  const response = await fetch(`https://api.bgpview.io/assets/graphs/${asn_number.startsWith("AS")? asn_number : 'AS' + asn_number}_Combined.svg`);
  const svgText = await response.text();
  const modifiedSvg = svgText.replace(/xlink:href="https:\/\/bgpview\.io\/asn\//g, 'xlink:href="/AS');
  return modifiedSvg;
}