import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import {
  getAllTaskForAppraisalService,
  getAllAppraisalService
} from "../service/service";

export const getAllTaskForAppraisalAction = createAsyncThunk(
    "appraisalModuleSlice/getAllTaskForAppraisalAction",
    async (request, { rejectWithValue }) => {
      console.log(request, "GET REQUEST appraisalModule");
      const response = await getAllTaskForAppraisalService( request );
      console.log(request, "GET REQUEST appraisalModule 22");
  
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

  export const getAllAppraisalAction = createAsyncThunk(
    "appraisalModuleSlice/getAllAppraisalAction",
    async (request, { rejectWithValue }) => {
      console.log(request, "GET REQUEST appraisalModule");
      const response = await getAllAppraisalService( request );
      console.log(request, "GET REQUEST appraisalModule 22");
  
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