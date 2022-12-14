import React, { useContext, useEffect } from "react";
import { Tag, Image, Button, Skeleton } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { documentDictionaryList } from "../../../localization/index";
import UserInfo from "../../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../../../sharedComponents/Tag/StatusTag";
import Avatar from "../../../../../sharedComponents/Avatar/avatar";
import { ItemHeader, SingleItem } from "../../../../../sharedComponents/Card/CardStyle";
import moment from "moment";
import { GetDocumentById, UpdateDocumentById } from "../../../store/actions";
import { getIconByExtensionType } from "../../../constant/helpers";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { DOCUMENT_ENUM } from "../../../constant";
import Approvals from "../../../../../sharedComponents/AppComponents/Approvals/view";
import { ApprovalsModule } from "../../../../../sharedComponents/AppComponents/Approvals/enums";
import DocumentStatusTag from "../documentStatusTag/StatusTag";
import { createGuid } from "../../../../../../utils/base";
import DocShortCard from "../shortCard";
import RemarksApproval from "../../../../../sharedComponents/AppComponents/Approvals/view";

function DetailCard(props) {
    const { userLanguage } = useContext(LanguageChangeContext);
    const { documentDictionary } = documentDictionaryList[userLanguage];
    const dispatch = useDispatch()

    const ducomentDetail = useSelector((state) => state.documentSlice.documentDetail);
    const detailLoader = useSelector((state) => state.documentSlice.detailLoader);
    
    useEffect(() => {
        props.id && dispatch(GetDocumentById(props.id))
    }, [props.id]);

    if (detailLoader || !ducomentDetail.id)
    return <Skeleton />;

    let {
        name, documentType, creator,
        createDate, description, id,
        path, members, approvers, image,
        extensionTypeId, status,
        attachments
    } = ducomentDetail
    let { DUCOMENT_TYPE } = DOCUMENT_ENUM;
   
    let documentFile = attachments[0] ? attachments[0] : {};
    documentFile = {
        ...documentFile,
        documentType
    }

    return (
        <>
                <SingleItem>
                    <ItemHeader>
                        <div className="left">
                            <UserInfo
                                avatarSrc={creator.image}
                                name={creator.name}
                                Subline={
                                    <SublineDesigWithTime
                                        designation={creator.designation ? creator.designation : ''}
                                        time={moment(createDate).fromNow()}
                                    />
                                }
                            />
                        </div>
                        <div className="right">
                            {/* <Tag className="IdTag">{referenceNo}</Tag> */}
                            <DocumentStatusTag status={status}></DocumentStatusTag>
                        </div>
                    </ItemHeader>
                    {/* <div className="description w-full pt-3 pb-5 h-[100px]">
                               {description.length > 0 ? (
                                   <p>{description}</p>
                               ) : (
                                   <p> No description </p>
                               )}
                           </div> */}

                    <div className="doc_detail_media">
                        <DocShortCard
                            data={documentFile}
                            handlePreview={() => { }}
                            key={createGuid()}
                            hideControls={true}
                        />
                        <div className="downloadBtn">
                            {
                                documentType === DUCOMENT_TYPE.attachment ?
                                    <Button className="ThemeBtn downloadBtn">{documentDictionary.Download}</Button> : ""
                            }
                        </div>
                    </div>


                    <div className="cardSections">
                        <div className="cardSectionItem">
                            <div className="cardSection__title">Privacy</div>
                            <div className="cardSection__body">{"Public"}</div>
                        </div>
                        <div className="cardSectionItem">
                            <div className="cardSection__title">Create Date</div>
                            <div className="cardSection__body">
                                {moment().format('Do MMM YY')}
                            </div>
                        </div>

                        <div className="cardSectionItem">
                            <div className="cardSection__title">Approvers</div>
                            <div className="cardSection__body">
                                {approvers.length > 0 ?
                                    <Avatar
                                        isAvatarGroup={true}
                                        heading={'approvers'}
                                        membersData={approvers ? approvers : []}
                                    /> :
                                    "N/A"}
                            </div>
                        </div>
                    </div>
                    <RemarksApproval
                        module={ApprovalsModule.DocumentApproval}
                        status={status}
                        onStatusChanged={(statusChanged) => {
                            // setUpdatedStatus(statusChanged);
                            dispatch(UpdateDocumentById(props.id))
                        }}
                        data={approvers}
                        title="Approvers"
                    />
                </SingleItem>
        </>
    );
}

export default DetailCard;
