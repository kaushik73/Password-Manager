import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Table = ({ serialNumber, password }) => {
  const navigate = useNavigate();
  const copyText = (text, type) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied!`);
  };

  const handleViewClick = (password) => {
    navigate(`/block?id=${password._id}`);
  };
  const getPasswordMask = (text) => {
    return "*".repeat(String(text).length);
  };

  return (
    <>
      <tbody className="bg-green-100">
        <tr className="border-b border-gray-200 hover:bg-gray-100">
          <td className="max-w-10 text-center py-2 border border-white font-bold">
            {serialNumber}
          </td>
          <td className="max-w-40 min-w-32 text-center mx-auto px-2 py-2 border border-white truncate ">
            <div className="flex items-center justify-center ">
              <div className=" truncate">
                {" "}
                {/* I removed overflow-x-auto and added truncate */}
                <a
                  href={password.site}
                  target="_blank"
                  className="text-blue-800"
                >
                  {password.site}
                </a>
              </div>
              <div className="min-w-5 relative right-0">
                <img
                  src="icons/copyIcon.png"
                  onClick={() => copyText(password.site, "URL")}
                  className="w-5 h-5 mb-2 cursor-pointer hover:bg-slate-300 mx-1"
                  alt="copy"
                />
              </div>
            </div>
          </td>

          <td className="min-w-32 max-w-40 text-center mx-auto px-4 py-2 border border-white truncate">
            <div className="flex items-center justify-center">
              <span
                className="bg-transparent text-center truncate"
                // className="bg-transparent text-center overflow-x-auto"
                style={{ maxWidth: "calc(100% - 1.25rem)" }}
              >
                {password.userName}
              </span>
              <div>
                <img
                  src="icons/copyIcon.png"
                  onClick={() => copyText(password.userName, "Name")}
                  className="w-5 h-5 mb-2 cursor-pointer hover:bg-slate-300 mx-1"
                  alt="copy"
                />
              </div>
            </div>
          </td>

          <td className="min-w-32 max-w-40 text-center mx-auto px-4 py-2 border border-white truncate">
            <div className="flex items-center justify-center">
              <span
                type="password"
                className="bg-transparent text-center overflow-x-auto font-bold"
                style={{ maxWidth: "calc(100% - 1.25rem)" }}
              >
                {/* {password.password} */}
                {getPasswordMask(password.password)}
              </span>
              {/* <div> */}
              <img
                src="icons/copyIcon.png"
                onClick={() => copyText(password.password, "Password")}
                className="w-5 h-5 mb-2 cursor-pointer hover:bg-slate-300 mx-1"
                alt="copy"
              />
              {/* </div> */}
            </div>
          </td>
          <td className="min-w-32 text-center mx-auto px-2 py-2 border border-white ">
            <div className="buttons flex justify-around items-center">
              <button
                onClick={() => handleViewClick(password)}
                className="bg-green-500 hover:bg-green-600 text-white py-0.5 px-1.5 rounded"
              >
                View
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
};

Table.propTypes = {
  password: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    site: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  serialNumber: PropTypes.number.isRequired,
};
export default Table;
