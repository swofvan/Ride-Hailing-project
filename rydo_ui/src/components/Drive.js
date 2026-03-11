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

  const [locations, setLocations] = useState({});    // store location names

  const navigate = useNavigate();

  useEffect( () => {
    fetchRides(search, page);
  }, [page]);

  function fetchRides(searchValue = search, pageValue = page) {
    const token = localStorage.getItem("access");

    // if (!token) {
    //   alert("Please login first");
    //   return;
    // }

    axios.get(
      // `http://127.0.0.1:8000/user/ride_requests/?search=${search}&page=${page}`,
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

      const newLocations = {};    // convert coordinates to address

      response.data.results.forEach(function(ride){

        axios.get("https://nominatim.openstreetmap.org/reverse", {
          params:{
            format:"json",
            lat: ride.pickup_lat,
            lon: ride.pickup_lng
          }
        })
        .then(function(res){
          newLocations[ride.id] = newLocations[ride.id] || {};
          newLocations[ride.id].pickup = res.data.display_name;
          setLocations({...newLocations});
        });

        axios.get("https://nominatim.openstreetmap.org/reverse", {
          params:{
            format:"json",
            lat: ride.drop_lat,
            lon: ride.drop_lng
          }
        })
        .then(function(res){
          newLocations[ride.id] = newLocations[ride.id] || {};
          newLocations[ride.id].drop = res.data.display_name;
          setLocations({...newLocations});
        });

      });

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

  // -------- Accept Ride --------
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
    .then (() => {
      fetchRides(search, page);
      navigate('/')
    })
    .catch((error) => {
      console.error(error);
    });
  }

  // -------- Cancel Ride --------
  function cancelRide(id) {
    const token = localStorage.getItem("access");

    axios.post(
      `http://127.0.0.1:8000/user/ride-cancel/${id}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => {
      fetchRides(search, page);
      navigate('/')
    })
    .catch((error) => {
      console.error(error);
    });
  }

  // -------- Complete Ride --------
  function completeRide(id) {
    const token = localStorage.getItem("access");

    axios.post(
      `http://127.0.0.1:8000/user/ride-complete/${id}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => {
      fetchRides();
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

  // return (
  //   <div>
  //     <Navbar/>
  //     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
  //       <div className="max-w-7xl mx-auto">

  //         {/* Header */}
  //         <div className="mb-6">
  //           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
  //             Ride List
  //           </h1>
  //           <p className="text-sm text-gray-500 mt-1">
  //             Select and start your Drive
  //           </p>
  //         </div>

  //         {/* Search */}
  //         <div className="flex gap-2 mb-6">
  //           <input
  //             type="text"
  //             placeholder="Search by Ride type and Status"
  //             value={search}
  //             onChange={function (e) { setSearch(e.target.value); }}
  //             className="flex-1 border border-gray-200 bg-white rounded-md px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  //           />
  //           <button
  //             onClick={handleSearch}
  //             className="bg-zinc-900 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-md text-sm font-medium shadow-sm transition-colors"
  //           >
  //             Search
  //           </button>
  //         </div>

  //         {/* Desktop Table */}
  //         <div className="md:block bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">

  //           <div className="grid grid-cols-9 bg-gray-50 border-b border-gray-100 px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
  //             <div>Ride ID</div>
  //             <div>Phone</div>
  //             <div>Pickup</div>
  //             <div>Drop</div>
  //             <div>Distance</div>
  //             <div>Fare</div>
  //             <div>Ryde Type</div>
  //             <div>Status</div>
  //             <div></div>
  //           </div>

  //           {rides.length === 0 ? (
  //             <div className="text-center py-12 text-gray-400 text-sm">
  //               No rides found.
  //             </div>
  //           ) : (
  //             rides.map(function (ride, index) {

  //               return (
  //                 <div
  //                   key={ride.id}
  //                   className={`grid grid-cols-9 items-center px-4 py-3.5 border-b border-gray-50 text-sm hover:bg-blue-50 transition-colors ${
  //                     index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
  //                   }`}
  //                 >
  //                   <div className="font-medium text-gray-700">#{ride.id}</div>
  //                   <div className="text-gray-500">{ride.user.phone}</div>
                    
  //                   {/* <div className="text-gray-500 text-xs">
  //                     {ride.pickup_lat}, {ride.pickup_lng}
  //                   </div>
  //                   <div className="text-gray-500 text-xs">
  //                     {ride.drop_lat}, {ride.drop_lng}
  //                   </div> */}
                    
  //                   <div className="text-gray-500 text-xs">
  //                     {locations[ride.id]?.pickup || "Loading..."}
  //                   </div>
  //                   <div className="text-gray-500 text-xs">
  //                     {locations[ride.id]?.drop || "Loading..."}
  //                   </div>

  //                   <div className="text-gray-700">{ride.distance} km</div>
  //                   <div className="text-gray-700 font-semibold">
  //                     ₹ {ride.fare}
  //                   </div>
  //                   <div className="text-zinc-900 font-semibold uppercase">
  //                     {ride.ride_type}
  //                   </div>

  //                   {/* Custom Status Badge */}
  //                   <div>
  //                     <span className={
  //                       ride.status === "pending"
  //                         ? "px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700"
  //                         : ride.status === "accepted"
  //                         ? "px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700"
  //                         : "px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700"
  //                     }>
  //                       {ride.status}
  //                     </span>
  //                   </div>

  //                   {/* Custom Buttons */}
  //                   <div className="flex gap-2">
  //                     {ride.status === "pending" && (
  //                       <button
  //                         onClick={function () { acceptRide(ride.id); }}
  //                         className="bg-green-700 hover:bg-green-800 active:scale-95 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all"
  //                       >
  //                         Accept
  //                       </button>
  //                     )}

  //                     {ride.status === "accepted" && (
  //                       <>
  //                         <button
  //                           onClick={function () { cancelRide(ride.id); }}
  //                           className="bg-yellow-500 hover:bg-yellow-600 active:scale-95 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-all"
  //                         >
  //                           Cancel
  //                         </button>
  //                         <button
  //                           onClick={function () { completeRide(ride.id); }}
  //                           className="bg-green-600 hover:bg-green-700 active:scale-95 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-all"
  //                         >
  //                           Complete
  //                         </button>
  //                       </>
  //                     )}
  //                   </div>

  //                 </div>
  //               );
  //             })
  //           )}
  //         </div>

  //         {/* Pagination */}
  //           <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3 text-sm text-gray-500">
  //             <span>
  //               Showing <span className="font-semibold text-gray-700">{rides.length}</span> of{" "}
  //               <span className="font-semibold text-gray-700">{totalCount}</span> rides
  //             </span>
  //             <div className="flex gap-2">
  //               <button
  //                 onClick={() => setPage(page - 1)}
  //                 disabled={page === 1}
  //                 className="border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
  //               >
  //                 Previous
  //               </button>
  //               <span className="border border-gray-200 bg-white px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 shadow-sm">
  //                 {page}
  //               </span>
  //               <button
  //                 onClick={() => setPage(page + 1)}
  //                 disabled={rides.length === 0}
  //                 className="border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
  //               >
  //                 Next 
  //               </button>
  //             </div>
  //           </div>

  //       </div>
  //     </div>
  //     <Footer/>
  //   </div>
  // );

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          {/* <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-zink-900">
              Ride List
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Select and start your Drive
            </p>

              <Link
                to={'/profile'}
                className="flex items-center justify-center px-2 py-2 rounded-full text-zinc-800 transition-all duration-300 hover:text-yellow-800 hover:border-1 hover:border-white cursor-pointer">
                <span className="text-[30px]"><FaCarSide /></span>
              </Link>

          </div> */}

          <div className="mb-6 flex items-center justify-between">
            {/* Left: Title & subtitle */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Ride List
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Select and start your Drive
              </p>
            </div>

            {/* Right: Current Rides button + car icon */}
            <div className="flex items-center gap-2">
              <Link
                to="/current-rides"
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-yellow-400 text-zinc-900 font-semibold text-sm transition-all duration-300 hover:bg-yellow-500 cursor-pointer"
              >
                <span className="hidden sm:inline">Current Rides</span>
                <span className="text-lg"><FaCarSide /></span>
              </Link>

              <Link
                to="/profile"
                className="flex items-center justify-center p-2 rounded-full text-zinc-800 transition-all duration-300 hover:text-yellow-800 cursor-pointer"
              >
                {/* your profile icon here */}
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Search by Ride type, Status and location"
              value={search}
              onChange={function (e) { setSearch(e.target.value); }}
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
              rides.map(function (ride, index) {
                return (
                  <div
                    key={ride.id}
                    className={`grid grid-cols-9 items-center px-4 py-3.5 border-b border-gray-50 text-sm hover:bg-blue-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    <div className="font-medium text-gray-700">#{ride.id}</div>
                    <div className="text-gray-500">{ride.user.phone}</div>

                    {/* <div className="text-gray-500 text-xs">
                      {ride.pickup_lat}, {ride.pickup_lng}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {ride.drop_lat}, {ride.drop_lng}
                    </div> */}

                    <div className="text-gray-500 text-xs">
                      {locations[ride.id]?.pickup || "Loading..."}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {locations[ride.id]?.drop || "Loading..."}
                    </div>

                    <div className="text-gray-700">{ride.distance} km</div>
                    <div className="text-gray-700 font-semibold">
                      ₹ {ride.fare}
                    </div>
                    <div className="text-zinc-900 font-semibold uppercase">
                      {ride.ride_type}
                    </div>

                    {/* Custom Status Badge */}
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

                    {/* Custom Buttons */}
                    <div className="flex gap-2">
                      {ride.status === "pending" && (
                        <button
                          onClick={function () { acceptRide(ride.id); }}
                          className="bg-green-700 hover:bg-green-800 active:scale-95 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                        >
                          Accept
                        </button>
                      )}
                      {ride.status === "accepted" && (
                        <>
                          <button
                            onClick={function () { cancelRide(ride.id); }}
                            className="bg-yellow-500 hover:bg-yellow-600 active:scale-95 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-all"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={function () { completeRide(ride.id); }}
                            className="bg-green-600 hover:bg-green-700 active:scale-95 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-all"
                          >
                            Complete
                          </button>
                        </>
                      )}
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
              rides.map(function (ride) {
                return (
                  <div
                    key={ride.id}
                    className="bg-white rounded-md shadow-sm border border-gray-100 p-4 flex flex-col gap-3"
                  >
                    {/* Top row: Ride ID, Type, Status */}
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-800 text-sm">#{ride.id}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase text-zinc-600 bg-gray-100 px-2 py-1 rounded">
                          {ride.ride_type}
                        </span>
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
                    </div>

                    {/* Phone */}
                    <div className="text-xs text-gray-500">
                      <span className="font-semibold text-gray-600">Phone: </span>{ride.user.phone}
                    </div>

                    {/* Pickup & Drop */}
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2 text-xs">
                        <span className="font-semibold text-gray-600 min-w-[46px]">Pickup:</span>
                        <span className="text-gray-500">{locations[ride.id]?.pickup || "Loading..."}</span>
                      </div>
                      <div className="flex gap-2 text-xs">
                        <span className="font-semibold text-gray-600 min-w-[46px]">Drop:</span>
                        <span className="text-gray-500">{locations[ride.id]?.drop || "Loading..."}</span>
                      </div>
                    </div>

                    {/* Distance & Fare */}
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

                    {/* Action Buttons */}
                    {(ride.status === "pending" || ride.status === "accepted") && (
                      <div className="flex gap-2 pt-1">
                        {ride.status === "pending" && (
                          <button
                            onClick={() => { acceptRide(ride.id); }}
                            className="flex-1 bg-green-700 hover:bg-green-800 active:scale-95 text-white py-2 rounded-lg text-xs font-semibold transition-all"
                          >
                            Accept
                          </button>
                        )}
                        {ride.status === "accepted" && (
                          <>
                            <button
                              onClick={() => { cancelRide(ride.id); }}
                              className="flex-1 bg-yellow-500 hover:bg-yellow-600 active:scale-95 text-white py-2 rounded-lg text-xs font-semibold transition-all"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => { completeRide(ride.id); }}
                              className="flex-1 bg-green-600 hover:bg-green-700 active:scale-95 text-white py-2 rounded-lg text-xs font-semibold transition-all"
                            >
                              Complete
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3 text-sm text-gray-500">
            <span>
              Showing <span className="font-semibold text-gray-700">{rides.length}</span> of{" "}
              <span className="font-semibold text-gray-700">{totalCount}</span> rides
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
              >
                Previous
              </button>
              <span className="border border-gray-200 bg-white px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 shadow-sm">
                {page}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={rides.length === 0}
                className="border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
              >
                Next
              </button>
            </div>
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default checkAuth(RideBookingList);