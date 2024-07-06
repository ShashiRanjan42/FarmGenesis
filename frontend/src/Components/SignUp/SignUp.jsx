import React, { useContext, useState } from "react";
import SignUpContext from "../../contexts/SignUpContext/SignUpContext";
import { useDispatch } from "react-redux";
import { signup } from "../../store/authSlice";

const SignUp = () => {
  const signupcontext = useContext(SignUpContext);
  const { hideSignUp } = signupcontext;
  const dispatch = useDispatch();
  const [Farmer, setFarmer] = useState("Farmer");
  const [warning, setWarning] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    isFarmer: Farmer,
    password: "",
  });

  const InputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signup(data));
    console.log(data);
    hideSignUp();
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-40 flex items-center justify-center z-10">
      <div className="bg-white h-[720px] w-[800px] relative flex rounded-md" style={	{transform: "scale(.7)" }}>
        <div className="w-1/2 h-full p-8 flex flex-col">
          <h1 className="text-2xl font-semibold text-[#02c39a]">Sign Up</h1>
          <form className="flex flex-col flex-grow mt-10">
            <div className="flex flex-col mb-4">
              <label className="mb-2 text-lg font-medium text-gray-700">Name</label>
              <input
                className="p-2 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#02c39a]"
                name="name"
                value={data.name}
                onChange={InputChange}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-2 text-lg font-medium text-gray-700">Email</label>
              <input
                className="p-2 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#02c39a]"
                type="email"
                name="email"
                value={data.email}
                onChange={InputChange}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-2 text-lg font-medium text-gray-700">Contact</label>
              <input
                className="p-2 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#02c39a]"
                type="number"
                name="contact"
                value={data.contact}
                onChange={InputChange}
              />
            </div>

            <div className="flex flex-col mb-4">
              <p className="mb-2 text-lg font-medium text-gray-700">Please select one of the options</p>
              <select
                className="p-2 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#02c39a]"
                onChange={(e) => {
                  setFarmer(e.target.value);
                  data.isFarmer = e.target.value;
                }}
              >
                <option value="Farmer" className="text-sm font-medium">Farmer</option>
                <option value="Wholeseller" className="text-sm font-medium">Wholeseller</option>
              </select>
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-2 text-lg font-medium text-gray-700">Password</label>
              <input
                className="p-2 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#02c39a]"
                type="password"
                name="password"
                value={data.password}
                onChange={InputChange}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-2 text-lg font-medium text-gray-700">Confirm Password</label>
              <input
                className="p-2 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#02c39a]"
                type="password"
                onChange={(e) => {
                  if (e.target.value !== data.password) {
                    setWarning(true);
                  } else {
                    setWarning(false);
                  }
                }}
              />
              {warning && <p className="text-red-500 text-xs">Passwords don't match</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={(e) => handleSignUp(e)}
            >
              Sign Up
            </button>
          </form>
        </div>

        <div className="w-1/2 h-full flex items-center justify-center bg-cover bg-center relative"
          style={{ backgroundImage: `url("https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`}}>
          <div className="flex items-end opacity-90">
              <h1 className="text-7xl font-bold text-green-600">F</h1>
              <h2 className="text-6xl text-white">arm</h2>
              <h2 className="text-6xl text-slate-950">G</h2>
              <h2 className="text-6xl text-white">enesis</h2>
            </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="45"
          height="45"
          fill="#ffffff"
          className="absolute top-4 right-4 cursor-pointer rotate-45"
          onClick={() => hideSignUp()}
        >
          <path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z" />
        </svg>

      </div>
    </div>
  );
};

export default SignUp;
