import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";

import Navbar from "../Navbar";


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function loginuser(e) {
    e.preventDefault();

    if (!email || !password) {
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
  
    const user = {
        email: email,
        password: password
    }
    
    
    axios.post("http://127.0.0.1:8000/auth/login/", user)
        .then(response => 
        {

      setErrorMessage('');

      console.log("LOGIN RESPONSE:", response.data);

      const accessToken = response.data?.access;
      const refreshToken = response.data?.refresh;

      if (!accessToken || !refreshToken) {
        setErrorMessage("Login response did not return tokens");
        return;
      }
 
      localStorage.setItem("access", accessToken);
      localStorage.setItem("refresh", refreshToken);

      dispatch(setUser({email:email}));

      navigate("/");

      })
      
      .catch(error => {

        if (error.response) {

            if (error.response.status === 401) {
                setErrorMessage("Invalid email or password");
            } 
            else if (error.response.status === 403) {
                setErrorMessage("Driver account not approved by admin");
            } 
            else if (error.response.data?.error) {
                setErrorMessage(error.response.data.error);
            } 
            else {
                setErrorMessage("Login failed");
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
              <h1 className="text-3xl font-bold text-zinc-900 mb-2">Sign In</h1>
          </div>

          <form className="space-y-6">

            <div className="text-red-500 text-sm">
              {errorMessage}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none transition"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

          
            <button
              type="button"
              className="w-full bg-zinc-900 text-white py-3 rounded-lg font-semibold hover:bg-black transition duration-200 shadow-lg hover:shadow-xl"
              onClick={loginuser}
            >
              Sign in
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account? &nbsp;
            <Link to="/signup" className="text-zinc-900 hover:text-blue-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;