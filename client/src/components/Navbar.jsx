import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUtensils, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = ({ textWhite }) => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 glass-morphism shadow-lg ${
        textWhite ? 'text-white' : 'text-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold font-sans tracking-tight">
              Restaurant Finder
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" icon={<FaHome />} text="Home" textWhite={textWhite} />
            <NavLink to="/restaurants" icon={<FaUtensils />} text="Restaurants" textWhite={textWhite} />
            <NavLink to="/search" icon={<FaSearch />} text="Search" textWhite={textWhite} />
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <Link to="/" className="nav-icon">
              <FaHome size={24} />
            </Link>
            <Link to="/restaurants" className="nav-icon">
              <FaUtensils size={24} />
            </Link>
            <Link to="/search" className="nav-icon">
              <FaSearch size={24} />
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const NavLink = ({ to, icon, text, textWhite }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition duration-200 ${
      textWhite
        ? 'hover:bg-white/10'
        : 'hover:bg-gray-100'
    }`}
  >
    {icon}
    <span className="font-medium">{text}</span>
  </Link>
);

export default Navbar;