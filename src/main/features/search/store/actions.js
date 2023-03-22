import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { getAllSearchService } from "../service/service";

export const globalSearch = createAsyncThunk(
  "globalSearch",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await getAllSearchService(data);
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: "error",
          duration: 2,
        })
      );
      return rejectWithValue(res.message);
    }
  }
);
