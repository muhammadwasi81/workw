import React, { useContext, useEffect } from "react";
import { Tag, Image, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { documentDictionaryList } from "../../../localization/index";
import UserInfo from "../../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../../../sharedComponents/Tag/StatusTag";
import Avatar from "../../../../../sharedComponents/Avatar/avatar";
import { ItemHeader, SingleItem } from "../../../../../sharedComponents/Card/CardStyle";
import moment from "moment";
import { GetDocumentById } from "../../../store/actions";
import { getIconByExtensionType } from "../../../constant/helpers";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { DOCUMENT_ENUM } from "../../../constant";
import Approvals from "../../../../../sharedComponents/AppComponents/Approvals/view";
import { ApprovalsModule } from "../../../../../sharedComponents/AppComponents/Approvals/enums";

function DetailCard(props) {
    const { userLanguage } = useContext(LanguageChangeContext);
    const { documentDictionary } = documentDictionaryList[userLanguage];
    const dispatch = useDispatch()

    const ducomentDetail = useSelector((state) => state.documentSlice.documentDetail);
    let { name, documentType, creator, createDate, description, id, path, members, approvers, image, extensionTypeId, approverStatus } = ducomentDetail
    let { DUCOMENT_TYPE } = DOCUMENT_ENUM;
    useEffect(() => {
        props.id && dispatch(GetDocumentById(props.id))
    }, [props.id]);


    return (
        <>
            {ducomentDetail.id && (
                <SingleItem>
                    <ItemHeader>
                        <div className={"item-header"}>
                            <div className="left">
                                <UserInfo
                                    avatarSrc={creator.image}
                                    name={creator.name}
                                    Subline={
                                        <SublineDesigWithTime
                                            designation={creator.designation}
                                            time={moment().format("DD/MM/YYYY")}
                                        />
                                    }
                                />
                            </div>
                            <div className="right">
                                <StatusTag status={2}></StatusTag>
                            </div>
                        </div>
                    </ItemHeader>

                    <div className="doc_detail_body">
                        <div className="doc_detail_content">
                            <div className="doc_detail_body_head">
                                <div className="doc_detail_title">
                                    {name}
                                </div>
                            </div>
                            <div className="doc_detail_desc">
                                <p>
                                    {description}
                                </p>
                            </div>

                            <div className="ListItemInner">
                                <div className="ItemDetails">
                                    <div className="innerDiv">
                                        {
                                            members.length ?
                                                <div>
                                                    < span className="text-black font-extrabold smallHeading">{"Members"}</span>
                                                    <Avatar
                                                        isAvatarGroup={true}
                                                        isTag={false}
                                                        heading={"Members"}
                                                        membersData={members}
                                                        text={"Danish"}
                                                        image={"https://joeschmoe.io/api/v1/random"}
                                                    />
                                                </div> : ""
                                        }
                                    </div>
                                    <div className="innerDiv">
                                        {
                                            approvers.length ?
                                                <div>
                                                    <span className="text-black font-extrabold smallHeading">{documentDictionary.Approvers}</span>
                                                    <Avatar
                                                        isAvatarGroup={true}
                                                        isTag={false}
                                                        heading={"approvers"}
                                                        membersData={approvers ? approvers : []}
                                                        text={"Danish"}
                                                        image={"https://joeschmoe.io/api/v1/random"}
                                                    />
                                                </div>
                                                : ""
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="doc_detail_media">
                            <div className="d_ShortCard_Child2">
                                <img
                                    alt=""
                                    src={documentType === DUCOMENT_TYPE.image && path ?
                                        path : getIconByExtensionType(documentType, extensionTypeId)}
                                />
                            </div>
                            <div className="downloadBtn">
                                {
                                    documentType === DUCOMENT_TYPE.attachment ?
                                        <Button className="ThemeBtn downloadBtn">{documentDictionary.Download}</Button> : ""
                                }
                            </div>
                        </div>
                    </div>
                    <Approvals
                        title={"dddd"}
                        module={ApprovalsModule.CustomApproval}
                        data={approvers}
                        onStatusChanged={() => { }}
                                status={approverStatus}
                    />
                </SingleItem >
            )}
        </>
    );
}

export default DetailCard;
