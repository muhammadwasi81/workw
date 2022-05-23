import { createSlice } from "@reduxjs/toolkit"
import { STRINGS } from "../../../../utils/base";
import { getAllChats, getAllMessages, sendChatMessage } from "./Api";

const initialState = {
   mobileIsopenChat: null,
   currentMessenger: {
      chatId:STRINGS.DEFAULTS.guid,
      profileImage:"",
      name:"",
      chatType:1,
   },
   currentChatBoxes: [],
   MessengerList: {},
   Conversations:null
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
      handleMessengerItemClick: (state, action) => {
         state.currentMessenger = action.payload
      },
   },


   extraReducers: (builder) => {
      builder
      .addCase(getAllChats.fulfilled, (state, { payload }) => {
         state.Conversations = payload.data
       })
       .addCase(sendChatMessage.fulfilled, (state, { payload }) => {
         state.MessengerList[state.currentMessenger.chatId] = [...state.MessengerList[state.currentMessenger.chatId],payload.data]
         console.log(payload, "sendChatMessage")
       })
       .addCase(getAllMessages.fulfilled, (state, { payload }) => {
         state.MessengerList[state.currentMessenger.chatId] = payload.data
       })
   }
})

export const { sendMessage, handleIsopenChat, handleMessengerItemClick } = messengerSlice.actions
export default messengerSlice.reducer;