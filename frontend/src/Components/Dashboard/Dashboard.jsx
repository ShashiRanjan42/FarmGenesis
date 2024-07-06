import React from "react";
import { Outlet } from "react-router-dom";
// import "./Dashboard.css";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <>
      <div className="flex justify-center bg-gray-800">
        <Sidebar />
        <div className="w-[80%] h-[100%] bg-[#EEEEEE]  overflow-y-auto max-h-screen min-h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
