import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaDownload, FaArrowLeft, FaMapMarkerAlt, FaFlag } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./footer";
import logo from "../images/Rydo_logo_w.svg";


function Receipt() {
    
  const { rideId } = useParams();

  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");

    axios
      .get(`http://127.0.0.1:8000/user/receipt/${rideId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRide(response.data);
      })
      .catch((error) => {
        console.error("Error fetching receipt:", error);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [rideId]);

  if (loading) return <p>Loading...</p>;

  if (!ride) return <p>No receipt found</p>;

  const handleDownload = (rideId) => {
    const token = localStorage.getItem("access");

    axios.get(`http://127.0.0.1:8000/user/download_receipt/${rideId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // Gets PDF as file, Sends JWT properly, Forces download in browser
      })
      .then((response) => {
        // create file download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", `ride_${rideId}.pdf`);

        document.body.appendChild(link);
        link.click();

        link.remove();
      })
      .catch((error) => {
        console.error("Download error:", error);
      });
  };

  return (
    <div>
      <Navbar />
 
      <div className="min-h-screen bg-zinc-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-lg mx-auto">
 
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-6 text-sm font-medium transition duration-200"
          >
            <FaArrowLeft />
            Back
          </button>
 
          {loading ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <div className="w-10 h-10 border-4 border-zinc-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-zinc-500">Loading receipt...</p> 
            </div>
 
          ) : ride ? (
 
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
 
              {/* Header */}
              <div className="bg-zinc-900 text-white p-6 text-center">
                <div className="flex justify-center mb-2">
                    <img 
                    src={logo} 
                    alt="Rydo Logo" 
                    className="w-20 md:w-24 my-4"
                    />
                </div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h1 className="text-xl font-bold text-zinc-200">Ride Receipt</h1>
                </div>
                <p className="text-zinc-400 text-sm">{new Date(ride.created_at).toLocaleString()}</p>
                <p className="text-zinc-500 text-xs mt-1">Ride ID: <span className="text-zinc-300">#{ride.id}</span></p>
              </div>
 
              <div className="p-6 space-y-6">
 
                <div className="bg-zinc-50 rounded-xl p-4 flex items-center gap-4">
                  <div className="bg-zinc-900 text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0">
                    {ride.driver_name ? ride.driver_name.charAt(0) : "D"}
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wide">Driver</p>
                    <p className="text-zinc-900 font-semibold">{ride.driver_name}</p>
                    <p className="text-zinc-400 text-sm">
                      ID: #{ride.driver_id}
                    </p>
                    <p className="text-zinc-400 text-sm">{ride.vehicle_number}</p>
                  </div>
                </div>
 
                <div className="space-y-3">
 
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-zinc-900 mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-zinc-400 uppercase tracking-wide">Pickup</p>
                      <p className="text-zinc-900 font-medium">{ride.pickup_address}</p>
                    </div>
                  </div>
 
                  <div className="ml-2 border-l-2 border-dashed border-zinc-300 h-4"></div>
 
                  <div className="flex items-start gap-3">
                    <FaFlag className="text-zinc-900 mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-zinc-400 uppercase tracking-wide">Drop-off</p>
                      <p className="text-zinc-900 font-medium">{ride.drop_address}</p>
                    </div>
                  </div>
 
                </div>
 
                <div className="flex gap-3">
                  <div className="flex-1 bg-zinc-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-zinc-400 mb-1">Distance</p>
                    <p className="text-zinc-900 font-bold">{ride.distance} km</p>
                  </div>
                </div>
 
                <div>
                  <h3 className="text-xs text-zinc-400 uppercase tracking-wide mb-3">Fare</h3>
                  <div className="flex justify-between font-bold text-zinc-900 text-base">
                    <span>Total</span>
                    <span>₹{ride.fare}</span>
                  </div>
                </div>

                <button
                    onClick = {() => handleDownload(ride.id)}
                    className="w-full bg-zinc-900 hover:bg-zinc-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition duration-200">
                  <FaDownload />
                  Download Receipt
                </button>
 
              </div>
            </div>
 
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <p className="text-zinc-500">Receipt not found.</p>
              <button
                onClick={() => navigate(-1)}
                className="mt-4 bg-zinc-900 text-white px-6 py-2 rounded-lg text-sm hover:bg-zinc-700 transition duration-200"
              >
                Go Back
              </button>
            </div>
          )}
 
        </div>
      </div>
 
      <Footer />
    </div>
  );
}

export default Receipt;