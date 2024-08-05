export async function getUniquePrefixData(unique_prefix: string) {
  try {
    // Assuming asn_prefixes is an array like [ '1.0.0.0', '24' ]
    const formattedPrefix = `${unique_prefix[0]}/${unique_prefix[1]}`;

    console.log(formattedPrefix);
    const res_prefixes = await fetch(`https://api.bgpview.io/prefix/${formattedPrefix}`);

    if (!res_prefixes.ok) {
      const errorText = await res_prefixes.text();
      throw new Error(`${errorText}`);
    }

    return res_prefixes.json();
  } catch (error: any) {
    console.error('Error in getPrefixData:', error.message);
    throw error;
  }
}
