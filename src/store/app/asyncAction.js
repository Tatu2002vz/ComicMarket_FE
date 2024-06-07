import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";
export const getGenres = createAsyncThunk(
  "app/genres",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetGenres();
    // if (!response.success) return rejectWithValue(response);
    return response;
  }
);
