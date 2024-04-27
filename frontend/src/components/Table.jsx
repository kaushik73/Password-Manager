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

  const navigateToURL = (URL) => {
    const prefixedURL =
      URL.startsWith("http://") || URL.startsWith("https://")
        ? URL
        : `http://${URL}`;
    window.open(prefixedURL);
  };

  return (
    <>
      <tbody className="bg-green-100">
        <tr className="border-b border-gray-200 hover:bg-gray-100">
          <td className="max-w-10 text-center py-2 border border-white font-bold">
            {serialNumber}
          </td>
          <td className="max-w-40 min-w-32 text-center mx-auto px-2 py-2 border border-white truncate">
            <div className="flex items-center justify-center ">
              <div className="overflow-hidden">
                {" "}
                {/* I removed overflow-x-auto and added truncate */}
                <p
                  // href={password.site}
                  // target="_blank"
                  onClick={() => navigateToURL(password.site)}
                  className="text-blue-800"
                >
                  {password.site}
                </p>
              </div>
              <div className="min-w-5 relative right-0">
                <img
                  src="icons/copyIcon.png"
                  onClick={() => copyText(password.site, "URL")}
                  className="w-5 h-5 mb-2 cursor-pointer  mx-1"
                  alt="copy"
                />
              </div>
            </div>
          </td>

          <td className="min-w-32 max-w-40 text-center mx-auto px-4 py-2 border border-white truncate">
            <div className="flex items-center justify-center">
              <span
                className="bg-transparent text-center overflow-hidden"
                // className="bg-transparent text-center overflow-x-auto"
                style={{ maxWidth: "calc(100% - 1.25rem)" }}
              >
                {password.userName}
              </span>
              <div>
                <img
                  src="icons/copyIcon.png"
                  onClick={() => copyText(password.userName, "User ID")}
                  className="w-5 h-5 mb-2 cursor-pointer  mx-1"
                  alt="copy"
                />
              </div>
            </div>
          </td>

          <td className="min-w-32 max-w-40 text-center mx-auto px-4 py-2 border border-white overflow-hidden">
            <div className="flex items-center justify-center">
              <span
                type="password"
                className="bg-transparent text-center overflow-hidden font-bold"
                style={{ maxWidth: "calc(100% - 1.25rem)" }}
              >
                {getPasswordMask(password.password)}
              </span>
              <img
                src="icons/copyIcon.png"
                onClick={() => copyText(password.password, "Password")}
                className="w-5 h-5 mb-2 cursor-pointer  mx-1"
                alt="copy"
              />
            </div>
          </td>
          <td className="min-w-20 text-center mx-auto px-2 py-2 border border-white ">
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
