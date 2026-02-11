import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import UserSignUp from "./components/auth/UserSignup";
import DriverSignUp from "./components/auth/DriverSignup";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'user-signup', element: <UserSignUp/> },
    { path: 'driver-signup', element: <DriverSignUp/> }
]);

export default router;