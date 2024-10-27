import React from "react";

const Footer = () => {
  return (
    <>
      <div className="bg-slate-700 text-white flex flex-col justify-center items-center fixed bottom-0 w-full">
      <div className="flex ">
        <span className="text-green-600 text-xl font-bold">&lt;</span>
        <div className="logo font-bold text-xl">Pass</div>
        <span className="text-green-600 text-xl font-bold">OP/&gt;</span>
      </div>
      <div className="flex justify-center items-center mb-1">
        Created with <img className="w-6 mx-1" src="/heart.png" alt="heart img" /> by Jatin Gupta
      </div>
      </div>
    </>
  );
};

export default Footer;
