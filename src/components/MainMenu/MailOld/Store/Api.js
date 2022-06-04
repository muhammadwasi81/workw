import {createAsyncThunk} from "@reduxjs/toolkit";
import {MailServices} from "../../../../utils/services/MailServices/MailServices";

export const getMailFolders = createAsyncThunk(
    "mail/getMailFolders",
    async (_, {rejectWithValue}) => {
        try {
            const response = await MailServices.getMenuFolders();
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const getAllMail = createAsyncThunk(
    "mail/getAllMail",
    async (objData, {rejectWithValue}) => {
        try {
            const response = await MailServices.getAllEmail(objData);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const refreshMail = createAsyncThunk(
    "mail/refreshMail",
    async (objData, {rejectWithValue}) => {
        try {
            const response = await MailServices.getAllEmail(objData);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const getMailById = createAsyncThunk(
    "mail/getMailById",
    async (params, rejectWithValue) => {
        try {
            const response = await MailServices.getMailById(params);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const changeMailSeenFlag = createAsyncThunk(
    "mail/changeMailSeenFlag",
    async (params, rejectWithValue) => {
        try {
            const response = await MailServices.changeMailSeenFlag(params);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const moveEmailToTrash = createAsyncThunk(
    "mail/moveEmailToTrash",
    async (params, rejectWithValue) => {
        try {
            const response = await MailServices.moveEmailToTrash(params);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

export const deleteEmail = createAsyncThunk(
    "mail/deleteEmail",
    async (id, rejectWithValue) => {
        try {
            const response = await MailServices.deleteEmail(id);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)
export const composeMail = createAsyncThunk(
    "mail/compose",
    async (data, rejectWithValue) => {
        try {
            const response = await MailServices.composeMail(data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)