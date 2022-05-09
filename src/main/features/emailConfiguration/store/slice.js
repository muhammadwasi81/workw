import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { addEmailConfiguration, getAllEmailConfigurations, removeEmailConfiguration, updateEmailConfiguration } from "./actions.js";

const initialState = {
  emailConfigurations: [],
  loadingData: false,
  loader: false,
};

const emailConfigurationSlice = createSlice({
  name: "emailConfiguration",
  initialState,
  reducers: {
    emailConfigurationDeleted: (state, { payload }) => {
      state.emailConfigurations = state.emailConfigurations.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmailConfigurations.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.emailConfigurations = payload.data;
      })
      .addCase(addEmailConfiguration.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.emailConfigurations.push(payload.data);
      })
      .addCase(updateEmailConfiguration.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.emailConfigurations = state.emailConfigurations.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(isPending(...[addEmailConfiguration, updateEmailConfiguration]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllEmailConfigurations]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(...[getAllEmailConfigurations, addEmailConfiguration, updateEmailConfiguration]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { emailConfigurationDeleted } = emailConfigurationSlice.actions;
export default emailConfigurationSlice.reducer;
