// import { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "./Navbar";
// import Footer from "./footer";

// import { FaLock } from "react-icons/fa";

// import checkAuth from "./auth/checkAuth";

// function RideBookingList() {

//   const [rides, setRides] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);

//   const [notDriver, setNotDriver] = useState(false);

//   useEffect(() => {
//     fetchRides();
//   }, [page]);

//   const fetchRides = () => {
//     const token = localStorage.getItem("access");

//     if (!token) {
//     alert("Please login first");
//     return;
//   }

//     axios.get(
//       `http://127.0.0.1:8000/user/ride_requests/?search=${search}&page=${page}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )
//     .then((response) => {
//       setRides(response.data.results);
//       setTotalCount(response.data.count);
//     })
//     // .catch((error) => {
//     //   console.error("Error fetching rides:", error);
//     // });
//     .catch((error) => {
//       if (error.response?.status === 403) {
//         setNotDriver(true);
//       } else {
//         console.error("Error fetching rides:", error);
//       }
//     });
//   };

//   const handleSearch = () => {
//     setPage(1);
//     fetchRides();
//   };


//   // -------- Accept Ride --------

//   const acceptRide = (id) => {
//     const token = localStorage.getItem("token");

//     axios.post(
//       `http://127.0.0.1:8000/user/ride-accept/${id}/`, {},
//       { headers: 
//         {
//           Authorization: `Token ${token}`
//         }
//     }
//     )
//     .then(() => {
//       fetchRides();
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   };

//   // -------- Cancel Ride --------

//   const cancelRide = (id) => {
//     const token = localStorage.getItem("token");

//     axios.post(
//       `http://127.0.0.1:8000/user/ride-cancel/${id}/`,
//       {},
//       { headers: { Authorization: `Token ${token}` } }
//     )
//     .then(() => {
//       fetchRides();
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   };

//   // -------- Complete Ride --------

//   const completeRide = (id) => {
//     const token = localStorage.getItem("token");

//     axios.post(
//       `http://127.0.0.1:8000/user/ride-complete/${id}/`,
//       {},
//       { headers: { Authorization: `Token ${token}` } }
//     )
//     .then(() => {
//       fetchRides();
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   };

//   function StatusBadge({ status }) {
//     const styles = {
//       pending: "bg-yellow-100 text-yellow-700",
//       accepted: "bg-blue-100 text-blue-700",
//       completed: "bg-green-100 text-green-700",
//     };

//     return (
//       <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
//         {status}
//       </span>
//     );
//   }

//   function ActionButtons({ ride }) {

//     if (ride.status === "pending") {
//       return (
//         <div className="flex gap-2">
//           <button
//             onClick={() => acceptRide(ride.id)}
//             className="bg-green-700 hover:bg-green-800 active:scale-95 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all"
//           >
//             Accept
//           </button>
//         </div>
//       );
//     }

//     if (ride.status === "accepted") {
//       return (
//         <div className="flex gap-2">
//           <button
//             onClick={() => cancelRide(ride.id)}
//             className="bg-yellow-500 hover:bg-yellow-600 active:scale-95 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-all"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => completeRide(ride.id)}
//             className="bg-green-600 hover:bg-green-700 active:scale-95 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-all"
//           >
//             Complete
//           </button>
//         </div>
//       );
//     }

//     return <span className="text-gray-400 text-xs italic">—</span>;
//   }

//   if (notDriver) {
//     return (
//       <div className="flex flex-col min-h-screen">
//         <Navbar />

//         <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 py-12">
//           <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10 text-center">
            
//             <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mx-auto mb-5">
//               <FaLock className="text-red-600 text-xl" />
//             </div>

//             <h2 className="text-2xl font-bold text-red-600 mb-2">
//               Driver Access Only
//             </h2>

//             <p className="text-gray-500 text-sm leading-relaxed">
//               This page is available only for approved drivers. Please contact support if you believe this is a mistake.
//             </p>
//           </div>
//         </div>

// </div>
//     );
//   }

//   return (
//     <div>
//       <Navbar/>
//       <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
//     <div className="max-w-7xl mx-auto">

//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//           Ride List
//         </h1>
//         <p className="text-sm text-gray-500 mt-1">Select and start your Drive</p>
//       </div>

//       {/* Search Bar */}
//       <div className="flex gap-2 mb-6">
//         <input
//           type="text"
//           placeholder="Search by Ride type and Status"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="flex-1 border border-gray-200 bg-white rounded-md px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-zinc-900 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-md text-sm font-medium shadow-sm transition-colors"
//         >
//           Search
//         </button>
//       </div>

//       {/* Desktop Table */}
//       <div className="hidden md:block bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">

