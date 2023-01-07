import React, { useEffect, useState ,useContext} from "react";
import { useDispatch } from "react-redux";
import { openNotification } from "../../../../../utils/Shared/store/slice";
import { messaging } from "../../../../../firebase/initFirebase";
import { onMessage } from "firebase/messaging";

export default function FcmNotification() {

    const dispatch = useDispatch();
    useEffect(() => {
        onMessage(messaging, (payload) => {
            console.log('Message received.', payload);
            if (payload) {
              dispatch(openNotification({
                message: payload.notification.title
              }));
            }
          });
    }, []);

    return (
       <></>
    )
}