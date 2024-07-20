import React, { useState } from "react";
import { payment } from "../../Services/apis"; // Assuming payment is correctly imported from "../../Services/apis"
import { useDispatch } from "react-redux";
import { addPayments } from "../../store/transactionSlice";

const CropCardBuy = ({ crop }) => {
  const { CAP_PAY, VER_PAY } = payment;
  const [paymentData, setPaymentData] = useState(null);
  const dispatch = useDispatch();

  // console.log(crop);

  const createPayment = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Create a payment on CAP_PAY endpoint
      const response = await fetch(CAP_PAY, {
        method: "POST",
        body: JSON.stringify({
          amount: crop.perKgPrice * crop.quantity * 100,
          currency: "INR",
          receipt: "receiptID",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const order = await response.json();
      console.log(order);

      // Step 2: Initialize Razorpay
      var options = {
        key: "rzp_test_t4LUM04KXw6wHc", // Replace with your actual Razorpay Key ID
        amount: crop.perKgPrice * crop.quantity * 100, // Amount is in currency subunits. Default currency is INR.
        currency: "INR",
        name: "FarmGenesis", // Your business name
        description: "Test Transaction",
        image: "/logo.png", // Assuming logo.png is in the public folder
        order_id: order.id,
        handler: async function (response) {
          const body = {
            ...response,
          };

          // Step 3: Verify payment on VER_PAY endpoint
          const validateRes = await fetch(VER_PAY, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const jsonRes = await validateRes.json();
          console.log(jsonRes);

          if (jsonRes.msg === 'success') {
            // Update paymentData state
            const updatedpaymentData = {
              email: localStorage.getItem("userData"),
              farmerEmail: crop.email,
              cropName: crop.cropName,
              quantity: crop.quantity,
              amount: order.amount / 100,
              orderId: jsonRes.orderId,
              paymentId: jsonRes.paymentId,
            };
            setPaymentData(updatedpaymentData);

            // Dispatch action to update Redux store
            dispatch(addPayments(updatedpaymentData));

            // Reset paymentData state after dispatch
            setPaymentData(null);

            // Send SMS and Email notifications
            sendSMS("customerPhoneNumber", "Your payment has been successful.");
            sendEmail("customerEmail", "Payment Successful", "Your payment has been successful.");
          }
        },
        prefill: {
          name: "Web Dev Matrix", // Your customer's name
          email: "webdevmatrix@example.com",
          contact: "9000000000", // Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#06D001",
        },
      };

      var rzp1 = new window.Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      // Open Razorpay payment dialog
      rzp1.open();
    } catch (error) {
      console.error("Error creating payment:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  // Placeholder function for sending SMS
  function sendSMS(to, message) {
    // Implement your SMS sending logic here
  }

  // Placeholder function for sending Email
  async function sendEmail(to, subject, text) {
    // Implement your email sending logic here
  }

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
