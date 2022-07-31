import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { jsonToFormData } from "../../../../utils/base";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { addDocumentService, getAllDocumentService } from "../services/service";

export const addDocument = createAsyncThunk(
  "document/addDocument",
  async (request, { rejectWithValue, dispatch }) => {
    const formdataRequest = jsonToFormData(request);
    const response = await addDocumentService(formdataRequest);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(openNotification({
          message: "Document Create Successfully",
          type:"success",
          duration: 2
        }))
        return response.data;
      default:
        return;
    }
  }
);

export const getAllDocument = createAsyncThunk(
  "document/getAllDocument",
  async (request, { rejectWithValue }) => {
    const response = await getAllDocumentService(request);
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
