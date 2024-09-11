const Navbar = () => {
  return (
    <nav className="bg-slate-700 text-white text-xl">
      <div className="mycontainer flex justify-between items-center px-4 h-14 py-5">
        <div className="logo font-bold">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">M/&gt;</span>
        </div>
        {/* <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              About
            </a>
            <a className="hover:font-bold" href="#">
              Contact
            </a>
          </li>
        </ul> */}
        <button className="flex justify-center items-center h-10 gap-2 bg-green-500 hover:bg-green-400 px-2 rounded-full ring-white ring-2">
          <img src="/github.svg" alt="github logo" className="h-3/4" />
          <span className="font-bold">GitHub</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
