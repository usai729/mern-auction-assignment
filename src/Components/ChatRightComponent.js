import React, { useState } from "react";

import { IoMdSend } from "react-icons/io";
import Message from "./Message";

export default function ChatRightComponent({ chatID }) {
  return (
    <>
      <div className="flex flex-col-reverse gap-2 p-3 w-[70%] overflow-y-auto">
        <div className="flex flex-col justify-between flex-grow">
          <div className="chat h-full mt-5">
            <Message
              content={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris convallis massa eget lobortis mattis. Nulla molestie lectus magna, id venenatis mi imperdiet et."
              }
              type={"sender"}
            />
            <Message
              content={"Nullam tempus vitae metus at venenatis."}
              type={"receiver"}
            />
            <Message
              content={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris convallis massa eget lobortis mattis. Nulla molestie lectus magna, id venenatis mi imperdiet et."
              }
              type={"sender"}
            />
            <Message
              content={"Nullam tempus vitae metus at venenatis."}
              type={"receiver"}
            />
          </div>
          <div className=" flex items-center mt-2 gap-2 w-[28rem]">
            <input
              type="text"
              placeholder="Send a message..."
              className="w-full drop-shadow-lg border-0 border-gray-500 p-3 rounded-full outline-none"
            />
            <button className="rounded-full bg-color1 p-3 drop-shadow-lg">
              <IoMdSend className="text-color2" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
