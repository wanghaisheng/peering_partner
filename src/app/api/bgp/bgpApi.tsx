import { FetchQueueManager } from "@/app/sessionDataManager/FetchQueueManager";
export class ApiFetcher {
    private static instance: ApiFetcher;
    private fetchQueueManager = FetchQueueManager.getInstance();
    private cache: Map<string, any> = new Map();
    private delay: number = 0;

    private constructor() {}
    
    public static getInstance() {
        if (!ApiFetcher.instance) {
            ApiFetcher.instance = new ApiFetcher();
        }
        return ApiFetcher.instance;
    }

    private async getFromCache(key: string){
        return this.cache.get(key) || null;
    }

    private async setToCache(key: string, data: any) {
        this.cache.set(key, data);
    }

    private async fetchDataWithQueue(url: string, cacheKey: string): Promise<any> {
        const request = async () => {
          const startTime = Date.now();
          const response = await fetch(url);
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data from ${url}. Status: ${response.status}, Status Text: ${response.statusText}, Response: ${errorText}`);
          }
          const data = await response.json();
          await this.setToCache(cacheKey, data);
          const elapsedTime = Date.now() - startTime;
          return data;
        };
      
        return this.fetchQueueManager.enqueue(request, 875);
      }
      

    public async getASNData(asn: string) {
        const cacheKey = `asn-${asn}`;
        const cachedData = await this.getFromCache(cacheKey);
        if (cachedData) return cachedData;

        return this.fetchDataWithQueue(`https://api.bgpview.io/asn/${asn}`, cacheKey);
    }

    public async getPeersData(asn: string) {
        const cacheKey = `peers-${asn}`;
        const cachedData = await this.getFromCache(cacheKey);
        if (cachedData) return cachedData;

        return this.fetchDataWithQueue(`https://api.bgpview.io/asn/${asn}/peers`, cacheKey);
    }

    public async getPrefixData(asn: string) {
        const cacheKey = `prefixes-${asn}`;
        const cachedData = await this.getFromCache(cacheKey);
        if (cachedData) return cachedData;

        return this.fetchDataWithQueue(`https://api.bgpview.io/asn/${asn}/prefixes`, cacheKey);
    }

    public async getUpstreamData(asn: string) {
        const cacheKey = `upstreams-${asn}`;
        const cachedData = await this.getFromCache(cacheKey);
        if (cachedData) return cachedData;

        return this.fetchDataWithQueue(`https://api.bgpview.io/asn/${asn}/upstreams`, cacheKey);
    }

    public async getDownstreamData(asn: string) {
        const cacheKey = `downstreams-${asn}`;
        const cachedData = await this.getFromCache(cacheKey);
        if (cachedData) return cachedData;

        return this.fetchDataWithQueue(`https://api.bgpview.io/asn/${asn}/downstreams`, cacheKey);
    }

    public async getIXData(asn: string) {
        const cacheKey = `ixs-${asn}`;
        const cachedData = await this.getFromCache(cacheKey);
        if (cachedData) return cachedData;

        return this.fetchDataWithQueue(`https://api.bgpview.io/asn/${asn}/ixs`, cacheKey);
    }

    public async getWhoIsData(asn: string) {
        const cacheKey = `whois-${asn}`;
        const cachedData = await this.getFromCache(cacheKey);
        if (cachedData) return cachedData;

        return this.fetchDataWithQueue(`https://wq.apnic.net/query?searchtext=${asn}`, cacheKey);
    }

    public async getSvgData(asn_number: string) {
        const request = async () => {
            const response = await fetch(`https://api.bgpview.io/assets/graphs/${asn_number.startsWith("AS") ? asn_number : 'AS' + asn_number}_Combined.svg`);
            if (!response.ok) return null;

            const svgText = await response.text();
            const modifiedSvg = svgText.replace(/xlink:href="https:\/\/bgpview\.io\/asn\//g, 'xlink:href="/AS');
            return modifiedSvg;
        };

        return this.fetchQueueManager.enqueue(request, 875);
    }
}
