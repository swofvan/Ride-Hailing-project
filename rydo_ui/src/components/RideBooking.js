// import { useState, useEffect } from "react";
// import axios from "axios";

// import Navbar from "./Navbar";
// import Footer from "./footer";

// import { FaLocationArrow } from "react-icons/fa";

// import L from "leaflet";                      
// import "leaflet/dist/leaflet.css";


// function RideBooking() {

//   const [pickupLat, setPickupLat] = useState("");
//   const [pickupLng, setPickupLng] = useState("");
//   const [dropLat, setDropLat] = useState("");
//   const [dropLng, setDropLng] = useState("");
//   const [distance, setDistance] = useState("");
//   const [rideType, setRideType] = useState("economy");

//   const [map, setMap] = useState(null);        
//   const [pickupMarker, setPickupMarker] = useState(null);
//   const [dropMarker, setDropMarker] = useState(null);

//    // 🔴 EDIT: Leaflet initialization
//   useEffect(() => {
//     const leafletMap = L.map("map").setView([11.2588, 75.7804], 13); // default Kerala coords

//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: "© OpenStreetMap contributors",
//     }).addTo(leafletMap);

//     setMap(leafletMap);

//     return () => {
//       leafletMap.remove();
//     };
//   }, []);

//   // 🔴 EDIT: Update pickup marker when lat/lng changes
//   useEffect(() => {
//     if (map && pickupLat && pickupLng) {
//       if (pickupMarker) {
//         pickupMarker.remove();
//       }

//       const marker = L.marker([pickupLat, pickupLng]).addTo(map);
//       setPickupMarker(marker);
//       map.setView([pickupLat, pickupLng], 14);
//     }
//   }, [pickupLat, pickupLng]);

//   //  Update drop marker when lat/lng changes
//   useEffect(() => {
//     if (map && dropLat && dropLng) {
//       if (dropMarker) {
//         dropMarker.remove();
//       }

//       const marker = L.marker([dropLat, dropLng]).addTo(map);
//       setDropMarker(marker);
//     }
//   }, [dropLat, dropLng]);

  
//   const handleRideBooking = () => {

//     const token = localStorage.getItem("access_token");

//     axios.post("http://127.0.0.1:8000/user/ride-booking/", {
//         pickup_lat: pickupLat,
//         pickup_lng: pickupLng,
//         drop_lat: dropLat,
//         drop_lng: dropLng,
//         distance: distance,
//         ride_type: rideType
//     }, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     })
//     .then(response => {
//         console.log("Ride booked successfully:", response.data);
//         alert("Ride booked successfully!");
//     })
//     .catch(error => {
//         console.log("Error:", error.response.data);
//         alert("Error booking ride");
//     });
//   };

//   const rideOptions = [
//     { id: "economy", label: "Economy", rate: "₹10/km", desc: "Affordable rides", eta: "5 min", icon: "🚗" },
//     { id: "premium", label: "Premium", rate: "₹18/km", desc: "Comfort rides", eta: "3 min", icon: "🚙" },
//     { id: "luxury", label: "Luxury", rate: "₹25/km", desc: "Luxury cars", eta: "2 min", icon: "🚘" },
//   ];

//   const farePerKm =
//     rideType === "economy" ? 10 :
//     rideType === "premium" ? 18 : 25;


//   return (
//     <div>
//       <Navbar />
//       <div className="flex h-screen w-full bg-zinc-950 text-white overflow-hidden">

//         {/* LEFT PANEL */}
//         <div className="w-full max-w-md flex flex-col bg-zinc-900 shadow-2xl z-10">

//           {/* Route */}
//           <div className="px-6 py-5 border-b border-zinc-800">
//             <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">
//               Route
//             </p>

//             {/* Pickup Latitude */}
//             <div className="flex items-center gap-3 bg-zinc-800 rounded-xl px-4 py-3 mb-3">
//               <FaLocationArrow />
//               <input
//                 type="text"
//                 onChange={(e) => setPickupLat(e.target.value)}
//                 placeholder="Pickup Latitude"
//                 className="bg-transparent text-white text-sm placeholder-zinc-500 outline-none w-full"
//               />
//             </div>

//             {/* Pickup Longitude */}
//             <div className="flex items-center gap-3 bg-zinc-800 rounded-xl px-4 py-3 mb-3">
//               <FaLocationArrow />
//               <input
//                 type="text"
//                 onChange={(e) => setPickupLng(e.target.value)}
//                 placeholder="Pickup Longitude"
//                 className="bg-transparent text-white text-sm placeholder-zinc-500 outline-none w-full"
//               />
//             </div>

