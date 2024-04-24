import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./context/authContext";

import { useEffect } from "react";
const Layout = () => {
  const [sessionTimeout, setSessionTimeout] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const logOutUser = () => {
    logout();
    navigate("/login");
  };

  const resetSessionTimeOut = () => {
    if (sessionTimeout) {
      setSessionTimeout(clearTimeout(sessionTimeout));
    }
    setTimeout(logOutUser, 360000); // 6 minutes
  };

  useEffect(() => {
    resetSessionTimeOut();
    window.addEventListener("mousemove", resetSessionTimeOut);
    window.addEventListener("keydown", resetSessionTimeOut);
    return () => {
      window.removeEventListener("mousemove", resetSessionTimeOut);
      window.removeEventListener("keydown", resetSessionTimeOut);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="appBackground">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
