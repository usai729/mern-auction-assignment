import React, { useState } from "react";
import NavBarTop from "../Components/NavBarTop";
import NavBarBottom from "../Components/NavBarBottom";
import { Link, useParams } from "react-router-dom";
import { useSearchQuery } from "../Redux/api/apiSlice";
import ProductCard from "../Components/ProductCard";

export default function SeachResults() {
  const { query } = useParams();

  const res = useSearchQuery({ query: query });

  return (
    <>
      <NavBarTop />

      <div className="flex justify-center items-center">
        <div className="w-10/12 p-4">
          <p className="text-xl font-bold">
            Search Results for{" "}
            <Link className="text-blue-600 underline">{query}</Link>
            {res.status === "fulfilled" ? (
              <div className="flex flex-wrap gap-3 justify-evenly">
                {res.data.map((e) => {
                  return (
                    <ProductCard
                      key={e._id}
                      id={e._id}
                      sellername={e.of.businessName}
                      image={`http://localhost:3001/image/${e.productImage}`}
                      title={e.title}
                      minBid={e.startingBid}
                      fromHome={true}
                    />
                  );
                })}
              </div>
            ) : (
              <h1 className="font-semibold text-gray-500">Loading...</h1>
            )}
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center mt-28">
        <NavBarBottom />
      </div>
    </>
  );
}
