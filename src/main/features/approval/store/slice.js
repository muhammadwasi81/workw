import { createSlice, current, isPending, isRejected } from "@reduxjs/toolkit";

const initialState = {
	approvals: [],
	approvalDetail: {},
	loading: false,
	success: false,
	error: false,
};
const approvalSlice = createSlice({
	name: "Approval",
	initialState,
	reducers: {},
	extraReducers: builder => {},
});

export default approvalSlice.reducer;
