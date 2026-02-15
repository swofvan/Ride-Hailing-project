import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import logo from "../images/Rydo_logo_w.svg";

import { FaUser  } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-blue-400 ml-4">
            <img src={logo} alt="Rydo Logo" className="w-20" />
          </Link>

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
              to="#"
              className={function(props) {
                return props.isActive
                  ? "text-white border-b-2 border-blue-500 py-5 px-4 font-normal"
                  : "text-gray-400 hover:text-white py-5 px-4 font-medium border-b-2 border-transparent"
              }}
            >
              Ride
            </NavLink>
            
            <NavLink
              to="#"
              className={function(props) {
                return props.isActive
                  ? "text-white border-b-2 border-blue-500 py-5 px-4 font-normal"
                  : "text-gray-400 hover:text-white py-5 px-4 font-medium border-b-2 border-transparent"
              }}
            >
              Drive
            </NavLink>
            
            <NavLink
              to="#"
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


        <div className="flex items-center gap-4 py-4">
          <div className="relative group">
            <button className="bg-white text-black px-4 py-1.5 rounded-md hover:bg-gray-800 hover:text-white hover:border-white border transition-colors duration-300 cursor-pointer">
              Sign up
            </button>
            
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 cursor-pointer">
              <div className="py-1">

                <NavLink 
                  to="/user-signup" 
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-300 transition-colors cursor-pointer"
                >
                  Ride
                </NavLink>

                <NavLink 
                  to="/driver-signup" 
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-300 transition-colors cursor-pointer"
                >
                  Drive
                </NavLink>

              </div>
            </div>
          </div>
          <NavLink className="flex items-center justify-center px-2 py-2 rounded-full text-gray-800 bg-white transition-all duration-300 hover:bg-transparent border-1 border-transparent hover:text-white hover:border-1 hover:border-white cursor-pointer">
              <span className="text-[18px]"><FaUser /></span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;