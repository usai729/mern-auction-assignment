import React from "react";
import { Link } from "react-router-dom";

import { FaExternalLinkAlt } from "react-icons/fa";

export default function ProductCard({
  sellername,
  title,
  image,
  minBid,
  highestBid,
  bidPage,
  id,
  fromHome,
  desc,
  fromBids,
}) {
  return (
    <>
      <div className="flex flex-col justify-center w-[20rem] h-[36rem] bg-white shadow-sm rounded-md border-1 border-gray-200 m-5 p-4">
        <div className="flex justify-between">
          <p className="text-sm font-semibold">{sellername}</p>
          <Link className="text-blue-600 hover:underline flex items-center gap-1">
            Visit <FaExternalLinkAlt size={10} />
          </Link>
        </div>
        <img
          src={image}
          style={{
            objectFit: "contain",
            width: "18rem",
            height: "18rem",
          }}
        />
        <p>{title?.substring(0, 100) + "..."}</p>
        {desc && (
          <p className="text-sm text-gray-700 mt-1 mb-1">
            {fromHome ? desc?.substring(0, 100) + "..." : desc}
          </p>
        )}
        <div className="flex justify-between">
          <p className="text-md font-semibold">
            <span className="font-normal text-gray-400">Min: </span>${minBid}
          </p>
          {!fromHome && (
            <p className="text-sm font-semibold items-center">
              <span className="font-normal  text-gray-400">Highest Bid: </span>$
              {highestBid}
            </p>
          )}
        </div>
        <div className="flex w-full mt-3 gap-2">
          {bidPage && (
            <Link className="p-3 border-blue-600 border-2 flex w-full items-center justify-center font-semibold rounded-sm">
              Bid
            </Link>
          )}
          {!fromBids && (
            <Link
              to={`/bid/${id}`}
              className="p-3 bg-blue-600 text-white font-semibold flex w-full items-center justify-center rounded-sm"
            >
              View Item
            </Link>
          )}
        </div>
        <Link className="text-blue-600 m-2 text-center text-sm hover:underline">
          Chat With Seller
        </Link>
      </div>
    </>
  );
}
