import React, { useEffect, useState } from "react";
import NavBarBottom from "../Components/NavBarBottom";
import { useSelector } from "react-redux";
import {
  useGetMyProductsQuery,
  useGetMyWinningsQuery,
  useGetMyprofileQuery,
} from "../Redux/api/apiSlice";
import NavBarTop from "../Components/NavBarTop";
import { FaRemoveFormat } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function MyProfile() {
  useEffect(() => {
    document.title = "My Profile";
  });

  const tokenFromStorage = sessionStorage.getItem("token");

  const data = useGetMyprofileQuery({ token: tokenFromStorage });
  const products = useGetMyProductsQuery({ token: tokenFromStorage });
  const wins = useGetMyWinningsQuery({ token: tokenFromStorage });

  return (
    <>
      <NavBarTop />
      {!data.isLoading ? (
        <div className="flex flex-col shadow-md p-8">
          <div className="flex flex-col md:flex-row gap-3">
            <img
              src="https://i.pinimg.com/736x/b2/19/c5/b219c5c5ac8f06624df562ce942509c9.jpg"
              className="shadow-md"
              style={{
                objectFit: "contain",
                width: "12rem",
                height: "12rem",
              }}
              alt=""
            />
            <div className="flex flex-col justify-center">
              <p className="text-lg">
                <span className="text-gray-500">E-mail: </span>
                <span className="font-semibold">{data.data.email}</span>
              </p>
              <p className="text-md">
                <span className="text-gray-500">Account Type: </span>
                <span className="font-semibold">
                  {data.data.usertype.split("")[0].toUpperCase() +
                    data.data.usertype.slice(1)}
                </span>
              </p>
              <p className="text-md">
                <span className="text-gray-500">About: </span>
                <span className="font-semibold">
                  {data.data.about ? data.data.about : "Nothing to show"}
                </span>
              </p>
              {data.data.usertype === "seller" && (
                <Link
                  to={"/new"}
                  className="bg-blue-400 text-white p-2 w-full flex justify-between items-center mt-3"
                >
                  Add Product
                  <MdDelete className="text-white" />
                </Link>
              )}
              <button className="border-1 border-red-800 text-red-800 p-2 w-full flex justify-between items-center mt-3">
                Delete Account
                <MdDelete className="text-red-800" />
              </button>
            </div>
          </div>
          {data.data.usertype === "buyer" && (
            <div className="p-3 m-2">
              <p className="text-md font-semibold">My Wins</p>
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Product name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Min Bid
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Min Bid
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Bid Ends
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Make Payment
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {wins.data?.map((innerArray, index) => (
                      <React.Fragment key={index}>
                        {innerArray.map((ele2) => (
                          <tr
                            key={ele2._id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <Link to={`/bid/${ele2._id}`}>{ele2.title}</Link>
                            </th>
                            <td className="px-6 py-4">
                              <img
                                src={`http://localhost:3001/image/${ele2.productImage}`}
                                alt=""
                                style={{
                                  maxWidth: "10rem",
                                }}
                              />
                            </td>
                            <td className="px-6 py-4">{ele2.startingBid}</td>
                            <td className="px-6 py-4">True</td>
                            <td className="px-6 py-4">
                              <form
                                method="post"
                                action="http://localhost:3001/pay"
                              >
                                <input
                                  type="hidden"
                                  name="productId"
                                  value={ele2._id}
                                />
                                <input
                                  type="hidden"
                                  name="title"
                                  value={ele2.title}
                                />
                                <input
                                  type="hidden"
                                  name="desc"
                                  value={ele2.desc}
                                />
                                <button
                                  type="submit"
                                  className="text-blue-400 cursor-pointer font-bold"
                                >
                                  Pay
                                </button>
                              </form>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {data.data.usertype === "seller" && (
            <div className="p-3 m-2">
              <p className="text-md font-semibold">My Listings</p>
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Product name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Product Image
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Min Bid
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Highest Bid
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Bid Ends
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Delete Product
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.data?.map((ele) => {
                      return (
                        <tr
                          key={ele._id}
                          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <Link to={`/bid/${ele._id}`}>{ele.title}</Link>
                          </th>
                          <td class="px-6 py-4">
                            <img
                              src={`http://localhost:3001/image/${ele.productImage}`}
                              alt=""
                              style={{
                                maxWidth: "10rem",
                              }}
                            />
                          </td>
                          <td class="px-6 py-4">{ele.startingBid}</td>
                          <td class="px-6 py-4">My Bid</td>
                          <td class="px-6 py-4">{ele.bidEnds}</td>
                          <td class="px-6 py-4 ">
                            <form
                              action={`http://localhost:3001/store/del/${ele._id}`}
                              method="get"
                              className="w-full"
                            >
                              <button
                                type="submit"
                                className="font-bold text-red-400 cursor-pointer"
                              >
                                Delete{" "}
                              </button>
                            </form>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-xl font-bold">Loading...</p>
      )}
      <div className="flex justify-center items-center mt-28">
        <NavBarBottom />
      </div>
    </>
  );
}
