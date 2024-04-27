import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
const Navbar = () => {
  const location = useLocation();
  const [showAddPassword, setShowAddPassword] = useState(true);
  const [showViewPasswords, setShowViewPasswords] = useState(true);
  const { isLoggedIn, logout } = useAuth();

  // Update state to control visibility of add and view pass
  useEffect(() => {
    setShowAddPassword(location.pathname !== "/addPassword");
    setShowViewPasswords(location.pathname !== "/passwords");
  }, [location.pathname]);

  const signOutUser = () => {
    logout();
  };

  return (
    <nav
      className="bg-slate-800 text-white flex flex-col  md:flex-row items-center p-3 justify-between"
      style={{
        minHeight: "var(--navbar-height)",
      }}
    >
      <NavLink to="/">
        <div className="logo font-bold text-2xl cursor-pointer transition-all duration-300 ease-in transform hover:scale-105">
          <span className="text-green-700  ">&lt;</span>
          <span className="">Pass</span>
          <span className="text-green-700 ">Manager/&gt;</span>
        </div>
      </NavLink>
      <div className="options pt-2 md:pt-0">
        <ul className="flex md:gap-9 gap-3">
          {showAddPassword && (
            <li>
              <NavLink
                className="hover:text-green-700 min-w-14"
                to="/addPassword"
              >
                Add Password
              </NavLink>
            </li>
          )}
          {showViewPasswords && (
            <li>
              <NavLink
                activestyle={{ color: "red" }}
                className="hover:text-green-700 min-w-14"
                to="/passwords"
              >
                View Passwords
              </NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <NavLink to="/login" className="hover:text-green-700 min-w-14">
                Log In
              </NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <NavLink to="/signUp" className="hover:text-green-700 min-w-14 m-0 md:mr-4">
                Sign Up
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink
                to="/"
                className="hover:text-green-700 min-w-14"
                onClick={signOutUser}
              >
                Sign Out
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
