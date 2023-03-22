import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { openNotification } from "../../../../../utils/Shared/store/slice";
import { addApprovalService } from "../services";
import { ResponseType } from "../../../../../utils/api/ResponseResult";

import { responseCode } from "../../../../../services/enums/responseCode";

export const addApproversAction = createAsyncThunk(
  "Approvers/addApproversAction",
  async (payload, { rejectWithValue, dispatch }) => {
    console.log(payload, "PAYLOAD FROM ACTION");
    const response = await addApprovalService(payload);
    if (response.responseCode) {
      if (response.responseCode === responseCode.Success) {
        dispatch(
          openNotification({
            message: "Approvers Added Successfully!",
            type: "success",
            duration: 2,
          })
        );
        return response.data;
      }
    }

    // switch (response.type) {
    //   case ResponseType.ERROR:
    //     return rejectWithValue(response.errorMessage);
    //   case ResponseType.SUCCESS:
    //     dispatch(
    //       openNotification({
    //         message: 'Approvers Added Successfully!',
    //         type: 'success',
    //         duration: 2,
    //       })
    //     );
    //     return response.data;
    //   default:
    //     return;
    // }
  }
);
