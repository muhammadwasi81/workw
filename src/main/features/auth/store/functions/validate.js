import { message } from "antd";
 
export function ValidateFunction (resCode, resMessage) {
    if (resCode === 1001) {
        return   message.success(resMessage)
    } else  {
        return message.error(resMessage)
    }
}