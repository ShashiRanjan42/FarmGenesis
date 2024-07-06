import { createSlice } from "@reduxjs/toolkit";
import { notiAction } from "./notificationSlice";
import { farmerapi } from "../Services/apis";

const { UNIQUE_FARMER_API } = farmerapi;

const farmerSlice = createSlice({
    name: "farmer",
    initialState: {
        crop_details: []
    },
    reducers: {
        getcostings(state, action) {
            state.crop_details = action.payload.data;
        }
    }
});

export const farmerActions = farmerSlice.actions;

export const GetCosts = (id) => {
    return async (dispatch) => {
        try {
            console.log(id);
            const response = await fetch(`http://localhost:8000/api/farmer/UniqueFarmer/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const json = await response.json();
            console.log(json);

            if (!response.ok) {
                throw new Error('Details Fetching Failed !!');
            }

            dispatch(farmerActions.getcostings({ data: json }));
        } catch (error) {
            dispatch(notiAction.enableNotification({
                message: error.message || "Details Fetching Failed !!",
                heading: "Failed"
            }));

            setTimeout(() => {
                dispatch(notiAction.disableNotification());
            }, 2000);
        }
    };
};

export default farmerSlice.reducer;
