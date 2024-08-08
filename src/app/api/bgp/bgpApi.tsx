import { redirect } from "next/navigation";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export class ApiFetcher {
    private static instance: ApiFetcher;
    // private retryCount: number = 3;
    // private retryDelay: number = 1000;
    private delay: number = 400;

    private constructor() { }

    public static getInstance() {
        if (!ApiFetcher.instance) {
            ApiFetcher.instance = new ApiFetcher();
        }
        return ApiFetcher.instance;
    }

    private async fetchWithRetry(url: string): Promise<any> {
        const startTime = Date.now();
        try {
            console.log('fetching...' + url);
            console.log(new Date().toLocaleString());
            const response = await fetch(url);
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`${errorText}`);
                redirect('/error');
            }
            const elapsedTime = Date.now() - startTime;
            await delay(Math.max(0, this.delay - elapsedTime));
            return response.json();
        } catch (error) {
            throw error;
        }
    }

    public async getASNData(asn: string) {
        const url = `https://api.bgpview.io/asn/${asn}`;
        return this.fetchWithRetry(url);
    }

    public async getPeersData(asn: string) {
        const url = `https://api.bgpview.io/asn/${asn}/peers`;
        return this.fetchWithRetry(url);
    }

    public async getPrefixData(asn: string) {
        const url = `https://api.bgpview.io/asn/${asn}/prefixes`;
        return this.fetchWithRetry(url);
    }

    public async getUpstreamData(asn: string) {
        const url = `https://api.bgpview.io/asn/${asn}/upstreams`;
        return this.fetchWithRetry(url);
    }

    public async getDownstreamData(asn: string) {
        const url = `https://api.bgpview.io/asn/${asn}/downstreams`;
        return this.fetchWithRetry(url);
    }

    public async getIXData(asn: string) {
        const url = `https://api.bgpview.io/asn/${asn}/ixs`;
        return this.fetchWithRetry(url);
    }

    public async getWhoIsData(asn: string) {
        const url = `https://wq.apnic.net/query?searchtext=${asn}`;
        return this.fetchWithRetry(url);
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

    public async getUniqueIPData(asn_ix: string) {
        const url = `https://api.bgpview.io/ip/${asn_ix}`;
        return this.fetchWithRetry(url);
    }

    public async getUniqueIXData(asn_ix: string) {
        const url = `https://api.bgpview.io/ix/${asn_ix}`;
        return this.fetchWithRetry(url);
    }

    public async getUniquePrefixData(unique_prefix: string) {
        const formattedPrefix = `${unique_prefix[0]}/${unique_prefix[1]}`;
        const url = `https://api.bgpview.io/prefix/${formattedPrefix}`;
        return this.fetchWithRetry(url);
    }

    public async getbgpSearchData(slug: string) {
        const url = `https://api.bgpview.io/search?query_term=${slug}`;
        return this.fetchWithRetry(url);
    }

}
