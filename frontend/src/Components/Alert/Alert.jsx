import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const alertState = useSelector((state) => state.noti);
  return (
    <div className={`fixed ${alertState.showNoti ? 'bottom-0 right-0 translate-y-0' : '-bottom-full -right-full translate-y-full'} w-90 max-w-xs md:w-80 md:max-w-sm p-4 md:p-5 m-4 md:m-5 bg-white border-2 border-black rounded-lg shadow-md transform transition-transform duration-300`}>
      <h1 className="text-xl font-bold mb-2">{alertState.heading}</h1>
      <h4 className="text-base">{alertState.message}</h4>
    </div>
  );
};

export default Alert;
