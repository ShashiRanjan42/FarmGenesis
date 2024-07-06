import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddCrop, FarmerCrops } from "../../store/cropSlice";
import CropCard from "./SellCropCard";

const SellCrops = () => {
  const [addPop, setAddPop] = useState(false);
  const [crops, setCrops] = useState([]);
  const dispatch = useDispatch();

  const crops_data = useSelector((store) => store.crops);

  useEffect(() => {
    dispatch(FarmerCrops());
    setCrops(crops_data.farmer_crops);
    // eslint-disable-next-line
  }, [crops_data]);

  return (
    <div className="p-8 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Sell Crops</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
          onClick={() => setAddPop(true)}
        >
          Add Crops
        </button>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Your Crops</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {crops.map((crop) => (
            <CropCard key={crop._id} crop={crop} />
          ))}
        </div>
      </div>
      {addPop && <AddCropModal setAddPop={setAddPop} />}
    </div>
  );
};

const AddCropModal = ({ setAddPop }) => {
  const [cropname, setCropname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [perkg, setPerkg] = useState("");
  const dispatch = useDispatch();

  const handleAddCrop = (e) => {
    e.preventDefault();
    const data = {
      email: localStorage.getItem("userData"),
      cropName: cropname,
      quantity: quantity,
      perKgPrice: perkg,
    };
    dispatch(AddCrop(data));
    setCropname("");
    setQuantity("");
    setPerkg("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold mb-4">Add new crop</h1>
          <h1 className="cursor-pointer font-bold" onClick={() => setAddPop(false)}>X</h1>
        </div>

        <form className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="cropname" className="text-sm text-gray-600">
              Name
            </label>
            <input
              id="cropname"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              type="text"
              value={cropname}
              onChange={(e) => setCropname(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="quantity" className="text-sm text-gray-600">
              Quantity
            </label>
            <input
              id="quantity"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="perkg" className="text-sm text-gray-600">
              Price Per Kg.
            </label>
            <input
              id="perkg"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              type="number"
              value={perkg}
              onChange={(e) => setPerkg(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
            onClick={handleAddCrop}
            type="submit"
          >
            Add Crop
          </button>
        </form>
        
      </div>

    </div>
  );
};

export default SellCrops;
