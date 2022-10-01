import { ResponseResultError, ResponseResultSuccess } from "../../../../../utils/api/ResponseResult";
import Config from "../../../../../utils/services/MasterConfig";
import { responseCode as responseCodeEnum } from "../../../../../services/enums/responseCode";
import { STRINGS } from "../../../../../utils/base";



export const addStickyNotesService=async(request)=>{
    try {
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/StickyNotes/SaveStickyNotes`, request);
		if (responseCode === responseCodeEnum.Success) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}   
}
