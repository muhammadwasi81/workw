import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

const initialState = { lists: [] };

const trelloSlice = createSlice({
	name: "trello",
	initialState,
	reducers: {
		addList(state, { payload }) {
			const { id, title } = payload;
			state.lists.push({ ...payload });
			state[id] = { _id: id, title, cards: [] };
		},
		changeBackgroundColor(state, { payload }) {
			console.log("bg color", state, payload);
			// const index = state.lists.findIndex(payload.list.id);
			const foundIndex = state.lists.findIndex(
				x => x.id == payload.list.id
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
		addListCard(state, { payload }) {
			const { listId, cardText, cardId } = payload;
			state[listId] = {
				...state[listId],
				cards: [...state[listId].cards, cardId],
			};
			state[cardId] = { text: cardText, _id: cardId };
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
} = trelloSlice.actions;

export default trelloSlice.reducer;
