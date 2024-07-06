import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import SignInContext from "../../contexts/SignInContext/SignInContext";
import SignUpContext from "../../contexts/SignUpContext/SignUpContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { showSignUp } = useContext(SignUpContext);
  const { showSignIn } = useContext(SignInContext);

  const toggleNav = () => setNav(!nav);

  return (
    <nav className="shadow-md fixed w-full z-5">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">
            <div className="flex items-end mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-green-400">F</h1>
              <h2 className="text-xl text-white">armGenesis</h2>
            </div>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-green-200 hover:text-green-400">
            About
          </Link>
          <button className="text-green-200 hover:text-green-400" onClick={showSignUp}>
            Sign Up
          </button>
          <button className="text-green-200 hover:text-green-400" onClick={showSignIn}>
            Sign In
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleNav} className="text-gray-800">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      {nav && (
        <div className="md:hidden bg-white">
          <ul className="space-y-2 px-6 py-3">
            <li>
              <Link to="/" className="block text-gray-600 hover:text-gray-800" onClick={() => setNav(false)}>
                About
              </Link>
            </li>
            <li>
              <button
                className="block text-gray-600 hover:text-gray-800 w-full text-left"
                onClick={() => {
                  setNav(false);
                  showSignUp();
                }}
              >
                Sign Up
              </button>
            </li>
            <li>
              <button
                className="block text-gray-600 hover:text-gray-800 w-full text-left"
                onClick={() => {
                  setNav(false);
                  showSignIn();
                }}
              >
                Sign In
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
