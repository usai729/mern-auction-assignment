import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import NavBarBottom from "../Components/NavBarBottom";
import NavBarTop from "../Components/NavBarTop";
import { useGetProductQuery, usePlaceBidMutation } from "../Redux/api/apiSlice";

export default function Bid() {
  const { id } = useParams();

  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const data = useGetProductQuery({
    token: sessionStorage.getItem("token"),
    id: id,
  });

  console.log(data.data);

  const [placeBid] = usePlaceBidMutation();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const response = await placeBid({
      token: sessionStorage.getItem("token"),
      data: {
        productID: id,
        amount: Number(amount),
      },
    });

    console.log(response);
  };

  return (
    <>
      <NavBarTop />
      <div className="bg-color2 p-3 justify-center items-center w-screen h-screen flex">
        <div className="shadow-md rounded-md p-3 h-max w-max">
          {data.status === "fulfilled" && (
            <ProductCard
              key={data.data._id}
              sellername={data.data.product.of.businessName}
              image={`http://localhost:3001/image/${data.data.product.productImage}`}
              title={data.data.product.title}
              minBid={data.data.product.startingBid}
              highestBid={data.data.bids}
              desc={data.data.product.desc}
              fromHome={false}
              fromBids={true}
            />
          )}
          <form
            onSubmit={HandleSubmit}
            className="flex p-3 justify-center items-center"
          >
            <input type="hidden" name="" value={id} />
            <input
              type="number"
              name=""
              id=""
              placeholder="Amount"
              className="p-3 border-none rounded-sm shadow-md w-full outline-none"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <button
              type="submit"
              className="p-3 bg-color1 text-color2 items-center justify-center shadow-md"
            >
              Bid
            </button>
          </form>
        </div>
      </div>

      <div className="flex justify-center items-center mt-28">
        <NavBarBottom />
      </div>
    </>
  );
}
