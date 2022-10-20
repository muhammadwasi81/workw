import { createSlice } from "@reduxjs/toolkit"
import { createGuid, STRINGS } from "../../../../utils/base";
import { createChat, getAllChats, getAllMessages, searchConversation, sendChatMessage } from "./actions";

const defaultCurrentMessenger = {
   chatId: STRINGS.DEFAULTS.guid,
   profileImage: "",
   name: "",
   chatType: 1,
   members: []
};
const initialState = {
   mobileIsopenChat: null,
   currentMessenger: defaultCurrentMessenger,
   currentChatBoxes: [],
   MessengerList: {},
   Conversations: [
      {
         id: createGuid(),
         imageId: "",
         image: "",
         name: "Aqib Memon",
         chatWith: {
            name: "Aqib Memon",
            image: "",
         },
      },
      {
         id: createGuid(),
         imageId: "",
         image: "",
         name: "Salman Ahmed",
         chatWith: {
            name: "Salman Ahmed",
            image: "",
         },
      },
      {
         id: createGuid(),
         imageId: "",
         image: "",
         name: "Danish Khan",
         chatWith: {
            name: "Danish Khan",
            image: "",
         },
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
      handleIsopenChat: (state, { payload }) => {
         state.mobileIsopenChat = payload
      },
      handleMessengerItemClick: (state, { payload }) => {
         state.currentMessenger = payload
      },
      handleRemoveChatBox: (state, { payload }) => {
         let updatedChatBoxes = state.currentChatBoxes.filter(item => item.chatId !== payload.chatId);
         state.currentChatBoxes = updatedChatBoxes;
      },
      handleMinimizeChatBox: (state, { payload }) => {
         let { index } = payload;
         let currentChatBox = state.currentChatBoxes[index].isMinimize;
         let updatedStatus = currentChatBox === 0 ? 1 : currentChatBox === 1 ? 2 : 1;
         state.currentChatBoxes[index].isMinimize = updatedStatus;
         state.currentChatBoxes[index].isExtend = 0;
      },
      handleExpendChatBox: (state, { payload }) => {
         let { index } = payload;
         let currentChatBox = state.currentChatBoxes[index].isExtend;
         let updatedStatus = currentChatBox === 0 ? 1 : currentChatBox === 1 ? 2 : 1;
         state.currentChatBoxes[index].isExtend = updatedStatus;
         state.currentChatBoxes[index].isMinimize = 0;
      },
      handleChatBoxAppend: (state, { payload }) => {
         console.log("Payload", payload);
         let updatedChatBoxes = [...state.currentChatBoxes];
         updatedChatBoxes = updatedChatBoxes.filter(item => item.chatId !== payload.chatId);
         updatedChatBoxes = [...updatedChatBoxes, {
            ...payload,
            isExtend: 0,
            isMinimize: 0
         }]
         state.currentChatBoxes = updatedChatBoxes
      },
      handleAppendMessage: (state, { payload }) => {
         let currentChatMessages = state.MessengerList[payload.chatId] ?
            state.MessengerList[payload.chatId] : [];
         // Append Last Message in MessengerList
         state.MessengerList[payload.chatId] = [...currentChatMessages, payload]
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
            ];
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

export const { 
   handleIsopenChat, 
   handleMessengerItemClick, 
   receiveChatMessage, 
   handleAppendMessage, 
   handleChatBoxAppend, 
   handleRemoveChatBox, 
   handleMinimizeChatBox,
   handleExpendChatBox
 } = messengerSlice.actions
export default messengerSlice.reducer;