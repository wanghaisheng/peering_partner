'use client'
import React, { useState } from 'react';
import { FaTwitter, FaLinkedin, FaFacebook, FaYoutube, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import PeeringPartnerLogo from '../../../public/Peering-Partner-logo.webp';
import Link from 'next/link';
import {
   ChevronDoubleLeftIcon,
   ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";


interface SideNavbarProps {
   activeOption?: string | null;
   sidebarOpen?: boolean;
}

export default function SideNavbar({ activeOption, sidebarOpen }: SideNavbarProps) {
   const [activeItem, setActiveItem] = useState<string | null | undefined>(activeOption);
   const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarOpen); // State for sidebar visibility

   const Icon = isSidebarOpen ? ChevronDoubleLeftIcon : ChevronDoubleRightIcon;

   const handleItemClick = (option: string) => {
      setActiveItem(option);
   };

   const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
   };

   return (
      <div className={`min-h-screen bg-gray-100 pt-28 ${isSidebarOpen ? 'overflow-x-hidden  overflow-hidden border-r w-56  hover:shadow-lg transition-width duration-500 ' : 'overflow-x-visible '}`}>
         <div className={`min-h-screen bg-gray-100 sidebar ${isSidebarOpen ? 'w-[3.35rem] ' : 'w-18 '} `}>
            {/* Toggle button */}


            <div className="flex h-screen flex-col bg-gray-100  justify-between pt-2 pb-6 ">
               <div>

                  <ul className="mt-6 space-y-2 tracking-wide">
                     {sidebarItems.map((item, index) => (
                        <li className="min-w-max hover:bg-white rounded-xl" key={index}>
                           <a
                              href={`${item.navigation}`}
                              className={`group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 ${activeItem === item.text ? 'bg-gradient-to-r from-sky-600 to-cyan-400 text-white' : ''
                                 }`}
                              onClick={() => handleItemClick(item.text)}
                           >
                              {item.svg}
                              <span className="group-hover:text-gray-700">{isSidebarOpen ? item.text : ''}</span>
                           </a>
                        </li>
                     ))}
                  </ul>
                  <div className="fixed bottom-0 left-0 right-0  p-2">
                     {/* Place your button content here */}
                     <button
                        className="bg-[rgba(37,169,189,0.97)] rounded-full p-2 shadow-lg"
                        // 👇 set the collapsed state on click
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                     >
                        <Icon className="w-5 h-5" />
                     </button>
                  </div>


               </div>


            </div>

         </div>

      </div>
   );
}



