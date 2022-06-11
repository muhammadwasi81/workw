import Config from "../../../../utils/services/MasterConfig";
import {ResponseResultError, ResponseResultSuccess} from "../../../../utils/api/ResponseResult";

export const saveCreatePost = async (request) => {
    try {
        const {data: {responseCode, data, message}} = await Config.post(`api/Feed/AddFeed`, request)
        if (responseCode === 1001) return ResponseResultSuccess(data)
        return ResponseResultError(message)
    } catch (e) {
        return ResponseResultError(e)
    }
};