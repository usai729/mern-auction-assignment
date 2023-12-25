import React from "react";

export default function ChatLeftComponent({ chatID, setChatID }) {
  return (
    <>
      <div className="flex flex-col gap-2 p-3 w-[15rem] max-h-[28rem] overflow-y-auto">
        <p className="text-2xl font-bold font-serif text-color1 text-center">
          Logo
        </p>
        <ul className="list-none flex flex-col gap-3">
          <li className="flex items-center gap-2">
            <img
              src="https://i.pinimg.com/736x/b2/19/c5/b219c5c5ac8f06624df562ce942509c9.jpg"
              style={{
                width: "3rem",
                height: "3rem",
                objectFit: "contain",
                borderRadius: "50%",
              }}
              alt=""
            />
            <p className="text-lg font-bold">user email</p>
          </li>
        </ul>
      </div>
    </>
  );
}
