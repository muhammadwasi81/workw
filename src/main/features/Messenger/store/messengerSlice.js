import { createSlice } from "@reduxjs/toolkit"
import { getAllChats } from "./Api";

const tempData = [
   {
      id: "ME",
      msgId: "msg8",
      msgContent: "Fine and you?"
   },
   {
      id: "YOU",
      msgId: "msg9",
      msgContent: "animation-iteration-count: infinite; animation-iteration-count: infinite animation-iteration-count: infinite; animation-iteration-count: infiniteanimation-iteration-count: infinite; animation-iteration-count: infinite"
   },
   {
      id: "YOU",
      msgId: "msg15",
      msgContent: "Hi How are you!"
   },
]
const initialState = {
   mobileIsopenChat: null,
   currentMessenger: {},
   currentChatBoxes: [],
   MessengerList: {
      chatId: tempData,
   }
};

export const messengerSlice = createSlice({
   name: 'MessengerChat',
   initialState: initialState,
   reducers: {
      sendMessage: (state, action) => {
         let newMsg = {
            id: "ME",
            msgId: "msg8",
            msgContent: action.payload
         }
         state.MessengerList.chatId = [...state.MessengerList.chatId, newMsg]
      },
      handleIsopenChat: (state, action) => {
         state.mobileIsopenChat = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
      .addCase(getAllChats.fulfilled, (state, { payload }) => {
         console.log(payload)
       })
   }
})

export const { sendMessage, handleIsopenChat } = messengerSlice.actions
export default messengerSlice.reducer;