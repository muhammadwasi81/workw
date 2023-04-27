import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllWizardService,seenWizardService } from "../services/services";
import { responseCode } from "../../../../services/enums/responseCode";
import { message } from "antd";
import { data } from "jquery";

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

export const seenWizard = createAsyncThunk(
  "Wizard/seenWizard",
  async (data) => {
    try {
      const response = await seenWizardService(data);
      console.log("seen wizard");
      console.log(response.data, "respose.data");
      return response.data;
    } catch (e) {
      console.log(e, "e");
    }
  }
);
