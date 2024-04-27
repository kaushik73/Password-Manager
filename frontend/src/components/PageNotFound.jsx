// import { Link } from "react-router-dom";

// const PageNotFound = () => {
//   return (
//     <section className="relative flex flex-col justify-center font-serif ">
//       <div className="pageNotFoundBackground">
//         <h1 className="text-center text-6xl">
//           4<span className="text-green-700">0</span>4
//         </h1>
//       </div>

//       <div className="z-10 404Data absolute bottom-6 left-2/4 right-21 flex flex-col justify-center items-center">
//         <h3 className="">Look&apos;s like you&apos;re lost</h3>

//         <p className="">the page you are looking for not available!</p>

//         <Link
//           to="/"
//           className=" bg-green-600 hover:bg-green-700 text-white p-2"
//         >
//           Go to Home
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default PageNotFound;

import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="relative flex flex-col justify-center font-serif h-screen">
      <div className="pageNotFoundBackground">
        <h1 className="text-center text-6xl">
          4<span className="text-green-700">0</span>4
        </h1>
      </div>

      <div className="404Data absolute inset-x-0 bottom-6 flex flex-col justify-center items-center text-center">
        <h3 className="">Look&apos;s like you&apos;re lost</h3>
        <p className="">The page you are looking for is not available!</p>
        <Link
          to="/"
          // className="bg-green-600 hover:bg-green-700 text-white p-2 mt-2">
          className="bg-green-600   hover:bg-green-700  text-slate-50 font-bold py-2 px-4 rounded transition duration-300 ease-in-out inline-block"
        >
          Go to Home
        </Link>
      </div>
    </section>
  );
};

export default PageNotFound;
