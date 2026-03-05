import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FaLock } from "react-icons/fa";
import Navbar from "../Navbar";



const checkAuth = (Component) => {
  return function Wrapper(props) {
    const user = useSelector((store) => store.auth.user);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
      if (!user) {
        setShowAlert(true);

        const timer = setTimeout(() => {
          navigate("/login");
        }, 1000);                 // milliseconds

        return () => clearTimeout(timer);
      }
    }, [user, navigate]);

    if (!user) {
      return (
        <div>
            <Navbar/>
            {showAlert && (
                <div className="fixed top-25 left-0 right-0 flex justify-center z-50">
                    <div className="bg-red-100 border-red-600 border-1 text-red-600 px-6 py-4 rounded-md flex items-center gap-2">
                        <span className="font-red "> <FaLock /> </span>
                        Please login to continue
                    </div>
                </div>
            )}
        </div>
      );
    }

    return <Component {...props} />;
  };
};

export default checkAuth;