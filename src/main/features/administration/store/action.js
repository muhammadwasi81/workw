import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllWizardService } from "../services/services";
import { responseCode } from "../../../../services/enums/responseCode";
import { message } from "antd";

export const GetAllWizard = createAsyncThunk(
  "Wizard/GetAllWizard",
  async () => {
    try {
      const response = await GetAllWizardService();
      console.log("action wizard");
      console.log(response.data, "respose.data");
      return response.data;
    } catch (e) {
      console.log(e, "e");
    }
  }
);
