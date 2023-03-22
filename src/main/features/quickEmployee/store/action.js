import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { addQuickEmployeeService } from "../service/service";

export const addQuickEmployee = createAsyncThunk(
  "QuickEmployee/addQuickEmployee",
  async (args, { dispatch }) => {
    console.log(args, "RESPONSE FROM ACTION");
    const res = await addQuickEmployeeService(args);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = "Employee added successfully!";
      responseMessage({ dispatch, data: res });
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }

    return res;
  }
);
