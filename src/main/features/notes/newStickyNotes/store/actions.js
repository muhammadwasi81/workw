import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseType } from "../../../../../utils/api/ResponseResult";
import { jsonToFormData, STRINGS } from "../../../../../utils/base";
import { openNotification } from "../../../../../utils/Shared/store/slice";
import {addStickyNotesService} from "../services/service";
import {addStickyNote} from "../store/stickySlice";

const addSticky_SD = (data) => {
    return {
      "title": data.title ? data.title : "",
      "description": data.description ? data.description : "",
      "privacyId": data.privacyId ? data.privacyId : 1,
    }
  }
export const addSticky=createAsyncThunk(
    "stickySlice/addSticky",
    async (payload, { rejectWithValue, dispatch }) => {
        console.log(payload, "ACTION START")
 
        let request = addSticky_SD(payload)
        // const formdataRequest = jsonToFormData(request);
        console.log(request, "ACTION")
    
        const response = await addStickyNotesService(request);
        console.log(response)
        switch (response.type) {
          case ResponseType.ERROR:
            return rejectWithValue(response.errorMessage);
          case ResponseType.SUCCESS:
            dispatch(openNotification({
              message: "Sticky Note added Successfully!",
              type: "success",
            //   duration: 2
            }))
            return response.data;
          default:
            return;
        }
      }
)