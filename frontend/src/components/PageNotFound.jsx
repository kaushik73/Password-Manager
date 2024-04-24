import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="flex flex-col justify-center font-serif ">
      <div className="pageNotFoundBackground">
        <h1 className="text-center text-6xl -mb-10">
          4<span className="text-green-700">0</span>4
        </h1>
      </div>

      <div className=" -mt-20 flex flex-col justify-center items-center ">
        <h3 className="-mt-10">Look&apos;s like you&apos;re lost</h3>

        <p className="mb-2">the page you are looking for not avaible!</p>

        <Link
          to="/"
          className=" bg-green-600 p-2  hover:bg-green-700 text-white"
        >
          Go to Home
        </Link>
      </div>
    </section>
  );
};

export default PageNotFound;
