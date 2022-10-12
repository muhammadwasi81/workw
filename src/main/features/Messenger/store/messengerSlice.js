import { createSlice } from "@reduxjs/toolkit"
import { STRINGS } from "../../../../utils/base";
import { createChat, getAllChats, getAllMessages, searchConversation, sendChatMessage } from "./actions";


const initialState = {
   mobileIsopenChat: null,
   currentMessenger: {
      chatId: STRINGS.DEFAULTS.guid,
      profileImage: "",
      name: "",
      chatType: 1,
      members: []
   },
   currentChatBoxes: [],
   MessengerList: {},
   Conversations: null
};

export const messengerSlice = createSlice({
   name: 'MessengerChat',
   initialState: initialState,
   reducers: {
      receiveChatMessage: (state, { payload }) => {
         const { chatMessage } = payload;
         state.MessengerList[chatMessage.chatId] = state.MessengerList[chatMessage.chatId] ?
            [...state.MessengerList[chatMessage.chatId], chatMessage] : [chatMessage]
      },
      handleIsopenChat: (state, action) => {
         state.mobileIsopenChat = action.payload
      },
      handleMessengerItemClick: (state, action) => {
         console.log("Payload", action.payload)
         state.currentMessenger = action.payload
      },
      handleAppendMessage: (state, action) => {
         // state.currentMessenger = action.payload
      },
   },

   extraReducers: (builder) => {
      builder
        
         .addCase(searchConversation.fulfilled, (state, { payload }) => {
            state.Conversations = payload.data
         })
         .addCase(sendChatMessage.fulfilled, (state, { payload }) => {
            state.MessengerList[state.currentMessenger.chatId] = [...state.MessengerList[state.currentMessenger.chatId], payload.data]
         })
         .addCase(getAllMessages.fulfilled, (state, { payload }) => {
            state.MessengerList[state.currentMessenger.chatId] = payload.data
         })


         .addCase(getAllChats.fulfilled, (state, { payload }) => {
            console.log(payload, "payload")
            state.Conversations = payload
         })
         .addCase(createChat.fulfilled, (state, { payload }) => {
            state.Conversations = [
               ...(state.Conversations ? state.Conversations : []), 
               payload] 
         })
   }
})

export const { handleIsopenChat, handleMessengerItemClick, receiveChatMessage } = messengerSlice.actions
export default messengerSlice.reducer;