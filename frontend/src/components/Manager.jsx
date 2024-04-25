import { getPasswords } from "../utils/dbOperations";
import Table from "./Table";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";
import LoadingIcon from "./LoadingIcon";
import AlertComponent from "./AlertComponent";

const Manager = () => {
  const [passwords, setPasswords] = useState([]); // Lift passwords state up
  const [message, setMessage] = useState();
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const pass = await getPasswords();
      setPasswords(pass);
      return pass;
    } catch (error) {
      console.error("Error fetching data:", error);
      setPasswords([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getMessageToShow = () => {
    if (!isLoggedIn) {
      setMessage("Please Login First");
    } else if (isLoggedIn && passwords.length === 0) {
      setMessage("No Passwords To Show");
    } else {
      setMessage(null);
    }
    return message;
  };

  const run = async () => {
    await fetchData();
  };
  useEffect(() => {
    run();
  }, [isLoggedIn]);

  useEffect(() => {
    getMessageToShow();
  }, [passwords]);

  return (
    <div className=" appBackground flex items-center justify-center  ">
      <div className="content w-full ">
        {!isLoading && message !== null && (
          <AlertComponent
            parentMsg={"Hey User! "}
            childMsg={"Before Seeing Passwords, Please Login..."}
          />
        )}
        <div className="">{isLoading && <LoadingIcon />}</div>

        {!isLoading && message == null && passwords.length !== 0 && (
          <div className="container py-2 max-w-4xl mx-auto overflow-x-auto ">
            <ToastContainer toastType="success" newestOnTop={false} />

            <table className="table-auto w-full  mt-10 sm:mt-0 rounded-xl">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="px-2 py-2">S No.</th>
                  <th className="px-2 py-2">Site</th>
                  <th className="px-2 py-2">User Name</th>
                  <th className="px-2 py-2">Password</th>
                  <th className="px-2 py-2">Actions</th>
                </tr>
              </thead>
              {passwords.map((password, index) => (
                <Table
                  key={index}
                  serialNumber={index + 1}
                  password={password}
                />
              ))}
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manager;
