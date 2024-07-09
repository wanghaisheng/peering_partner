export async function GET(request: Request) {
  // Access query parameters from the request
  const queryParams = new URL(request.url).searchParams;
  const searchText = queryParams.get('searchText') || 'AS';

  // Make an API request
  const res_dynamic = await fetch(`https://radar.qrator.net/api/storage/v2/incidents/info/search?q=${searchText}`);

  // Check if the API request was successful
  if (res_dynamic.ok) {
    // Parse the JSON response
    const data = await res_dynamic.json();

    // Return a customized response along with dynamic data
    return new Response(JSON.stringify({ apiResponse: data }), {
      status: res_dynamic.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    // Return an error response if the API request failed
    return new Response(
      JSON.stringify({ error: `Failed to fetch data from the API. Status: ${res_dynamic.status}` }),
      {
        status: res_dynamic.status,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
