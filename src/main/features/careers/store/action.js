import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { ResponseType } from "../../../../utils/api/ResponseResult";

import { openNotification } from "../../../../utils/Shared/store/slice";
import {
  addCareerService,
  getAllCareerService,
  getAllCareerBYIdService,
  addCareerApplicantService,
  getAllCareerApplicantService,
} from "../services/service";

export const addCareer = createAsyncThunk(
  "Career/addCareer",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await addCareerService(data);
    console.log(res, "FROM CAREER RESPONSE");

    switch (res.type) {
      case ResponseType.ERROR:
        dispatch(
          openNotification({
            message: res.errorMessage,
            type: "error",
          })
        );
        return rejectWithValue(res.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: "Document Create Successfully",
            type: "success",
            duration: 2,
          })
        );
        return res.data;
      default:
        return;
    }
  }
);

export const addCareerApplicant = createAsyncThunk(
  "Career/addCareerApplicant",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await addCareerApplicantService(data);
    console.log(res, "FROM CAREER RESPONSE");

    switch (res.type) {
      case ResponseType.ERROR:
        dispatch(
          openNotification({
            message: res.errorMessage,
            type: "error",
          })
        );
        return rejectWithValue(res.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: "Job Applied Successfully",
            type: "success",
            duration: 2,
          })
        );
        return res.data;
      default:
        return;
    }
  }
);

export const getAllCareerAction = createAsyncThunk(
  "careerslice/ getAllCareerAction",
  async (request, { rejectWithValue }) => {
    console.log(request, "GET REQUEST career");
    const response = await getAllCareerService({ request });
    console.log(request, "GET REQUEST career 22");

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

export const getAllCareerApplicant = createAsyncThunk(
  "careerslice/ getAllCareerApplicant",
  async (request, { rejectWithValue }) => {
    console.log(request, "GET REQUEST career");
    const response = await getAllCareerApplicantService({ request });
    console.log(request, "GET REQUEST career 22");

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

export const getCareerByIdAction = createAsyncThunk(
  "careerslice/ getCareerByIdAction ",
  async (id, { rejectWithValue }) => {
    console.log(id, "GET REQUEST career BY ID");
    const response = await getAllCareerBYIdService(id);
    console.log(response, "GET REQUEST career 22 BY ID");

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
