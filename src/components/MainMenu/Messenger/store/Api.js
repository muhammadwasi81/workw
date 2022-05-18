//   import { createAsyncThunk } from "@reduxjs/toolkit";
//   import { AdministrationService } from "../../../../utils/services/AdministrationServices/AdministrationServices";
//   import { EmailConfigServices } from "../../../../utils/services/AdministrationServices/EmailConfig";
// import { deleteItemUpdate } from "./AdminSlice";
//   const { getTableData } = AdministrationService;
//   // const { getTableData, setTableData, deleteTableData, updateTableData } = EmailConfigServices;

//   export const getAllTableData = createAsyncThunk(
//     "administration/getTableData",
//     async (type, { rejectWithValue }) => {
//       try {
//         const response = await getTableData(type);
//         return response.data;
//       } catch (e) {
//         return rejectWithValue(e.response.message);
//       }
//     }
//   );
