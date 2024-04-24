import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { togglePassword } from "../utils/utlis";
import { savePassword } from "../utils/dbOperations";
import PropTypes from "prop-types";

const PasswordForm = () => {
  const imgRef = useRef(null);
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [form, setForm] = useState({ site: "", userName: "", password: "" });

  const handleTogglePassword = () => {
    togglePassword(passwordRef, imgRef);
  };

  const handleSavePassword = async () => {
    if (
      form.site.length > 3 &&
      form.password.length > 3 &&
      form.userName.length > 3
    ) {
      notifyPasswordSave();
      await savePassword(form);
      setTimeout(() => {
        navigate("/passwords");
      }, 1000);
    } else {
      toast.error("Invalid Length");
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const notifyPasswordSave = () => toast.success("Password Saved!", {});

  return (
    <div className="content">
      {!isLoggedIn && (
        <div className=" text-xl text-center mt-20 text-white py-3">
          ------Login First------
        </div>
      )}

      {isLoggedIn && (
        <div className=" content flex items-center justify-center">
          <ToastContainer toastType="success" />

          <div className=" passwordForm container max-w-4xl min-h-60 mx-auto  bg-gray-100 p-3 rounded-lg shadow-md sm:w-2/6 w-5/6">
            <div className="passwordFormHeading text-3xl font-bold text-black mb-4">
              Add Password :
            </div>
            <div className=" flex flex-col gap-3 my-2 py-2 ">
              <div className="URL flex-grow">
                <input
                  name="site"
                  value={form.site}
                  onChange={handleInputChange}
                  required
                  className="inputTag PasswordInputTag"
                  type="text"
                  placeholder="Website URL"
                  id="site"
                />
              </div>
              {/* for name and password */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="userName flex-grow">
                  <input
                    name="userName"
                    value={form.userName}
                    required
                    onChange={handleInputChange}
                    placeholder="User ID"
                    className="inputTag PasswordInputTag"
                    type="text"
                    id="id"
                  />
                </div>
                <div className="relative flex-grow">
                  <input
                    name="password"
                    ref={passwordRef}
                    value={form.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Password"
                    className="inputTag PasswordInputTag"
                    type="password"
                    id="password"
                  />
                  <img
                    ref={imgRef}
                    src="/icons/OpenEye.png"
                    alt="Toggle Password Visibility"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                    onClick={handleTogglePassword}
                  />
                </div>
              </div>
            </div>
            <div className="submitBtn flex justify-center">
              <button
                onClick={() => {
                  handleSavePassword();
                }}
                className=" flex rounded-xl p-2 px-15 bg-green-500 gap-2 hover:bg-green-600 hover:text-black transition duration-250 ease-in-out border-2 border-black"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/jgnvfzqg.json"
                  trigger="hover"
                  className="w-8 h-8 mr-2 bg-green-900"
                ></lord-icon>
                <span className="pt-1"> &nbsp;Add Password</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

PasswordForm.propTypes = {
  dataToEdit: PropTypes.object,
  serialNumber: PropTypes.number,
};
export default PasswordForm;
