import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import qs from "qs"

export const getValue = createAsyncThunk("key", async (key) => {
  const value = await axios.get(
    `http://127.0.0.1:8000/getCacheValue?key=${key}`
  );
  return value?.data?.data?.value;
});

export const setKeyValue = createAsyncThunk(
  "key/value",
  async (data) => {
    const headers = {
        "Content-Type": "application/json",
      };
    const Cache = await axios.post(`http://127.0.0.1:8000/setCacheValue`, data,{headers:headers});
    return Cache?.data?.data?.cachedValues;
  }
);

export const lruSlice = createSlice({
  name: "lru",
  initialState: {
    value: null,
    CacheArr: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getValue.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(getValue.rejected, (state, action) => {
        state.value = -1;
      });
    builder.addCase(setKeyValue.fulfilled, (state, action) => {
      state.CacheArr = action.payload;
    });
  },
});
