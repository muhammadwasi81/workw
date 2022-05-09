import { createSlice } from "@reduxjs/toolkit"

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
      msgId: "msg10",
      msgContent: "Hi How are you!"
   },

   {
      id: "YOU",
      msgId: "msg11",
      msgContent: "Hi How are you!"
   },
   {
      id: "ME",

      msgId: "msg12", msgContent: "animation-iteration-count: infinite; animation-iteration-count: infinite animation-iteration-count: infinite; animation-iteration-count: infiniteanimation-iteration-count: infinite; animation-iteration-count: infinite"
   },
   {
      id: "ME",

      msgId: "msg13", msgContent: "Fine and you?"
   },
   {
      id: "YOU",
      msgId: "msg14",
      msgContent: "animation-iteration-count: infinite; animation-iteration-count: infinite animation-iteration-count: infinite; animation-iteration-count: infiniteanimation-iteration-count: infinite; animation-iteration-count: infinite"
   },
   {
      id: "YOU",
      msgId: "msg15",
      msgContent: "Hi How are you!"
   },
]

export const messengerSlice = createSlice({
   name: 'MessengerChat',
   initialState: {
      mobileIsopenChat: null,
      currentMessenger: {},
      currentChatBoxes: [],
      MessengerList: {
         chatId: tempData,
      }
   },
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
   extraReducers: {
      
   }
})

export const { sendMessage, handleIsopenChat } = messengerSlice.actions
export default messengerSlice.reducer;