const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center bg-slate-700 py-1 text-white w-full">
      <div className="logo font-bold text-xl">
        <span className="text-green-500">&lt;</span>
        <span>Pass</span>
        <span className="text-green-500">M/&gt;</span>
      </div>
      <div>
        Created By{" "}
        <a
          href="https://infowithawan.com"
          target="_blank"
          className="font-bold text-green-500"
        >
          Info With Awan
        </a>
      </div>
    </footer>
  );
};

export default Footer;
