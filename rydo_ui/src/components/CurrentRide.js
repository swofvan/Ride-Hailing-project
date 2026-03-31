import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import { Link } from "react-router-dom";

function CurrentRide() {

  const [ride, setRide] = useState(null);

  function fetchRide() {

    const token = localStorage.getItem("access");

    axios.get(
      // "http://127.0.0.1:8000/user/current_ride/",
      "http://localhost:8000/user/current_ride/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    
    .then((response) => {
      setRide(response.data);
    })
    
    .catch((error) => {

      if (error.response && error.response.data.message) {
        setRide(null);
      }

      console.error(error);
    });
  }

  useEffect(() => {
    fetchRide();
  }, []);


  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Current Ride
            </h1>
          </div>

          {/* No Ride */}
          {!ride && (
            <div className="text-center py-12 text-gray-400 text-sm bg-white rounded-md shadow-sm border border-gray-100">
              No active ride
            </div>
          )}

          {/* Ride Card */}
          {ride && (
            <div className="bg-white rounded-md shadow-sm border border-gray-100 p-5 flex flex-col gap-4">

              {/* Top */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-800 text-lg">
                  Ride #{ride.id}
                </span>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 uppercase">
                  {ride.status}
                </span>
              </div>

              {/* Ride Type */}
              <div>
                <span className="text-xs text-gray-400">Ride Type</span>
                <p className="font-semibold text-gray-800 uppercase">
                  {ride.ride_type}
                </p>
              </div>

              {ride.driver_name ? (
                <>
              {/* Driver */}
              <div>
                <span className="text-xs text-gray-400">Driver</span>
                <p className="text-gray-700">{ride.driver_name}</p>
              </div>

              {/* Phone */}
              <div>
                <span className="text-xs text-gray-400">Phone</span>
                <p className="text-gray-700">{ride.driver_name}</p>
              </div>

              {/* V.Number */}
              <div>
                <span className="text-xs text-gray-400">Vehicle Number</span>
                <p className="text-gray-700">{ride.vehicle_number}</p>            
              </div>
              </>
              ) : (
                <div className="text-sm text-gray-400">
                  Waiting for driver assignment...
                </div>
              )}

              {/* Locations */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 text-sm">
                  <span className="font-semibold text-gray-600 min-w-[60px]">
                    Pickup:
                  </span>
                  <span className="text-gray-500">
                    {ride.pickup_address}
                  </span>
                </div>

                <div className="flex gap-2 text-sm">
                  <span className="font-semibold text-gray-600 min-w-[60px]">
                    Drop:
                  </span>
                  <span className="text-gray-500">
                    {ride.drop_address}
                  </span>
                </div>
              </div>

              {/* Distance & Fare */}
              <div className="flex gap-6 pt-2">
                <div>
                  <span className="text-gray-400 text-xs">Distance</span>
                  <p className="font-semibold text-gray-700">
                    {ride.distance} km
                  </p>
                </div>

                <div>
                  <span className="text-gray-400 text-xs">Fare</span>
                  <p className="font-bold text-gray-800">
                    ₹ {ride.fare}
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CurrentRide;