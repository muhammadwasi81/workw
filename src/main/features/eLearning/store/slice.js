import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { 
    addBook,
    addBookAssignMem,
    addCourse,
    addCourseAssignMem,
    getAllBook, 
    getAllBookAssignMem, 
    getAllBookMember, 
    getAllCourse, 
    getAllCourseAssignMem, 
    getAllCourseMember, 
    GetBookById, 
    GetCourseById,
    addQuiz,
    getAllQuiz,
    CheckQuizAttempt,
    getQuizById,
    addQuizAnswerAttempt,
    AddStartQuiz,
    GetQuizResult, 
  } 
  from "./action";

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
  quizzes: [],
  quizDetail: {},
  startQuiz: {},
  checkquizAttempt: {},
  quizResult: {},
  courseDetail: {},
  bookDetail: {},
  books: [],
  success: false,
  loader: false,
  loaders: {
    courseLoading: false,
    addCourseLoading: false,
    bookLoading: false,
    addBookLoading: false,
    addQuizLoading: false,
    quizLoading: false,
    checkQuizAttemptLoading: false,
    addquizAttemptLoader: false,
    getQuizResultLoader: false,
  },
  courseMembers: [],
  bookMembers: [],
  courseAssignMembers: [],
  bookAssignMembers: [],
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
      .addCase(getAllQuiz.fulfilled, (state, { payload }) => {
        state.quizzes = payload;
        state.loaders.quizLoading = false;
        state.success = true;
      })
      .addCase(getQuizById.fulfilled, (state, { payload }) => {
        state.quizDetail = payload.data;
      })
      .addCase(GetQuizResult.fulfilled, (state, { payload }) => {
        // state.quizResult = payload.data;
        console.log(payload);
      })
      .addCase(AddStartQuiz.fulfilled, (state, { payload }) => {
        state.startQuiz = payload.data;
      })
      .addCase(addQuizAnswerAttempt.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loaders.addquizAttemptLoader = false;
      })
      .addCase(GetCourseById.fulfilled, (state, action) => {
        state.courseDetail = action.payload.data;
      })
      .addCase(GetBookById.fulfilled, (state, action) => {
        state.bookDetail = action.payload.data;
      })
      .addCase(CheckQuizAttempt.fulfilled, (state, { payload }) => {
        console.log(payload.data);
        state.checkquizAttempt = payload;
        state.loaders.checkQuizAttemptLoading = false;
      })
      .addCase(addBook.fulfilled, (state) => {
        state.loaders.addBookLoading = false;
        state.success = true;
        return state;
      })
      .addCase(addBookAssignMem.fulfilled, (state, { payload }) => {
        state.bookAssignMembers = [...state.bookAssignMembers, payload]
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
      .addCase(getAllBookMember.fulfilled, (state, action) => {
        state.bookMembers = action.payload ? action.payload : [];
      })
      .addCase(getAllCourseAssignMem.fulfilled, (state, action) => {
        state.courseAssignMembers = action.payload ? action.payload : [];
      })
      .addCase(getAllBookAssignMem.fulfilled, (state, action) => {
        state.bookAssignMembers = action.payload ? action.payload : [];
      })
      .addMatcher(isPending(...[getAllBook, getAllCourse]), (state) => {
        state.loaders.courseLoading = true
        state.loaders.bookLoading = true
      })
      .addMatcher(isPending(...[addCourse]), (state) => {
        state.loaders.addCourseLoading = true;
      })
      .addMatcher(isPending(...[addBook]), (state) => {
        state.loaders.addBookLoading = true;
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
      })
      .addMatcher(isRejected(...[CheckQuizAttempt]), (state) => {
        console.log("rejected");
        state.loaders.checkQuizAttemptLoading = false;
      })
      .addMatcher(isRejected(...[getQuizById]), (state) => {
        console.log("rejected");
      })
      .addMatcher(isRejected(...[GetQuizResult]), (state) => {
        console.log("rejected get quiz result");
        state.getQuizResultLoader = false;
      })
      .addMatcher(isRejected(...[AddStartQuiz]), (state) => {
        console.log("rejected start quiz");
      })
      .addMatcher(isRejected(...[addQuizAnswerAttempt]), (state) => {
        console.log("rejected request");
        state.loaders.addquizAttemptLoader = false;
      })
      .addMatcher(isRejected(...[getAllQuiz]), (state) => {
        state.loaders.quizLoading = false;
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
