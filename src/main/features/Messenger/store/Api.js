import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { responseMessage, responseMessageType } from "../../../../services/slices/notificationSlice";
import { STRINGS } from "../../../../utils/base";
import { getAllChatsService, getAllMessageService, sendMessageService } from "../services/service";

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
  async (chatId, { dispatch }) => {
    const res = await getAllMessageService(chatId);
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const testApiCall = createAction("TEST_API")


