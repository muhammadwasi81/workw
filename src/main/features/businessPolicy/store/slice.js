import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
	addAccessRole,
	getAccessRoleById,
	getAllAccessRoles,
	updateAccessRoleById,
} from "./action";

const initialState = {
	accessRoles: [],
	singleAccessRole: [],
	loader: false,
	isSingleAccessRoleLoaded: false,
	success: false,
	error: false,
};

const accessRolesSlice = createSlice({
	name: "accessRole",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(addAccessRole.fulfilled, (state, { payload }) => {
				// console.log("payload", payload.data);
				state.accessRoles.push(payload.data);
				state.success = true;
				state.loader = false;
			})
			.addCase(getAllAccessRoles.fulfilled, (state, { payload }) => {
				// console.log("payload", payload);
				state.accessRoles = payload.data;
				state.loader = false;
			})
			.addCase(getAccessRoleById.fulfilled, (state, { payload }) => {
				state.singleAccessRole = payload.data;
				state.isSingleAccessRoleLoaded = false;
				state.loader = false;
			})
			.addCase(updateAccessRoleById.fulfilled, (state, { payload }) => {
				state.accessRoles = state.accessRoles.map(obj => {
					if (obj.id === payload.data.id) {
						return { ...obj, ...payload.data };
					}
					return obj;
				});
				state.success = true;
				state.loader = false;
			})
			// .addCase(addAccessRole.rejected, (state, action) => {
			// 	state.error = true;
			// 	state.loader = false;
			// 	console.log("action", action);
			// })
			.addMatcher(
				isPending(
					...[addAccessRole, getAllAccessRoles, updateAccessRoleById]
				),
				state => {
					state.loader = true;
					state.success = false;
				}
			)
			.addMatcher(isPending(getAccessRoleById), state => {
				state.loader = false;
				state.success = false;
				state.isSingleAccessRoleLoaded = true;
			})
			.addMatcher(
				isRejected(
					...[
						addAccessRole,
						getAllAccessRoles,
						getAccessRoleById,
						updateAccessRoleById,
					]
				),
				state => {
					// console.log("rejected");
					state.loader = false;
					state.success = false;
					state.isSingleAccessRoleLoaded = false;
					state.error = true;
				}
			);
	},
});

export default accessRolesSlice.reducer;
