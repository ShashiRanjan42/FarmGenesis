import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SellCrop from "../../assets/svgs/box.svg";
import CropIcon from "../../assets/svgs/sprout.svg";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [select, setSelect] = useState(1);
  const user_data = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div className="w-full sm:w-64 flex flex-col items-center bg-gray-800 text-white min-h-screen p-4">
      <div className="flex items-end">
        <h1 className="text-3xl font-bold text-green-400">F</h1>
        <h2 className="text-xl text-white">armGenesis</h2>
      </div>
      <div className="mb-8 text-center mt-4">
        <h1 className="text-2xl font-bold">Hi 👋</h1>
        <h2 className="text-xl">{user_data.name}</h2>
      </div>
      <div className="w-full flex flex-col items-center">
        <Link to="stats" className="w-full">
          <button
            className={`w-full p-2 flex items-center justify-center mb-2 ${select === 1 ? "bg-blue-500" : "bg-gray-700"}`}
            onClick={() => setSelect(1)}
          >
            <i className="bi bi-bar-chart-fill text-2xl"></i>
            <h3 className="ml-2">Stats</h3>
          </button>
        </Link>
        {user_data.isFarmer && (
          <>
            <Link to="sellcrops" className="w-full">
              <button
                className={`w-full p-2 flex items-center justify-center mb-2 ${select === 2 ? "bg-blue-500" : "bg-gray-700"}`}
                onClick={() => setSelect(2)}
              >
                <img src={SellCrop} alt="sell crop" width="25px" className="invert" />
                <h3 className="ml-2">Sell Crops</h3>
              </button>
            </Link>
            <Link to="analysecrop" className="w-full">
              <button
                className={`w-full p-2 flex items-center justify-center mb-2 ${select === 3 ? "bg-blue-500" : "bg-gray-700"}`}
                onClick={() => setSelect(3)}
              >
                <img src={CropIcon} alt="analyse crop" width="25px" className="invert" />
                <h3 className="ml-2">Analyse Crops</h3>
              </button>
            </Link>
            <Link to="analysesoil" className="w-full">
              <button
                className={`w-full p-2 flex items-center justify-center mb-2 ${select === 4 ? "bg-blue-500" : "bg-gray-700"}`}
                onClick={() => setSelect(4)}
              >
                <img src={CropIcon} alt="analyse soil" width="25px" className="invert" />
                <h3 className="ml-2">Analyse Soil</h3>
              </button>
            </Link>
            <Link to="schemes" className="w-full">
              <button
                className={`w-full p-2 flex items-center justify-center mb-2 ${select === 5 ? "bg-blue-500" : "bg-gray-700"}`}
                onClick={() => setSelect(5)}
              >
                <i className="bi bi-card-heading text-2xl"></i>
                <h3 className="ml-2">Govt. Schemes</h3>
              </button>
            </Link>
          </>
        )}
        {!user_data.isFarmer && (
          <Link to="buycrops" className="w-full">
            <button
              className={`w-full p-2 flex items-center justify-center mb-2 ${select === 6 ? "bg-blue-500" : "bg-gray-700"}`}
              onClick={() => setSelect(6)}
            >
              <i className="bi bi-bag-fill text-2xl"></i>
              <h3 className="ml-2">Buy Crops</h3>
            </button>
          </Link>
        )}
        <Link to="settings" className="w-full">
          <button
            className={`w-full p-2 flex items-center justify-center mb-2 ${select === 7 ? "bg-blue-500" : "bg-gray-700"}`}
            onClick={() => setSelect(7)}
          >
            <i className="bi bi-gear-fill text-2xl"></i>
            <h3 className="ml-2">Settings</h3>
          </button>
        </Link>
        <button className="w-full p-2 flex items-center justify-center bg-gray-700" onClick={() => handleLogout()}>
          <i className="bi bi-box-arrow-left text-2xl"></i>
          <h3 className="ml-2">Log Out</h3>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
