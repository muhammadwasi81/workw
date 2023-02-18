import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  addEmployeeService,
  getAllEmployeeService,
  getEmployeeByIdService,
  updateEmployeeService,
  getWorkplace,
  getEducation,
  updateCoverImgService,
  updateUserProfileImgService,
  GetCourseByUserIdService,
  addRatingService,
  saveProfileStickyNote,
  getProfileStickyNote,
} from "../service/service";

export const addEmployeeAction = createAsyncThunk(
  `Employee/AddEmployee`,
  async (data, { rejectWithValue }) => {
    const res = await addEmployeeService(data);
    console.log(res.data.message, "addEmployee actions");
    if (res.data?.responseCode === responseCode.Success) {
      message.success("Employee Created");
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);

export const addRatingAction = createAsyncThunk(
  `Employee/AddRating`,
  async (data, { rejectWithValue }) => {
    const res = await addRatingService(data);
    console.log(res.data.message, "Add Rating actions");
    if (res.data?.responseCode === responseCode.Success) {
      message.success("Rating Updated");
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);

export const getAllEmployeeAction = createAsyncThunk(
  `Employee/GetAllEmployee`,
  async (data) => {
    const response = await getAllEmployeeService(data);
    console.log(response.data, "getAllEmployee actions");
    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    return response.data;
  }
);

export const getEmployeeByIdAction = createAsyncThunk(
  `Employee/GetEmployeeById`,
  async (id) => {
    const response = await getEmployeeByIdService(id);
    console.log(response.data, "getEmployeeById actions");
    return response.data;
  }
);

export const updateEmployeeAction = createAsyncThunk(
  `Employee/UpdateEmployee`,
  async (data, { rejectWithValue }) => {
    const res = await updateEmployeeService(data);
    console.log(res.data.message, "updateEmployee actions");
    if (res.data?.responseCode === responseCode.Success) {
      message.success("Employee Updated");
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);

export const getWorkAction = createAsyncThunk(
  `Employee/workPlace`,
  async (userId) => {
    const response = await getWorkplace(userId);
    console.log(response.data, "getEmployeeById actions");
    return response.data;
  }
);

export const getEducationAction = createAsyncThunk(
  `Employee/education`,
  async (userId) => {
    const response = await getEducation(userId);
    console.log(response.data, "getEducation actions");
    return response.data;
  }
);

export const GetCourseByUserId = createAsyncThunk(
  `eLearning/CourseByUserId`,
  async (userId) => {
    const response = await GetCourseByUserIdService(userId);
    console.log(response.data, "getEducation actions");
    return response.data;
  }
);

export const updateUserCoverImgAction = createAsyncThunk(
  `Employee/updateUserCoverImg`,
  async (data) => {
    try {
      const response = await updateCoverImgService(data);
      console.log(response.data, "updateUserImg actions");
      if (!response.data) {
        message.error(response.data.message);
      }
      message.success(`Cover Image Updated Successfully`);
      return response.data;
    } catch (error) {
      throw new Error(`Error in updateUserCoverAction: ${error}`, {
        cause: error,
      });
    }
  }
);

// profile image
export const updateUserProfileImgAction = createAsyncThunk(
  `Employee/updateUserProfileImg`,
  async (data) => {
    try {
      const response = await updateUserProfileImgService(data);
      console.log(response.data, "updateUserImg actions");
      if (!response.data) {
        message.error(response.data.message);
      }
      message.success(`Profile Image Updated Successfully`);
      return response.data;
    } catch (error) {
      throw new Error(`Error in updateUserProfileAction: ${error}`, {
        cause: error,
      });
    }
  }
);

export const saveSticyNotesAction = createAsyncThunk(
  `SaveStickyNote`,
  async (data) => {
    try {
      const response = await saveProfileStickyNote(data);
      if (!response.data) {
        message.error(response.data.message);
      }
      message.success(`Sticky Notes added Successfully!!`);
      return response.data;
    } catch (error) {
      throw new Error(`Error in Sticky Notes: ${error}`, {
        cause: error,
      });
    }
  }
);

export const getSticyNotesAction = createAsyncThunk(
  `getStickyNote`,
  async (data) => {
    try {
      const response = await getProfileStickyNote(data);
      if (!response.data) {
        message.error(response.data.message);
      }
      message.success(`get  Successfully!!`);
      return response.data;
    } catch (error) {
      throw new Error(`Error in Sticky Notes: ${error}`, {
        cause: error,
      });
    }
  }
);
