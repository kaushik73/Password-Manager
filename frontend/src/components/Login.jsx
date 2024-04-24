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

  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef(null);
  const passwordRef = useRef();

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginClick = async () => {
    setIsLoading(true);
    try {
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
    } catch (error) {
      // throw error;
      console.error(error);
    } finally {
      setIsLoading(false);
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
                  src="../../public/icons/OpenEye.png"
                  alt="Toggle Password Visibility"
                  className="absolute right-3 top-2/3 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                  onClick={handleTogglePassword}
                />
              </div>

              <div className="loginSubmitButton flex justify-center items-center ">
                {!isLoading && (
                  <button
                    onClick={handleLoginClick}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                  >
                    Login
                  </button>
                )}
                {isLoading && (
                  <button
                    disabled
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out inline-flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                    Loading...
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
