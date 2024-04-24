const LoadingIcon = () => {
  return (
    // <div classNameName="flex items-center justify-center h-full">
    //   <div
    //     id="loader"
    //     classNameName="w-20 h-20 relative rounded-lg animate-spin"
    //     style={{
    //       animation: "spin 1s ease infinite",
    //       transition: "background 0.3s ease",
    //       "&:hover": {
    //         background: "red",
    //       },
    //     }}
    //   >
    //     <div
    //       classNameName="absolute top-3 left-3 w-8 h-8 rounded-lg"
    //       style={{ background: "green" }}
    //     ></div>
    //     <div
    //       classNameName="absolute bottom-3 right-3 w-8 h-8 rounded-lg"
    //       style={{ background: "blue" }}
    //     ></div>
    //   </div>
    // </div>
    <div className="flex space-x-2 justify-center items-center h-screen dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-green-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-green-600 rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingIcon;
