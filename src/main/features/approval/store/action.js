import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { getAllApprovalService } from "../services/service";

// export const getAllApproval = createAsyncThunk(
//   "Approval/getAllApproval",
//   async ({ isMyApproval, filter }, { rejectWithValue, dispatch }) => {
//     const response = await getAllApprovalService(filter);
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

export const getAllApproval = createAsyncThunk(
  "Approval/getAllApproval",
  async (filter, { rejectWithValue, dispatch }) => {
    const response = await getAllApprovalService(filter);
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