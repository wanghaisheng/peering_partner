import Link from "next/link";
import Image from "next/image";
import PeeringPartnerLogo from '../../../public/Peering-Partner-logo.webp';

export default function InitialNavBar() {
    return (
        <header className="fixed inset-x-0 top-0 z-30 mx-96 w-full max-w-screen-md py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
            <div className="px-4">
                <div className="flex items-center justify-between">
                    <div className="flex shrink-0">
                        <div className="text-white text-lg font-bold">
                            <Link href="/">
                                <Image src={PeeringPartnerLogo} alt="Peering Partner Logo" />
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:flex md:items-center md:justify-center md:space-x-5">
                        <a
                            aria-current="page"
                            className="inline-block rounded-lg px-2 py-1 text-lg font-bold text-blue-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                            href="#"
                        >
                            Solutions
                        </a>
                        <a
                            className="inline-block rounded-lg px-2 py-1 text-lg font-bold text-blue-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                            href="#"
                        >
                            Learn
                        </a>
                        <a
                            className="inline-block rounded-lg px-2 py-1 text-lg font-bold text-blue-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                            href="#"
                        >
                            API
                        </a>
                        <a
                            className="inline-block rounded-lg px-2 py-1 text-lg font-bold text-blue-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                            href="#"
                        >
                            About
                        </a>
                    </div>
                    {/* <div className="flex items-center justify-end gap-3">
                        <a
                            className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-lg font-bold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                            href="/login"
                        >
                            Sign in
                        </a>
                        <a
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-lg font-bold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            href="/login"
                        >
                            Login
                        </a>
                    </div> */}
                </div>
            </div>
        </header>
    );
}
