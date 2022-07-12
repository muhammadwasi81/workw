import { createSlice, current, isPending, isRejected } from "@reduxjs/toolkit";

const initialState = {
	lists: [],
	cardDetail: null,
	addMember: null,
	addMemberCardId: "",
	memberDefaulIds: [],
	showDateModal: false,
};

const trelloSlice = createSlice({
	name: "trello",
	initialState,
	reducers: {
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
			console.log("payload due date", payload);
			const { cardId, dueDate, isCardCompleted } = payload;
			state[cardId] = {
				...state[cardId],
				cardDueDate: {
					dueDate,
					isCardCompleted,
				},
			};
			// console.log("current", current(state));
		},
		changeBackgroundColor(state, { payload }) {
			console.log("bg color", state, payload);
			// const index = state.lists.findIndex(payload.list.id);
			const foundIndex = state.lists.findIndex(
				x => x.id === payload.list.id
			);
			console.log("index", state.lists[foundIndex]);
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
		changeListTitle(state, { payload }) {
			const { id, title } = payload;
			state[id] = { ...state[id], title };
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
			const { oldCardIndex, newCardIndex, sourceListId, destListId } =
				payload;
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
					let membersId = state[cardId].members.map(mem => {
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
			console.log("payload", payload);
			const { isDateModalOpen, cardId } = payload;
			if (cardId) {
				state.addMemberCardId = cardId;
			}
			state.showDateModal = isDateModalOpen;
		},
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
} = trelloSlice.actions;

export default trelloSlice.reducer;
