import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction.js";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    isLoading: false,
    isLoggingIn: false,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      // console.log(action);
      state.isLoggingIn = true;
      state.token = action.payload.token;
      state.userData = action.payload.userData
    },
    logout: (state) => {
      state.isLoggingIn = false;
      state.token = null;
      state.userData = null;
    },
    clearMessage: (state) => {
      state.errorMessage = null;
    }
  },
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    // builder.addCase(actions.getCategories.pending, (state) => {
    //   // Bật trạng thái loading
    //   state.isLoading = true;
    // });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      if(action.payload.success) {
        state.isLoading = false;
        state.userData = action.payload?.mes;
        state.isLoggingIn = true;
      } 
    });

    // // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(actions.getCurrent.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      console.log(state);
      state.isLoading = false;
      state.errorMessage = "Phiên đăng nhập hết hạn! Hãy đăng nhập lại";
      state.isLoggingIn = false;
      state.userData = null;
      state.token = null;
    });
  },
});
export const { login, logout, clearMessage } = userSlice.actions;
export default userSlice.reducer;
