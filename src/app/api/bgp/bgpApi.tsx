import { start } from "repl";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
export class ApiFetcher {
    private static instance: ApiFetcher;
    private promiseCache: Map<string, Promise<any>> = new Map();
    private retryCount: number = 3;
    private retryDelay: number = 500; 
    private delay: number = 0;
    private constructor() {}

    public static getInstance() {
        if (!ApiFetcher.instance) {
            ApiFetcher.instance = new ApiFetcher();
        }
        return ApiFetcher.instance;
    }

    private async fetchWithRetry(url: string, retries: number = this.retryCount): Promise<any> {
        const startTime = Date.now();
        try {
            const response = await fetch(url);
            if (retries <= 0 && !response.ok) {
                const errorText = await response.text();
                throw new Error(`${errorText}`);
            }
            return await response.json();
        } catch (error) {
            if (retries > 0) {
                await delay(this.retryDelay * retries);
                return this.fetchWithRetry(url, retries - 1);
            }
            throw error;
        } finally {
            const elapsedTime = Date.now() - startTime;
            await delay(Math.max(0, this.delay - elapsedTime));
            await delay(this.retryDelay - elapsedTime);
        }
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
        return this.getOrFetchData(cacheKey, () => this.fetchWithRetry(`https://api.bgpview.io/asn/${asn}`));
    }

    public async getPeersData(asn: string) {
        const cacheKey = `peers-${asn}`;
        return this.getOrFetchData(cacheKey, () => this.fetchWithRetry(`https://api.bgpview.io/asn/${asn}/peers`));
    }

    public async getPrefixData(asn: string) {
        const cacheKey = `prefixes-${asn}`;
        return this.getOrFetchData(cacheKey, () => this.fetchWithRetry(`https://api.bgpview.io/asn/${asn}/prefixes`));
    }

    public async getUpstreamData(asn: string) {
        const cacheKey = `upstreams-${asn}`;
        return this.getOrFetchData(cacheKey, () => this.fetchWithRetry(`https://api.bgpview.io/asn/${asn}/upstreams`));
    }

    public async getDownstreamData(asn: string) {
        const cacheKey = `downstreams-${asn}`;
        return this.getOrFetchData(cacheKey, () => this.fetchWithRetry(`https://api.bgpview.io/asn/${asn}/downstreams`));
    }

    public async getIXData(asn: string) {
        const cacheKey = `ixs-${asn}`;
        return this.getOrFetchData(cacheKey, () => this.fetchWithRetry(`https://api.bgpview.io/asn/${asn}/ixs`));
    }

    public async getWhoIsData(asn: string) {
        const cacheKey = `whois-${asn}`;
        return this.getOrFetchData(cacheKey, () => this.fetchWithRetry(`https://wq.apnic.net/query?searchtext=${asn}`));
    }

    public async getSvgData(asn_number: string) {
        const url = `https://api.bgpview.io/assets/graphs/${asn_number.startsWith("AS") ? asn_number : 'AS' + asn_number}_Combined.svg`;
        try {
            const response = await fetch(url);
            if (!response.ok) return null;

            const svgText = await response.text();
            const modifiedSvg = svgText.replace(/xlink:href="https:\/\/bgpview\.io\/asn\//g, 'xlink:href="/AS');
            return modifiedSvg;
        } catch (error) {
            console.error('Failed to fetch SVG data:', error);
            return null;
        }
    }
}
