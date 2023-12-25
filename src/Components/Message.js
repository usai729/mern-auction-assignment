import React from "react";

export default function Message({ content, type }) {
  return (
    <>
      <div
        className={`p-3 w-max max-w-[26rem] m-4 shadow-md ${
          type === "sender"
            ? "bg-color2 text-color1 rounded-lg"
            : "bg-color1 text-color2 rounded-full"
        }`}
      >
        {content}
      </div>
    </>
  );
}
