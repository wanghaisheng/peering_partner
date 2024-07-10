// components/Footer.tsx
import React from 'react';
import { FaTwitter, FaLinkedin, FaFacebook, FaYoutube, FaSearch } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer id="footer" className="fusion-footer-copyright-area bg-white text-black md:py-8 px-8 text-right">
      <div className="fusion-row">
        <div className="fusion-footer-copyright-area bg-white text-black p-8 text-left">
          <hr style={{ borderTop: '2px solid #333' }} />
          {/* Rest of your content */}
        </div>

        <div className="fusion-copyright-content text-right">
          <div className="fusion-copyright-notice" style={{ paddingBottom: '0px' }}>
            <div>
              &copy; Copyright 2017 - {new Date().getFullYear()} | All Rights Reserved | Powered by{' '}
              <a href="https://peeringpartner.com" target="_blank" rel="noopener noreferrer">
                <b>PeeringPartner</b>
              </a>
              {' | '}
              <a href="https://peeringpartner.com/privacy-policy/" target="_blank" rel="noopener noreferrer">
                <b>Privacy Policy</b>
              </a>
              {' | '}
              <a href="https://peeringpartner.com/terms-conditions/" target="_blank" rel="noopener noreferrer">
                <b>Terms of Use</b>
              </a>

            </div>
            {/* <div>
              <a href="https://twitter.com/PeeringPartner" className="text-black text-2xl"><FaTwitter size={24} /></a>
              <a href="https://www.linkedin.com/company/peering-partner/" className="text-black text-2xl"><FaLinkedin size={24} /></a>
              <a href="https://www.facebook.com/peeringpartner" className="text-black text-2xl"><FaFacebook size={24} /></a>
              <a href="https://www.youtube.com/channel/UCgfyiBJt7lDKC4Pkb-4lZQw" className="text-black text-2xl"><FaYoutube size={24} /></a>
            </div> */}
          </div>

        </div>
      </div>
    </footer>
  );
};
