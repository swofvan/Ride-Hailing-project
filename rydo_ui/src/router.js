import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import UserSignUp from "./components/auth/UserSignup";
import DriverSignUp from "./components/auth/DriverSignup";
import Login from "./components/auth/Login";
import UserProfile from "./components/Profileview";
import RideBooking from "./components/RideBooking";
import Logout from "./components/auth/Logout";
import RideBookingList from "./components/Drive";
import CurrentRide from "./components/CurrentRide";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    
    { path: 'user-signup', element: <UserSignUp/> },
    { path: 'driver-signup', element: <DriverSignUp/> },
    { path: 'login', element: <Login/> },
    { path: 'logout', element: <Logout/> },

    { path: 'profile', element: <UserProfile/> },
    { path: 'ride-booking', element: <RideBooking/> },
    { path: 'drive', element: <RideBookingList/> },
    { path: 'currentride', element: <CurrentRide/> },
    
]);

export default router;