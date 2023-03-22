import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  addUserBankInfoAction,
  getAllBankDetailByUser,
  updateUserBankInfoAction,
} from './actions';

const initialState = {
  userBankDetails: [],
  loader: false,
  success: false,
};

const bankInfoSlice = createSlice({
  name: 'bankDetail',
  initialState,
  reducers: {
    resetBankInfoState: (state) => {
      state.loader = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBankDetailByUser.fulfilled, (state, action) => {
        // console.log(action.payload, 'getBankDetailsByUserService Slice');
        state.userBankDetails = action.payload.data;
        state.loader = false;
        state.success = true;
      })
      .addCase(updateUserBankInfoAction.fulfilled, (state, action) => {
        // console.log(action.payload, 'updateUserEmergencyContactAction Slice');
        state.loader = false;
        state.success = true;
        state.userBankDetails = action.payload;
      })
      .addCase(addUserBankInfoAction.fulfilled, (state, { payload }) => {
        // console.log(payload, 'addUserEmergencyContactAction Slice');
        state.userBankDetails.push(payload.data);
        state.loader = false;
        state.success = true;
      })
      .addMatcher(
        isPending(
          ...[
            updateUserBankInfoAction,
            addUserBankInfoAction,
            getAllBankDetailByUser,
          ]
        ),
        (state) => {
          console.log('pending state');
          state.loader = true;
        }
      )
      .addMatcher(
        isRejected(
          ...[
            updateUserBankInfoAction,
            addUserBankInfoAction,
            getAllBankDetailByUser,
          ]
        ),
        (state) => {
          console.log('rejected state');
          state.loader = false;
        }
      );
  },
});

export default bankInfoSlice.reducer;
export const { resetBankInfoState } = bankInfoSlice.actions;
