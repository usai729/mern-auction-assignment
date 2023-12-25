import React, { useEffect, useState } from "react";
import AuthContainer from "../Components/AuthContainer";
import { FaArrowRight } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../Redux/Functions/Auth";
import { useNavigate } from "react-router-dom";
import { tokenAction } from "../Redux/Slices/UserSlice";

const sock = require("socket.io-client");

export default function Auth() {
  const [authMode, setAuthMode] = useState("login");

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [company, setCompany] = useState("");
  const [usertype, setUsertype] = useState("buyer");

  const { token, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const socket = sock.connect("http://localhost:3002");

  const next = () => {
    let p1 = document.getElementById("sec_1");
    let p2 = document.getElementById("sec_2");

    if (email.length !== 0 && pass.length !== 0) {
      p1.style.display = "none";
      p2.style.display = "flex";
    } else {
      alert("Fill in all the required fields");
    }
  };

  useState(() => {
    dispatch(tokenAction({ type: "REMOVE" }));

    socket.on("connect", () => {
      console.log("Connected to the server!");

      socket.emit("emit_1");
    });
  });

  return (
    <>
      {authMode === "login" ? (
        <AuthContainer>
          <section>
            <p className="text-xl text-authcolor1">Sign In</p>
            <p className="text-sm text-red-700">{error}</p>
            <form
              className="flex flex-col justify-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();

                dispatch(
                  login({
                    email: email,
                    password: pass,
                  })
                );

                navigate("/");
              }}
            >
              <label htmlFor="email" className="text-color1">
                E-mail
              </label>
              <input
                type="email"
                name=""
                id="email"
                placeholder="E-mail"
                className="p-2 bg-authcolor2 border-gray-400 border-1 outline-color1 rounded-sm"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
              <label htmlFor="password" className="text-color1">
                Password
              </label>
              <input
                type="password"
                name=""
                id="password"
                placeholder="Password"
                className="p-2 bg-authcolor2 border-gray-400 border-1 outline-color1 rounded-sm"
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                required
              />
              <button
                type="submit"
                className="flex justify-center items center bg-color1 text-color2 font-sans p-3 w-full"
              >
                Sign In
              </button>
              <p className="text-color1 text-center">
                Don't have an account?{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={() => {
                    setEmail("");
                    setPass("");
                    setCompany("");
                    setUsertype("");

                    setAuthMode("signup");
                  }}
                >
                  Sign Up
                </span>
              </p>
            </form>
          </section>
        </AuthContainer>
      ) : (
        <AuthContainer>
          <p className="text-xl text-authcolor1">Sign Up</p>
          <p className="text-sm text-red-700">{error}</p>
          <form
            className=""
            onSubmit={(e) => {
              e.preventDefault();

              if (document.getElementById("sec_2").style.display !== "flex") {
                document.getElementById("sec_2").style.display = "flex";
                document.getElementById("sec_1").style.display = "none";
              } else {
                dispatch(
                  signup({
                    email: email,
                    password: pass,
                    usertype: usertype,
                    company: company,
                  })
                );

                navigate("/");
              }
            }}
          >
            <section id="sec_1" className="flex flex-col justify-center gap-2">
              <label htmlFor="email" className="text-color1">
                E-mail
              </label>
              <input
                type="email"
                name=""
                id="email"
                placeholder="E-mail"
                className="p-2 bg-authcolor2 border-gray-400 border-1 outline-color1 rounded-sm"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="password" className="text-color1">
                Password
              </label>
              <input
                type="password"
                name=""
                id="password"
                placeholder="Password"
                className="p-2 bg-authcolor2 border-gray-400 border-1 outline-color1 rounded-sm"
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
              <button
                className="group flex gap-2 justify-center items-center bg-color1 text-color2 font-sans p-3 w-full"
                onClick={next}
                type="button"
              >
                Next{" "}
                <FaArrowRight className="text-color2 group-hover:translate-x-4 transition-transform duration-150" />
              </button>
              <p className="text-color1 text-center">
                Already have an account?{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={() => {
                    setEmail("");
                    setPass("");

                    setAuthMode("login");
                  }}
                >
                  Sign In
                </span>
              </p>
            </section>

            <section
              id="sec_2"
              className="hidden flex-col justify-center gap-2"
            >
              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="userType" className="text-color1">
                    Sign up as?
                  </label>
                  <div className="flex gap-4">
                    <div>
                      <input
                        type="radio"
                        name="usertype"
                        value={"seller"}
                        id=""
                        onChange={() => {
                          setUsertype(
                            document.querySelector(
                              'input[name="usertype"]:checked'
                            ).value
                          );
                        }}
                      />{" "}
                      Seller
                    </div>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="usertype"
                      value={"buyer"}
                      id=""
                      onChange={() => {
                        setUsertype(
                          document.querySelector(
                            'input[name="usertype"]:checked'
                          ).value
                        );
                      }}
                    />{" "}
                    Buyer
                  </div>
                </div>
                {usertype === "seller" && (
                  <input
                    type="text"
                    name=""
                    id="password"
                    placeholder="Company Name"
                    className="p-2 bg-authcolor2 border-gray-400 border-1 outline-color1 rounded-sm"
                    onChange={(e) => {
                      setCompany(e.target.value);
                    }}
                    required
                  />
                )}
              </div>
              <button
                type="submit"
                className="group flex gap-2 justify-center items-center bg-color1 text-color2 font-sans p-3 w-full"
              >
                Complete{" "}
                <TiTick className="text-color2 group-hover:-rotate-12 rotate transition-transform duration-150" />
              </button>
              <p className="cursor-pointer text-right">Cancel</p>
            </section>
          </form>
        </AuthContainer>
      )}
    </>
  );
}
