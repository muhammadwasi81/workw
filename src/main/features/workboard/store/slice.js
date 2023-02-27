import { createSlice, current, isPending, isRejected } from "@reduxjs/toolkit";
import { configConsumerProps } from "antd/lib/config-provider";
import {
  addWorkBoard,
  addWorkBoardSectionTodo,
  addWorkBoardTodoLabel,
  getAllWorkBoard,
  getAllWorkBoardTodoPaging,
  getWorkboardById,
  getWorkBoardTodoById,
  moveWorkBoardSection,
  moveWorkBoardTodo,
  removeWorkBoardTodo,
  removeWorkBoardTodoImage,
  removeWorkBoardTodoLabel,
  updateWorkBoard,
  updateWorkBoardSectionColorCode,
  updateWorkBoardSectionTitle,
  updateWorkBoardTodoDesc,
  updateWorkBoardTodoDueDate,
  updateWorkBoardTodoImage,
  updateWorkBoardTodoTitle,
  getWorkBoardMemberAction,
  addWorkBoardMember,
  addWorkBoardTodoMemberAction,
  removeWorkBoardMember,
  removeToDoMemebr,
} from "./action";

const initialComposerData = {
  name: "",
  description: "",
  members: [],
  attachments: [],
  privacyId: 1,
  image: "",
};

const initialState = {
  lists: [],
  cardDetail: null,
  addMember: null,
  addMemberCardId: "",
  memberDefaulIds: [],
  showDateModal: false,
  loader: false,
  success: false,
  error: false,
  workboardsList: [],
  workboardDetail: null,
  isComposerEdit: false,
  isComposerVisible: false,
  composerData: initialComposerData,
  workBoardSections: [],
  todoDetail: null,
  todoDueDateDetail: null,
  sectionTableData: [],
  addMemberModal: false,
  workBoardMembers: [],
  memberModal: false,
  removeMemberSucess: false,
};

