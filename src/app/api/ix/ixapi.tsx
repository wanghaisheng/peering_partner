export async function getUniqueIXData(asn_ix: string) {
  try {

    const res_ix = await fetch(`https://api.bgpview.io/ix/${asn_ix}`);

    if (!res_ix.ok) {
      const errorText = await res_ix.text();
      throw new Error(`${errorText}`);
    }

    return res_ix.json();
  } catch (error: any) {
    console.error('Error in getIXData:', error.message);
    throw error;
  }
}
