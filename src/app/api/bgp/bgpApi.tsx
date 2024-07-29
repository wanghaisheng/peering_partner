import { FetchQueueManager } from "@/app/sessionDataManager/FetchQueueManager";

export class ApiFetcher {
    private static instance: ApiFetcher;
    private fetchQueueManager = FetchQueueManager.getInstance();
    private promiseCache: Map<string, Promise<any>> = new Map();
    private delay: number = 1000;

    private constructor() {}

    public static getInstance() {
        if (!ApiFetcher.instance) {
            ApiFetcher.instance = new ApiFetcher();
        }
        return ApiFetcher.instance;
    }


    private async fetchDataWithQueue(url: string, cacheKey?: string): Promise<any> {
        const request = async () => {
            const startTime = Date.now();
            const response = await fetch(url, {cache: 'no-cache'});
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch data from ${url}. Status: ${response.status}, Status Text: ${response.statusText}, Response: ${errorText}`);
            }
            const data = await response.json();
            const elapsedTime = Date.now() - startTime;
            return { elapsedTime, data };
        };

        return this.fetchQueueManager.enqueue(request, this.delay);
    }

    private getOrFetchData(cacheKey: string, fetchFunction: () => Promise<any>) {
        if (!this.promiseCache.has(cacheKey)) {
            const fetchPromise = fetchFunction().then(result => {
                this.promiseCache.delete(cacheKey);
                return result;
            }).catch(error => {
                this.promiseCache.delete(cacheKey);
                throw error;
            });

            this.promiseCache.set(cacheKey, fetchPromise);
        }

        return this.promiseCache.get(cacheKey)!;
    }

    public async getASNData(asn: string) {
        const cacheKey = `asn-${asn}`;
        return this.getOrFetchData(cacheKey, () => this.fetchDataWithQueue(`https://api.bgpview.io/asn/${asn}`, cacheKey));
    }

    public async getPeersData(asn: string) {
        const cacheKey = `peers-${asn}`;
        return this.getOrFetchData(cacheKey, () => this.fetchDataWithQueue(`https://api.bgpview.io/asn/${asn}/peers`, cacheKey));
    }

    public async getPrefixData(asn: string) {
        const cacheKey = `prefixes-${asn}`;
        return this.getOrFetchData(cacheKey, () => this.fetchDataWithQueue(`https://api.bgpview.io/asn/${asn}/prefixes`, cacheKey));
    }

    public async getUpstreamData(asn: string) {
        const cacheKey = `upstreams-${asn}`;
        return this.getOrFetchData(cacheKey, () => this.fetchDataWithQueue(`https://api.bgpview.io/asn/${asn}/upstreams`, cacheKey));
    }

    public async getDownstreamData(asn: string) {
        const cacheKey = `downstreams-${asn}`;
        return this.getOrFetchData(cacheKey, () => this.fetchDataWithQueue(`https://api.bgpview.io/asn/${asn}/downstreams`, cacheKey));
    }

    public async getIXData(asn: string) {
        const cacheKey = `ixs-${asn}`;
        return this.getOrFetchData(cacheKey, () => this.fetchDataWithQueue(`https://api.bgpview.io/asn/${asn}/ixs`, cacheKey));
    }

    public async getWhoIsData(asn: string) {
        const cacheKey = `whois-${asn}`;
        return this.getOrFetchData(cacheKey, () => this.fetchDataWithQueue(`https://wq.apnic.net/query?searchtext=${asn}`, cacheKey));
    }

    public async getSvgData(asn_number: string) {
        const response = await fetch(`https://api.bgpview.io/assets/graphs/${asn_number.startsWith("AS") ? asn_number : 'AS' + asn_number}_Combined.svg`);
            if (!response.ok) return null;

            const svgText = await response.text();
            const modifiedSvg = svgText.replace(/xlink:href="https:\/\/bgpview\.io\/asn\//g, 'xlink:href="/AS');
            return modifiedSvg;
    }
}