const trelloSlice = createSlice({
  name: "trello",
  initialState,
  reducers: {
    addMember: (state, { payload }) => {
      state.addMemberModal = payload;
    },
    addList(state, { payload }) {
      // console.log("add card");
      const { id, title } = payload;
      state.lists.push({ ...payload });
      state[id] = { _id: id, title, cards: [] };
    },
    addListCard(state, { payload }) {
      // console.log("add list card");
      const { listId, cardText, cardId } = payload;
      state[listId] = {
        ...state[listId],
        cards: [...state[listId].cards, cardId],
      };
      state[cardId] = {
        text: cardText,
        _id: cardId,
        members: [],
        cardDueDate: { dueDate: "", isCardCompleted: false },
      };
    },
    addListCardMembers(state, { payload }) {
      const { cardId, members } = payload;

      state[cardId] = {
        ...state[cardId],
        members,
      };
      state.memberDefaulIds = [];
    },
    addListCardDueDate(state, { payload }) {
      // console.log("payload due date", payload);
      const { cardId, dueDate, isCardCompleted } = payload;
      state[cardId] = {
        ...state[cardId],
        cardDueDate: {
          dueDate,
          isCardCompleted,
        },
      };
    },
    changeBackgroundColor(state, { payload }) {
      const foundIndex = state.lists.findIndex((x) => x.id === payload.list.id);
      let tempList = state.lists;
      tempList.splice(foundIndex, 1, {
        ...state.lists[foundIndex],
        color: payload.color,
      });
      state.lists = tempList;
      // state[payload.list.id] = {
      // 	_id: payload.list.id,
      // 	title: payload.list.title,
      // 	color: payload.color,
      // 	cards: [],
      // };
      // state.lists[foundIndex] = {
      // 	...state.lists[foundIndex],
      // 	color: payload.color,
      // };
    },
    handleSectionBgColor(state, { payload }) {
      const { sectionId, colorCode } = payload;
      const workBoardSectionIndex = state.workboardDetail.sections.findIndex(
        (section) => section.id === sectionId
      );
      state.workboardDetail.sections[
        workBoardSectionIndex
      ].colorCode = colorCode;
    },
    changeListTitle(state, { payload }) {
      const { id, title } = payload;
      state[id] = { ...state[id], title };
    },
    handleSectionTitle(state, { payload }) {
      const { sectionId, title } = payload;
      const workBoardSectionIndex = state.workboardDetail.sections.findIndex(
        (section) => section.id === sectionId
      );
      state.workboardDetail.sections[workBoardSectionIndex].name = title;
    },

    changeListCardText(state, { payload }) {
      // console.log("change card text slice", state, payload);
      const { cardId, cardText } = payload;
      // console.log("", state[cardId]);
      state[cardId] = { ...state[cardId], text: cardText };
    },
    deleteListCard(state, { payload }) {
      console.log("delete list card slice", state, payload);
    },
    deleteList(state, { payload }) {
      console.log("delete card", state, payload);
    },
    moveCard(state, { payload }) {
      const { oldCardIndex, newCardIndex, sourceListId, destListId } = payload;
      // // Move within the same list
      if (sourceListId === destListId) {
        const newCards = Array.from(state[sourceListId].cards);
        const [removedCard] = newCards.splice(oldCardIndex, 1);
        newCards.splice(newCardIndex, 0, removedCard);
        state[sourceListId] = {
          ...state[sourceListId],
          cards: newCards,
        };
        return;
      }
      // // Move card from one list to another
      const sourceCards = Array.from(state[sourceListId].cards);

      const removedCard = sourceCards.splice(oldCardIndex, 1);
      const destinationCards = Array.from(state[destListId].cards);
      destinationCards.splice(newCardIndex, 0, removedCard);

      state[sourceListId] = {
        ...state[sourceListId],
        cards: sourceCards,
      };
      state[destListId] = {
        ...state[destListId],
        cards: destinationCards,
      };
    },
    moveList(state, { payload }) {
      const { oldListIndex, newListIndex } = payload;
      const newLists = Array.from(state.lists);
      const [removedList] = newLists.splice(oldListIndex, 1);
      newLists.splice(newListIndex, 0, removedList);
      state.lists = newLists;
    },
    moveSection(state, { payload }) {
      const { oldListIndex, newListIndex } = payload;
      const newLists = Array.from(state.workboardDetail.sections);
      const [removedList] = newLists.splice(oldListIndex, 1);
      newLists.splice(newListIndex, 0, removedList);
      state.workboardDetail.sections = newLists;
    },
    moveSectionTodo(state, { payload }) {
      const { oldCardIndex, newCardIndex, sourceListId, destListId } = payload;

      // // Move within the same list
      const sourceSection = state.workboardDetail.sections.find(
        (section) => section.id === sourceListId
      );
      const destinationsSection = state.workboardDetail.sections.find(
        (section) => section.id === destListId
      );
      const sectionIndex = state.workboardDetail.sections.findIndex(
        (section) => section.id === sourceListId
      );

      if (sourceListId === destListId) {
        const newTodos = sourceSection.todos;
        const [removedCard] = newTodos.splice(oldCardIndex, 1);
        newTodos.splice(newCardIndex, 0, removedCard);

        state.workboardDetail.sections[sectionIndex].todos = newTodos;
        return;
      }
      //move todo from one section to another
      const removedTodo = sourceSection.todos.splice(oldCardIndex, 1);
      destinationsSection.todos.splice(newCardIndex, 0, removedTodo[0]);
    },
    handleCardDetail(state, { payload }) {
      if (payload.type === "open") {
        state.addMemberCardId = payload.cardDetailId;
        state.cardDetail = payload.cardDetailId;
        return;
      }
      state.cardDetail = null;
    },
    openMembersModal(state, { payload }) {
      const { addMember, cardId } = payload;
      state.addMember = addMember;

      // console.log("card id", cardId);
      state.memberDefaulIds = [];
      if (cardId) {
        state.addMemberCardId = cardId;
        if (state[cardId].members.length > 0) {
          let membersId = state[cardId].members.map((mem) => {
            return mem.id;
          });
          state.memberDefaulIds = membersId;
          return;
        }
        state.memberDefaulIds = [];
      } else {
        state.memberDefaulIds = [];
      }
    },
    openDateModal(state, { payload }) {
      const { isDateModalOpen, todoId, sectionId } = payload;
      if (todoId && sectionId) {
        const workBoardSectionIndex = state.workboardDetail.sections.findIndex(
          (section) => section.id === sectionId
        );

        const todoIndex = state.workboardDetail.sections[
          workBoardSectionIndex
        ].todos.findIndex((todo) => todo.id === todoId);

        state.todoDueDateDetail =
          state.workboardDetail.sections[workBoardSectionIndex].todos[
            todoIndex
          ];
      }
      state.showDateModal = isDateModalOpen;
    },
    handleBoardComposer(state, { payload }) {
      state.isComposerEdit = payload.isEdit;
      state.isComposerVisible = payload.isVisible;
    },
    openSectionDetail(state, { payload }) {
      if (payload.type === "open") {
        return;
      }
      state.todoDetail = null;
    },
    updateSectionTodoDesc(state, { payload }) {
      const { todoId, sectionId, description } = payload;
      const workBoardSectionIndex = state.workboardDetail.sections.findIndex(
        (section) => section.id === sectionId
      );
      const todoIndex = state.workboardDetail.sections[
        workBoardSectionIndex
      ].todos.findIndex((todo) => todo.id === todoId);
      state.workboardDetail.sections[workBoardSectionIndex].todos[
        todoIndex
      ].description = description;
    },
    updateWorkBoardTodoLabel(state, { payload }) {
      const { labelObj, sectionId, todoId } = payload;

      const workBoardSectionIndex = state.workboardDetail.sections.findIndex(
        (section) => section.id === sectionId
      );

      const todoIndex = state.workboardDetail.sections[
        workBoardSectionIndex
      ].todos.findIndex((todo) => todo.id === todoId);

      state.workboardDetail.sections[workBoardSectionIndex].todos[
        todoIndex
      ].labels = labelObj;
      state.todoDetail.labels = labelObj;
    },
    updaateWorkboardById(state, { payload }) {
      state.workboardDetail = state.workboardsList.find(
        (list) => list.id === payload
      );
    },
    resetComposerDetail(state, { payload }) {
      state.workboardDetail = null;
      state.isComposerEdit = false;
      state.isComposerVisible = false;
    },
    addWorkBoardMembers(state, { payload }) {
      //TODO: replace the response with existing id object
      const newMembers = state.workboardsList.map((item, i) => {
        if (item.id === payload[0].workBoardId) {
          let members = [...item.members, payload[0]];
          let newItem = {
            ...item,
            members,
          };
          return newItem;
        } else {
          return item;
        }
      });

      state.workboardsList = newMembers;
    },
    
    deleteWorkBoardMember(state, { payload }) {
      const deleteBoardMembers = state.workboardsList.map((item, i) => {
        if (item.id === payload.id) {
          let delMember = item.members.filter(
            (member) => member.memberId !== payload.memberId
          );
          let deleteItem = {
            ...item,
            members: delMember,
          };
          return deleteItem;
        } else {
          return item;
        }
      });
      state.workboardsList = deleteBoardMembers;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addWorkBoard.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
        state.error = false;
        state.workboardsList.unshift(payload.data);
      })
      .addCase(updateWorkBoard.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
        state.error = false;
        const updatedWorkboardIndex = state.workboardsList.findIndex(
          (workboard) => workboard.id === payload.data.id
        );
        state.workboardsList[updatedWorkboardIndex] = payload.data;
      })
      .addCase(getAllWorkBoard.fulfilled, (state, { payload }) => {
        state.workboardsList = payload.data;
        state.loader = false;
        state.error = false;
      })
      .addCase(getWorkboardById.fulfilled, (state, { payload }) => {
        state.workboardDetail = payload.data;
        state.loader = false;
        state.error = false;
      })
      .addCase(moveWorkBoardSection.fulfilled, (state, { payload }) => {
        state.loader = false;
      })
      .addCase(addWorkBoardSectionTodo.fulfilled, (state, { payload }) => {
        state.loader = false;
        const { sectionId } = payload.data;
        const workBoardSectionIndex = state.workboardDetail.sections.findIndex(
          (section) => section.id === sectionId
        );
        state.workboardDetail.sections[workBoardSectionIndex].todos.unshift(
          payload.data
        );
      })
      .addCase(updateWorkBoardSectionColorCode.fulfilled,(state, { payload }) => {
          // state.loader = false;
          console.log(payload,"payloaddd section colorr");
        }
      )
      .addCase(updateWorkBoardSectionTitle.fulfilled, (state, { payload }) => {
        state.loader = false;
      })
      .addCase(getWorkBoardTodoById.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.todoDetail = payload.data;
      })
      .addCase(updateWorkBoardTodoDesc.fulfilled, (state, { payload }) => {
        state.loader = false;
      })
      .addCase(updateWorkBoardTodoTitle.fulfilled, (state, { payload }) => {
        state.loader = false;
        const { data, sectionId } = payload;
        const workBoardSectionIndex = state.workboardDetail.sections.findIndex(
          (section) => section.id === sectionId
        );
        const todoIndex = state.workboardDetail.sections[
          workBoardSectionIndex
        ].todos.findIndex((todo) => todo.id === data.todoId);

        state.workboardDetail.sections[workBoardSectionIndex].todos[
          todoIndex
        ].title = data.title;
      })
      .addCase(updateWorkBoardTodoImage.fulfilled, (state, { payload }) => {
        state.loader = false;

        const { data, id, sectionId } = payload;

        const workBoardSectionIndex = state.workboardDetail.sections.findIndex(
          (section) => section.id === sectionId
        );

        const todoIndex = state.workboardDetail.sections[
          workBoardSectionIndex
        ].todos.findIndex((todo) => todo.id === id);

        state.workboardDetail.sections[workBoardSectionIndex].todos[
          todoIndex
        ].image = data.path;
        state.todoDetail.image = data.path;
      })

      .addCase(updateWorkBoardTodoDueDate.fulfilled, (state, { payload }) => {
        state.loader = false;

        const { data, sectionId } = payload;

        const workBoardSectionIndex = state.workboardDetail.sections.findIndex(
          (section) => section.id === sectionId
        );

        const todoIndex = state.workboardDetail.sections[
          workBoardSectionIndex
        ].todos.findIndex((todo) => todo.id === data.todoId);

        state.workboardDetail.sections[workBoardSectionIndex].todos[
          todoIndex
        ].dueDate = data.dueDate;
        if (state.todoDetail) {
          state.todoDetail.dueDate = data.dueDate;
        }
      })
      .addCase(removeWorkBoardTodoImage.fulfilled, (state, { payload }) => {
        state.loader = false;
        const { id, sectionId } = payload;

        const workBoardSectionIndex = state.workboardDetail.sections.findIndex(
          (section) => section.id === sectionId
        );

        const todoIndex = state.workboardDetail.sections[
          workBoardSectionIndex
        ].todos.findIndex((todo) => todo.id === id);

        state.workboardDetail.sections[workBoardSectionIndex].todos[
          todoIndex
        ].image = "";
        state.todoDetail.image = "";
      })
      .addCase(removeWorkBoardTodo.fulfilled, (state, { payload }) => {
        state.loader = false;
        const { id, sectionId } = payload;
        const workBoardSectionIndex = state.workboardDetail.sections.findIndex(
          (section) => section.id === sectionId
        );
        state.workboardDetail.sections[
          workBoardSectionIndex
        ].todos = state.workboardDetail.sections[
          workBoardSectionIndex
        ].todos.filter((todo) => todo.id !== id);
      })
      .addCase(addWorkBoardTodoLabel.fulfilled, (state, { payload }) => {
        const { data, sectionId } = payload;
        const { workBoardTodoId: todoId } = data;
        const workBoardSectionIndex = state.workboardDetail.sections.findIndex(
          (section) => section.id === sectionId
        );

        const todoIndex = state.workboardDetail.sections[
          workBoardSectionIndex
        ].todos.findIndex((todo) => todo.id === todoId);

        state.workboardDetail.sections[workBoardSectionIndex].todos[
          todoIndex
        ].labels.push(data);
        state.todoDetail.labels.push(data);
      })
      .addCase(removeWorkBoardTodoLabel.fulfilled, (state, { payload }) => {
        const { labels, sectionId, todoId } = payload;
        const workBoardSectionIndex = state.workboardDetail.sections.findIndex(
          (section) => section.id === sectionId
        );

        const todoIndex = state.workboardDetail.sections[
          workBoardSectionIndex
        ].todos.findIndex((todo) => todo.id === todoId);

        state.workboardDetail.sections[workBoardSectionIndex].todos[
          todoIndex
        ].labels = labels;
        state.todoDetail.labels = labels;
      })
      .addCase(getAllWorkBoardTodoPaging.fulfilled, (state, { payload }) => {
        state.sectionTableData = payload.data.data;
      })
      .addCase(getWorkBoardMemberAction.fulfilled, (state, action) => {
        state.workBoardMembers = action.payload ? action.payload : [];
      })
      
      .addCase(addWorkBoardMember.fulfilled, (state, { payload }) => {})

      .addCase(addWorkBoardTodoMemberAction.fulfilled, (state, { payload }) => {
        if (state.todoDetail) {
          if (payload.data?.length) {
            let newMembers = [...state.todoDetail.members, payload.data[0]];
            state.todoDetail = {
              ...state.todoDetail,
              members: newMembers,
            };
          }
        }
      })
      .addCase(removeToDoMemebr.fulfilled, (state, { payload }) => {

        console.log(payload,"hajra");
        let newMembers = state.todoDetail.members.filter(
          (member) => member.memberId !== payload
        );

        state.todoDetail = { ...state.todoDetail, members: newMembers };
        //state.removeMemberSucess = true;
      })

      .addCase(removeWorkBoardMember.fulfilled, (state, { payload }) => {
        state.removeMemberSucess = true;
      })
      .addMatcher(isPending(...[removeWorkBoardMember]), (state) => {
        state.removeMemberSucess = false;
      })
      .addMatcher(
        isPending(
          ...[
            addWorkBoard,
            getAllWorkBoard,

            updateWorkBoard,
            moveWorkBoardSection,
            addWorkBoardSectionTodo,
            updateWorkBoardSectionColorCode,
            updateWorkBoardSectionTitle,
            getWorkBoardTodoById,
            updateWorkBoardTodoDesc,
            updateWorkBoardTodoTitle,
            updateWorkBoardTodoImage,
            updateWorkBoardTodoDueDate,
            removeWorkBoardTodoImage,
            moveWorkBoardTodo,
            removeWorkBoardTodo,
            addWorkBoardTodoLabel,
            removeWorkBoardTodoLabel,
            getAllWorkBoardTodoPaging,
          ]
        ),
        (state) => {
          state.loader = true;
          state.success = false;
          state.error = false;
        }
      )
      .addMatcher(isRejected(...[removeWorkBoardMember]), (state) => {
        state.removeMemberSucess = false;
      });

      // .addMatcher(isRejected(...[removeWorkBoardTodoMemberAction]), (state) => {
      //   state.removeMemberSucess = false;
      // });

  },
});

export const {
  addList,
  changeListTitle,
  moveCard,
  moveList,
  addListCard,
  deleteList,
  changeListCardText,
  deleteListCard,
  changeBackgroundColor,
  handleCardDetail,
  openMembersModal,
  addListCardMembers,
  addListCardDueDate,
  openDateModal,
  handleBoardComposer,
  moveSection,
  handleSectionBgColor,
  handleSectionTitle,
  openSectionDetail,
  updateSectionTodoDesc,
  moveSectionTodo,
  updateWorkBoardTodoLabel,
  updaateWorkboardById,
  resetComposerDetail,
  addMember,
  addWorkBoardMembers,
  deleteWorkBoardMember,
  deleteWorkBoardTodoMember,
} = trelloSlice.actions;

export default trelloSlice.reducer;
