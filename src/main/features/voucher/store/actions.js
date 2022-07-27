import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { addVoucherService } from "../services/service";

export const addVoucher = createAsyncThunk(
  "Voucher/addVoucher",
  async (request, { rejectWithValue, dispatch }) => {
    const response = await addVoucherService(request);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(openNotification({
          message: "Voucher Create Successfully",
          type:"success",
          duration: 2
        }))
        return response.data;
      default:
        return;
    }
  }
);
// export const getAllChartOfAccount = createAsyncThunk(
//   "ChartOfAccount/getAllChartOfAccount",
//   async (request, { rejectWithValue }) => {
//     const response = await getAllChartOfAccountService(request);
//     switch (response.type) {
//       case ResponseType.ERROR:
//         return rejectWithValue(response.errorMessage);
//       case ResponseType.SUCCESS:
//         return response.data;
//       default:
//         return;
//     }
//   }
// );

// export const updateChartOfAccount = createAsyncThunk(
// 	"updateChartOfAccount",
// 	async (data, { dispatch, getState, rejectWithValue }) => {
// 		const response = await updateChartOfAccountService(data);
// 		switch (response.type) {
//       case ResponseType.ERROR:
//         return rejectWithValue(response.errorMessage);
//       case ResponseType.SUCCESS:
//         dispatch(openNotification({
//           message: "Chart Of Account Update Successfully",
//           style: { backgroundColor: "#48da00" },
//           type:"success",
//           duration: 2
//         }))
//         return response.data;
//       default:
//         return;
//     }
// 	}
// );