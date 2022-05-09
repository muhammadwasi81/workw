  import { createAsyncThunk } from "@reduxjs/toolkit";
  import { AdministrationService } from "../../../../utils/services/AdministrationServices/AdministrationServices";
import { getAllChatsService } from "../services/service";
  // import { EmailConfigServices } from "../../../../utils/services/AdministrationServices/EmailConfig";
// import { deleteItemUpdate } from "./AdminSlice";
  // const { getTableData } = AdministrationService;

  export const getAllChats = createAsyncThunk(
    "messenger/getAllChats",
    async (type, { rejectWithValue }) => {
      try {
        const response = await getAllChatsService(type);
        return response.data;
      } catch (e) {
        return rejectWithValue(e.response.message);
      }
    }
  );

  