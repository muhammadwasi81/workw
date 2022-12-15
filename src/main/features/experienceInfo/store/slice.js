import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { updateUserWorkExperienceAction } from './actions';

const initialState = {
  experienceDetails: {},
  loader: false,
  success: false,
};

const workExperienceSlice = createSlice({
  name: 'experienceDetails',
  initialState,
  reducers: {
    handleResetEmergencyInfo: (state) => {
      state.experienceDetails = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserWorkExperienceAction.fulfilled, (state, action) => {
        console.log(action.payload, 'updateUserEmergencyContactAction Slice');
        state.experienceDetails = action.payload;
        state.loader = false;
        state.success = true;
      })
      .addMatcher(isPending(...[updateUserWorkExperienceAction]), (state) => {
        console.log('pending state');
        state.loader = true;
      })
      .addMatcher(isRejected(...[updateUserWorkExperienceAction]), (state) => {
        console.log('rejected state');
        state.loader = false;
      });
  },
});

export const { handleResetEmergencyInfo } = workExperienceSlice.actions;
export default workExperienceSlice.reducer;
