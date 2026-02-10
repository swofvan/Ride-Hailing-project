import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import logo from "../images/Rydo_logo_w.svg";

function Navbar() {
  return (
  //   <nav className="bg-[#333333] text-white">
    <nav className="bg-gray-800 text-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
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
                  ? "text-white border-b-2 border-blue-500 py-5 px-4 font-normal"
                  : "text-gray-400 hover:text-white py-5 px-4 font-medium border-b-2 border-transparent"
              }}
            >
              Home
            </NavLink>
            
            <NavLink
              to="/"
              className={function(props) {
                return props.isActive
                  ? "text-white border-b-2 border-blue-500 py-5 px-4 font-normal"
                  : "text-gray-400 hover:text-white py-5 px-4 font-medium border-b-2 border-transparent"
              }}
            >
              Ride
            </NavLink>
            
            <NavLink
              to="/"
              className={function(props) {
                return props.isActive
                  ? "text-white border-b-2 border-blue-500 py-5 px-4 font-normal"
                  : "text-gray-400 hover:text-white py-5 px-4 font-medium border-b-2 border-transparent"
              }}
            >
              Drive
            </NavLink>
            
            <NavLink
              to="/"
              className={function(props) {
                return props.isActive
                  ? "text-white border-b-2 border-blue-500 py-5 px-4 font-normal"
                  : "text-gray-400 hover:text-white py-5 px-4 font-medium border-b-2 border-transparent"
              }}
            >
              About
            </NavLink>
          </div>
        </div>

        {/* Right side - Notifications and Profile */}

        <div className="flex items-center gap-4 py-4">
          <button className="bg-white text-black px-4 py-1.5 rounded-md hover:bg-gray-800 hover:text-white hover:border-white border transition-colors duration-300">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;