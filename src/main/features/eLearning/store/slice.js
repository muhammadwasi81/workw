import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addBook, addCourse, getAllBook, getAllCourse } from "./action";

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
  books: [],
  success: false,
  loader: false,
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
      state.topics = []
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addCourse.fulfilled, (state) => {
        state.loader = false;
        state.success = true;
        return state;
      })
      .addCase(getAllCourse.fulfilled, (state, action) => {
        state.courses = action.payload ? action.payload : [];
        state.loader = false;
      })
      .addCase(addBook.fulfilled, (state) => {
        state.loader = false;
        state.success = true;
        return state;
      })
      .addCase(getAllBook.fulfilled, (state, action) => {
        state.books = action.payload ? action.payload : [];
        state.loader = false;
      })
      .addMatcher(isPending(...[addCourse, addBook, getAllBook, getAllCourse]), (state) => {
        state.loader = true;
      })
      .addMatcher(
        isRejected(...[addCourse, addBook, getAllBook, getAllCourse]),
        (state) => {
          state.loader = false;
          state.success = false
        }
      );
  }

});

export const {
    handleOpenComposer,
    handleCloseComposer,
    addTopic,
    deleteTopic,
    addSection,
} = eLearningSlice.actions;
export default eLearningSlice.reducer;
