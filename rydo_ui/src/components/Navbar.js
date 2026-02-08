import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import logo from "../images/Rydo_logo_w.svg";

function Navbar() {
  return (
  //   <nav className="bg-[#333333] text-white">
    <nav className="bg-gray-800 text-white">
      <div className="flex items-center justify-between max-w-7x2 mx-auto px-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-blue-400 ml-4">
            <img src={logo} alt="Rydo Logo" className="w-20" />
          </Link>

          {/* Navigation Links */}
          <div className="flex h-full gap-4 ml-20">
            <NavLink
              to="/"
              className={function(props) {
                return props.isActive
                  ? "text-white border-b-2 border-blue-500 py-5 px-4 font-medium"
                  : "text-gray-400 hover:text-white py-5 px-4 font-medium border-b-2 border-transparent"
              }}
            >
              Home
            </NavLink>
            
            <NavLink
              to="/"
              className={function(props) {
                return props.isActive
                  ? "text-white border-b-2 border-blue-500 py-5 px-4 font-medium"
                  : "text-gray-400 hover:text-white py-5 px-4 font-medium border-b-2 border-transparent"
              }}
            >
              Ride
            </NavLink>
            
            <NavLink
              to="/"
              className={function(props) {
                return props.isActive
                  ? "text-white border-b-2 border-blue-500 py-5 px-4 font-medium"
                  : "text-gray-400 hover:text-white py-5 px-4 font-medium border-b-2 border-transparent"
              }}
            >
              Drive
            </NavLink>
            
            <NavLink
              to="/"
              className={function(props) {
                return props.isActive
                  ? "text-white border-b-2 border-blue-500 py-5 px-4 font-medium"
                  : "text-gray-400 hover:text-white py-5 px-4 font-medium border-b-2 border-transparent"
              }}
            >
              About
            </NavLink>
          </div>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center gap-4 py-4">
          {/* Notification Icon */}
          <button className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          {/* Profile Picture */}
          <button className="w-10 h-10 rounded-full overflow-hidden bg-orange-400">
            <img 
              src="https://via.placeholder.com/40" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;