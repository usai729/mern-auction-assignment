import React from "react";

import logo from "../Assets/ZA-LOGO-WHITE.png";

export default function AuthContainer({ children }) {
  return (
    <div className="w-screen h-screen bg-color1 flex flex-col justify-center items-center">
      {/* <p className="text-3xl text-color2 font-bold font-logo m-4">Logo</p> */}
      <img src={logo} alt="" />
      <div className="flex flex-col gap-2 justify-center items-center h-max p-4 shadow-lg rounded-sm bg-color2 w-[95vw] md:w-[20vw]">
        {children}
      </div>
    </div>
  );
}
