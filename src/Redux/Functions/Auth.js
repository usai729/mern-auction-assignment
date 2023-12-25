import axios from "axios";
const { createAsyncThunk } = require("@reduxjs/toolkit");
const { ENDPOINTS } = require("../../Exports");

export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await axios.post(ENDPOINTS.LOGIN, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (e) {
    throw e;
  }
});

export const signup = createAsyncThunk("auth/signup", async (data) => {
  try {
    const response = await axios.post(
      ENDPOINTS.REGISTER,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (e) {
    throw e;
  }
});
