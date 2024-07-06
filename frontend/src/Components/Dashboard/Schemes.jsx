import React, { useEffect, useState } from "react";
import { scheme } from "../../Services/apis";

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const { SCHEME_API } = scheme;

  const getSchemes = async () => {
    try {
      const response = await fetch( SCHEME_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch schemes");
      }
      const json = await response.json();
      if (json.status === 200) {
        setSchemes(json.message);
      } else {
        throw new Error(json.message || "Failed to fetch schemes");
      }
    } catch (error) {
      console.error("Error fetching schemes:", error);
    }
  };

  useEffect(() => {
    getSchemes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Schemes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-gray-700 rounded-lg shadow-md p-4 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
            >
              <h2 className="text-lg font-bold mb-2 text-[#ffffff]">{scheme.name}</h2>
              <p className="text-sm text-[#fffffff3] text-opacity-4.5">{scheme.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schemes;
