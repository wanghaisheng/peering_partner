'use client'
import React, { useEffect, useState } from 'react';
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
   slug?: string;
}

export default function ASNSideNavbar({  activeOption, sidebarOpen, slug }: SideNavbarProps) {
   const [activeItem, setActiveItem] = useState<string | null | undefined>(activeOption);
   const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarOpen); // State for sidebar visibility

   const Icon = isSidebarOpen ? ChevronDoubleLeftIcon : ChevronDoubleRightIcon;

   const handleItemClick = (option: string) => {
      setActiveItem(option);
   };

   const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
   };

   // Example array of sidebar items
   const sidebarItems = [

      {
         svg: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
               <path className="fill-current text-gray-300 group-hover:text-cyan-300" fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
               <path className="fill-current text-gray-600 group-hover:text-cyan-600" d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
            </svg>
         ),
         text: "ASN Stats",
         navigation: `/${slug}`,
      },
      {
         svg: (
            <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
               <path d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z" className="fill-current text-cyan-400 dark:fill-slate-600"></path>
               <path d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z" className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
               <path d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z" className="fill-current group-hover:text-sky-300"></path>
            </svg>),
         text: "Peers",
         navigation: `/peers/${slug}`,
      },

      // Add more items as needed
      {
         svg: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
               <path className="fill-current text-gray-600 group-hover:text-cyan-600" d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
               <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
         ),
         text: "Prefixes",
         navigation: `/prefixes/${slug}`,
      },
      {
         svg: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
               <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
               <path className="fill-current text-gray-600 group-hover:text-cyan-600" fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
         ),
         text: "Upstreams",
         navigation: `/upstreams/${slug}`,
      },
      {
         svg: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:fill-cyan-600" viewBox="0 0 20 20" fill="currentColor">
               <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
         ),
         text: "Downstream",
         navigation: `/downstreams/${slug}`,
      },
      {
         svg: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
               <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
               <path className="fill-current text-gray-600 group-hover:text-cyan-600" fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
         ),
         text: "Raw Whois",
         navigation: `/whois/${slug}`,
      },
      {
         svg: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500 hover:text-cyan-500">
               <polyline points="1 4 7 4 7 12 13 12 13 4 20 4"></polyline>
               <polyline points="1 20 7 20 7 12 13 12 13 20 20 20"></polyline>
            </svg>

),
text: "Graph",
navigation: `/graph/${slug}`,
},
{
   svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500 hover:text-cyan-500">
         <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
         <line x1="9" y1="3" x2="9" y2="21"></line>
         <line x1="15" y1="3" x2="15" y2="21"></line>
         <line x1="3" y1="9" x2="21" y2="9"></line>
         <line x1="3" y1="15" x2="21" y2="15"></line>
      </svg>
   ),
   text: "IX",
   navigation: `/ixList/${slug}`,
},
];

   return (
      <div className={`min-h-screen bg-gray-100 pt-28 ${isSidebarOpen ? 'overflow-x-hidden overflow-hidden border-r w-56 hover:shadow-lg transition-width duration-500 ' : 'overflow-x-visible'}`}>
         <div className={`min-h-screen bg-gray-100 sidebar ${isSidebarOpen ? 'md:w-[3.35rem] ' : 'w-18 '} `}>
            {/* Toggle button */}
            <div className="flex h-screen flex-col bg-gray-100  justify-between pt-2 pb-6 ">
               <div>
                  <ul className="mt-6 space-y-2 tracking-wide">
                     {sidebarItems.map((item, index) => (item?.navigation&&(
                        <li className="min-w-max hover:bg-white rounded-xl" key={index}>
                           <a
                              href={`${item?.navigation}`}
                              className={`group flex items-center space-x-4 rounded-md pl-2 md:px-4 py-3 text-gray-600 ${activeItem === item.text ? 'bg-gradient-to-r from-sky-600 to-cyan-400 text-white' : ''
                                 }`}
                              onClick={() => handleItemClick(item?.text||'')}
                           >
                              {item?.svg}
                              <span className="group-hover:text-gray-700">{isSidebarOpen ? item?.text : ''}</span>
                           </a>
                        </li>)
                     ))}
                  </ul>
                  <div className="fixed bottom-0 left-0 right-0 p-1 md:p-2">
                     {/* Place your button content here */}
                     <button
                        className="bg-[rgba(37,169,189,0.97)] rounded-full p-2 shadow-lg"
                        // 👇 set the collapsed state on click
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <Icon className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}



