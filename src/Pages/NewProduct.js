import React, { useState } from "react";
import NavBarTop from "../Components/NavBarTop";
import NavBarBottom from "../Components/NavBarBottom";
import { useAddNewProductMutation } from "../Redux/api/apiSlice";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const [title, setTitle] = useState("");
  const [min, setMin] = useState(0);
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [image, setImage] = useState();

  const [addProduct] = useAddNewProductMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("min", min);
    formData.append("desc", desc);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("image", image);

    const response = await addProduct({
      data: formData,
      token: sessionStorage.getItem("token"),
    });

    navigate("/myprofile");
  };

  return (
    <>
      <NavBarTop />
      <div className="flex justify-center items-center p-3">
        <form
          className="max-w-md mx-auto mt-5 p-4 border shadow-md rounded-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image:
            </label>
            <input
              type="file"
              name="images"
              accept="image/*"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter images URL"
              required
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title:
            </label>
            <input
              type="text"
              name="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter product title"
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Min Bid:
            </label>
            <input
              type="number"
              name="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter min-bid amount"
              required
              onChange={(e) => {
                setMin(e.target.value);
              }}
            />
          </div>
          <div className="mb-4 flex gap-1">
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                End Date:
              </label>
              <input
                type="date"
                name="title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter min-bid amount"
                required
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                End Time:
              </label>
              <input
                type="time"
                name="title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter min-bid amount"
                required
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description:
            </label>
            <textarea
              name="desc"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter product description"
              required
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Product
          </button>
        </form>
      </div>
      <div className="flex justify-center items-center mt-28">
        <NavBarBottom />
      </div>
    </>
  );
};

export default NewProduct;
