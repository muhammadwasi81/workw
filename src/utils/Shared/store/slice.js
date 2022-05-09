import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
	getCities,
	getCountries,
	getAllDefaultDesignation,
	getAllUserTypes,
	getAllUserTitles,
	getAllGenders,
	getAllMaritalStatus,
	uploadImage,
	getRewardCategory,
	getAllBussinessFeatures,
	getAllEmployeeTypes,
} from "./actions";

const initialState = {
	countries: [],
	cities: [],
	designations: [],
	userTypes: [],
	userTitles: [],
	genders: [],
	maritalStatus: [],
	isUploaded: false,
	imageIds: [],
	rewardCategories: [],
	loadingData: false,
	loader: false,
	bussinessFeatures: [],
	employeeTypes: [],
};

const sharedSlice = createSlice({
	name: "shared",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getCountries.fulfilled, (state, { payload }) => {
				state.countries = payload.data;
				state.loadingData = false;
			})
			.addCase(getCities.fulfilled, (state, { payload }) => {
				// console.log("city payload data", payload.data);
				state.cities = payload.data;
				state.loadingData = false;
				state.loader = false;
			})
			.addCase(
				getAllDefaultDesignation.fulfilled,
				(state, { payload }) => {
					state.designations = payload.data;
					state.loadingData = false;
				}
			)
			.addCase(getRewardCategory.fulfilled, (state, { payload }) => {
				state.rewardCategories = payload;
				state.loadingData = false;
			})
			.addCase(uploadImage.fulfilled, (state, { payload }) => {
				// console.log("payload", payload.data[0].id);
				state.imageIds.push(payload.data[0].id);
				state.isUploaded = true;
				state.loader = false;
			})
			.addCase(getAllUserTypes.fulfilled, (state, { payload }) => {
				state.userTypes = payload.data;
				state.loadingData = false;
			})
			.addCase(getAllUserTitles.fulfilled, (state, { payload }) => {
				state.userTitles = payload.data;
				state.loadingData = false;
			})
			.addCase(getAllGenders.fulfilled, (state, { payload }) => {
				state.genders = payload.data;
				state.loadingData = false;
			})
			.addCase(getAllMaritalStatus.fulfilled, (state, { payload }) => {
				state.maritalStatus = payload.data;
				state.loadingData = false;
			})
			.addCase(
				getAllBussinessFeatures.fulfilled,
				(state, { payload }) => {
					state.bussinessFeatures = payload.data;
					state.loader = false;
				}
			)
			.addCase(getAllEmployeeTypes.fulfilled, (state, { payload }) => {
				state.employeeTypes = payload.data;
				state.loader = false;
			})

			.addMatcher(isPending(uploadImage), state => {
				state.isUploaded = false;
			})
			.addMatcher(
				isPending(
					...[
						getAllGenders,
						getAllMaritalStatus,
						getCountries,
						getAllDefaultDesignation,
						getAllUserTitles,
						getAllUserTypes,
						getAllEmployeeTypes,
					]
				),
				state => {
					state.loader = true;
				}
			)
			.addMatcher(isPending(getCities), state => {
				state.loadingData = true;
			})
			.addMatcher(isRejected(), state => {
				state.loader = false;
				state.loadingData = false;
				state.isUploaded = false;
			});
	},
});
export default sharedSlice.reducer;
