import Config from "../../../../utils/services/MasterConfig";
import {ResponseResult, ResponseType} from "../../../../utils/api/ResponseResult";

export const saveCreatePost = async (request) => {
    try {
        const {responseCode, data, message} = await Config.post(`api/Feed/AddFeed`, request)
        if (responseCode === 1001) {
            return ResponseResult({type: ResponseType.SUCCESS, data: data})
        } else {
            return ResponseResult({type: ResponseType.ERROR, errorMessage: message})
        }
    } catch (e) {
        return ResponseResult({type: ResponseType.ERROR, errorMessage: e})
    }
};