// Example array of sidebar items
const sidebarItems = [

   {
      svg: (
         <svg className="icon-account-analytics hz" width="1.25em" height="1.25em" aria-hidden="true" viewBox="0 0 39.96 52" fill="currentColor">
            <path d="m21.92 0 1.41.58.41.41 15.63 15.55.59 1.42v8h-4v-5.92H21.92l-2-2V4H4v44h11.96v4H2l-2-2V2l2-2h19.92zm2 6.85v9.19h9.13l-9.13-9.2zm8.04 28.61h-4v16.5h4v-16.5zm8-5.5h-4v22h4v-22zm-16 13.75h-4v8.25h4v-8.25z"></path>
         </svg>

      ),
      text: "ASN Statistics",
      navigation: "/asnstatistics",
   },
   // Add more items as needed
   {
      svg: (
         <svg className="icon-router hz" width="1.25em" height="1.25em" aria-hidden="true" viewBox="0 0 52 52" fill="currentColor">
            <path d="M26 0a26 26 0 1 0 26 26A26.1 26.1 0 0 0 26 0zm0 48a22 22 0 1 1 22-22 22.1 22.1 0 0 1-22 22zm-2.6-19.2 1.4 1.4-6.9 6.9h4v3.2h-10v-10h3.2v4l6.8-7 1.4 1.4h.1v.1zm6.5-3.8L27 22.2l7-7.1h-4v-3.2h10v10h-3.2v-4L29.9 25zm3.2 5.4 8 7.9-2.8 2.8-8.1-7.9v4H27v-10h10v3.2h-3.9zM21.6 18.9V15h3.2v10h-10v-3.2h4l-7.9-8.1 2.8-2.8 7.9 8z"></path>
         </svg>

      ),
      text: "Home",
      navigation: "#"
   },
   {
      svg: (
         <svg className="icon-cloudflare-zero-trust hz" width="1.25em" height="1.25em" aria-hidden="true" viewBox="0 0 47.14 55.12" fill="currentColor">
  <path d="m27.49 0 1.19 1.34a27.92 27.92 0 0 0 15.37 7.59l1.37.19 1.72 1.98v14.14c0 19.52-18.73 29.13-19.53 29.52l-.71.36h-1.79l-.71-.36c-.66-.33-13.67-6.99-18.08-20.42h4.24c4.01 10.43 13.9 16 15.43 16.75 2-1.02 17.15-9.49 17.15-25.85v-12.4a32.16 32.16 0 0 1-17.15-8.5 32.11 32.11 0 0 1-17.09 8.5v9.5h-4V11.12l1.72-2 1.37-.19a27.82 27.82 0 0 0 15.34-7.59L24.49 0h3zm-.38 17.75-2.83 2.83 5.66 5.65H0v4h29.94l-5.66 5.66 2.83 2.83L37.6 28.23 27.11 17.75z"></path>
</svg>
),
      text: "Resources",
      navigation: "#",
   },
   {
      svg: (
         <svg className="icon-performance-acceleration-rocket hz" width="1.25em" height="1.25em" aria-hidden="true" viewBox="0 0 49 49" fill="currentColor">
            <path d="M46.99 0 49 2.01a39.9 39.9 0 0 1-11.3 27.91l.91 9.69-.57 1.6L30.33 49l-3.42-1.76 1.29-7.5-2-3-.94-.93-4.3 3.22-2.63-.19L9.8 30.3l-.18-2.63 3.22-4.3-.58-.57-3-2-7.5 1.29L0 18.67l7.78-7.71 1.61-.58 9.69.92A39.9 39.9 0 0 1 46.98 0zm-13 33.44a44.12 44.12 0 0 1-3.4 2.62l1.4 2.12.31 1.45-.34 2 2.56-2.58-.53-5.6zM15.7 26.25l-1.82 2.44 6.07 6.07 2.44-1.83-6.69-6.68zM35.72 5.81a37.12 37.12 0 0 0-12.68 7.33 41.77 41.77 0 0 0-6.95 7.8l11.97 11.97a41.77 41.77 0 0 0 7.8-6.95 37.12 37.12 0 0 0 7.33-12.68c-.2-.28-.45-.6-.74-.96a42.24 42.24 0 0 0-2.76-3.01 46.82 46.82 0 0 0-3-2.76c-.37-.29-.69-.54-.97-.74zm-1.03 4.9a3.52 3.52 0 1 1 0 7.05 3.52 3.52 0 0 1 0-7.05zM9.95 14.48l-2.58 2.56 2-.34 1.45.3 2.12 1.42a39.35 39.35 0 0 1 2.62-3.4l-5.61-.54zm34.97-10.4a39.3 39.3 0 0 0-4.35.5 51.87 51.87 0 0 1 3.84 3.85c.25-1.39.42-2.84.5-4.35zM8.44 38.78c.9.27.52.05 1.18.6.7.7.65 1.13.56 1.43-.16.5-.69 1.22-1.71 1.98a12.3 12.3 0 0 1-4.2 1.93l.23-.79c.38-1.18.99-2.41 1.71-3.4.76-1.02 1.47-1.55 1.98-1.7l.26-.06zm0-4.04-1.43.23c-1.7.52-3.06 1.84-4.04 3.18-1 1.37-1.8 3-2.3 4.55a9.58 9.58 0 0 0-.5 4.55l1.58 1.58c1.4.28 3.08-.02 4.55-.5a16.3 16.3 0 0 0 4.56-2.3c1.33-.98 2.65-2.34 3.17-4.04.58-1.91.05-3.84-1.56-5.46a6.01 6.01 0 0 0-4.03-1.79z"></path>
         </svg>

      ),
      text: "Live Internet Traffic",
      navigation: "#"
   },
   {
      svg: (
         <svg className="icon-attention hz" width="1.25em" height="1.25em" aria-hidden="true" viewBox="0 0 51.54 48.3" fill="currentColor">
            <path d="m27.54 0 24 45.37-1.77 2.93h-48L0 45.37 24 0h3.54zm-1.77 5.2L5.08 44.3h41.38L25.77 5.2zm1.92 29.91v4.58h-4v-4.58h4zm0-16.39v13.76h-4V18.72h4z"></path>
         </svg>

      ),
      text: "Routing Information",
      navigation: "#"
   },
];