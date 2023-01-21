import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import {
  getAllUserEmailConfigurations,
  getAllBussinessEmailConfiguration,
  addUserEmailConfiguration,
} from "./actions.js";

const initialState = {
  userEmailConfigurations: [],
  bussinessEmailConfigurations: {},
  loadingData: false,
  loader: false,
  success: false,
  error: false,
};

const emailUserConfigurationSlice = createSlice({
  name: "emailUserConfiguration",
  initialState,
  reducers: {
    emailConfigurationDeleted: (state, { payload }) => {
      console.log(payload);
      //   state.emailConfigurations = state.emailConfigurations.filter(
      //     (e) => e.id !== payload.id
      //   );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllUserEmailConfigurations.fulfilled,
        (state, { payload }) => {
          state.loadingData = false;
          state.userEmailConfigurations = payload.data;
        }
      )
      .addCase(
        getAllBussinessEmailConfiguration.fulfilled,
        (state, { payload }) => {
          state.bussinessEmailConfigurations = payload.data;
        }
      )
      .addCase(addUserEmailConfiguration.fulfilled, (state, { payload }) => {
        //   state.bussinessEmailConfigurations = payload.data;
        console.log(payload, "data");
      })
      .addMatcher(isPending(...[getAllUserEmailConfigurations]), (state) => {
        state.loadingData = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(
        isPending(...[getAllBussinessEmailConfiguration]),
        (state) => {
          console.log("pending");
        }
      )
      .addMatcher(isPending(...[addUserEmailConfiguration]), (state) => {
        console.log("pending adding");
      })
      .addMatcher(
        isRejected(
          ...[
            getAllUserEmailConfigurations,
            getAllBussinessEmailConfiguration,
            addUserEmailConfiguration,
          ]
        ),
        (state) => {
          state.loader = false;
          state.loadingData = false;
          state.success = false;
          state.error = false;
        }
      );
  },
});

export const {
  emailConfigurationDeleted,
} = emailUserConfigurationSlice.actions;
export default emailUserConfigurationSlice.reducer;
