import React, { useContext } from "react";
import SignInContext from "../../contexts/SignInContext/SignInContext";
import { useDispatch } from "react-redux";
import { signin } from "../../store/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const signincontext = useContext(SignInContext);
  const { hideSignIn } = signincontext;
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // const {email, password} = data;

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(signin(data,navigate));
    // navigate("/dashboard/stats");
    hideSignIn();
  };

  const InputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-40 z-10 flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-[#02c39a]">Sign In</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="25"
            height="25"
            fill="#02c39a"
            className="cursor-pointer rotate-45"
            onClick={() => hideSignIn()}
          >
            <path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z" />
          </svg>
        </div>
        <form className="space-y-4">
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="email"
                type="email"
                onChange={InputChange}
                value={data.email}
                placeholder="user@gmail.com"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">Password</label>
              <input
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="password"
                type="password"
                onChange={InputChange}
                value={data.password}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={(e) => handleSignIn(e)}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default SignIn;
