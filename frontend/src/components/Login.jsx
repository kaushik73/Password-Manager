import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { togglePassword } from "../utils/utlis";
import { useAuth } from "../context/authContext";
import { loginInUser } from "../utils/dbOperations";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    ownerEmail: "",
    password: "",
  });
  const imgRef = useRef(null);
  const passwordRef = useRef();

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginClick = async () => {
    const decryptedPassword = await loginInUser(loginForm);
    if (
      decryptedPassword != null &&
      decryptedPassword.password == loginForm.password
    ) {
      toast.success("Verified Successfully!");
      login(decryptedPassword);
      setTimeout(() => {
        navigate("/view");
      }, 1000);
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };
  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    togglePassword(passwordRef, imgRef);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <ToastContainer toastType="success" />

      <div className="content flex items-center justify-center">
        <div className="loginForm max-w-4xl mx-auto rounded-lg shadow-md sm:w-2/6 w-5/6">
          <div className="loginHeadingAndCross p-3 rounded-t-lg bg-gray-100 flex justify-between items-center">
            <div className="loginHeading text-3xl font-bold flex-grow text-black ml-3">
              Login :
            </div>
            <div className="crossIcon cursor-pointer pt-1">
              <lord-icon
                src="https://cdn.lordicon.com/zxvuvcnc.json"
                onClick={() => navigate("/")}
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
                title="Go To Home"
              ></lord-icon>
            </div>
          </div>
          <div className="loginFormContent flex justify-center items-center ">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-100 px-6 py-3 rounded-b-lg shadow-md w-full"
            >
              <div className="mb-4">
                <label className="block mb-1">Email ID</label>
                <input
                  type="ownerEmail"
                  name="ownerEmail"
                  value={loginForm.ownerEmail}
                  onChange={handleChange}
                  className="inputTag loginInputTag"
                  placeholder="Enter Email ID"
                  required
                />
              </div>

              <div className="mb-4 relative flex-grow">
                <label className="block mb-1">Password</label>
                <input
                  name="password"
                  ref={passwordRef}
                  value={loginForm.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter Password"
                  className="inputTag loginInputTag"
                  type="password"
                />
                <img
                  ref={imgRef}
                  src="/icons/OpenEye.png"
                  alt="Toggle Password Visibility"
                  className="absolute right-3 top-2/3 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                  onClick={handleTogglePassword}
                />
              </div>

              <div className="loginSubmitButton flex justify-center items-center ">
                <button
                  onClick={handleLoginClick}
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
