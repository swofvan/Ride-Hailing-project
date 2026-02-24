import Navbar from "./Navbar";
import Footer from "./footer";

import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function UserProfile() {
    
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect (() => {
    
    const token = localStorage.getItem('access');
    
    if (!token) {
        navigate("/login");
        return;
    }

    
    axios.get('http://127.0.0.1:8000/user/profile/', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    .then ((response) => {
        setUserData(response.data);
    })

    .catch ((error) => {
        console.log("Error fetching profile:", error)
        
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("access");
            navigate("/login");
        }
    })
  }, [navigate])


  return (
    <div>
        <Navbar />

        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-2">Profile</h1>
            <p className="text-gray-600">Your account details</p>
            </div>

            { userData ? (

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    
                    
                <div className="bg-zinc-900 h-32 sm:h-40"></div>
                
                <div className="px-6 sm:px-8 py-8 -mt-16">
                    
                    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-1">{userData.name}</h2>
                    <p className="text-gray-500">{userData.email}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                            <h3 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">Phone Number</h3>
                            <p className="text-xl text-zinc-900 font-medium">{userData.phone}</p>
                        </div>
                {userData. vehicle_number && (
                        <>
                        
                            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
                                <h3 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">Vehicle Number</h3>
                                <p className="text-xl text-zinc-900 font-medium">{userData.vehicle_number}</p>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                                <h3 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">License Number</h3>
                                <p className="text-xl text-zinc-900 font-medium">{userData.license_number}</p>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                                <h3 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">Account Status</h3>
                                <p className="text-xl text-green-600 font-bold">{userData.status}</p>
                            </div>
                        
                        </>
                )}

                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button className="flex-1 bg-zinc-900 hover:bg-black text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
                            Edit Profile
                        </button>
                        <button className="flex-1 bg-red-600 hover:bg-red-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200">
                            Logout
                        </button>
                    </div>
                </div>
                </div>
                
            ) :
                    (
                        <p>Loading...</p>
                    )}
        </div>
        </div>

        <Footer />
    </div>
  );
}

export default UserProfile;