//             {/* Drop Latitude */}
//             <div className="flex items-center gap-3 bg-zinc-800 rounded-xl px-4 py-3 mb-3">
//               <div className="w-3 h-3 rounded-md bg-red-400 flex-shrink-0"></div>
//               <input
//                 type="text"
//                 onChange={(e) => setDropLat(e.target.value)}
//                 placeholder="Drop Latitude"
//                 className="bg-transparent text-white text-sm placeholder-zinc-500 outline-none w-full"
//               />
//             </div>

//             {/* Drop Longitude */}
//             <div className="flex items-center gap-3 bg-zinc-800 rounded-xl px-4 py-3">
//               <div className="w-3 h-3 rounded-md bg-red-400 flex-shrink-0"></div>
//               <input
//                 type="text"
//                 onChange={(e) => setDropLng(e.target.value)}
//                 placeholder="Drop Longitude"
//                 className="bg-transparent text-white text-sm placeholder-zinc-500 outline-none w-full"
//               />
//             </div>
//           </div>

//           {/* Ride Type */}
//           <div className="px-6 py-5 border-b border-zinc-800 flex-1 overflow-y-auto">
//             <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">
//               Choose ride type
//             </p>

//             <div className="space-y-3">
//               {rideOptions.map((option) => (
//                 <button
//                   key={option.id}
//                   onClick={() => setRideType(option.id)}
//                   className={`w-full flex items-center gap-4 rounded-xl px-4 py-4 border transition-all duration-200 text-left
//                   ${
//                     rideType === option.id
//                       ? "bg-white text-black border-white"
//                       : "bg-zinc-800 text-white border-zinc-700 hover:border-zinc-500"
//                   }`}
//                 >
//                   <span className="text-2xl">{option.icon}</span>

//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center justify-between">
//                       <span className="font-semibold text-sm">{option.label}</span>
//                       <span className="text-xs font-bold">{option.rate}</span>
//                     </div>
//                     <div className="flex items-center justify-between mt-0.5">
//                       <span className="text-xs text-zinc-500">{option.desc}</span>
//                       <span className="text-xs text-zinc-500">ETA {option.eta}</span>
//                     </div>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Fare */}
//           <div className="px-6 py-5">
//             <p className="text-white text-2xl font-bold mb-4">
//               ₹{farePerKm}<span className="text-sm text-zinc-500">/km</span>
//             </p>

//             <button
//               onClick={handleRideBooking}
//               className="w-full bg-white text-black font-bold py-4 rounded-xl text-sm tracking-wide hover:bg-zinc-200 transition-all"
//             >
//               Book Ride →
//             </button>
//           </div>
//         </div>

//         {/* MAP PANEL */}
//         <div id="map" className="flex-1"></div>

//       </div>
//     </div>
//   );
// }

// export default RideBooking;

import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./Navbar";
import { FaLocationArrow } from "react-icons/fa";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

