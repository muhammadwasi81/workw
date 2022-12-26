import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { addBookService, addCourseService, getAllBookService, getAllCourseService, GetCourseByIdService } from "../service/service";

  //  COURSES ACTIONS  //

export const addCourse = createAsyncThunk(
  "Course/addCourse",
  async (data, { dispatch, getState, rejectWithValue }) => {
    console.log(data, "DAT FROM ACTION !!");
    const res = await addCourseService(data);
    console.log(res.data.message, "RESPONSE");
    if (res.data?.responseCode === responseCode.Success) {
      message.success("Course Added");
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);

export const getAllCourse = createAsyncThunk(
  "Course/GetAllCourse",
  async (data) => {
    const response = await getAllCourseService(data);

    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    return response.data;
  }
);

export const GetCourseById = createAsyncThunk(
  "Course/GetCourseById",
  async (id) => {
    const response = await GetCourseByIdService(id);
    return response.data;
  }
);


  // E-BOOK ACTIONS //

export const addBook = createAsyncThunk(
  "Course/addBook",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addBookService(data);
    console.log(res.data.message, "RESPONSE");
    if (res.data?.responseCode === responseCode.Success) {
      message.success("Book Added");
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);

export const getAllBook = createAsyncThunk(
  "Book/GetAllBook",
  async (data) => {
    const response = await getAllBookService(data);

    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    return response.data;
  }
);
