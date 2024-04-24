// import PropTypes from "prop-types";
// export default function Tooltip({ message, children }) {
//   return (
//     <div className="group relative flex max-w-max flex-col items-center justify-center">
//       {children}
//       <div className="absolute left-1/2 z-30 bottom-10 ml-auto mr-auto min-w-max -translate-x-1/2 scale-0 transform rounded-lg px-3 py-2 text-xs font-medium transition-all duration-500 group-hover:scale-100">
//         <div className="flex max-w-xs z-30 flex-col items-center shadow-lg">
//           <div className="absolute w-4 z-30 h-4 bg-gray-800 bottom-0 left-1/2 transform -translate-x-1/2 rotate-45"></div>
//           <div className="rounded bg-gray-800 p-2  z-30 text-center text-xs text-white">
//             {message}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Tooltip({ message, children }) {
//   return (
//     <div className="relative inline-block">
//       {children}
//       <div className="absolute z-10 left-1/2 transform -translate-x-1/2 bottom-full bg-gray-800 text-white text-xs px-2 py-1 rounded">
//         {message}
//         <div className="absolute w-4 h-4 bg-gray-800 bottom-0 left-1/2 transform -translate-x-1/2 rotate-45"></div>
//       </div>
//     </div>
//   );
// }

// Tooltip.propTypes = {
//   message: PropTypes.string,
//   children: PropTypes.string,
// };
