import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="content animate-bounce-custom homePage flex items-center justify-center  mx-auto">
      <div className="max-w-md min-h-60 w-full bg-white p-8 rounded-md overflow-hidden shadow-lg  ">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Securly Save your
          <div className="logo font-bold text-2xl cursor-pointer">
            <span className="text-green-700">P</span>
            ass
            <span className="text-green-700">W</span>ord!
          </div>
        </h1>
        <p className="text-gray-600 mb-6">
          We securely store your passwords under lock and key. Your passwords
          are encrypted using your unique password of our Managing App.{" "}
        </p>
        <Link
          to="/view"
          className="bg-green-600   hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out inline-block"
        >
          View Passwords
        </Link>
      </div>
    </div>
  );
};

export default Home;
