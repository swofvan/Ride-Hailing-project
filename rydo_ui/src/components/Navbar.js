import { useState } from "react";
import { NavLink, Link } from 'react-router-dom';

import logo from "../images/Rydo_logo_w.svg";

import { FaUser, FaBars, FaTimes  } from "react-icons/fa";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-zinc-900 text-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-blue-400 ml-4">
            <img src={logo} alt="Rydo Logo" className="w-18 md:w-20" />
          </Link>

          <div className="hidden md:flex h-full gap-4 ml-20">
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
              to="/ride-booking"
              className={function(props) {
                return props.isActive
                  ? "text-white border-b-2 border-blue-500 py-5 px-4 font-normal"
                  : "text-gray-400 hover:text-white py-5 px-4 font-medium border-b-2 border-transparent"
              }}
            >
              Ride
            </NavLink>
            
            <NavLink
              to="/drive"
              className={function(props) {
                return props.isActive
                  ? "text-white border-b-2 border-blue-500 py-5 px-4 font-normal"
                  : "text-gray-400 hover:text-white py-5 px-4 font-medium border-b-2 border-transparent"
              }}
            >
              Drive
            </NavLink>
            
            <NavLink
              to="/aboutus"
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

        <div className="hidden md:flex items-center gap-4 py-4">
          <div className="relative group">
            <button className="bg-white text-black px-4 py-1.5 rounded-md hover:bg-transparent hover:text-white hover:border-white border transition-colors duration-300 cursor-pointer">
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
                <NavLink 
                  to="/login" 
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-300 transition-colors cursor-pointer"
                >
                  Sign in
                </NavLink>
              </div>
            </div>
          </div>
          <NavLink
            to={'/profile'}
            className="flex items-center justify-center px-2 py-2 rounded-full text-gray-800 bg-white transition-all duration-300 hover:bg-transparent border border-transparent hover:text-white hover:border-1 hover:border-white cursor-pointer">
            <span className="text-[18px]"><FaUser /></span>
          </NavLink>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-5 text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-700 pb-4">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-white border-l-2 border-blue-500 px-4 py-3 font-normal block" : "text-gray-400 hover:text-white px-4 py-3 font-medium block"} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/ride-booking" className={({ isActive }) => isActive ? "text-white border-l-2 border-blue-500 px-4 py-3 font-normal block" : "text-gray-400 hover:text-white px-4 py-3 font-medium block"} onClick={() => setMenuOpen(false)}>Ride</NavLink>
          <NavLink to="/drive" className={({ isActive }) => isActive ? "text-white border-l-2 border-blue-500 px-4 py-3 font-normal block" : "text-gray-400 hover:text-white px-4 py-3 font-medium block"} onClick={() => setMenuOpen(false)}>Drive</NavLink>
          <NavLink to="#" className={({ isActive }) => isActive ? "text-white border-l-2 border-blue-500 px-4 py-3 font-normal block" : "text-gray-400 hover:text-white px-4 py-3 font-medium block"} onClick={() => setMenuOpen(false)}>About</NavLink>

          <div className="flex items-center gap-4 px-4 pt-4 border-t border-zinc-700 mt-2">
            <div className="relative group">
              <button className="bg-white text-black px-4 py-1.5 rounded-md hover:bg-transparent hover:text-white hover:border-white border transition-colors duration-300 cursor-pointer">
                Sign up
              </button>
              <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 cursor-pointer">
                <div className="py-1">
                  <NavLink to="/user-signup" className="block px-4 py-2 text-sm text-black hover:bg-gray-300 transition-colors cursor-pointer" onClick={() => setMenuOpen(false)}>Ride</NavLink>
                  <NavLink to="/driver-signup" className="block px-4 py-2 text-sm text-black hover:bg-gray-300 transition-colors cursor-pointer" onClick={() => setMenuOpen(false)}>Drive</NavLink>
                  <NavLink to="/login" className="block px-4 py-2 text-sm text-black hover:bg-gray-300 transition-colors cursor-pointer" onClick={() => setMenuOpen(false)}>Sign in</NavLink>
                </div>
              </div>
            </div>
            <NavLink
              to={'/profile'}
              className="flex items-center justify-center px-2 py-2 rounded-full text-gray-800 bg-white transition-all duration-300 hover:bg-transparent border border-transparent hover:text-white hover:border-1 hover:border-white cursor-pointer"
              onClick={() => setMenuOpen(false)}>
              <span className="text-[18px]"><FaUser /></span>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;