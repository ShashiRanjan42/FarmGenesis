import React, { useEffect, useState } from "react";
import { GetAllCrops } from "../../store/cropSlice";
import { useDispatch, useSelector } from "react-redux";
import CropCardBuy from "./BuyCropCard";

const BuyCrops = () => {
  const [crops, setCrops] = useState([]);
  const dispatch = useDispatch();
  const cropsData = useSelector((store) => store.crops);

  useEffect(() => {
    dispatch(GetAllCrops());
    setCrops(cropsData.all_crops);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cropsData]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Buy Crops</h1>
        </div>
        <div className="text-lg font-bold mb-4">Available Crops</div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {crops.map((crop) => (
            <CropCardBuy key={crop.id} crop={crop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyCrops;
