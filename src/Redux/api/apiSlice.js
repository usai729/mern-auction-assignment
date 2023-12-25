import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getMyprofile: builder.query({
      query: ({ token }) => {
        return {
          url: "/auth/myprofile",
          method: "get",
          headers: {
            "auth-token": token,
          },
        };
      },
    }),
    getMyProducts: builder.query({
      query: ({ token }) => {
        return {
          url: "/store/getproducts",
          method: "get",
          headers: {
            "auth-token": token,
          },
        };
      },
    }),
    getProduct: builder.query({
      query: ({ token, id }) => {
        return {
          url: "/store/getproducts/" + id,
          method: "get",
          headers: {
            "auth-token": token,
          },
        };
      },
    }),
    getHomeProducts: builder.query({
      query: () => "/store/getHomeProducts",
    }),
    placeBid: builder.mutation({
      query: ({ data, token }) => ({
        method: "post",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
        url: "/bid/newbid",
        body: JSON.stringify(data),
      }),
    }),
    addNewProduct: builder.mutation({
      query: ({ data, token }) => ({
        method: "post",
        headers: {
          "auth-token": token,
        },
        url: "/store/add",
        body: data,
      }),
    }),
    getAllProducts: builder.query({
      query: () => "/store/all",
    }),
    getMyWinnings: builder.query({
      query: ({ token }) => ({
        url: "/bid/winnings",
        headers: {
          "auth-token": token,
        },
        method: "get",
      }),
    }),
    search: builder.query({
      query: ({ query }) => ({
        url: `/store/search/${query}`,
        method: "get",
      }),
    }),
  }),
});

export const {
  useGetMyprofileQuery,
  useGetMyProductsQuery,
  useGetProductQuery,
  useGetHomeProductsQuery,
  useAddNewProductMutation,
  usePlaceBidMutation,
  useGetAllProductsQuery,
  useGetMyWinningsQuery,
  useSearchQuery,
} = apiSlice;
