import {
  ResponseResultError,
  ResponseResultSuccess,
} from "../../../../../utils/api/ResponseResult";
import Config from "../../../../../utils/services/MasterConfig";
import { responseCode as responseCodeEnum } from "../../../../../services/enums/responseCode";
import { STRINGS } from "../../../../../utils/base";

const getAllSticky_SD = (data) => {
  return {
    pageNo: data.pageNo ? data.pageNo : 1,
    pageSize: data.pageSize ? data.pageSize : 20,
    search: data.search ? data.search : "",
    filterSortBy: data.filterSortBy ? data.filterSortBy : 1,
  };
};
export const addStickyNotesService = async (request) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/StickyNotes/SaveStickyNotes`, request);
    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const getAllStickyNotesService = async (data) => {
  let request = getAllSticky_SD(data);
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/StickyNotes/GetAllStickyNotes`, request);
    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
export const deleteStickyNoteService = async (id) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.delete(`api/StickyNotes/RemoveStickyNotes?id=${id}`);
    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
