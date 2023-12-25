import React from "react";
import NavBarTop from "../Components/NavBarTop";
import { useGetAllProductsQuery } from "../Redux/api/apiSlice";
import NavBarBottom from "../Components/NavBarBottom";
import ProductCard from "../Components/ProductCard";

export default function AllProducts() {
  const data = useGetAllProductsQuery();

  console.log(data.status);

  return (
    <>
      <NavBarTop />

      {data.status === "fulfilled" && (
        <div className="flex flex-wrap gap-3 justify-evenly items-center p-4">
          {data.data.map((ele) => {
            return (
              <ProductCard
                key={ele._id}
                id={ele._id}
                sellername={ele.of.businessName}
                image={`http://localhost:3001/image/${ele.productImage}`}
                title={ele.title}
                minBid={ele.startingBid}
                fromHome={true}
                desc={ele.desc}
              />
            );
          })}
        </div>
      )}

      <div className="flex justify-center items-center mt-28">
        <NavBarBottom />
      </div>
    </>
  );
}
