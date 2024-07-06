import React, { useState } from "react";

const CropCardBuy = ({ crop }) => {
  const createPayment = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/transaction/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: crop.rateperkg * crop.quantity,
          desc: "Farmer crop sell",
          customer_name: crop.email,
          customer_email: crop.email,
          customer_contact: crop.email,
          notesObj: {
            farmer: crop.email,
            quantity: crop.quantity,
            amount: crop.rateperkg * crop.quantity,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Server error: ${errorData.message}`);
      }

      const data = await response.json();

      if (!data.paymentLink || !data.paymentLink.short_url) {
        throw new Error("Invalid response from server: Missing payment link URL");
      }

      window.location.href = data.paymentLink.short_url;
    } catch (error) {
      console.error("Error creating payment:", error.message);
      alert(`Error creating payment: ${error.message}`);
      // Handle error gracefully, show message to user or retry option
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h1 className="text-2xl font-bold mb-4">{crop.cropName}</h1>
      <div className="mb-4">
        <h2 className="text-xl">{crop.quantity} Kg</h2>
        <p className="text-gray-700">At Rs. {crop.rateperkg} per Kg</p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">Farmer Details</p>
        <p className="text-gray-700">{crop.email}</p>
      </div>
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
        onClick={createPayment}
      >
        Buy Now
      </button>
    </div>
  );
};

export default CropCardBuy;
