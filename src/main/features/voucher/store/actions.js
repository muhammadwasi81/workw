import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { addVoucherService, getAllVoucherService, getLegderService, getVoucherDetailService } from "../services/service";

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
        console.log(response)
        return response.data;
      default:
        return null;
    }
  }
);
export const getVoucherDetail = createAsyncThunk(
  "Voucher/voucherDetail",
  async (id, { rejectWithValue }) => {
    const response = await getVoucherDetailService(id);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);

export const getAllVoucher = createAsyncThunk(
  "Voucher/getAllVoucher",
  async (data, { rejectWithValue }) => {
    const response = await getAllVoucherService(data);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);

export const getLedgerReport = createAsyncThunk(
  "Voucher/getLedgerReport",
  async (data, { rejectWithValue }) => {
    const response = await getLegderService(data);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);

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