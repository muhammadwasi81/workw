import React, {useContext} from 'react';
import {Button, Drawer, notification} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {STRINGS} from "../../../../utils/base";
import {LanguageChangeContext} from "../../../../utils/localization/localContext/LocalContext";
import {dictionaryList} from "../../../../utils/localization/languages";
import {openMailMenuDrawer} from "../Store/MailSlice";
import MenuItem from "../MainLeftBody/MenuItem";
import {useDispatch, useSelector} from "react-redux";
import {MdInbox} from "react-icons/md";
import Demo from "../MainLeftBody/dataTree";

const MobileDrawer = () => {
    const dispatch = useDispatch();
    const {userLanguage} = useContext(LanguageChangeContext);
    const {mail, Direction} = dictionaryList[userLanguage];
    const {mailSlice} = useSelector(state => state);
    const {mailFolderItem, mailDrawerStatus} = mailSlice
    const handleDrawer = (status) => {
        dispatch(openMailMenuDrawer(status));
    }
    const openNotification = () => {
        notification.warning({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            onClick: () => {
                console.log('Notification Clicked!');
            },
            placement: "bottomLeft",
            bottom: 10
        });
    };

    return (
        <Drawer
            placement={Direction === "ltr" ? "left" : "right"}
            size={"sm"}
            onClose={() => handleDrawer(false)}
            visible={mailDrawerStatus}
            style={{top: "40px"}}
            bodyStyle={{padding: "unset"}}
            headerStyle={{padding: "20px 9px"}}
            closeIcon={<CloseOutlined/>}
        >
            <div className="mailMenuSection">

                {/***Mobile Drawer Inbox Only***/}
                {mailFolderItem?.map(({folderPath, unseen}) => (
                    <MenuItem
                        onClick={() => handleDrawer(false)}
                        key={folderPath}
                        path={`${STRINGS.ROUTES.MAIL.DEFAULT}/${folderPath}`}
                        pathName={folderPath}
                        name={"Inbox"}
                        badgeCount={unseen}
                        icon={<MdInbox size={20} color={"#1A5669"}/>}
                        style={{
                            margin: "6px 2px 1px 28px"
                        }}
                    />
                ))}
                {/***Mobile Drawer Inbox Only***/}

                {/***Mobile Drawer Inbox SubChild***/}
                <Demo mailFolderItem={mailFolderItem}/>
                {/***Mobile Drawer Inbox SubChild***/}

            </div>
        </Drawer>
    );
};

export default MobileDrawer;