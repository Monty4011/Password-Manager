import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-700 text-white flex justify-around items-center p-3">
      <div className="flex">
        <span className="text-green-600 text-xl font-bold">&lt;</span>
        <div className="logo font-bold text-xl">Pass</div>
        <span className="text-green-600 text-xl font-bold">OP/&gt;</span>
      </div>
      <button className="text-white bg-green-700  rounded-full flex  justify-between items-center ring-white ring-1">
        <img className="invert  w-10 p-1" src="/github.svg" alt="github logo" />
        <span className="font-bold px-2">GitHub</span>
      </button>
    </nav>
  );
};

export default Navbar;
