import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseType } from "../../../../../utils/api/ResponseResult";
import { jsonToFormData, STRINGS } from "../../../../../utils/base";
import { openNotification } from "../../../../../utils/Shared/store/slice";
import {addStickyNotesService,deleteStickyNoteService,getAllStickyNotesService, addStickyNote,} from "../services/service";
import { deleteStickyNote,selectStickyNoteColor,targetTitleVal, targetStickyDescription } from "./stickySlice";

const addSticky_SD = (data) => {
    return {
      "id":data.id?data.id:1,
      "title": data.title ? data.title : "",
      "description": data.description ? data.description : "",
      "privacyId": data.privacyId ? data.privacyId : 1,
      "colorCode":data.colorCode?data.colorCode:"",
    }
  }

  const saerchSticky_SD=(data)=>{
    return{
      "search":data.search?data.search:"",
    }
      
  }

  

export const addSticky=createAsyncThunk(
    "stickySlice/addSticky",
    async (payload, { rejectWithValue, dispatch }) => {
        // console.log(payload, "ACTION START add sticky")
 
        let request = addSticky_SD(payload)
        // const formdataRequest = jsonToFormData(request);
        // console.log(request, "ACTION")
    
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
export const getColorCodeAction=createAsyncThunk(
  "stickySlice/getColorCodeAction",
  async (payload, { rejectWithValue, dispatch }) => {
      // console.log(payload, "ACTION START COLOR")

      let request = addSticky_SD(payload)
      const formdataRequest = jsonToFormData(request);
      // console.log(formdataRequest, "COLOR ACTION")
  
      const response = await addStickyNotesService(formdataRequest);
      // console.log(response,"COLOR RESPONSE")
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

export const getStickyNoteTitleAction=createAsyncThunk(
  "stickySlice/getStickyNoteTitleAction",
  async (payload, { rejectWithValue, dispatch }) => {
      console.log(payload, "ACTIon tITLE value")

      let request = addSticky_SD(payload)
      const formdataRequest = jsonToFormData(request);
      console.log(formdataRequest, "Title ACTION")
  
      const response = await addStickyNotesService(formdataRequest);
      console.log(response,"Title RESPONSE")
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




export const getStickyNoteDescAction=createAsyncThunk(
  "stickySlice/getStickyNoteDescAction",
  async (payload, { rejectWithValue, dispatch }) => {
      // console.log(payload, "ACTIon Desc value")

      let request = addSticky_SD(payload)
      const formdataRequest = jsonToFormData(request);
      // console.log(formdataRequest, "Desc ACTION")
  
      const response = await addStickyNotesService(formdataRequest);
      // console.log(response,"DEsc RESPONSE")
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

export const getAllStickyNotesAction=createAsyncThunk(
  "stickySlice/getAllStickyNotesAction",
  async (request, { rejectWithValue }) => {
    // console.log(request, "GET REQUEST")
    const response = await getAllStickyNotesService(request);
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



export const deleteStickyAction=createAsyncThunk("stickySlice/deleteStickyAction",
async (request, { rejectWithValue,dispatch }) => {
  // console.log(request, "DELETE REQUEST")
  const response = await deleteStickyNoteService(request);
  // console.log(response, "delete RESPONSE");
  switch (response.type) {
    case ResponseType.ERROR:
      return rejectWithValue(response.errorMessage);
    case ResponseType.SUCCESS:
      dispatch(deleteStickyNote({id:request}))
      return response.data;
    default:
      return;
  }
}
)





