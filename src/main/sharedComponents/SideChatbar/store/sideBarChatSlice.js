import {createSlice} from "@reduxjs/toolkit"


export const sideBarChatSlice = createSlice({
    name: 'sideBarChat',
    initialState: {
       sideBarChatStatus : false,
       sideBarChatIsDefault : true
    },
    reducers: {
        sideBarOpen: (state, action) => {
            state.sideBarChatStatus = action.payload
            state.sideBarChatIsDefault = false
        },
    }
})

export const {sideBarOpen} = sideBarChatSlice.actions
export default sideBarChatSlice.reducer;