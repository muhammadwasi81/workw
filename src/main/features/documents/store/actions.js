import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { jsonToFormData, STRINGS } from "../../../../utils/base";
import { openNotification } from "../../../../utils/Shared/store/slice";
import {
	addDocumentService,
	getAllDocumentListService,
	getAllDocumentService,
	moveDocumentService,
	getDocumentByIdService,
} from "../services/service";
import { updateMoveDocument } from "./slice";

const addDocument_DBO = data => {
	return {
		name: data.name ? data.name : "",
		description: data.description ? data.description : "",
		privacyId: data.privacyId ? data.privacyId : 1,
		referenceId: data.referenceId
			? data.referenceId
			: STRINGS.DEFAULTS.guid,
		referenceType: data.referenceType ? data.referenceType : 1,
		parentId: data.parentId ? data.parentId : STRINGS.DEFAULTS.guid,
		documentType: data.documentType ? data.documentType : "",
		approvers: data.approvers ? data.approvers : [],
		members: data.members ? data.members : [],
		attachments: data.attachments ? data.attachments : [],
		approvers: data.approvers ? data.approvers : [],
	};
};

export const moveDocument = createAsyncThunk(
	"document/moveDocument",
	async (payload, { rejectWithValue, dispatch }) => {
		const response = await moveDocumentService(payload);
		switch (response.type) {
			case ResponseType.ERROR:
				dispatch(
					openNotification({
						message: "Error " + response.errorMessage,
						type: "error",
					})
				);
				return rejectWithValue(response.errorMessage);
			case ResponseType.SUCCESS:
				dispatch(updateMoveDocument(payload));
				// dispatch(openNotification({
				//   message: "Document Moved Successfully",
				//   type: "success",
				//   duration: 2
				// }))
				return response.data;
			default:
				return;
		}
	}
);

export const addDocument = createAsyncThunk(
	"document/addDocument",
	async ({ payload, form }, { rejectWithValue, dispatch }) => {
		let request = addDocument_DBO(payload);
		const formdataRequest = jsonToFormData(request);

		const response = await addDocumentService(formdataRequest);
		switch (response.type) {
			case ResponseType.ERROR:
				dispatch(
					openNotification({
						message: response.errorMessage,
						type: "error",
					})
				);
				return rejectWithValue(response.errorMessage);
			case ResponseType.SUCCESS:
				form.resetFields();
				dispatch(
					openNotification({
						message: "Document Create Successfully",
						type: "success",
						duration: 2,
					})
				);
				return response.data;
			default:
				return;
		}
	}
);

export const getAllDocumentList = createAsyncThunk(
	"document/getAllDocumentList",
	async (request, { rejectWithValue }) => {
		console.log(request, "REQUEST");
		const response = await getAllDocumentListService(request);
		switch (response.type) {
			case ResponseType.ERROR:
				return rejectWithValue(response.errorMessage);
			case ResponseType.SUCCESS:
				return response.data;
			default:
				return;
		}
	}
);

export const getAllDocument = createAsyncThunk(
	"document/getAllDocument",
	async (request, { rejectWithValue }) => {
		console.log(request, "REQUEST");
		const response = await getAllDocumentService(request);
		switch (response.type) {
			case ResponseType.ERROR:
				return rejectWithValue(response.errorMessage);
			case ResponseType.SUCCESS:
				return response.data;
			default:
				return;
		}
	}
);

export const GetDocumentById = createAsyncThunk(
	"document/getDocumentById",
	async (request, { rejectWithValue }) => {
		console.log(request, "REQUEST");
		const response = await getDocumentByIdService(request);
		switch (response.type) {
			case ResponseType.ERROR:
				return rejectWithValue(response.errorMessage);
			case ResponseType.SUCCESS:
				return response.data;
			default:
				return;
		}
	}
);
