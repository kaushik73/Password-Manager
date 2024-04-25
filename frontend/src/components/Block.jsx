import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { togglePassword } from "../utils/utlis";
import {
  deletePassword,
  getUserDataFromID,
  updatePassword,
} from "../utils/dbOperations";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import LoadingIcon from "./LoadingIcon";

const Block = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const disableEnableRef = useRef(true);
  const passwordRef = useRef();
  const queryParams = new URLSearchParams(location.search);
  const passwordID = queryParams.get("id");
  const [currentPassword, setCurrentPassword] = useState({
    site: "",
    userName: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const currentPasswordFromDB = await getUserDataFromID(passwordID);
      setCurrentPassword(currentPasswordFromDB);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleDeleteInBlock = () => {
    setDialogOpen(true);
  };

  const handleEditInBlock = () => {
    setIsDisabled(false);
    disableEnableRef.current = false;
  };

  const handleUpdateInBlock = async () => {
    setIsLoading(true);
    try {
      const result = await updatePassword(currentPassword);
      if (result) {
        notifyPasswordUpdate();
        setTimeout(() => {
          navigate(`/block?id=${currentPassword._id}`);
          setIsDisabled(true);
          disableEnableRef.current = true;
        }, 1000);
      } else {
        toast.error("Internal Server Error, Please Try Again");
      }
    } catch (error) {
      console.error("Error updating password:", error.message);
      toast.error("Failed to update password. Please try again later.");
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  const handleConfirmClickOfDialog = () => {
    setDialogOpen(false);
    deletePassword(currentPassword);
    notifyPasswordDelete();
    setTimeout(() => {
      navigate("/passwords");
    }, 1000);
  };

  const handleCancelClickOfDialog = () => {
    setDialogOpen(false);
  };

  const notifyPasswordUpdate = () => toast.success("Password Updated!", {});
  const notifyPasswordDelete = () => toast.success("Password Deleted!", {});
  const handleInputChange = (e) => {
    setCurrentPassword({ ...currentPassword, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    togglePassword(passwordRef, imgRef);
  };

  return (
    <>
      <ToastContainer toastType="success" />

      <div className="relative appBackground flex items-center justify-center content  ">
        <div className="z-20 absolute top-50% left-50% ">
          {isLoading && <LoadingIcon />}
        </div>

        <div className="max-w-md min-h-60 w-4/5 bg-gray-100 p-3 rounded-lg shadow-lg ">
          <div className="insideContent">
            {!isLoading && (
              <div>
                <div className="blockheading text-3xl font-bold text-black mb-4">
                  Password Details :
                </div>
                <div className="site-container text-gray-600 mb-4 flex  items-center">
                  <div className="subHeading font-bold mr-2">Site:</div>
                  <input
                    name="site"
                    href={currentPassword.site}
                    target="_blank"
                    className={`text-blue-800 w-full ${
                      isDisabled ? "" : "inputTag blockInputTag"
                    }`}
                    value={currentPassword.site}
                    disabled={isDisabled}
                    onChange={handleInputChange}
                    placeholder="Website URL"
                  />
                </div>

                <div className="userName-container text-gray-600 mb-4 truncate flex  items-center">
                  <div className="subHeading font-bold mr-2">Name:</div>

                  <input
                    name="userName"
                    className={`text-black w-full ${
                      isDisabled ? "" : "inputTag blockInputTag  "
                    }`}
                    value={currentPassword.userName}
                    disabled={isDisabled}
                    onChange={handleInputChange}
                    placeholder="Enter User ID"
                  />
                </div>

                <div className="password-container text-gray-600 mb-4 truncate flex  items-center relative">
                  <div className="subHeading font-bold mr-2">Password:</div>

                  <input
                    name="password"
                    className={`text-black w-full  ${
                      isDisabled ? "" : "inputTag blockInputTag "
                    }`}
                    value={currentPassword.password}
                    disabled={isDisabled}
                    ref={passwordRef}
                    type="password"
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                  />
                  <img
                    ref={imgRef}
                    src="../../icons/OpenEye.png"
                    alt="Toggle Password Visibility"
                    className="absolute right-3 top-1/3 m-1 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                    onClick={handleTogglePassword}
                  />
                </div>

                <div className="actionButtons flex justify-center gap-3">
                  <div className="edit-button text-end mt-1">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white py-0.5 px-1.5 rounded"
                      onClick={() => {
                        isDisabled
                          ? handleEditInBlock()
                          : handleUpdateInBlock();
                      }}
                    >
                      {`${isDisabled ? "Edit" : "Update"}`}
                    </button>
                  </div>
                  <div className="delete-button text-end mt-1">
                    <button
                      onClick={handleDeleteInBlock}
                      className="bg-red-500 hover:bg-red-600 text-white py-0.5 px-1.5 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="dialogBoxContainer ">
        <Dialog open={dialogOpen} handler={handleOpen} className="">
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg">
            <DialogHeader>Delete Your Password from Block.</DialogHeader>
            <DialogBody>Are you sure you want to DELETE?</DialogBody>
            <DialogFooter>
              <Button
                variant="gradient"
                onClick={handleCancelClickOfDialog}
                className="mr-1 bg-red-500 p-2"
              >
                Cancel
              </Button>
              <Button
                variant="gradient"
                className="mr-1 bg-green-500 p-2"
                onClick={handleConfirmClickOfDialog}
              >
                Confirm
              </Button>
            </DialogFooter>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default Block;
