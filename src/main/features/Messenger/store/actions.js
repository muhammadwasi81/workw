import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { responseMessage, responseMessageType } from "../../../../services/slices/notificationSlice";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { STRINGS } from "../../../../utils/base";
import { getAllChatsService, getAllMessageService, MessengerService, searchConversationService, sendMessageService } from "../services/service";

export const getAllChats = createAsyncThunk(
  "messenger/getAllChats",
  async (args, { dispatch }) => {
    const res = await getAllChatsService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);
export const sendChatMessage = createAsyncThunk(
  "messenger/sendChatMessage",
  async (
    data = {
      messageId: "",
      chatId: STRINGS.DEFAULTS.guid,
      parentId: STRINGS.DEFAULTS.guid,
      message: "",
      members: [],
      attachments: []
    }
    , { dispatch }) => {
    const res = await sendMessageService(data);
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);
export const getAllMessages = createAsyncThunk(
  "messenger/getAllMessages",
  async (data, { dispatch }) => {
    const res = await getAllMessageService(data.chatId, data.pageNo);
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const searchConversation = createAsyncThunk(
  "messenger/searchConversation",
  async (data, { dispatch }) => {
    const res = await searchConversationService(data.search, data.pageNo);
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

// NEWW

export const createChat = createAsyncThunk(
  "messenger/createChat",
  async (request, { rejectWithValue }) => {
    const response = await MessengerService.createChat(request);
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


