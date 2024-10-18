import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const FooterComponent = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        
        {/* Company Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">StoxyDom</h2>
          <p className="text-sm text-gray-400">
            Your go-to platform for real-time stock data, news, and insights. Stay updated and make informed investment decisions with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="/about" className="hover:text-blue-400 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-blue-400 transition">Contact</a></li>
            <li><a href="/terms" className="hover:text-blue-400 transition">Terms of Service</a></li>
          </ul>
        </div>

        {/* Market Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Market</h2>
          <ul className="space-y-2">
            <li><a href="/stocks" className="hover:text-blue-400 transition">Stocks</a></li>
            <li><a href="/cryptocurrency" className="hover:text-blue-400 transition">Cryptocurrency</a></li>
            <li><a href="/commodities" className="hover:text-blue-400 transition">Commodities</a></li>
            <li><a href="/indices" className="hover:text-blue-400 transition">Indices</a></li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} StoxyDom. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
