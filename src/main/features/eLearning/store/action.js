import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { addBookAssignMemberService, addBookMemberService, addBookService, addCourseAssignMemberService, addCourseMemberService, addCourseService, getAllBookAssignMemService, getAllBookMemberService, getAllBookService, getAllCourseAssignMemService, getAllCourseMemberService, getAllCourseService, GetBookByIdService, GetCourseByIdService } from "../service/service";

  //  COURSES ACTIONS  //

export const addCourse = createAsyncThunk(
  "Course/addCourse",
  async (data, { dispatch, getState, rejectWithValue }) => {
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

export const getAllCourseMember = createAsyncThunk(
  "Course/GetAllCourseMember",
  async (data) => {
    console.log(data, "FROM ACTIONSSS !!")
    const response = await getAllCourseMemberService(data);
    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    return response.data;
  }
);

export const getAllCourseAssignMem = createAsyncThunk(
  "Course/GetAllCourseAssignMember",
  async (data) => {
    const response = await getAllCourseAssignMemService(data);

    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    return response.data;
  }
);


export const addCourseAssignMem = createAsyncThunk(
  "Course/addCourseAssignMember",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addCourseAssignMemberService(data);
    if (res.data?.responseCode === responseCode.Success) {
      message.success("Assign Member Added");
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);

export const addCourseMember = createAsyncThunk(
  "Course/addCourseMember",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addCourseMemberService(data);
    if (res.data?.responseCode === responseCode.Success) {
      message.success("Member Added");
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
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

export const GetBookById = createAsyncThunk(
  "Book/GetBookById",
  async (id) => {
    const response = await GetBookByIdService(id);
    return response.data;
  }
);

export const getAllBookMember = createAsyncThunk(
  "Book/GetAllBookMember",
  async (data) => {
    const response = await getAllBookMemberService(data);
    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    return response.data;
  }
);

export const addBookMember = createAsyncThunk(
  "Book/addBookMember",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addBookMemberService(data);
    if (res.data?.responseCode === responseCode.Success) {
      message.success("Member Added");
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);

export const getAllBookAssignMem = createAsyncThunk(
  "Book/GetAllBookAssignMember",
  async (data) => {
    const response = await getAllBookAssignMemService(data);

    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    return response.data;
  }
);

export const addBookAssignMem = createAsyncThunk(
  "Book/addBookAssignMember",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addBookAssignMemberService(data);
    if (res.data?.responseCode === responseCode.Success) {
      message.success("Assign Member Added");
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);
