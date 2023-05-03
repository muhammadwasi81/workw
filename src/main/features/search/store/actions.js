import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { getAllSearchService } from "../service/service";

const createSearchAsyncThunk = (stateName) => {
  return createAsyncThunk(
    stateName,
    async (data, { dispatch, getState, rejectWithValue }) => {
      const res = await getAllSearchService(data);
      if (res.responseCode === responseCode.Success) {
        return res;
      } else {
        dispatch(
          openNotification({
            message: res.message,
            type: "error",
            duration: 2,
          })
        );
        return rejectWithValue(res.message);
      }
    }
  );
}

export const globalSearch = createSearchAsyncThunk('globalSearch');
export const getSearchFeed = createSearchAsyncThunk('getSearchFeed');
export const getSearchProject = createSearchAsyncThunk('getSearchProject');
export const getSearchGroup = createSearchAsyncThunk('getSearchGroup');
export const getSearchExpense = createSearchAsyncThunk('getSearchExpense');
export const getSearchLead = createSearchAsyncThunk('getSearchLead');
export const getSearchDocument = createSearchAsyncThunk('getSearchDocument');
export const getSearchWorkboard = createSearchAsyncThunk('getSearchWorkboard');
export const getSearchEmployee = createSearchAsyncThunk('getSearchEmployee');
export const geteLearningCourse = createSearchAsyncThunk('geteLearningCourse');
export const geteLearningVideo = createSearchAsyncThunk('geteLearningVideo');
export const geteLearningArticle = createSearchAsyncThunk('geteLearningArticle');
export const geteLearningBook = createSearchAsyncThunk('geteLearningBook');
export const geteLearningTedTalks = createSearchAsyncThunk('geteLearningTedTalks');