import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";

import { useEffect } from "react";
const Layout = () => {
  // const [sessionTimeout, setSessionTimeout] = useState(null);
  let sessionTimeout = null;
  const navigate = useNavigate();
  const { logout } = useAuth();

  const logOutUser = () => {
    logout();
    navigate("/login");
  };

  const resetSessionTimeOut = () => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }
    setTimeout(logOutUser, 999420000); // 7z minutes
  };

  useEffect(() => {
    resetSessionTimeOut();
    window.addEventListener("mousemove", resetSessionTimeOut);
    window.addEventListener("keydown", resetSessionTimeOut);
    return () => {
      window.removeEventListener("mousemove", resetSessionTimeOut);
      window.removeEventListener("keydown", resetSessionTimeOut);
      // Clear the timeout when the component unmounts
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
    };
  });

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
