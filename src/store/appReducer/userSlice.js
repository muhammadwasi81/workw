import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: "",
    refreshToken: ""
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.deviceToken = action.payload.deviceToken;
    },
    updateAccessToken: (state, { payload }) => {
      state.token = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.user.accessToken = payload.accessToken;
    }
  },
});

export const { setUser, updateAccessToken } = userSlice.actions;
export default userSlice.reducer;
