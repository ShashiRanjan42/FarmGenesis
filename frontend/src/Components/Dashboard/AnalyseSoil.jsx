import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { analyseSoilHandler } from "../../store/analyzeSoil";
import { langActions } from "../../store/languageSlice";

const AnalyseSoil = () => {
  const langData = useSelector((state) => state.lang);
  const soilData = useSelector((state) => state.soil);
  const dispatch = useDispatch();
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorous, setPhosphorous] = useState("");
  const [phLevel, setPhLevel] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [potassium, setPotassium] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      analyseSoilHandler({
        nitrogen,
        phosphorous,
        potassium,
        temperature,
        humidity,
        phLevel,
        rainfall,
      })
    );
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Analyse Soil</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-bold mb-2">Enter The Soil Data</h2>
            <form onSubmit={submitHandler} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Nitrogen (%)</label>
                <input
                  className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  type="number"
                  value={nitrogen}
                  onChange={handleInputChange(setNitrogen)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Phosphorus (%)</label>
                <input
                  className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  type="number"
                  value={phosphorous}
                  onChange={handleInputChange(setPhosphorous)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Potassium (%)</label>
                <input
                  className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  type="number"
                  value={potassium}
                  onChange={handleInputChange(setPotassium)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">PH Level</label>
                <input
                  className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  type="number"
                  value={phLevel}
                  onChange={handleInputChange(setPhLevel)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Temperature (°C)</label>
                <input
                  className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  type="number"
                  value={temperature}
                  onChange={handleInputChange(setTemperature)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Humidity</label>
                <input
                  className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  type="number"
                  value={humidity}
                  onChange={handleInputChange(setHumidity)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Rainfall</label>
                <input
                  className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  type="number"
                  value={rainfall}
                  onChange={handleInputChange(setRainfall)}
                />
              </div>
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
                type="submit"
              >
                Analyse Soil
              </button>
            </form>
          </div>
          <div>

            <div className="analysis__result">
              <h2 className="text-lg font-bold mb-2">Result</h2>
              <p className="text-sm text-gray-700 font-bold">
                {soilData.cropName ? (
                  `Crop Name: ${soilData.cropName}`
                ) : langData.lang === "HI" ? (
                  `मृदा स्वास्थ्य कार्ड (एसएचसी) भारत के कृषि विभाग द्वारा प्रदान की जाने वाली एक योजना है जिसमें वे मिट्टी के स्वास्थ्य का आकलन करने के लिए एक उपयोगकर्ता के अनुकूल, इसे स्वयं करें उपकरण प्रदान कर रहे हैं जिसमें 12 मानकों के संबंध में उसकी मिट्टी की स्थिति शामिल होगी, अर्थात् एन, पी, के (मैक्रो-पोषक तत्व); एस (माध्यमिक- पोषक तत्व); Zn, Fe, Cu, Mn, Bo (सूक्ष्म - पोषक तत्व); और पीएच, ईसी, ओसी (भौतिक पैरामीटर)।`
                ) : (
                  `Soil Health Card (SHC) is a Scheme provided by Agriculture Department of India in which they are providing a user-friendly, do-it-yourself tool to assess soil health which will contain the status of his soil with respect to 12 parameters, namely N, P, K (Macro-nutrients); S (Secondary- nutrient); Zn, Fe, Cu, Mn, Bo (Micro - nutrients); and pH, EC, OC (Physical parameters).`
                )}
              </p>
            </div>

            <button
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
              onClick={() => {
                dispatch(
                  langActions.changeLang(langData.lang === "EN" ? "HI" : "EN")
                );
              }}
            >
              Translate Text
            </button>

          </div>
        </div>
      </div>

      
    </div>
  );
};

export default AnalyseSoil;
