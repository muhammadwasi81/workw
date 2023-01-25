import React, { useEffect, useState ,useContext} from "react";
import { useDispatch } from "react-redux";
import { messaging } from "../../../../../firebase/initFirebase";
import { onMessage } from "firebase/messaging";
import { handleIncomingCall } from "../../../calling/store/slice";

export default function FcmNotification() {

    const dispatch = useDispatch();
    useEffect(() => {
        onMessage(messaging, (payload) => {
            console.log('Message received.', payload);
            if (payload) {
              dispatch(handleIncomingCall({
                data: payload
              }));
            }
          });
    }, []);

    return (
       <></>
    )
}