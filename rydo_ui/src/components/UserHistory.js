import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./footer";
import checkAuth from "./auth/checkAuth";
import { Link, useParams } from "react-router-dom";
import { FaCheck  } from "react-icons/fa";



function UserHistory() {
  const [rides, setRides] = useState([]);

  const { rideId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("access");
    axios
      .get("http://127.0.0.1:8000/user/history/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRides(res.data))
      .catch((err) => console.log(err));
  }, []);

  const totalFare = rides.reduce((sum, r) => sum + r.fare, 0);
  const totalKm = rides.reduce((sum, r) => sum + r.distance, 0).toFixed(1);

  const statusClass = (status) => {
    if (status === "pending")
      return "px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700";
    if (status === "accepted")
      return "px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700";
    return "px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700";
  };

  const fmtDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }); 

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
              History
            </h1>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-md border border-gray-100 shadow-sm p-4">
              <p className="text-xs text-gray-400 mb-1">Total Rides</p>
              <p className="text-2xl font-bold text-zinc-900">{rides.length}</p>
            </div>
            <div className="bg-white rounded-md border border-gray-100 shadow-sm p-4">
              <p className="text-xs text-gray-400 mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-zinc-900">₹ {totalFare}</p>
            </div>
            <div className="bg-white rounded-md border border-gray-100 shadow-sm p-4">
              <p className="text-xs text-gray-400 mb-1">Km Covered</p>
              <p className="text-2xl font-bold text-zinc-900">{totalKm}</p>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-100 px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <div>Ride ID</div>
              <div>Pickup</div>
              <div>Drop</div>
              <div>Distance</div>
              <div>Fare</div>
              <div>Type</div>
              <div>Status</div>
              <div></div>
            </div>

            {rides.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">
                No ride history found.
              </div>
            ) : (
              rides.map((ride, index) => (
                <div
                  key={ride.id}
                  className={`grid grid-cols-8 items-center px-4 py-3.5 border-b border-gray-50 text-sm hover:bg-blue-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <div className="font-medium text-gray-700">#{ride.id}</div>
                  <div className="text-gray-500 text-xs pr-2">{ride.pickup_address}</div>
                  <div className="text-gray-500 text-xs pr-2">{ride.drop_address}</div>
                  <div className="text-gray-700">{ride.distance} km</div>
                  <div className="text-gray-700 font-semibold">₹ {ride.fare}</div>
                  <div className="text-zinc-900 font-semibold uppercase text-xs">
                    {ride.ride_type}
                  </div>
                  <div>
                    <span className={statusClass(ride.status)}>{ride.status}</span>
                  </div>
                  <div>
                    {ride.rating != null ? (
                      <span className="inline-flex justify-center items-center text-s font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded">
                        Review saved
                        <span className="ml-2 text-md"><FaCheck /></span>
                      </span>
                    ) : (
                    <Link
                      to={`/review/${ride.id}`}
                      className="inline-flex justify-center items-center gap-1 text-m font-medium text-white bg-zinc-900 hover:bg-zinc-700 px-3 py-1.5 rounded transition-colors"
                    >
                      Tap to rate
                    </Link>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-3">
            {rides.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm bg-white rounded-md shadow-sm border border-gray-100">
                No ride history found.
              </div>
            ) : (
              rides.map((ride) => (
                <div
                  key={ride.id}
                  className="bg-white rounded-md shadow-sm border border-gray-100 p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800 text-sm">#{ride.id}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium uppercase text-zinc-600 bg-gray-100 px-2 py-1 rounded">
                        {ride.ride_type}
                      </span>
                      <span className={statusClass(ride.status)}>{ride.status}</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-400">{fmtDate(ride.created_at)}</div>

                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2 text-xs">
                      <span className="font-semibold text-gray-600 min-w-[46px]">Pickup</span>
                      <span className="text-gray-500">{ride.pickup_address}</span>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className="font-semibold text-gray-600 min-w-[46px]">Drop</span>
                      <span className="text-gray-500">{ride.drop_address}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 text-sm pt-2 border-t border-gray-100">
                    <div>
                      <span className="text-gray-400 text-xs">Distance</span>
                      <p className="font-semibold text-gray-700">{ride.distance} km</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Fare</span>
                      <p className="font-bold text-gray-800">₹ {ride.fare}</p>
                    </div>
                  </div>
                  {ride.rating != null ? (
                    <span className="inline-flex justify-center items-center text-xs font-semibold text-green-700 bg-green-100 px-3 py-1.5 rounded">
                      Review saved
                      <span className="ml-2 text-md"><FaCheck /></span>
                    </span>
                  ) : (
                  <Link
                    to={`/review/${ride.id}`}
                    className="inline-flex justify-center items-center gap-1 text-s font-medium text-white bg-zinc-900 hover:bg-zinc-700 px-3 py-1.5 rounded transition-colors"
                  >
                    Tap to rate
                  </Link>
                  )}
                </div>
              ))
            )}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default checkAuth(UserHistory);