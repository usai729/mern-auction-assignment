import React from "react";

import { CiChat1, CiHome, CiShoppingCart, CiUser } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";

export default function NavBarBottom(props) {
  const nav = useLocation();
  const pathname = nav.pathname;

  return (
    <>
      <div className="bottom-5 w-max fixed rounded-full p-4 pr-8 pl-8 shadow-md drop-shadow-lg bg-color1">
        <ul className="flex gap-4 justify-center items-center">
          <li
            className={`border-blue-600 pb-2 ${
              pathname === "/home" || pathname === "/"
                ? "border-b-2"
                : "border-none"
            }`}
          >
            <Link to={"/home"}>
              <CiHome size={30} className="text-color2" />
            </Link>
          </li>
          {/* <li
            className={`border-blue-600 pb-2 ${
              pathname === "/cart" && "border-b-2"
            }`}
          >
            <Link to={"/cart"} className="relative">
              <CiShoppingCart size={30} className="text-color2" />
              <p className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-600 border-2  rounded-full -top-2 -end-2">
                {30}
              </p>
            </Link>
          </li> */}
          <li
            className={`border-blue-600 pb-2 ${
              pathname === "/conversations" && "border-b-2"
            }`}
          >
            <Link to={"/conversations"} className="relative">
              <CiChat1 size={30} className="text-color2" />
              <p className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-600 border-2  rounded-full -top-2 -end-2">
                {30}
              </p>
            </Link>
          </li>
          <li
            className={`border-blue-600 pb-2 ${
              pathname === "/myprofile" && "border-b-2"
            }`}
          >
            <Link to={"/myprofile"}>
              <CiUser size={30} className="text-color2" />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
