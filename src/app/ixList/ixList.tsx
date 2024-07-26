
import { ApiFetcher} from "@/app/api/bgp/bgpApi";
import IXListInfo from "../_components/ixListInfo";

interface IXListDetailsProps {
    asn_number: string | null;
}

const Fetcher = ApiFetcher.getInstance();

export default async function IXListDetails({asn_number}: IXListDetailsProps) {

    if(!asn_number) {
        return;
    }

    const res_asn_ix = await Fetcher.getIXData(asn_number);

    return (
        <div className="w-full bg-white mb-4 p-4 overflow-auto md:overflow-hidden">
            <IXListInfo res_ix={res_asn_ix} />
        </div>
    );
}
