import React, { useEffect, useState ,useContext} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllNotification } from "../store/action";
import NotificationItem from "./NotificationItem";
import './style.css'

import { notificationDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

const defaultFilter = {
    pageNo: 1,
    search: ""
}

export default function Notifications() {

    const { userLanguage } = useContext(LanguageChangeContext);
    const { notificationDictionary } = notificationDictionaryList[userLanguage];

    const dispatch = useDispatch();
    const [filter, setFilter] = useState(defaultFilter);
    const notifcationStatus = useSelector(state => state.responsiveSlice.notifcationStatus);
    const notificationList = useSelector(state => state.notificationSliceNew.notificationList);
    useEffect(() => {
        if (notifcationStatus)
            dispatch(getAllNotification(filter));
    }, [notifcationStatus]);
    return (
        <div className="approval_list_cont" >
            <div className="approval_header" >
                <div className="approval_header_child1">{notificationDictionary.notifications}</div>
                <div className="approval_header_child2" >
                    <div></div>
                    <div>{notificationDictionary.mark}</div>
                </div>
            </div>

            <div className="approval_list" >
                {notificationList.map((item, index) => <NotificationItem item={item} index={index}/>)}
            </div>

        </div>
    )
}