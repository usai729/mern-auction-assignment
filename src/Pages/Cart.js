import React, { useEffect } from "react";
import NavBarBottom from "../Components/NavBarBottom";

export default function Cart() {
  useEffect(() => {
    document.title = "Cart";
  });

  return (
    <>
      <div className="flex justify-center items-center">
        <NavBarBottom />
      </div>
    </>
  );
}
