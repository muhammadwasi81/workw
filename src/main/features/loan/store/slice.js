import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addLoan, getAllLoan, getLoanById } from "./actions";
import moment from "moment";
import {loanPurposeEnum} from "../enum";

const initialState = {
	loans: [],
	loadingData: false,
	loader: true,
	loanDetail: null,
	loanForm:{
		id : "",
		amount: 0,
		deduction:0,
		loanTenure: 0,
		description: "",
		deadline:new Date(),
		purposeId: loanPurposeEnum.Personal,
		imageId: "",
		userId:"",
		approvers: []
	}
};

const loanSlice = createSlice({
	name: "loan",
	initialState,
	reducers: {
		setLoanForm:(state,action)=>{
			state.loanForm=action.payload
		}
	},
	extraReducers: builder => {
		builder.addCase(getAllLoan.fulfilled, (state, action) => {
			state.loans = action.payload ? action.payload : [];
			state.loader = false;
		});

		builder.addCase(getLoanById.fulfilled, (state, action) => {

			state.loanDetail = action.payload.data;
		});

		builder.addCase(addLoan.fulfilled, (state, { payload }) => {
				state.loanData = payload;
				return state;
			})
			.addMatcher(isPending(...[getAllLoan]), state => {
				state.loader = true;
			})
			.addMatcher(isRejected(...[getAllLoan]), state => {
				state.loader = true;
			});
	},
});

export const {setLoanForm} = loanSlice.actions;
export default loanSlice.reducer;
