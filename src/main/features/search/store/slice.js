import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { globalSearch , getSearchFeed , getSearchProject , getSearchGroup , getSearchDocument , getSearchEmployee , getSearchExpense, getSearchLead, getSearchWorkboard ,geteLearningArticle, geteLearningBook, geteLearningCourse,geteLearningTedTalks,geteLearningVideo}  from "../store/actions";
const initialState = {
  keyword: "",
  tab:"All",
  FeedData:[],
  ProjectData:[],
  GroupData:[],
  LeadData:[],
  DocumentData:[],
  WorkboaredData:[],
  ExpenseData:[],
  EmployeeData:[],
  eCourseData:[],
  eVideoData:[],
  eArticleData:[],
  eBookData:[],
  eTedTalkData:[],
};

const globalSearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    handleGlobalSearch: (state, { payload }) => {
      console.log(payload, "payloadd searchh");
      state.keyword = payload;
    },
    handleTab: (state,{payload}) =>{
      console.log(payload, "payload Tab");
      state.tab = payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(globalSearch.fulfilled, (state, { payload }) => {
      console.log({ payload }, "slicedata")
      state.keyword = payload.data;
      state.FeedData = payload.data.Feed;
      state.ProjectData  = payload.data.Project
      state.GroupData = payload.data.Group
      state.LeadData = payload.data.Lead
      state.ExpenseData = payload.data.Expense
      state.DocumentData = payload.data.Document
      state.EmployeeData = payload.data.Employee
      state.eCourseData = payload.data.ELearningCourse
      state.eVideoData = payload.data.ELearningVideos
      state.eArticleData = payload.data.ELearningArticles
      state.eBookData = payload.data.ELearningBook
      state.eTedTalkData =payload.data.ELearningTedTalks
      state.WorkboaredData = payload.data.WorkBoard
    })
    .addCase(getSearchFeed.fulfilled, (state, { payload }) => {
      console.log(payload.data.Feed, "FeedData")
      state.FeedData = payload.data.Feed;
    })
    .addCase(getSearchProject.fulfilled, (state, { payload }) => {
      console.log(payload.data.Project, "ProjectData")
      state.ProjectData = payload.data.Project;
    })
    .addCase(getSearchGroup.fulfilled, (state, { payload }) => {
      console.log(payload.data.Group, "getSearchGroup")
      state.GroupData = payload.data.Group;
    })
    .addCase(getSearchExpense.fulfilled, (state, { payload }) => {
      console.log(payload.data.Expense, "getSearchExpense")
      state.ExpenseData = payload.data.Expense;
    })
    .addCase(getSearchEmployee.fulfilled, (state, { payload }) => {
      console.log(payload.data.Employee, "getSearchEmployee")
      state.EmployeeData = payload.data.Employee;
    })
    .addCase(getSearchDocument.fulfilled, (state, { payload }) => {
      console.log(payload.data.Document, "getSearchDocument")
      state.DocumentData = payload.data.Document;
    })
    .addCase(getSearchLead.fulfilled, (state, { payload }) => {
      console.log(payload.data.Lead, "getSearchLead")
      state.LeadData = payload.data.Lead;
    })
    .addCase(getSearchWorkboard.fulfilled, (state, { payload }) => {
      console.log(payload.data.WorkBoard, "getSearchWorkboard")
      state.WorkboaredData = payload.data.WorkBoard;
    })
    .addCase(geteLearningCourse.fulfilled, (state, { payload }) => {
      console.log(payload.data.ELearningCourse, "geteLearningCourse")
      state.eCourseData = payload.data.ELearningCourse;
    })
    .addCase(geteLearningVideo.fulfilled, (state, { payload }) => {
      console.log(payload.data.ELearningVideos, "geteLearningVideo")
      state.eVideoData = payload.data.ELearningVideos;
    })
    .addCase(geteLearningArticle.fulfilled, (state, { payload }) => {
      console.log(payload.data.ELearningArticles, "geteLearningArticle")
      state.eArticleData = payload.data.ELearningArticles;
    })
    .addCase(geteLearningBook.fulfilled, (state, { payload }) => {
      console.log(payload.data.ELearningBook, "geteLearningBook")
      state.eBookData = payload.data.ELearningBook;
    })
    .addCase(geteLearningTedTalks.fulfilled, (state, { payload }) => {
      console.log(payload.data.ELearningTedTalks, "geteLearningTedTalks")
      state.eTedTalkData = payload.data.ELearningTedTalks;
    })
  },
});

export const { handleGlobalSearch ,handleTab } = globalSearchSlice.actions;
export default globalSearchSlice.reducer;
