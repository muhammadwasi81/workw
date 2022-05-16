  import { createAsyncThunk } from "@reduxjs/toolkit";
  import { AdministrationService } from "../../../../utils/services/AdministrationServices/AdministrationServices";
import { getAllEmployeeShortService } from "../../../../utils/Shared/services/services";
import { getAllChatsService, getAllMessageService, sendMessageService } from "../services/service";
  // import { EmailConfigServices } from "../../../../utils/services/AdministrationServices/EmailConfig";
// import { deleteItemUpdate } from "./AdminSlice";
  // const { getTableData } = AdministrationService;

  export const getAllEmployeeShort = createAsyncThunk(
    "messenger/getAllEmployeeShort",
    async ({pageNo, search}, { rejectWithValue }) => {
      try {
      // console.log(data, "Testing")
        const response = await getAllEmployeeShortService( pageNo, search );
        return "response.data";
      } catch (e) {
        return rejectWithValue("e.response.message");
      }
    }
  );
  export const getAllChats = createAsyncThunk(
    "messenger/getAllChats",
    async (data, { rejectWithValue }) => {
      try {
      console.log(data, "Testing")
        const response = await getAllChatsService(data);
        return response.data;
      } catch (e) {
        return rejectWithValue(e.response.message);
      }
    }
  );
  export const sendChatMessage = createAsyncThunk(
    "messenger/sendChatMessage",
    async (data, { rejectWithValue }) => {
      try {
        const response = await sendMessageService(data);
        return response.data;
      } catch (e) {
        return rejectWithValue(e.response.message);
      }
    }
  );
  export const getAllMessages = createAsyncThunk(
    "messenger/getAllMessages",
    async (id, { rejectWithValue }) => {
      try {
        const response = await getAllMessageService(id);
        return response.data;
      } catch (e) {
        return rejectWithValue(e.response.message);
      }
    }
  );

  