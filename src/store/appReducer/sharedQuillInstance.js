import {createSlice} from "@reduxjs/toolkit";

export const sharedQuillSlice = createSlice({
    name: 'sharedQuillSlice',
    initialState: {
        QuilInstance: {
            "uid": "{quilInstance}",
        }
    },
    reducers: {
        setQuillInstance: (state, {payload}) => {
            state.QuilInstance[payload.id] = payload.quillInstance
        },

    }
})
export const {setQuillInstance} = sharedQuillSlice.actions;
export default sharedQuillSlice.reducer;