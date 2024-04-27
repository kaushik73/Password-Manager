import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-4/5 content animate-bounce-custom homePage flex items-center justify-center  mx-auto">
      <div className="max-w-xl min-h-60  w-full bg-white p-8 rounded-md overflow-hidden shadow-lg  ">
        {/* <div className="dataAndGifContainer  flex justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 ">
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
          <div className="homePageGif min-h-30 min-w-30"></div>
        </div> */}
        <div className="dataAndGifContainer flex flex-col md:flex-row justify-center items-center">
          <div className="text-center md:text-left mb-6 md:mr-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Securly Save your&nbsp;
              <span className="logo font-bold text-2xl cursor-pointer">
                <span className="text-green-700 text-3xl">P</span>
                ass
                <span className="text-green-700 text-3xl">W</span>ord!
              </span>
            </h1>
            <p className="text-gray-600 mb-6">
              We securely store your passwords under lock and key. Your
              passwords are encrypted using your unique password of our Managing
              App.{" "}
            </p>
          </div>
          <div className="homePageGif "></div>
        </div>

        <div className="flex mt-4 justify-center items-center">
          <Link
            to="/view"
            className="bg-green-600  absolute  hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out inline-block"
          >
            View Passwords
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
