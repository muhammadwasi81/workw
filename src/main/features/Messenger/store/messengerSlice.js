import { createSlice } from "@reduxjs/toolkit"
import { STRINGS } from "../../../../utils/base";
import { getAllChats, getAllMessages, sendChatMessage } from "./Api";

const tempData = [
   {
      id: "ME",
      msgId: "msg8",
      msgContent: "Fine and you?ff"
   },
   {
      id: "YOU",
      msgId: "msg9",
      msgContent: "animatskdl"
   },
   {
      id: "YOU",
      msgId: "msg15",
      msgContent: "Hi How are you!"
   },
]
const initialState = {
   mobileIsopenChat: null,
   currentMessenger: {
      chatId:STRINGS.DEFAULTS.guid,
      profile:""
   },
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
       .addCase(sendChatMessage.fulfilled, (state, { payload }) => {
         console.log(payload, "sendChatMessage")
       })
       .addCase(getAllMessages.fulfilled, (state, { payload }) => {
         console.log(payload, "sendChatMessage")
       })
   }
})

export const { sendMessage, handleIsopenChat } = messengerSlice.actions
export default messengerSlice.reducer;