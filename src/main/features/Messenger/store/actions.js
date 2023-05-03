import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { responseMessage, responseMessageType } from "../../../../services/slices/notificationSlice";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { STRINGS } from "../../../../utils/base";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { getAllChatsService, getAllMessageService, MessengerService, searchConversationService, sendMessageService } from "../services/service";
import { handleAppendMessage, handleMessageFailure } from "./messengerSlice";


const createObjectForAppendMsg = (payload) => {
  let attachments = payload.attachments.map(item => ({
    path: window.webkitURL.createObjectURL(item.file)
  }))
  let request = {
    ...payload,
    status: "Pending",
    createBy: "local",
    attachments
  }
  return request
}


// NEWW
export const createChat = createAsyncThunk(
  "messenger/createChat",
  async (request, { rejectWithValue, dispatch }) => {
    const response = await MessengerService.createChat(request);
    console.log(response)
    switch (response.type) {
      case ResponseType.ERROR:
        dispatch(
          openNotification({
            message: response.errorMessage,
            type: "error"
          }))
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);
export const sharePostOnChat = createAsyncThunk(
  "messenger/sendChatMessage",
  async (request, { dispatch, rejectWithValue }) => {
    // Append Message before api
    let appendMsgObject = createObjectForAppendMsg(request);
    dispatch(handleAppendMessage(appendMsgObject))
    // Api call to server
    const response = await MessengerService.sendMessage(request);
    switch (response.type) {
      case ResponseType.ERROR:
        dispatch(
          openNotification({
            message: response.errorMessage,
            type: "error"
          }))
        dispatch(
          handleMessageFailure(request))
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: "Successfully Shared on Chat",
            type: "success"
          }))
        return response.data;
      default:
        return;
    }
  }
);
export const sendChatMessage = createAsyncThunk(
  "messenger/sendChatMessage",
  async (request, { dispatch, rejectWithValue }) => {
    // Append Message before api
    let appendMsgObject = createObjectForAppendMsg(request);
    dispatch(handleAppendMessage(appendMsgObject))
    // Api call to server
    const response = await MessengerService.sendMessage(request);
    switch (response.type) {
      case ResponseType.ERROR:
        dispatch(
          openNotification({
            message: response.errorMessage,
            type: "error"
          }))
        dispatch(
          handleMessageFailure(request))
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);
export const getAllChats = createAsyncThunk(
  "messenger/getAllChats",
  async (request, { rejectWithValue }) => {
    const response = await MessengerService.getAllChat(request);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
)
export const searchConversations = createAsyncThunk(
  "messenger/searchConversations",
  async (request, { rejectWithValue }) => {
    const response = await MessengerService.getAllEmployeeWithChat(request);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);;
export const getAllEmployeeWithChat = createAsyncThunk(
  "messenger/getAllEmployeeWithChat",
  async (request, { rejectWithValue }) => {
    const response = await MessengerService.getAllEmployeeWithChat(request);
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
export const getAllChatMessage = createAsyncThunk(
  "messenger/getAllChatMessage",
  async (request, { rejectWithValue }) => {
    const response = await MessengerService.getAllChatMessage(request);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return {
          data: response.data,
          pageNo: request.pageNo,
          chatId: request.chatId
        };
      default:
        return;
    }
  }
);
export const updateMessageDeliver = createAsyncThunk(
  "messenger/updateMessageDeliver",
  async (request, { rejectWithValue, getState }) => {
    const response = await MessengerService.updateMessageDeliver(request);
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