import React, { useEffect } from "react";
import NavBarBottom from "../Components/NavBarBottom";
import NavBarTop from "../Components/NavBarTop";
import ProductCard from "../Components/ProductCard";
import { companies, isAuth, productData } from "../Exports";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { tokenAction } from "../Redux/Slices/UserSlice";
import {
  useGetHomeProductsQuery,
  useGetMyProfile,
} from "../Redux/api/apiSlice";
import Chat from "./Chat";

export default function Home() {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Home";

    if (sessionStorage.getItem("token")?.length > 0) {
      dispatch(
        tokenAction({ type: "SET", payload: sessionStorage.getItem("token") })
      );
    }

    if (!isAuth(sessionStorage.getItem("token"))) {
      navigate("/auth");
    }
  }, null);

  const data = useGetHomeProductsQuery();

  return (
    <>
      <NavBarTop />
      <div>
        <img
          src="https://www.boeing.com/resources/boeingdotcom/history/images/nahm/sustain-roadblock.png"
          className="w-screen"
        />
        <div className="relative">
          <div className="flex flex-col justify-center items-center pb-4 rounded-3xl shadow-lg">
            <div className="flex flex-col m-4 pr-4 pl-4 gap-2 justify-center items-center rounded-xl border-b-2 border-blue-600">
              <div className="flex flex-wrap gap-4">
                {companies.map((company, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <img
                      src={company.logo}
                      alt=""
                      className="w-[5rem] h-[5rem] md:w-[10rem] md:h-[10rem] rounded-full"
                      style={{
                        objectFit: "contain",
                      }}
                    />
                    <p className="text-lg font-bold">{company.name}</p>
                  </div>
                ))}
              </div>
              <p className="text-lg font-semibold">Our Customers</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="rounded-md border-t-2 border-b-2 border-blue-600 p-2 flex items-center justify-center w-full">
                Top Bids
              </div>
              <div className="flex flex-wrap justify-evenly">
                {data.status === "fulfilled" &&
                  data.data.map((ele) => (
                    <ProductCard
                      key={ele._id}
                      id={ele._id}
                      sellername={ele.of.businessName}
                      image={`http://localhost:3001/image/${ele.productImage}`}
                      title={ele.title}
                      minBid={ele.startingBid}
                      fromHome={true}
                    />
                  ))}
              </div>
              <Link
                to={"/all"}
                className="p-4 border-none ouline-none bg-color1 text-color2 w-max drop-shadow-lg"
              >
                View All
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-28">
        <NavBarBottom />
      </div>
    </>
  );
}
