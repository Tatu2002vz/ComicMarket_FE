import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";
export const appSlice = createSlice({
  name: "app",
  initialState: {
    genres: [],
    isLoading: false,
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    // builder.addCase(actions.getCategories.pending, (state) => {
    //   // Bật trạng thái loading
    //   state.isLoading = true;
    // });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(actions.getGenres.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.genres = action.payload?.mes;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(actions.getGenres.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
  },
});

export default appSlice.reducer