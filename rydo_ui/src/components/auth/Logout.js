import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../store/authSlice";
import { useState } from "react";

import checkAuth from "./checkAuth";

import { FaCheckCircle } from "react-icons/fa";

function Logout() {

    const [showSuccess, setShowSuccess] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {

        const refreshToken = localStorage.getItem("refresh");
        const accessToken = localStorage.getItem("access");

        axios.post(
            "http://127.0.0.1:8000/auth/logout/",
            {
                refresh: refreshToken
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            }
        )
        .then(() => {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            dispatch(removeUser());
            // navigate("/login");
            
            setShowSuccess(true);

            setTimeout(() => {
            navigate("/login");
            }, 3000);
            })

        .catch(() => {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            dispatch(removeUser());
            navigate("/login");
        });
    };

    return (
        <>
        {showSuccess && (
                <div className="fixed top-25 left-0 right-0 flex justify-center z-50">
                    <div className="bg-red-100 border-red-500 border-1 text-red-500 px-6 py-4 rounded-md flex items-center gap-2">
                      <span className="font-red-500 "> <FaCheckCircle /> </span>
                        Logout successful!
                    </div>
                </div>
              )}

        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 text-center w-full max-w-xs sm:max-w-sm md:max-w-md">

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 mb-2">
            Sign Out?
            </h2>

            <p className="text-sm sm:text-base text-gray-500 mb-8">
            Are you sure you want to sign out of your account?
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">

            <button
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 text-sm sm:text-base"
            >
                Cancel
            </button>

            <button
                onClick={handleLogout}
                className="w-full sm:w-auto bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 text-sm sm:text-base"
            >
                Sign Out
            </button>

            </div>
        </div>
        </div>

        </>
    );
}


export default checkAuth(Logout);