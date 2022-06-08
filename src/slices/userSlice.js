import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userThunk = createAsyncThunk("user", async (userObj, thunkApi) => {
  let res = await axios.post("/user/login", userObj);
  let data = res.data;
  if (data.message === "success") {
    localStorage.setItem("token", data.token);
    return data.userObj;
  }
  if (
    data.message === "invalid username" ||
    data.message === "invalid password"
  ) {
    return thunkApi.rejectWithValue(data);
  }
});

let userSlice = createSlice({
  name: "user",
  initialState: {
    userObj: {},
    isSuccess: false,
    isLoading: false,
    isError: false,
    errMsg: "",
  },
  reducers: {
    clearLoginStatus: (state) => {
      state.isSuccess = false;
      state.userObj = null;
      state.isError = false;
      state.errMsg = "";
    },
  },
  extraReducers: {
    [userThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [userThunk.fulfilled]: (state, action) => {
      state.userObj = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.isError = false;
      state.errMsg = "";
    },
    [userThunk.rejected]: (state, action) => {
      state.isError = true;
      state.errMsg = action.payload.message;
    },
  },
});

export const { clearLoginStatus } = userSlice.actions;
export default userSlice.reducer;
