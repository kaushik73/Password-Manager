const Footer = () => {
  return (
    <footer
      className="bg-slate-800 text-white flex justify-center"
      style={{
        minHeight: "var(--footer-height)",
      }}
    >
      <span className="flex items-center justify-center pt-1">Made by </span>
      <div className="text-green-700 font-bold flex justify-center  items-center">
        {" "}
        <div>
          &nbsp; <span className="text-2xl">K</span>aushik &nbsp;
        </div>
        <div>
          <span className="text-2xl">J</span>ain
        </div>
      </div>
    </footer>
  );
};

export default Footer;
