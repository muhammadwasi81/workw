import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { updateUserEducationAction } from './actions';

const initialState = {
  educationDetails: {},
  loader: false,
  success: false,
};

const userEducationSlice = createSlice({
  name: 'experienceDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserEducationAction.fulfilled, (state, action) => {
        console.log(action.payload, 'updateUserEducation Slice');
        state.educationDetails = action.payload;
        state.loader = false;
        state.success = true;
      })
      .addMatcher(isPending(...[updateUserEducationAction]), (state) => {
        console.log('pending state');
        state.loader = true;
      })
      .addMatcher(isRejected(...[updateUserEducationAction]), (state) => {
        console.log('rejected state');
        state.loader = false;
      });
  },
});

export default userEducationSlice.reducer;
