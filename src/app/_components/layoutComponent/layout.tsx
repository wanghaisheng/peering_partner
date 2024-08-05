// components/Layout.tsx
import Navbar from "../navbar";
import Footer from "../footer";
import ASNSideNavbar from "../asnSideNavbar";
import { ReactNode, Suspense, lazy } from "react";
import Loading from "../loading";
import Header from "./header";

interface LayoutProps {
    on?: boolean;
    activeOption: string;
    sidebarOpen: boolean;
    slug: string;
    children: ReactNode;
}

const Layout = ({ children, activeOption, sidebarOpen, slug, on=true }: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="md:flex flex-row min-h-screen bg-white text-gray-800 overflow-hidden">
                <div className={`${on? "fixed" : "hidden"} top-5 left-0 z-10 md:z-1 h-full md:h-auto`}>
                    <ASNSideNavbar activeOption={activeOption} sidebarOpen={sidebarOpen} slug={slug} />
                </div>
                <main className="flex flex-col md:ml-0 transition-all duration-150 ease-in flex-grow overflow-x-hidden">
                    <div className="fixed top-0 left-0 right-0 z-20 bg-white shadow">
                        <Navbar />
                    </div>
                    <div className="mt-4 md:pt-24 md:mt-8 lg:mt-12 flex-grow pt-24 md:mx-0 pl-12 pr-2 md:px-24">

                            <Suspense fallback={<Loading/>}>
                        <div className="p-2 md:p-4 border border-white-150">
                            {/* Add content for the information box */}
                            <div className="md:flex md:flex-wrap">
                                <div className="w-full border border-white-150 bg-white mb-4 p-4">
                                    <Header asn={slug} />
                                </div>
                                {children}
                            </div>
                        </div>
                            </Suspense>
                    </div>
                    <div className="mt-auto">
                        <Footer />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
