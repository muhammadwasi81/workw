import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { openNotification } from "../../../../utils/Shared/store/slice";
import {
  addLeadManagerContactService,
  addLeadManagerDetailService,
  addLeadManagerService,
  deleteLeadManagerDetailAssignToService,
  getAllLeadManagerPagingService,
  getAllLeadManagerService,
  getLeadManagerByIdService,
  getLeadManagerContactDetailService,
  getLeadManagerSectionByIdService,
  getLeadManagerSectionDetailByIdService,
  LeadManagerDetailAssignToService,
  moveLeadManagerDetailService,
  moveLeadManagerSectionService,
  updateLeadManagerContactService,
  updateLeadManagerDetailService,
  updateLeadManagerService,
  getAllScheduleService,
  getScheduleByIdService,
  getAllLeadManagerMemberService,
  addLeadManagerMemberService,
  deleteLeadManagerMemberById,
} from "../services/services";
import { addLeadMember, deleteLeadManagerMember } from "../store/slice";
export const addLeadManager = createAsyncThunk(
  "addLeadManager",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addLeadManagerService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "LeadManager Created Successfully",
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

export const addLeadManagerDetail = createAsyncThunk(
  "addLeadManagerDetail",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addLeadManagerDetailService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "Lead Manager Detail Created Successfully",
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

export const updateLeadManager = createAsyncThunk(
  "updateLeadManager",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await updateLeadManagerService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "Lead Manager Updated Successfully!",
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

export const getAllLeadManager = createAsyncThunk(
  "getAllLeadManager",
  async (data, { dispatch, getState, rejectWithValue, signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });
    const res = await getAllLeadManagerService(data, source);
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      return rejectWithValue(res.message);
    }
  }
);

export const getAllLeadManagerPaging = createAsyncThunk(
  "getAllLeadManagerPaging",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await getAllLeadManagerPagingService(data);
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      return rejectWithValue(res.message);
    }
  }
);

export const getLeadManagerById = createAsyncThunk(
  "getLeadManagerById",
  async (id, { dispatch, getState, rejectWithValue }) => {
    const res = await getLeadManagerByIdService(id);
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

export const deleteLeadManagerById = createAsyncThunk(
  "deleteManagerById",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await deleteLeadManagerMemberById(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(deleteLeadManagerMember(data));
      // res.message = "Member deleted successfulyy";
      message.success(res.message);
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
export const getLeadManagerSectionById = createAsyncThunk(
  "getLeadManagerSectionById",
  async (id, { dispatch, getState, rejectWithValue }) => {
    const res = await getLeadManagerSectionByIdService(id);
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

export const getLeadManagerDetailById = createAsyncThunk(
  "getLeadManagerDetailById",
  async (id, { dispatch, getState, rejectWithValue }) => {
    const res = await getLeadManagerSectionDetailByIdService(id);
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

export const addLeadManagerContact = createAsyncThunk(
  "addLeadManagerContact",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addLeadManagerContactService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "LeadManager Contact Created Successfully",
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

export const updateLeadManagerDetail = createAsyncThunk(
  "updateLeadManagerDetail",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await updateLeadManagerDetailService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "Lead Manager Detail Updated Successfully!",
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

export const getAllLeadManagerContactDetail = createAsyncThunk(
  "getAllLeadManagerContactDetail",
  async (id, { dispatch, getState, rejectWithValue }) => {
    const res = await getLeadManagerContactDetailService(id);
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      return rejectWithValue(res.message);
    }
  }
);

export const updateLeadManagerContact = createAsyncThunk(
  "updateLeadManagerContact",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await updateLeadManagerContactService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "Lead Manager Contact Updated Successfully!",
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

export const moveLeadManagerSection = createAsyncThunk(
  "moveLeadManagerSection",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await moveLeadManagerSectionService(data);
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

export const moveLeadManagerDetail = createAsyncThunk(
  "moveLeadManagerDetail",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await moveLeadManagerDetailService(data);
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

export const addLeadManagerAssignTo = createAsyncThunk(
  "addLeadManagerAssignTo",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await LeadManagerDetailAssignToService(data);
    if (res.responseCode === responseCode.Success) {
      return {
        data: res.data,
        sectionId: data[0].sectionId,
        detailId: data[0].detailId,
      };
    } else {
      return rejectWithValue(res.message);
    }
  }
);

export const deleteLeadManagerDetailAssignTo = createAsyncThunk(
  "deleteLeadManagerDetailAssignTo",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await deleteLeadManagerDetailAssignToService(data);
    if (res.responseCode === responseCode.Success) {
      return {
        data: res.data,
        sectionId: data.sectionId,
        detailId: data.detailId,
        memberId: data.memberId,
      };
    } else {
      return rejectWithValue(res.message);
    }
  }
);

// export const deleteLeadManagerContact = createAsyncThunk(
// 	"deleteLeadManagerContact",
// 	async (id, { dispatch, getState, rejectWithValue }) => {
// 		const res = await deleteLeadManagerContactService(id);
// 		if (res.responseCode === responseCode.Success) {
// 			dispatch(
// 				openNotification({
// 					message: "Lead Manager Contact Deleted Successfully!",
// 					type: "success",
// 					duration: 2,
// 				})
// 			);

// 			return res;
// 		} else {
// 			return rejectWithValue(res.message);
// 		}
// 	}
// );

export const getAllScheduleAction = createAsyncThunk(
  "getAllSchedule",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await getAllScheduleService(data);
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      return rejectWithValue(res.message);
    }
  }
);

export const getScheduleByIdAction = createAsyncThunk(
  "getAllScheduleById",
  async (id, { dispatch, getState, rejectWithValue }) => {
    const res = await getScheduleByIdService(id);
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      return rejectWithValue(res.message);
    }
  }
);
export const getAllLeadManagerMember = createAsyncThunk(
  "GetAllLeadMember",
  async (data) => {
    console.log(data, "FROM ACTIONSSS !!");
    const response = await getAllLeadManagerMemberService(data);
    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    return response.data;
  }
);
export const addLeadManagereMember = createAsyncThunk(
  "addLeadMember",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addLeadManagerMemberService(data);
    if (res.data?.responseCode === responseCode.Success) {
      dispatch(addLeadMember(res.data));
      // message.success("Member Added");
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);
