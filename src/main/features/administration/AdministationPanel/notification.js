import { message as notiMessage } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetError,
  resetSuccess,
} from "../../../../services/slices/notificationSlice";

export const AdminNotification = () => {
  const { success, error, message } = useSelector(
    (state) => state.notificationSlice
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      notiMessage.success(message, 2);
      dispatch(resetSuccess());
    } else if (error) {
      notiMessage.error(message, 2);
      dispatch(resetError());
    }
  }, [success, error, message]);

  return null;
};
