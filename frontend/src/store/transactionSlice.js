import { Transection } from "../Services/apis";  // Assuming Transection is correctly exported from "../Services/apis"
import { notiAction } from "./notificationSlice";
// import { createSlice } from "@reduxjs/toolkit";

const { TRANS_URL } = Transection;

export const addPayments = (data) => async (dispatch) => {
    dispatch(notiAction.enableNotification({
        message: "Transaction is being added",
        heading: "Payment Process"
    }));

    try {
        const response = await fetch(TRANS_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const json = await response.json();

        if (!response.ok) {
            throw new Error('Transaction failed! Please try again!');
        }

        console.log(json);


        dispatch(notiAction.enableNotification({
            message: "Payment Added successfully!",
            heading: "Success"
        }));

    } catch (error) {
        console.error('Error adding payment:', error);
        dispatch(notiAction.enableNotification({
            message: "Transaction failed! Please try again!",
            heading: "Failed"
        }));

    } finally {
        setTimeout(() => {
            dispatch(notiAction.disableNotification());
        }, 2000);
    }
};
