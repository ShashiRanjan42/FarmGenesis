import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import SignInContext from "../../contexts/SignInContext/SignInContext";
import SignUpContext from "../../contexts/SignUpContext/SignUpContext";

export default function Footer() {
  const signupcontext = useContext(SignUpContext);
  const { showSignUp } = signupcontext;
  const signincontext = useContext(SignInContext);
  const { showSignIn } = signincontext;

  return (
    <div className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        <div>
          <span className="text-lg font-bold mb-4 block">CONTENT</span>
          <ul>
            <li className="mb-2">Buy Crops</li>
            <li className="mb-2">Sell Crops</li>
            <li className="mb-2">Analyse Soil</li>
            <li className="mb-2">Analyse Desease</li>
          </ul>
        </div>

        <div>
          <span className="text-lg font-bold mb-4 block">INFORMATION</span>
          <ul>
            <li className="mb-2">Contact Us</li>
            <li className="mb-2">About us</li>
            <li className="mb-2">Pricing</li>
            <li className="mb-2">Join us</li>
          </ul>
        </div>

        <div>
          <span className="text-lg font-bold mb-4 block">LEGAL</span>
          <ul>
            <li className="mb-2">Terms & Condition</li>
            <li className="mb-2">Privacy Policies</li>
            <li className="mb-2">My Wishlist</li>
            <li className="mb-2">Help</li>
          </ul>
        </div>

        <div>
          <div className="text-lg font-bold mb-4">SOCIAL</div>
          <div className="flex space-x-4 mb-4">
            <Link to="#">
              <button className="p-2 bg-blue-600 rounded-full hover:bg-blue-700">
                <FaFacebook />
              </button>
            </Link>
            <Link to="#">
              <button className="p-2 bg-pink-600 rounded-full hover:bg-pink-700">
                <FaInstagram />
              </button>
            </Link>
            <Link to="#">
              <button className="p-2 bg-blue-400 rounded-full hover:bg-blue-500">
                <FaTwitter />
              </button>
            </Link>
            <Link to="#">
              <button className="p-2 bg-red-600 rounded-full hover:bg-red-700">
                <FaYoutube />
              </button>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
              <button className="w-[50%] py-2 px-4 bg-green-600 rounded hover:bg-green-700" onClick={() => showSignIn()}>
                Sign IN
              </button>
              <button className="w-[50%] py-2 px-4 bg-green-600 rounded hover:bg-green-700" onClick={() => showSignUp()}>
                Sign Up
              </button>
          </div>
        </div>
      </div>
      <hr className="my-8 border-gray-600" />
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex items-end mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-green-600">F</h1>
          <h2 className="text-xl">armGenesis</h2>
        </div>
        <div className="text-sm text-gray-400">
          Copyright © 2021-2024 FarmGenesis Company S.R. All rights reserved.
        </div>
      </div>
    </div>
  );
}

