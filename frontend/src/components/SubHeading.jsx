const SubHeading = () => {
  return (
    <div
      className="container px-5 py-2 max-w-4xl mx-auto border-b-2 border-black"
      style={{ background: "#5CDB95" }}
    >
      <div className="logo font-bold text-2xl text-center">
        <span className="text-green-700">&lt;</span>
        Pass
        <span className="text-green-800">Manager/&gt;</span>
      </div>{" "}
      <p className="text-green-800 text-center font-semibold">
        Manager Your Passwords
      </p>
    </div>
  );
};

export default SubHeading;
