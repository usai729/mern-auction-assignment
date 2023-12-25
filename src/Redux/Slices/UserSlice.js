import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "../Functions/Auth";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    loading: false,
    error: "",
  },
  reducers: {
    tokenAction: (state, action) => {
      switch (action.type) {
        case "REMOVE":
          state.token = "";
          localStorage.removeItem("token");
          break;
        case "SET":
          state.token = action.payload;
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;

        console.log(state.error);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.error) {
          state.error = action.payload.msg;
        } else {
          state.token = action.payload.token;

          if (localStorage.getItem("token")?.length > 0) {
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            localStorage.setItem("token", action.payload.token);
            sessionStorage.setItem("token", action.payload.token);
          } else {
            localStorage.setItem("token", action.payload.token);
            sessionStorage.setItem("token", action.payload.token);
          }
        }
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;

        console.log(state.error);
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.error) {
          state.error = action.payload.msg;
        } else {
          state.token = action.payload.token;

          if (localStorage.getItem("token")?.length > 0) {
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            localStorage.setItem("token", action.payload.token);
            sessionStorage.setItem("token", action.payload.token);
          } else {
            localStorage.setItem("token", action.payload.token);
            sessionStorage.setItem("token", action.payload.token);
          }
        }

        console.log(action);
      });
  },
});

export default UserSlice.reducer;
export const { tokenAction } = UserSlice.actions;