//         {/* Table Header */}
//         <div className="grid grid-cols-9 bg-gray-50 border-b border-gray-100 px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
//           <div>Ride ID</div>
//           <div>Phone</div>
//           <div>Pickup</div>
//           <div>Drop</div>
//           <div>Distance</div>
//           <div>Fare</div>
//           <div>Ryde Type</div>
//           <div>Status</div>
//           <div></div>
//         </div>

//         {/* Table Rows */}
//         {rides.length === 0 ? (
//           <div className="text-center py-12 text-gray-400 text-sm">
//             No rides found.
//           </div>
//         ) : (
//           rides.map((ride, index) => (
//             <div
//               key={ride.id}
//               className={`grid grid-cols-9 items-center px-4 py-3.5 border-b border-gray-50 text-sm hover:bg-blue-50 transition-colors ${
//                 index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
//               }`}
//             >
//               <div className="font-medium text-gray-700">#{ride.id}</div>
//               <div className="text-gray-500">{ride.user.phone}</div>
//               <div className="text-gray-500 text-xs">{ride.pickup_lat}, {ride.pickup_lng}</div>
//               <div className="text-gray-500 text-xs">{ride.drop_lat}, {ride.drop_lng}</div>
//               <div className="text-gray-700">{ride.distance} km</div>
//               <div className="text-gray-700 font-semibold">₹ {ride.fare}</div>
//               <div className="text-zinc-900 font-semibold uppercase">{ride.ride_type}</div>
//               <div><StatusBadge status={ride.status} /></div>
//               <div><ActionButtons ride={ride} /></div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Mobile Cards */}
//       <div className="md:hidden space-y-3">
//         {rides.length === 0 ? (
//           <div className="text-center py-12 text-gray-400 text-sm">
//             No rides found.
//           </div>
//         ) : (
//           rides.map((ride) => (
//             <div
//               key={ride.id}
//               className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3"
//             >
//               <div className="flex justify-between items-center">
//                 <span className="text-xs font-semibold text-gray-400 uppercase">Ride #{ride.id}</span>
//                 <StatusBadge status={ride.status} />
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
//                   {ride.user?.name?.charAt(0) || "?"}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-800 text-sm">{ride.user?.name}</p>
//                   <p className="text-xs text-gray-400">{ride.user?.phone}</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
//                 <div className="bg-gray-50 rounded-lg p-2">
//                   <p className="text-gray-400 mb-0.5">Pickup</p>
//                   <p className="text-gray-700">{ride.pickup_lat}, {ride.pickup_lng}</p>
//                 </div>
//                 <div className="bg-gray-50 rounded-lg p-2">
//                   <p className="text-gray-400 mb-0.5">Drop</p>
//                   <p className="text-gray-700">{ride.drop_lat}, {ride.drop_lng}</p>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center text-sm">
//                 <span className="text-gray-500">{ride.distance} km</span>
//                 <span className="font-bold text-gray-800">{ride.fare}</span>
//               </div>

//               <div className="pt-1">
//                 <ActionButtons ride={ride} />
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Pagination */}
//       <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3 text-sm text-gray-500">
//         <span>
//           Showing <span className="font-semibold text-gray-700">{rides.length}</span> of{" "}
//           <span className="font-semibold text-gray-700">{totalCount}</span> rides
//         </span>
//         <div className="flex gap-2">
//           <button
//             onClick={() => setPage(page - 1)}
//             disabled={page === 1}
//             className="border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
//           >
//             Previous
//           </button>
//           <span className="border border-gray-200 bg-white px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 shadow-sm">
//             {page}
//           </span>
//           <button
//             onClick={() => setPage(page + 1)}
//             disabled={rides.length === 0}
//             className="border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
//           >
//             Next 
//           </button>
//         </div>
//       </div>

//     </div>
//   </div>
//       <Footer/>
//     </div>
//   );
// }

// export default checkAuth(RideBookingList);


import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./footer";
import { FaLock } from "react-icons/fa";
import checkAuth from "./auth/checkAuth";

function RideBookingList() {

  const [rides, setRides] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [notDriver, setNotDriver] = useState(false);

  useEffect(function () {
    fetchRides();
  }, [page]);

  function fetchRides() {
    const token = localStorage.getItem("access");

    if (!token) {
      alert("Please login first");
      return;
    }

    axios.get(
      `http://127.0.0.1:8000/user/ride_requests/?search=${search}&page=${page}`,
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
    fetchRides();
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
      fetchRides();
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
      fetchRides();
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

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Ride List
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Select and start your Drive
            </p>
          </div>

          {/* Search */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Search by Ride type and Status"
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
                    <div className="text-gray-500 text-xs">
                      {ride.pickup_lat}, {ride.pickup_lng}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {ride.drop_lat}, {ride.drop_lng}
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