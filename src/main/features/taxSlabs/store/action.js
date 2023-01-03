import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
  removeBusinessPolicyService,
  getAllBusinessPolicyService,
  updateBusinessPolicyService,
  addTaxSlabGroupService,
  getAllTaxSlabGroupService,
  updateTaxSlabGroupService,
  getTaxSlabByIdService,
  removeTaxSlabService,
} from "../services/service";
import { businessDeleted, TaxSlabDeleted } from "./slice";
import { message } from "antd";

export const addTaxSlabGroup = createAsyncThunk(
  "AddTaxSlabGroup",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await addTaxSlabGroupService(data);
    if (res.responseCode === responseCode.Success) {
      message.success(`Tax Slab Group Added Successfully`);
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
      message.error(`Error: ${res.responseMessage}`);
      return rejectWithValue("Something went wrong");
    }
  }
);

export const GetAllTaxSlabGroup = createAsyncThunk(
  "TaxSlabGroup/GetAllTaxSlabGroup",
  async (data) => {
    const response = await getAllTaxSlabGroupService(data);
    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    return response.data;
  }
);
export const updateTaxSlab = createAsyncThunk(
  "TaxSlabGroup/UpdateTaxSlabGroup",
  async (args, { dispatch }) => {
    const res = await updateTaxSlabGroupService(args);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        message.success("Tax Slab updated successfully!");
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
export const getTaxSlabById = createAsyncThunk(
  "TaxSlabGroup/removeTaxSlab",
  async (id, { dispatch }) => {
    const res = await getTaxSlabByIdService(id);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        // message.success("Tax Slab get successfully!");
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

export const removeTaxSlab = createAsyncThunk(
  "grade/removeTaxSlab",
  async (id, { dispatch }) => {
    console.log(id, "iddd");
    const res = await removeTaxSlabService(id);

    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        dispatch(TaxSlabDeleted({ id: id }));
      res.message = "Tax Slab removed successfully!";
      message.success(res.message);

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

export const removeBusinessPolicy = createAsyncThunk(
  "removeBusinessPolicy",
  async (args, { dispatch, rejectWithValue }) => {
    const res = await removeBusinessPolicyService(args);
    if (res.responseCode === responseCode.Success) {
      dispatch(businessDeleted(args));
      message.success(`Business Policy Deleted Successfully`);
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
      message.error(`Error: ${res.responseMessage}`);
      return rejectWithValue("Something went wrong");
    }
  }
);

export const updateBusinessPolicy = createAsyncThunk(
  "updateBusinessPolicy",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await updateBusinessPolicyService(data);
    if (res.responseCode === responseCode.Success) {
      message.success(`Business Policy Updated Successfully`);
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
      message.error(`Error: ${res.responseMessage}`);
      return rejectWithValue("Something went wrong");
    }
  }
);
