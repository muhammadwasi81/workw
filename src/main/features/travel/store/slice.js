import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addTravel, getAllTravel, getTravelById } from "./actions";

const initialState = {
	travels: [],
	travelDetail: null,
	loader: false,
	success: false,
	isAdded: false,
	error: false,
	attachments: {
		isAttachmentModalOpen: false,
		attachmentsData: [],
	},
};

const travelSlice = createSlice({
	name: "travel",
	initialState,
	reducers: {
		resetTravelDetail(state, { payload }) {
			state.travelDetail = null;
		},
		handleAttachmentModal(state, { payload }) {
			state.attachments.isAttachmentModalOpen = !state.attachments
				.isAttachmentModalOpen;
			state.attachments.attachmentsData = payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(addTravel.fulfilled, (state, { payload }) => {
				state.travels.unshift(payload.data);
				state.loader = false;
				state.success = true;
				state.isAdded = true;
			})
			.addCase(getAllTravel.fulfilled, (state, { payload }) => {
				// console.log("travel fullfilled slice");
				state.loader = false;
				state.success = true;
				const { data, pageNo } = payload;
				if (pageNo === 1) {
					state.travels = data;
				} else {
					state.travels = state.travels.concat(data);
				}
			})
			.addCase(getTravelById.fulfilled, (state, { payload }) => {
				// console.log("travel fullfilled slice");
				state.loader = false;
				state.success = true;

				state.travelDetail = payload.data;
			})
			.addMatcher(
				isPending(...[addTravel, getAllTravel, getTravelById]),
				state => {
					// console.log("travel pending slice");
					state.loader = true;
					state.success = false;
					state.isAdded = false;
				}
			)
			.addMatcher(isRejected(), state => {
				// console.log("travel rejected slice");
				state.loader = false;
				state.success = false;
				state.isAdded = false;
			});
	},
});

export const { resetTravelDetail, handleAttachmentModal } = travelSlice.actions;
export default travelSlice.reducer;
