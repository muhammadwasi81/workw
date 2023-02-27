import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { message } from "antd";

import {
  addWorkBoardSectionService,
  addWorkBoardSectionTodoService,
  addWorkboardService,
  addWorkBoardTodoLabelService,
  getAllWorkboardService,
  getAllWorkboardTodoPagingService,
  getWorkboardByIdService,
  getWorkboardTodoByIdService,
  moveWorkBoardSectionService,
  moveWorkBoardSectionTodoService,
  removeWorkBoardTodoImageService,
  removeWorkBoardTodoLabelService,
  removeWorkBoardTodoService,
  updateWorkBoardSectionColorCodeService,
  updateWorkBoardSectionTitleService,
  updateWorkboardService,
  updateWorkBoardTodoDescService,
  updateWorkBoardTodoDueDateService,
  updateWorkBoardTodoTitleService,
  uploadWorkBoardTodoImageService,
  getWorkBoardMemberService,
  addWorkBoardMemberService,
  removeWorkBoardMemberService,
  addWorkBoardTodoMemberService,
  removeWorkBoardTodoMemberService,
} from "../services/services";
import { addWorkBoardMembers, deleteWorkBoardMember , deleteWorkBoardTodoMember ,addWorkBoardTodoMember} from "../store/slice";
export const addWorkBoard = createAsyncThunk(
  "addWorkBoard",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addWorkboardService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "WorkBoard Created Successfully",
          type: "success",
          duration: 2,
        })
      );

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

export const getAllWorkBoardTodoPaging = createAsyncThunk(
  "getAllWorkBoardTodoPaging",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await getAllWorkboardTodoPagingService(data);
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

export const updateWorkBoard = createAsyncThunk(
  "updateWorkBoard",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await updateWorkboardService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "WorkBoard Updated Successfully!",
          type: "success",
          duration: 2,
        })
      );
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

export const getAllWorkBoard = createAsyncThunk(
  "getAllWorkBoard",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await getAllWorkboardService(data);
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      return rejectWithValue(res.message);
    }
  }
);

export const getWorkboardById = createAsyncThunk(
  "getWorkboardById",
  async (id, { dispatch, getState, rejectWithValue }) => {
    const res = await getWorkboardByIdService(id);
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        data: res,
        type: responseMessageType.ApiFailure,
      });
      return rejectWithValue(res.message);
    }
  }
);

export const addWorkBoardSection = createAsyncThunk(
  "addWorkBoardSection",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addWorkBoardSectionService(data);
    if (res.responseCode === responseCode.Success) {
      // console.log("res", res);
      dispatch(getWorkboardById(res.data.workBoardId));
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

export const updateWorkBoardSectionColorCode = createAsyncThunk(
  "updateWorkBoardSectionColorCode",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await updateWorkBoardSectionColorCodeService(data);
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

export const updateWorkBoardSectionTitle = createAsyncThunk(
  "updateWorkBoardSectionTitle",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await updateWorkBoardSectionTitleService(data);
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

export const moveWorkBoardSection = createAsyncThunk(
  "moveWorkBoardSection",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await moveWorkBoardSectionService(data);
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

export const moveWorkBoardTodo = createAsyncThunk(
  "moveWorkBoardTodo",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await moveWorkBoardSectionTodoService(data);
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

export const addWorkBoardSectionTodo = createAsyncThunk(
  "addWorkBoardSectionTodo",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addWorkBoardSectionTodoService(data);
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

export const addWorkBoardTodoLabel = createAsyncThunk(
  "addWorkBoardTodoLabel",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addWorkBoardTodoLabelService(data.labelObj);
    if (res.responseCode === responseCode.Success) {
      return { data: res.data, sectionId: data.sectionId };
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

export const getWorkBoardTodoById = createAsyncThunk(
  "getWorkBoardTodoById",
  async (id, { dispatch, getState, rejectWithValue }) => {
    const res = await getWorkboardTodoByIdService(id);
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

export const updateWorkBoardTodoDesc = createAsyncThunk(
  "updateWorkBoardTodoDesc",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await updateWorkBoardTodoDescService(data);
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

export const updateWorkBoardTodoTitle = createAsyncThunk(
  "updateWorkBoardTodoTitle",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await updateWorkBoardTodoTitleService(data);
    if (res.responseCode === responseCode.Success) {
      return { data: res.data, sectionId: data.sectionId };
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

export const updateWorkBoardTodoImage = createAsyncThunk(
  "updateWorkBoardTodoImage",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await uploadWorkBoardTodoImageService(data);
    if (res.responseCode === responseCode.Success) {
      return {
        data: res.data,
        id: data.get("todoId"),
        sectionId: data.get("sectionId"),
      };
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

export const updateWorkBoardTodoDueDate = createAsyncThunk(
  "updateWorkBoardTodoDueDate",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await updateWorkBoardTodoDueDateService(data);
    if (res.responseCode === responseCode.Success) {
      return { data: res.data, sectionId: data.sectionId };
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

export const removeWorkBoardTodoImage = createAsyncThunk(
  "removeWorkBoardTodoImage",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await removeWorkBoardTodoImageService(data);
    if (res.responseCode === responseCode.Success) {
      return { id: data.id, sectionId: data.sectionId };
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

export const removeWorkBoardTodo = createAsyncThunk(
  "removeWorkBoardTodo",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await removeWorkBoardTodoService(data);
    if (res.responseCode === responseCode.Success) {
      return { id: data.id, sectionId: data.sectionId };
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

export const removeWorkBoardTodoLabel = createAsyncThunk(
  "removeWorkBoardTodoLabel",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await removeWorkBoardTodoLabelService(data);
    if (res.responseCode === responseCode.Success) {
      return {
        sectionId: data.sectionId,
        labels: data.labels,
        todoId: data.todoId,
      };
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
export const addWorkBoardMember = createAsyncThunk(
  "addWorkBoardMember",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addWorkBoardMemberService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(addWorkBoardMembers(res.data));
      // message.success("Member Added");
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);


export const addWorkBoardTodoMemberAction = createAsyncThunk(
  "addWorkBoardTodoMember",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addWorkBoardTodoMemberService(data);
    if (res.responseCode === responseCode.Success) {
     // dispatch(addWorkBoardTodoMember(res.data));
      message.success("Todo Member Added");
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);

export const getWorkBoardMemberAction = createAsyncThunk(
  "getWorkBoardMemberAction",
  async (args) => {
    console.log(args, "args.id");
    try {
      const response = await getWorkBoardMemberService(args);
      console.log(response, "getWorkBoardMemberAction");
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);
export const removeWorkBoardMember = createAsyncThunk(
  "deleteWorkBoardMember",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await removeWorkBoardMemberService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(deleteWorkBoardMember(data));
      return data;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);


export const removeToDoMemebr = createAsyncThunk(
  "removetodomember",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await removeWorkBoardTodoMemberService(data);
    if (res.responseCode === responseCode.Success) {
      return data.memberId;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);