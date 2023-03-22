import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { updateUserEducationAction, addUserEducationAction } from "./actions";

const initialState = {
  //education details initial state is changed from obj to arr
  educationDetails: [],
  loader: false,
  success: false,
};

const userEducationSlice = createSlice({
  name: "experienceDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserEducationAction.fulfilled, (state, action) => {
        console.log(action.payload, "updateUserEducation Slice");
        state.educationDetails = action.payload;
        state.loader = false;
        state.success = true;
      })
      .addCase(addUserEducationAction.fulfilled, (state, action) => {
        console.log(action.payload, "addUserEducation Slice");
        state.educationDetails.push(action.payload);
        state.loader = false;
        state.success = true;
      })
      .addMatcher(isPending(...[updateUserEducationAction]), (state) => {
        console.log("pending state");
        state.loader = true;
      })
      .addMatcher(isPending(...[addUserEducationAction]), (state) => {
        console.log("pending adding state");
        state.loader = true;
      })
      .addMatcher(isRejected(...[updateUserEducationAction]), (state) => {
        console.log("rejected state");
        state.loader = false;
      })
      .addMatcher(isRejected(...[addUserEducationAction]), (state) => {
        console.log("rejected adding state");
        state.loader = false;
      });
  },
});

export default userEducationSlice.reducer;
