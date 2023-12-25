import React, { useState } from "react";

import { CiMenuBurger, CiSearch } from "react-icons/ci";
import logo from "../Assets/ZA-LOGO-WHITE.png";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowDown, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import { useDispatch } from "react-redux";
import { tokenAction } from "../Redux/Slices/UserSlice";

export default function NavBarTop() {
  const [dropDown, setDropDown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex bg-color1 p-5 pr-7 pl-7 w-screen justify-between items-center sticky">
        <Link to={"/home"}>
          <img src={logo} alt="" className="w-9/12 md:w-[100%]" />
        </Link>
        <form
          className="relative"
          method="get"
          action={`/search/${searchTerm}`}
        >
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="border-2 border-gray-300 shadow-sm p-3 pl-8 bg-gray-50 rounded-lg outline-none focus:border-3 transition-all duration-150"
            placeholder="Search..."
            required
          />
          <CiSearch size={25} className="absolute top-3 left-1 text-gray-400" />
        </form>
      </div>
      <div className="w-screen p-2 bg-color2 text-color1 font-semibold flex justify-center gap-4 drop-shadow-lg">
        <Link className="underline underline-offset-1">About</Link>
        <Link to={"/all"} className="underline underline-offset-1">
          Products
        </Link>
        <button
          onClick={() => {
            dispatch(tokenAction({ type: "REMOVE" }));
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            navigate("/auth");
          }}
          className="underline underline-offset-1"
        >
          Log Out
        </button>
        <div className="relative">
          <p
            className="cursor-pointer underline underline-offset-1 inline-flex items-center"
            onClick={() => {
              setDropDown(!dropDown);
            }}
          >
            Developer{" "}
            <MdExpandMore
              className={`transition-transform duration-200 ${
                dropDown ? "rotate-180" : "rotate-0"
              }`}
            />
          </p>
          {dropDown && (
            <ul className="absolute bg-color1 text-color2 p-2 shadow-md w-max block md:inline-flex gap-4">
              <li>
                <a
                  href="http://www.linkedin.com/in/saiuttarkar"
                  target="_blank"
                >
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a href="http://www.github.com/usai729" target="_blank">
                  <FaGithub />
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
