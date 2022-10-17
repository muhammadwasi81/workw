import { createSlice } from "@reduxjs/toolkit"
import { createGuid, STRINGS } from "../../../../utils/base";
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
   Conversations: [
      {
         id:createGuid()
      }
   ]
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
      handleAppendMessage: (state, { payload }) => {
         let currentChatMessages = state.MessengerList[state.currentMessenger.chatId] ?
            state.MessengerList[state.currentMessenger.chatId] : [];
         // Append Last Message in MessengerList
         state.MessengerList[state.currentMessenger.chatId] = [...currentChatMessages, payload]
         // state.currentMessenger = action.payload
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(searchConversation.fulfilled, (state, { payload }) => {
            state.Conversations = payload.data
         })
         .addCase(getAllMessages.fulfilled, (state, { payload }) => {
            state.MessengerList[state.currentMessenger.chatId] = payload.data
         })


         .addCase(getAllChats.fulfilled, (state, { payload }) => {
            state.Conversations = payload
         })
         .addCase(createChat.fulfilled, (state, { payload }) => {
            state.Conversations = [
               ...(state.Conversations ? state.Conversations : []),
               payload
            ]
         })
         .addCase(sendChatMessage.fulfilled, (state, { payload }) => {
            // let currentChatMessages = state.MessengerList[state.currentMessenger.chatId] ?
            //    state.MessengerList[state.currentMessenger.chatId] : [];
            // // Append Last Message in MessengerList
            // state.MessengerList[state.currentMessenger.chatId] = [...currentChatMessages, {
            //    ...payload,
            //    messageByMe: true
            // }]
         })
   }
})

export const { handleIsopenChat, handleMessengerItemClick, receiveChatMessage, handleAppendMessage } = messengerSlice.actions
export default messengerSlice.reducer;