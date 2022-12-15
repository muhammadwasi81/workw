import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { jsonToFormData, STRINGS } from "../../../../utils/base";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { addDocument_dto } from "../services/dto";
import {
	addDocumentService,
	getAllDocumentListService,
	getAllDocumentService,
	moveDocumentService,
	getDocumentByIdService,
	addDirectoryService,
	moveDirectoryService,
} from "../services/service";
import { updateMoveDocument } from "./slice";

export const moveDirectory = createAsyncThunk(
	"document/moveDirectory",
	async (payload, { rejectWithValue, dispatch }) => {
		const response = await moveDirectoryService(payload);
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
				return response.data;
			default:
				return;
		}
	}
);

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
				return response.data;
			default:
				return;
		}
	}
);

export const addDocument = createAsyncThunk(
	"document/addDocument",
	async ({ payload, form }, { rejectWithValue, dispatch }) => {
		let request = addDocument_dto(payload);
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
				console.log("action", response)
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

export const UpdateDocumentById = createAsyncThunk(
	"document/UpdateDocumentById",
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



// NEW
// --=--=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

export const addDirectory = createAsyncThunk(
	"document/addDirectory",
	async ({ payload, form }, { rejectWithValue, dispatch }) => {
		// const formdataRequest = jsonToFormData(payload);
		const response = await addDirectoryService(payload);
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
						message: "Folder Create Successfully",
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