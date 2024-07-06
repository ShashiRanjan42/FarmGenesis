import React from "react";

const Card = ({ data }) => {
  return (
    <div
      className="relative h-64 w-full rounded-md bg-cover bg-center flex items-center justify-center cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-100"
      style={{
        backgroundImage: `linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.8)
        ), url(${data.image})`,
      }}
    >
      <h2 className="text-white text-2xl font-bold">{data.title}</h2>
      <div className="absolute inset-0 flex items-center rounded-md justify-center bg-slate-900 bg-opacity-80 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
        <p className="text-white text-center p-4">{data.desc}</p>
      </div>
    </div>
  );
};

export default Card;
