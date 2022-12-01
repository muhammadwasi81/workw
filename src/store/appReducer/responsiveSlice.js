import { createSlice } from "@reduxjs/toolkit";

export const responsiveSlice = createSlice({
  name: "responsiveSlice",
  initialState: {
    navBarStatus: window.innerWidth > 800,
    userSettingToggle: false,
    isTabletScreen: window.innerWidth <= 1000,
    isMobileScreen: window.innerWidth <= 800,
    notifcationStatus: false,
    approvalStatus: false,
  },
  reducers: {
    navBarOpen: (state, action) => {
      state.navBarStatus = action.payload;
      if (state.navBarStatus !== true && state.notifcationStatus) {
        state.notifcationStatus = false;
      }
      if (state.navBarStatus !== true && state.approvalStatus) {
        state.approvalStatus = false;
      }
    },
    userSettingToggleFun: (state, action) => {
      state.userSettingToggle = action.payload;
    },
    setMobileScreenStatus: (state, action) => {
      state.isMobileScreen = action.payload;
    },
    setTabletScreenStatus: (state, action) => {
      state.isTabletScreen = action.payload;
    },
    setNotificationStatus: (state, action) => {
      state.notifcationStatus = action.payload;
    },
    setApprovalStatus: (state, action) => {
      state.approvalStatus = action.payload;
    },
  },
});

export const {
  navBarOpen,
  userSettingToggleFun,
  setMobileScreenStatus,
  setTabletScreenStatus,
  setNotificationStatus,
  setApprovalStatus
} = responsiveSlice.actions;
export default responsiveSlice.reducer;
