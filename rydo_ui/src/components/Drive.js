import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./footer";
import { FaLock, FaCarSide } from "react-icons/fa";
import checkAuth from "./auth/checkAuth";
import { useNavigate, Link } from "react-router-dom";

function RideBookingList() {

  const [rides, setRides] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [notDriver, setNotDriver] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRides(search, page);
  }, [page]);

  function fetchRides(searchValue = search, pageValue = page) {
    const token = localStorage.getItem("access");

    axios.get(
      `http://127.0.0.1:8000/user/ride_requests/?search=${encodeURIComponent(searchValue)}&page=${pageValue}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {

      setRides(response.data.results);
      setTotalCount(response.data.count);
    })
    .catch((error) => {
      if (error.response?.status === 403) {
        setNotDriver(true);
      } else {
        console.error("Error fetching rides:", error);
      }
    });
  }

  function handleSearch() {
    setPage(1);
    fetchRides(search, 1);
  }

  function acceptRide(id) {
    const token = localStorage.getItem("access");

    axios.post(
      `http://127.0.0.1:8000/user/ride-accept/${id}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => {
      fetchRides(search, page);
      navigate('/');
    })
    .catch((error) => {
      console.error(error);
    });
  }

  if (notDriver) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 py-12">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10 text-center">
            <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mx-auto mb-5">
              <FaLock className="text-red-600 text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Driver Access Only
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              This page is available only for approved drivers.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Ride List
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Select and start your Drive
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/current-ride"
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-yellow-400 text-zinc-900 font-semibold text-sm transition-all duration-300 hover:bg-yellow-500 cursor-pointer"
              >
                <span className="hidden sm:inline">Current Ride</span>
                <span className="text-lg"><FaCarSide /></span>
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Search by Ride type, Status and location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border border-gray-200 bg-white rounded-md px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-zinc-900 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-md text-sm font-medium shadow-sm transition-colors"
            >
              Search
            </button>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">

            <div className="grid grid-cols-9 bg-gray-50 border-b border-gray-100 px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <div>Ride ID</div>
              <div>Phone</div>
              <div>Pickup</div>
              <div>Drop</div>
              <div>Distance</div>
              <div>Fare</div>
              <div>Ryde Type</div>
              <div>Status</div>
              <div></div>
            </div>

            {rides.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">
                No rides found.
              </div>
            ) : (
              rides.map( (ride, index) => {
                return (
                  <div
                    key={ride.id}
                    className={`grid grid-cols-9 items-center px-4 py-3.5 border-b border-gray-50 text-sm hover:bg-blue-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    <div className="font-medium text-gray-700">#{ride.id}</div>
                    <div className="text-gray-500">{ride.user_phone}</div>

                    <div className="text-gray-500 text-xs">
                      {ride.pickup_address}
                    </div>

                    <div className="text-gray-500 text-xs">
                      {ride.drop_address}
                    </div>

                    <div className="text-gray-700">{ride.distance} km</div>
                    <div className="text-gray-700 font-semibold">
                      ₹ {ride.fare}
                    </div>
                    <div className="text-zinc-900 font-semibold uppercase">
                      {ride.ride_type}
                    </div>

                    <div>
                      <span className={
                        ride.status === "pending"
                          ? "px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700"
                          : ride.status === "accepted"
                          ? "px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700"
                          : "px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700"
                      }>
                        {ride.status}
                      </span>
                    </div>

                    <div className="flex gap-2">
                        <button
                          onClick={() => acceptRide(ride.id)}
                          className="bg-green-700 hover:bg-green-800 active:scale-95 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                        >
                          Accept
                        </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-3">
            {rides.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm bg-white rounded-md shadow-sm border border-gray-100">
                No rides found.
              </div>
            ) : (
              rides.map((ride) => {
                return (
                  <div
                    key={ride.id}
                    className="bg-white rounded-md shadow-sm border border-gray-100 p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-800 text-sm">#{ride.id}</span>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase text-zinc-600 bg-gray-100 px-2 py-1 rounded">
                          {ride.ride_type}
                        </span>

                        <span
                          className={
                            ride.status === "pending"
                              ? "px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700"
                              : ride.status === "accepted"
                              ? "px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700"
                              : "px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700"
                          }
                        >
                          {ride.status}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      <span className="font-semibold text-gray-600">Phone: </span>
                      {ride.user_phone}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2 text-xs">
                        <span className="font-semibold text-gray-600 min-w-[46px]">
                          Pickup:
                        </span>
                        <span className="text-gray-500">{ride.pickup_address}</span>
                      </div>

                      <div className="flex gap-2 text-xs">
                        <span className="font-semibold text-gray-600 min-w-[46px]">
                          Drop:
                        </span>
                        <span className="text-gray-500">{ride.drop_address}</span>
                      </div>
                    </div>

                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="text-gray-400 text-xs">Distance</span>
                        <p className="font-semibold text-gray-700">{ride.distance} km</p>
                      </div>

                      <div>
                        <span className="text-gray-400 text-xs">Fare</span>
                        <p className="font-bold text-gray-800">₹ {ride.fare}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      
                        <button
                          onClick={() => acceptRide(ride.id)}
                          className="flex-1 bg-green-700 hover:bg-green-800 active:scale-95 text-white py-2 rounded-lg text-xs font-semibold transition-all"
                        >
                          Accept
                        </button>
                      
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default checkAuth(RideBookingList);