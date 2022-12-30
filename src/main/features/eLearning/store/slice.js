import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addDocumentDirectoryList } from "../../documents/store/actions";
import {
  addBook,
  addCourse,
  addCourseAssignMem,
  getAllBook,
  getAllCourse,
  getAllCourseAssignMem,
  getAllCourseMember,
  GetCourseById,
  addQuiz,
} from "./action";

const initialState = {
  listLoading: false,
  isOpenComposers: {
    category: false,
    courses: false,
    ebook: false,
    quizz: false,
    tedtalks: false,
    article: false,
    videos: false,
  },
  composersInitState: {
    category: {},
    courses: {},
    ebook: {},
    quizz: {},
    tedtalks: {},
    article: {},
    videos: null,
  },
  topics: [],
  sections: [],
  courses: [],
  courseDetail: {},
  books: [],
  success: false,
  loader: false,
  loaders: {
    courseLoading: false,
    addCourseLoading: false,
    bookLoading: false,
    addBookLoading: false,
    addQuizLoading: false,
  },
  courseMembers: [],
  courseAssignMembers: [],
  addAssignMemberModal: false,
  addMemberModal: false,
};

const eLearningSlice = createSlice({
  name: "eLearning",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload: key }) => {
      state.isOpenComposers[key] = true;
    },
    handleCloseComposer: (state, { payload: key }) => {
      state.isOpenComposers[key] = false;
      state.composersInitState[key] = {};
    },
    addTopic: (state, { payload }) => {
      state.topics = [...state.topics, payload];
    },
    deleteTopic: (state, { payload }) => {
      let index = payload;
      state.topics = state.topics.filter((e, ind) => ind !== index);
    },
    addSection: (state, { payload }) => {
      state.sections = [...state.sections, payload];
      state.topics = [];
    },
    addMember: (state, { payload }) => {
      state.addMemberModal = payload;
    },
    addAssignMember: (state, { payload }) => {
      state.addAssignMemberModal = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addCourse.fulfilled, (state) => {
        state.loaders.addCourseLoading = false;
        state.success = true;
        return state;
      })
      .addCase(addQuiz.fulfilled, (state) => {
        state.loaders.addQuizLoading = false;
        state.success = true;
        return state;
      })
      .addCase(addCourseAssignMem.fulfilled, (state, { payload }) => {
        state.courseAssignMembers = [...state.courseAssignMembers, payload];
        return state;
      })
      .addCase(getAllCourse.fulfilled, (state, action) => {
        state.courses = action.payload ? action.payload : [];
        state.loaders.courseLoading = false;
      })
      .addCase(GetCourseById.fulfilled, (state, action) => {
        state.courseDetail = action.payload.data;
      })
      .addCase(addBook.fulfilled, (state) => {
        state.loaders.addBookLoading = false;
        state.success = true;
        return state;
      })
      .addCase(getAllBook.fulfilled, (state, action) => {
        state.books = action.payload ? action.payload : [];
        state.loaders.bookLoading = false;
        state.loaders.courseLoading = false;
      })
      .addCase(getAllCourseMember.fulfilled, (state, action) => {
        state.courseMembers = action.payload ? action.payload : [];
      })
      .addCase(getAllCourseAssignMem.fulfilled, (state, action) => {
        state.courseAssignMembers = action.payload ? action.payload : [];
      })
      .addMatcher(
        isPending(...[addCourse, addBook, getAllBook, getAllCourse]),
        (state) => {
          // state.loader = true;
          state.loaders.addCourseLoading = true;
          state.loaders.addBookLoading = true;
          state.loaders.courseLoading = true;
          state.loaders.bookLoading = true;
        }
      )
      .addMatcher(isPending(...[addQuiz]), (state) => {
        // console.log("pending add career applied");
        state.loaders.addQuizLoading = true;
        state.success = false;
      })
      .addMatcher(
        isRejected(...[addCourse, addBook, getAllBook, getAllCourse]),
        (state) => {
          state.loaders.addCourseLoading = false;
          state.loaders.addBookLoading = false;
          state.loaders.courseLoading = false;
          state.loaders.bookLoading = false;
          state.success = false;
        }
      )
      .addMatcher(isRejected(...[addQuiz]), (state) => {
        state.loaders.addQuizLoading = false;
        state.success = false;
      });
  },
});

export const {
  handleOpenComposer,
  handleCloseComposer,
  addTopic,
  deleteTopic,
  addSection,
  addAssignMember,
  addMember,
} = eLearningSlice.actions;
export default eLearningSlice.reducer;
