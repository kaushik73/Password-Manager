// import { useState, useEffect } from "react";
// // import "./FocusCursor.css"; // Import CSS file for additional styling

// const Temp = () => {
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

//   // Update cursor position on mouse move
//   const handleMouseMove = (e) => {
//     setCursorPosition({ x: e.clientX, y: e.clientY });
//   };

//   useEffect(() => {
//     // Add event listener for mouse move
//     document.addEventListener("mousemove", handleMouseMove);

//     // Clean up event listener on component unmount
//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []); // Run effect only on component mount and unmount

//   return (
//     <div className="relative h-screen overflow-hidden">
//       {/* Container for blurred background */}
//       <div className="absolute inset-0 bg-gray-200 backdrop-blur-lg blur-lg" />

//       {/* Content area with dynamic blur effect based on cursor position */}
//       <div className="absolute inset-0 flex justify-center items-center">
//         <div
//           className="relative z-10 p-8 bg-white rounded-lg shadow-lg transition-all duration-300"
//           style={{
//             filter: `blur(${
//               Math.min(
//                 Math.abs(cursorPosition.x - window.innerWidth / 2),
//                 Math.abs(cursorPosition.y - window.innerHeight / 2)
//               ) / 30
//             }px)`,
//           }}
//         >
//           <h1 className="text-4xl font-bold text-gray-800">
//             Interactive Focus Cursor
//           </h1>
//           <p className="text-lg text-gray-600 mt-4">
//             Move your cursor to see the focus effect!
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Temp;
