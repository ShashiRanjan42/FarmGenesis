import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCrop } from "../../store/cropSlice";

const CropCard = ({ crop }) => {
  const [editPop, setEditPop] = useState(false);
  return (
    <div className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-lg">
      <div>
        <h1 className="text-xl font-bold">{crop.cropName}</h1>
        <div className="mt-2">
          <h2 className="text-lg">{crop.quantity} Kg</h2>
          <p>At Rs. {crop.perKgPrice} per Kg</p>
        </div>
      </div>
      <svg
        className="w-6 h-6 cursor-pointer text-blue-700"
        viewBox="0 0 20 20"
        fill="currentColor"
        onClick={() => setEditPop(true)}
      >
        <path
          fillRule="evenodd"
          d="M17.707 2.293a1 1 0 010 1.414l-12 12a1 1 0 01-1.414-1.414l12-12a1 1 0 011.414 0zM10 4h4a1 1 0 010 2h-4a1 1 0 010-2zm-2.293 6.707a1 1 0 010-1.414l8-8a1 1 0 011.414 1.414l-8 8a1 1 0 01-1.414 0zM8 12h6a1 1 0 110 2H8a1 1 0 110-2z"
          clipRule="evenodd"
        />
      </svg>
      {editPop && <EditCropPopup data={crop} setEditPop={setEditPop} />}
    </div>
  );
};

const EditCropPopup = ({ data, setEditPop }) => {
  const [cropname, setCropname] = useState(data.cropName);
  const [quant, setQuant] = useState(data.quantity);
  const [perkg, setPerkg] = useState(data.perKgPrice);

  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    const edited = {
      cropName: cropname,
      quantity: quant,
      perKgPrice: perkg,
    };
    dispatch(updateCrop(data._id, edited));
    setEditPop(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-10">
      <div className="bg-white max-w-3xl w-full p-8 rounded-lg shadow-lg flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">Edit Crop {cropname}</h1>
          <h1 className="cursor-pointer font-bold" onClick={() => setEditPop(false)}>X</h1>
        </div>

        <form className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="cropname" className="text-sm font-semibold">
              Name
            </label>
            <input
              id="cropname"
              type="text"
              value={cropname}
              onChange={(e) => setCropname(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="quantity" className="text-sm font-semibold">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              value={quant}
              onChange={(e) => setQuant(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="perkg" className="text-sm font-semibold">
              Price Per Kg.
            </label>
            <input
              id="perkg"
              type="number"
              value={perkg}
              onChange={(e) => setPerkg(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-green-500"
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md focus:outline-none"
            onClick={handleUpdate}
            type="submit"
          >
            Save
          </button>
        </form>

        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="absolute top-4 right-4 cursor-pointer w-6 h-6"
          onClick={() => setEditPop(false)}
        >
          <path
            fill="currentColor"
            d="M19 11H13V5a1 1 0 00-2 0v6H5a1 1 0 000 2h6v6a1 1 0 002 0v-6h6a1 1 0 000-2z"
          />
        </svg> */}

      </div>
    </div>
  );
};

export default CropCard;
