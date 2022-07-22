const addList = (state, { payload }) => {
	// console.log("add card");
	const { id, title } = payload;
	state.lists.push({ ...payload });
	state[id] = { _id: id, title, cards: [] };
};

export { addList };
