import { backendURL } from "../backendURL";


export async function IpVersionBubble() {
    try {
  
      const res_ix = await fetch(`${backendURL}/charts/IpVersionBubble/fetch?`);
  
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
  