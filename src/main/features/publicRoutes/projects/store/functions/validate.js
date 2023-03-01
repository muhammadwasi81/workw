import { message } from "antd";

export function ValidateFunction(resCode, resMessage) {
  if (resCode === 1001) {
    return;
  } else {
    return message.error(resMessage);
  }
}
