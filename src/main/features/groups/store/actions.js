import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { getAllProjectsService } from "../services/service";

export const getAllProjects = createAsyncThunk("Project/GetAllProject", async (data) => {
  const response = await getAllProjectsService(data);

  if (!response.responseCode) {
    message.error("Something went wrong");
  }
  return response.data;
});
