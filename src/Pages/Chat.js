import React, { useState } from "react";
import ChatLeftComponent from "../Components/ChatLeftComponent";
import ChatRightComponent from "../Components/ChatRightComponent";
import NavBarBottom from "../Components/NavBarBottom";

export default function Chat() {
  const [chatID, setChatID] = useState(0);

  return (
    <>
      <div className="flex justify-center items-center bg-gray-100 w-screen h-screen">
        <div className="flex gap-0 justify-between shadow-md rounded-md bg-white h-[30rem] max-h-[30rem]">
          <ChatLeftComponent chatID={chatID} setChatID={setChatID} />
          <span className="h-full border-r-2 border-gray-400"></span>
          <ChatRightComponent chatID={chatID} />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <NavBarBottom />
      </div>
    </>
  );
}
