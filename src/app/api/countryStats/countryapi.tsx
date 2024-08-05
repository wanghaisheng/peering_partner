export async function getWorldData() {
  try {

    const res_ix = await fetch(`https://api.bgpview.io/reports/countries`);

    if (!res_ix.ok) {
      const errorText = await res_ix.text()
      return []
      console.log(`Failed to fetch IX data. Status: ${res_ix.status}, Status Text: ${res_ix.statusText}, Response: ${errorText}`);
    }
    return res_ix.json();
  } catch (error: any) {
    console.error('Error in getIXData:', error.message);
  }
}

export async function getCountryData(slug: string) {
  try {

    const res_ix = await fetch(`https://api.bgpview.io/reports/countries/${slug}`);

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
