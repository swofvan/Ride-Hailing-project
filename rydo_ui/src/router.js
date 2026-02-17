import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import UserSignUp from "./components/auth/UserSignup";
import DriverSignUp from "./components/auth/DriverSignup";
import Login from "./components/auth/Login";
import UserProfile from "./components/Profileview";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    
    { path: 'user-signup', element: <UserSignUp/> },
    { path: 'driver-signup', element: <DriverSignUp/> },
    { path: 'login', element: <Login/> },

    { path: 'profile', element: <UserProfile /> },
]);

export default router;