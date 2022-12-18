import React, {useContext} from 'react';
import drawerMenuIcon from "../assests/drawerMenuIcon.svg";
import mailEditIcon from "../assests/mailEditIcon.svg";
import {useDispatch, useSelector} from "react-redux";
import {openMailMenuDrawer, openMailMobComposer} from "../Store/MailSlice";
import {LanguageChangeContext} from "../../../../utils/localization/localContext/LocalContext";
import {dictionaryList} from "../../../../utils/localization/languages";
// import SharedButton from "../../../SharedComponent/button";
import {useLocation} from "react-router-dom";
import SharedButton from '../../../sharedComponents/button';

const HeaderMob = () => {
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const api_base = pathname.split("/")[2];

    const {userLanguage} = useContext(LanguageChangeContext);
    const {mail} = dictionaryList[userLanguage];

    const handleDrawer = (status) => {
        dispatch(openMailMenuDrawer(status));
    }
    const handleComposer = (status) => {
        dispatch(openMailMobComposer(status));
    }

    const getHeaderTitle = () => {
        switch (api_base) {
            case "INBOX":
                return mail.menuItem.inbox;
                break;
            case "INBOX.Testing":
                return api_base.split(".")[1]
                return
                break;
            case "INBOX.Notes":
                return api_base.split(".")[1]
                break;
            case "INBOX.Archive":
                return mail.menuItem.archive;
                break;
            case "INBOX.Sent":
                return mail.menuItem.sent;
                break;
            case "INBOX.Trash":
                return mail.menuItem.trash;
                break;
            case "INBOX.Drafts":
                return mail.menuItem.draft;
                break;
            default:
                return api_base;
        }
    }
    return (
        <div className="mail-mob-header">
            <div className="mail-drawer-menu">
                <SharedButton
                    type="default"
                    shape="circle"
                    size="small"
                    onClick={() => handleDrawer(true)}
                    icon={drawerMenuIcon}
                    IconSize={20}
                    style={{border: "none"}}
                />
            </div>

            <div className="mail-drawer-title">
                {getHeaderTitle()}
            </div>

            <div className="mail-drawer-edit">
                <SharedButton
                    type="default"
                    shape="circle"
                    size="small"
                    onClick={() => handleComposer(true)}
                    icon={mailEditIcon}
                    IconSize={18}
                    style={{border: "none"}}

                />
            </div>
        </div>
    );
};

export default HeaderMob;