

export async function getbgpSearchData(slug: string) {
  try {

    const res_ix = await fetch(`https://api.bgpview.io/search?query_term=${slug}`);

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
