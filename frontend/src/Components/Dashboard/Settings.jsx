import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notiAction } from "../../store/notificationSlice";
import { endpoints } from "../../Services/apis";

const Settings = () => {
  const [pass, setPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [deletePass, setDeletePass] = useState("");
  const dispatch = useDispatch();
  const user_data = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const { CHANGE_PSS_API, DELETE_PSS_API } = endpoints;

  const handleChangePass = async (id, e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${CHANGE_PSS_API}/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: pass,
          newPassword: newPass,
        }),
      });
      const json = await response.json();
      if (json.status === 200) {
        dispatch(
          notiAction.enableNotification({
            message: "Password changed successfully!",
            heading: "Success",
          })
        );
        setTimeout(() => {
          dispatch(notiAction.disableNotification());
        }, 2000);
      } else {
        dispatch(
          notiAction.enableNotification({
            message: "Incorrect Password!",
            heading: "Failed",
          })
        );
        setTimeout(() => {
          dispatch(notiAction.disableNotification());
        }, 2000);
      }

      setPass("");
      setNewPass("");
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const deleteAccount = async (id, e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${DELETE_PSS_API}/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: deletePass,
        }),
      });
      const json = await response.json();
      if (json.status === 200) {
        dispatch(
          notiAction.enableNotification({
            message: "Account deleted successfully!",
            heading: "Success",
          })
        );
        setTimeout(() => {
          dispatch(notiAction.disableNotification());
          navigate("/"); // Redirect to homepage after deletion
        }, 2000);
      } else {
        dispatch(
          notiAction.enableNotification({
            message: "Incorrect Password!",
            heading: "Failed",
          })
        );
        setTimeout(() => {
          dispatch(notiAction.disableNotification());
        }, 2000);
      }

      setDeletePass("");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="bg-[#EEEEEE] min-h-screen flex flex-col justify-center items-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Settings</h1>
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Change Password</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Current Password</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1">New Password</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </div>
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
              onClick={(e) => handleChangePass(user_data.user_id, e)}
            >
              Change Password
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">Delete Account</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Password</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                type="password"
                value={deletePass}
                onChange={(e) => setDeletePass(e.target.value)}
              />
            </div>
            <button
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none"
              onClick={(e) => deleteAccount(user_data.user_id, e)}
            >
              Delete Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
