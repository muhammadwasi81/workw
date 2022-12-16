import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { updateUserBankInfoAction } from './actions';

const initialState = {
  bankDetails: {},
  loader: false,
  success: false,
};

const bankInfoSlice = createSlice({
  name: 'bankDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserBankInfoAction.fulfilled, (state, action) => {
        console.log(action.payload, 'updateUserEmergencyContactAction Slice');
        state.bankDetails = action.payload;
        state.loader = false;
        state.success = true;
      })
      .addMatcher(isPending(...[updateUserBankInfoAction]), (state) => {
        console.log('pending state');
        state.loader = true;
      })
      .addMatcher(isRejected(...[updateUserBankInfoAction]), (state) => {
        console.log('rejected state');
        state.loader = false;
      });
  },
});

export default bankInfoSlice.reducer;
