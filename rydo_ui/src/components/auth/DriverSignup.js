import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";

import Navbar from "../Navbar";

function DriverSignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function registerDriver(e) {
        e.preventDefault();

        if (!name || !email || !phone || !vehicleNumber || !licenseNumber || !password) {
        setErrorMessage("All fields are required");
        return;
    }

    if (password.length < 6) {
        setErrorMessage("Password must be at least 6 characters");
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        setErrorMessage("Invalid email format");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        setErrorMessage("Phone number must be 10 digits");
        return;
    }

    if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
    }

        const driver = {
            name: name,
            email: email,
            phone: phone,
            vehicle_number: vehicleNumber,
            license_number: licenseNumber,
            password1: password,
            password2: confirmPassword
        }
        
        axios.post("http://127.0.0.1:8000/auth/driver_signup/", driver)
        .then(response => 
            {

        setErrorMessage('');

        dispatch(setUser(response.data.data));

        navigate("/");

        })
        
        .catch(error => {

            if (error.response && error.response.data) {

              if (typeof error.response.data === "object") {
              const errors = Object.values(error.response.data);
              setErrorMessage(errors.join(" "));
              }
              
              else {
              setErrorMessage(error.response.data);
              }

            }
        
            else {
                setErrorMessage("Failed to connect to server");
            }
        });
}

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

          <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-zinc-900 mb-2">Sign Up as Driver</h1>
          </div>

          <form className="space-y-6">

            <div className="text-red-500 text-sm">
              {errorMessage}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition"
                placeholder="1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Number
              </label>
              <input
                type="text"
                id="vehicleNumber"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition"
                placeholder="KL01AB1234"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Number
              </label>
              <input
                type="text"
                id="licenseNumber"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition"
                placeholder="DL123456789"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

          
            <button
              className="w-full bg-zinc-900 text-white py-3 rounded-lg font-semibold hover:bg-black transition duration-200 shadow-lg hover:shadow-xl"
              onClick={registerDriver}
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account? &nbsp;
            <Link to="/login" className="text-zinc-900 hover:text-blue-600 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default DriverSignUp;