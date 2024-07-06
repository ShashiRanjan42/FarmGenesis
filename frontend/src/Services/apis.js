const BASE_URL = "https://farmgenesis-backend.onrender.com/api";
const BASE_URL_ML = "http://localhost:5000";

export const endpoints = {
    SIGNUP_API: BASE_URL + "/user/register",
    LOGIN_API: BASE_URL + "/user/login",
    CHANGE_PSS_API: BASE_URL + "/settingApi/changePassword",
    DELETE_PSS_API: BASE_URL + "/settingApi/deleteAccount"

}

export const scheme = { 
    SCHEME_API: BASE_URL + "/farmer/schemes" 
}

export const cropendpoint = {
    RECOMMEND_CROP_API : BASE_URL_ML + "/recommendCrop",
    DESEASE_CROP_API : BASE_URL_ML + "/diseasePredict"
}

export const cropapi = {
    ADD_CROP_API : BASE_URL + "/crop",
    GET_ALL_CROP_API : BASE_URL + "/crop/crops",
    FARMER_CROPS_API : BASE_URL + "/crop/farmercrops",
}

export const farmerapi = {
    FARMER_API : BASE_URL + "/farmer/Farmers",
    UNIQUE_FARMER_API : BASE_URL + "/farmer/UniqueFarmer",
}