import {createSlice} from "@reduxjs/toolkit"

export const stickyNotesSlice = createSlice({
    name: 'stickyNotes',
    initialState: {
        open: false
    },
    reducers: {
        openStickyNotes: (state, action) => {
            state.open = true
        },
        closeStickyNotes: (state, action) => {
            state.open = false
        },
    },
})

export const {openStickyNotes, closeStickyNotes} = stickyNotesSlice.actions
export default stickyNotesSlice.reducer;