function RideBooking() {

  const [map, setMap] = useState(null);

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  const [pickupLat, setPickupLat] = useState("");
  const [pickupLng, setPickupLng] = useState("");

  const [dropLat, setDropLat] = useState("");
  const [dropLng, setDropLng] = useState("");

  const [distance, setDistance] = useState("");

  const [pickupMarker, setPickupMarker] = useState(null);
  const [dropMarker, setDropMarker] = useState(null);

  const [rideType, setRideType] = useState("");
  const [farePerKm, setFarePerKm] = useState(0);

  // Ride Options
  const rideOptions = [
    { id: "economy", label: "Economy", rate: "₹50/km", price: 50 },
    { id: "premium", label: "Premium", rate: "₹100/km", price: 100 },
    { id: "luxury", label: "Luxury", rate: "₹200/km", price: 200 },
  ];

  // Update fare per km when ride type changes
  useEffect(() => {
    const selected = rideOptions.find((r) => r.id === rideType);
    if (selected) {
      setFarePerKm(selected.price);
    }
  }, [rideType]);

  // Haversine Formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // Search Location using OpenStreetMap
    const searchLocation = (place, type) => {
        if (!place) return;

        axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
            format: "json",
            q: place
            },
            headers: {
            "Accept": "application/json"
            }
        })
        .then(response => {
            const data = response.data;

            if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat).toFixed(6);
            const lon = parseFloat(data[0].lon).toFixed(6);

            if (type === "pickup") {
                setPickupLat(lat);
                setPickupLng(lon);
            } else {
                setDropLat(lat);
                setDropLng(lon);
            }

            if (map) {
                map.setView([lat, lon], 14);
            }
            }
        })
        .catch(error => {
            console.log("Search error:", error);
        });
    };

  // Book Ride API
  const handleRideBooking = () => {

    const token = localStorage.getItem("access_token");

    axios.post(
        "http://127.0.0.1:8000/user/ride-booking/",
        {
        pickup_lat: pickupLat,
        pickup_lng: pickupLng,
        drop_lat: dropLat,
        drop_lng: dropLng,
        distance: distance,
        ride_type: rideType
        },
        {
        headers: {
            Authorization: `Bearer ${token}`
        }
        }
    )
    .then(response => {
        console.log("Ride booked successfully:", response.data);
        alert("Ride booked successfully!");
    })
    .catch(error => {
        console.log("Error:", error.response?.data);
        alert("Error booking ride");
    });

};

  // Initialize Map
  useEffect(() => {
    const leafletMap = L.map("map").setView([11.2588, 75.7804], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(leafletMap);

    leafletMap.on("click", function (e) {
      const { lat, lng } = e.latlng;

      if (!pickupLat) {
        setPickupLat(lat.toFixed(6));
        setPickupLng(lng.toFixed(6));
      } else if (!dropLat) {
        setDropLat(lat.toFixed(6));
        setDropLng(lng.toFixed(6));
      } else {
        setPickupLat(lat.toFixed(6));
        setPickupLng(lng.toFixed(6));
        setDropLat("");
        setDropLng("");
        setDistance("");
      }
    });

    setMap(leafletMap);

    return () => {
      leafletMap.remove();
    };
  }, []);

  // Pickup Marker
  useEffect(() => {
    if (map && pickupLat && pickupLng) {
      if (pickupMarker) map.removeLayer(pickupMarker);
      const marker = L.marker([pickupLat, pickupLng]).addTo(map);
      setPickupMarker(marker);
    }
  }, [pickupLat, pickupLng]);

  // Drop Marker
  useEffect(() => {
    if (map && dropLat && dropLng) {
      if (dropMarker) map.removeLayer(dropMarker);
      const marker = L.marker([dropLat, dropLng]).addTo(map);
      setDropMarker(marker);
    }
  }, [dropLat, dropLng]);

  // Auto calculate distance
  useEffect(() => {
    if (pickupLat && pickupLng && dropLat && dropLng) {
      const km = calculateDistance(
        parseFloat(pickupLat),
        parseFloat(pickupLng),
        parseFloat(dropLat),
        parseFloat(dropLng)
      );
      setDistance(km.toFixed(2));
    }
  }, [pickupLat, pickupLng, dropLat, dropLng]);


  const totalFare = distance && farePerKm
    ? (parseFloat(distance) * farePerKm).toFixed(2)
    : 0;

  return (
    <div>
      <Navbar />
      <div className="flex h-screen w-full bg-zinc-950 text-white overflow-hidden">

        {/* LEFT PANEL */}
        <div className="w-full max-w-md flex flex-col bg-zinc-900 shadow-2xl z-10">

          {/* Route Inputs */}
          <div className="px-6 py-5 border-b border-zinc-800">
            <p className="text-zinc-500 text-xs uppercase mb-3">
              Route
            </p>

            <div className="flex items-center gap-3 bg-zinc-800 rounded-xl px-4 py-3 mb-3">
              <FaLocationArrow className="text-green-500"/>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                onBlur={() => searchLocation(pickup, "pickup")}
                placeholder="Pickup Location"
                className="bg-transparent text-white text-sm outline-none w-full"
              />
            </div>

            <div className="flex items-center gap-3 bg-zinc-800 rounded-xl px-4 py-3">
              <FaLocationArrow className="text-red-600"/>
              <input
                type="text"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                onBlur={() => searchLocation(drop, "drop")}
                placeholder="Drop Location"
                className="bg-transparent text-white text-sm outline-none w-full"
              />
            </div>
          </div>

          {/* Ride Type */}
          <div className="px-6 py-5 border-b border-zinc-800">
            <p className="text-zinc-500 text-xs uppercase mb-4">
              Choose ride type
            </p>

            <div className="space-y-3">
              {rideOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setRideType(option.id)}
                  className={`w-full flex justify-between rounded-xl px-4 py-4 border transition-all
                  ${
                    rideType === option.id
                      ? "bg-white text-black border-white"
                      : "bg-zinc-800 text-white border-zinc-700"
                  }`}
                >
                  <span>{option.label}</span>
                  <span>{option.rate}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fare & Book */}
          <div className="px-6 py-5">
            <p className="text-sm text-zinc-400 mb-2">
              Distance: {distance ? `${distance} km` : "Select pickup & drop"}
            </p>

            <p className="text-white text-2xl font-bold mb-4">
              ₹{totalFare}<span className="text-sm text-zinc-500">/km</span>
            </p>

            <p className="text-xs text-zinc-500">
                {farePerKm} × {distance || 0} km
            </p>

            <button
              onClick={handleRideBooking}
              className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all"
            >
              Book Ride →
            </button>
          </div>
        </div>

        {/* MAP */}
        <div id="map" className="flex-1"></div>

      </div>
    </div>
  );
}

export default RideBooking;