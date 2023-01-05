import { createSlice, current } from "@reduxjs/toolkit";
import { changeMailSeenFlag, composeMail, getAllMail, getMailById, getMailFolders, refreshMail } from "./Api";

export const mailSlice = createSlice({
    name: 'mail',
    initialState: {
        allMail: null,
        currentParamId: "",
        currentPageSize: 1,
        mailDetail: undefined,
        mailFolderItem: null,

        mailDrawerStatus: false,
        mailMobComposerStatus: false,
        mailComposerStatus: false,
        mailComposerInstances: [],
        responseCode: null,
        inProcess: false,
        isRefresh: false,
        errorMessage: "",
    },

    reducers: {
        openMailMenuDrawer: (state, action) => {
            state.mailDrawerStatus = action.payload;
        },
        openMailMobComposer: (state, action) => {
            state.mailMobComposerStatus = action.payload
        },

        handleMailComposer: (state, { payload }) => {
            state.mailComposerInstances = payload
        },
        handleMailComposerClose: (state, { payload }) => {
            state.mailComposerInstances = state.mailComposerInstances.filter(item => item.id !== payload)
        },
        handleMailComposerIsMax: (state, action) => {
            const { mailComposerInstances } = current(state);
            return {
                ...state, //copying the orignal state
                mailComposerInstances: mailComposerInstances.map(item => item.id === action.payload.id ? ({
                    ...item,
                    isMax: action.payload.status
                }) : item)
            }
        },
        handleMailMinimize: (state, action) => {
            console.log(action)
            const { mailComposerInstances } = current(state);
            return {
                ...state, //copying the orignal state
                mailComposerInstances: mailComposerInstances.map(item => item.id === action.payload.id ? ({
                    ...item,
                    isMinimize: action.payload.status
                }) : item)
            }
        },
        updateParamsId: (state, action) => {
            state.currentParamId = action.payload
        },
        updateEmail: (state, { payload }) => {
            console.log(payload, "payload")
            state.allMail = payload
        },
    },
    extraReducers: {
        [composeMail.pending]: (state, { payload }) => {
            //sending mail pending
        },
        [composeMail.fulfilled]: (state, { payload }) => {
            //sending mail fulfilled
        },
        [composeMail.rejected]: (state, { payload }) => {
            //sending mail rejected
        },
        [getMailFolders.pending]: (state, { payload }) => {

        },
        [getMailFolders.fulfilled]: (state, { payload }) => {
            console.log("getMailFolders.fulfilled")
            state.mailFolderItem = payload.data;
        },
        [getMailFolders.rejected]: (state, { payload }) => {
            // state.mailFolderItem = null;
            console.log("getMailFolders.rejected")

            state.errorMessage = payload?.message;
            state.responseCode = payload?.responseCode
        },

        [getAllMail.pending]: (state, { payload }) => {
            state.inProcess = true;
        },
        [getAllMail.fulfilled]: (state, { payload }) => {
            state.allMail = payload.data;
            state.inProcess = false;
        },
        [getAllMail.rejected]: (state, { payload }) => {
            state.inProcess = false;
            state.allMail = null;
            state.errorMessage = payload?.message;
        },

        // [refreshMail.pending]: (state, { payload }) => {
        //     state.isRefresh = true;
        // },
        // [refreshMail.fulfilled]: (state, { payload }) => {
        //     state.isRefresh = false;
        //     state.allMail = payload.data;
        // },

        // [refreshMail.rejected]: (state, { payload }) => {
        //     state.isRefresh = false;
        // },

        [getMailById.pending]: (state, { payload }) => {
            state.mailDetail = null
        },
        [getMailById.fulfilled]: (state, { payload }) => {
            state.mailDetail = payload.data;
        },
        [getMailById.rejected]: (state, payload) => {

        },

        // [changeMailSeenFlag.pending]: (state, { payload, meta }) => {
        //     state.allMail = state.allMail.map((value) => value.id === meta.arg.uid ? ({
        //         ...value,
        //         isRead: !value.isRead
        //     }) : value)
        // },
        // [changeMailSeenFlag.fulfilled]: (state, { payload, meta }) => {
        // },
        // [changeMailSeenFlag.rejected]: (state, payload) => {

        // }
    }
})

export const {
    openMailMenuDrawer,
    openMailMobComposer,
    handleMailComposer,
    updateParamsId,
    handleMailComposerClose,
    handleMailComposerIsMax,
    handleMailMinimize
} = mailSlice.actions
export default mailSlice.reducer;