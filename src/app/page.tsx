'use client'
import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "./_components/navbar";
import MainPage from "./_components/mainPage";
import Footer from "./_components/footer";
import SideNavbar from "./_components/sideNavbar";
import InitialNavBar from "./_components/initialNavBar";

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if(typeof window != 'undefined'){
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const midPage = (1.3 * windowHeight) / 3;
  
        // Show the navbar when the scroll position reaches the mid of the page
        setShowNavbar(scrollPosition >= midPage);
      }
    };
    if(typeof window != 'undefined'){
      // Attach the scroll event listener
      window.addEventListener("scroll", handleScroll);
    }
    // Remove the event listener on component unmount
    return () => {
      if(typeof window != 'undefined'){
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <body className="h-screen overflow-hidden" >
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">

        {/* SideNavbar on the left */}

        <div style={{ top: 0, left: 0, zIndex: 1, height: "100vh" }}>
        <SideNavbar activeOption={null} sidebarOpen={true}/>
      </div>

        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in" >

          {/* Navbar at the top */}
          {showNavbar ? (
            <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2, background: "#fff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
              <Navbar />
            </div>
          ) : (
            <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1) text-white" }}>
              <InitialNavBar />
            </div>
          )}

          <Head>
            <title>Your Page Title</title>
            <meta name="description" content="Your page description" />
            {/* Add other meta tags, links, etc. */}
          </Head>

          {/* Main page content */}
          <div style={{ marginTop: showNavbar ? "60px" : 0, overflowY: "auto", flex: 1 }}>
            <MainPage />
          </div>
    

          {/* Footer */}
          <Footer />
          </main>
      </div>
    

    
    </body >
    
  );
}
