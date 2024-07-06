import { createSlice } from "@reduxjs/toolkit";
import { notiAction } from "./notificationSlice";
import { cropendpoint } from "../Services/apis";

const { RECOMMEND_CROP_API,DESEASE_CROP_API } = cropendpoint;

const soilSlice = createSlice({
    name : "soil",
    initialState : {
        cropName : undefined,
        confidenceRate : undefined,
        diseaseName : undefined,
        solution : undefined
    },
    reducers : {
        updateSoilData(state,action){
            state.cropName = action.payload.cropName;
            state.confidenceRate = action.payload.confidenceRate;
        },
        updateDiseaseData(state,action){
            state.diseaseName = action.payload.diseaseName;
            state.solution = action.payload.solution;
        }
    }
});
export const soilActions = soilSlice.actions;

export const analyseSoilHandler = (data) => {
    return async (dispatch) => {
        try {
            dispatch(notiAction.enableNotification({
                message: "Soil analysis in progress!",
                heading: "Analysing Soil"
            }));
            setTimeout(() => {
                dispatch(notiAction.disableNotification());
            }, 2000);

            const response = await fetch( RECOMMEND_CROP_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const jsonData = await response.json();
            // console.log(jsonData);

            if (!response.ok) {
                dispatch(notiAction.enableNotification({
                    message: "Soil analysis failed!",
                    heading: "Analysing Soil Failed"
                }));
                setTimeout(() => {
                    dispatch(notiAction.disableNotification());
                }, 2000);

            } else {
                dispatch(notiAction.enableNotification({
                    message: "Soil analysis completed!",
                    heading: "Analysing Soil Success"
                }));
                dispatch(soilActions.updateSoilData({
                    cropName: jsonData
                }));
                setTimeout(() => {
                    dispatch(notiAction.disableNotification());
                }, 2000);
            }
        } catch (error) {
            dispatch(notiAction.enableNotification({
                message: "Soil analysis encountered an error!",
                heading: "Analysing Soil Error"
            }));
            setTimeout(() => {
                dispatch(notiAction.disableNotification());
            }, 2000);
        }
    }
}


export const predictDisease = (imageData) => {
    return async (dispatch) => {
        dispatch(notiAction.enableNotification({
            message: "predicting disease in progress!",
            heading: "disease predicting"
        }))
        let response = await fetch(DESEASE_CROP_API,{
            method : "POST",
            body : imageData
        });
        let jsonData = await response.json();
        if(!response.ok){
            dispatch(notiAction.enableNotification({
                message: "predict Disease failed!",
                heading: "Predict Disease Failed"
            }))
        }
        else{
            dispatch(notiAction.enableNotification({
                message: "Predicting disease done!",
                heading: "Predict disease Success"
            }))
            dispatch(soilActions.updateDiseaseData({
                confidenceRate : jsonData.confidence,
                diseaseName : jsonData.disease.split(":")[0],
                solution : jsonData.disease.split(":")[1]
            }));
        }
    }
}
export default soilSlice;