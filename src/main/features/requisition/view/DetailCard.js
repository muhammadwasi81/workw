import React, { useContext, useEffect, useState } from "react";
import { Drawer, Tag, Image, Button, message } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { requisitionDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import RequistionDefaultIcon from "../../../../content/NewContent/requisition/requistion.svg";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { ItemContent, ItemHeader, SingleItem } from "../../../sharedComponents/Card/CardStyle";
import RemarksApproval from "../../../sharedComponents/AppComponents/Approvals/view";
import moment from "moment";
import { GetRequisitionById } from "../store/actions";
import {
    ApprovalsModule,
    ApprovalStatus,
} from "../../../sharedComponents/AppComponents/Approvals/enums";
import CopyToClipboard from "react-copy-to-clipboard";
import { ROUTES } from "../../../../utils/routes";
import { LinkOutlined } from "@ant-design/icons";

function RequisitionDetailCard(props) {
    const { userLanguage } = useContext(LanguageChangeContext);
    const { requisitionDictionary } = requisitionDictionaryList[userLanguage];
    const { Detail } = useSelector((state) => state.requisitionSlice);
    const { user } = useSelector(state => state.userSlice);
    const [updatedStatus, setUpdatedStatus] = useState(null);
    const [copy, setCopy] = useState(false);

    const dispatch = useDispatch();
    
    let { InProcess, Approved, Declined, Resend, Inactive, NotRequired, Cancelled, ApprovalRequired, Hold, NoStatus } = ApprovalStatus
    let userId = user.id


    useEffect(() => {
        props.id && dispatch(GetRequisitionById(props.id));
    }, [props.id]);

    const {
        creator,
        name,
        description,
        image = RequistionDefaultIcon,
        reason,
        status,
        finalApprovers,
        createDate,
        budget,
        id,
        referenceNo,
        members = [],
        approvers,
    } = Detail;

    const localTime = moment.utc(createDate).local().format();

    const handleCancel = (e, payload) => {
        e.preventDefault()
        e.stopPropagation();
        // dispatch(cancelReward(payload));
    }

    const copyfunc = () => {
        setCopy(true);
    };

    const isTablet = false;

    return (
        <>  {copy && message.success("Copied")}
            {Detail.id && (
                <div id={props.id} className="detailedViewComposer">
                    <ItemHeader>
                        <div className="left">
                            <UserInfo
                                avatarSrc={creator?.image}
                                name={creator?.name}
                                Subline={<SublineDesigWithTime designation={creator?.designation ? creator?.designation : ""} time={moment(localTime).fromNow()} />}
                            />
                        </div>
                        <div className="right">
                            <Tag className="IdTag">
                                {referenceNo && referenceNo}</Tag>
                            <StatusTag status={status && status}></StatusTag>
                            <CopyToClipboard
                                text={`${window.location.origin}${ROUTES.REQUISITION.APPLYREQUISITION}/${id}`}
                                onCopy={copyfunc}
                            >
                                <Tag className="LinkTag ThemeBtn">
                                    <LinkOutlined /> {"Copy Link"}
                                </Tag>
                            </CopyToClipboard>
                        </div>
                    </ItemHeader>
                    <ItemContent className="flex">
                        <div className="description w-full">
                            <p>{description}</p>
                        </div>
                        <div className="attachmentBox">
                            <Image preview={false} width={60} height={60} src={image === "" ? RequistionDefaultIcon : image} />
                        </div>
                    </ItemContent>
                    <div className="cardSections">
                        <div className="cardSectionItem">
                            <div className="cardSection__title">{requisitionDictionary.Budget}</div>
                            <div className="cardSection__body">{budget}</div>
                        </div>
                        <div className="cardSectionItem">
                            <div className="cardSection__title">{requisitionDictionary.name}</div>
                            <div className="cardSection__body">
                                {name}
                            </div>
                        </div>
                        <div className="cardSectionItem">
                            <div className="cardSection__title">{requisitionDictionary.reason}</div>
                            <div className="cardSection__body">
                                {reason}
                            </div>
                        </div>
                        <div className="cardSectionItem">
                            <div className="cardSection__title">{requisitionDictionary.approvers}</div>
                            <div className="cardSection__body">
                                {approvers &&
                                    <Avatar
                                        isAvatarGroup={true}
                                        isTag={false}
                                        heading={"approvers"}
                                        membersData={approvers ? approvers : []}
                                        text={"Approvers"}
                                        image={"https://joeschmoe.io/api/v1/random"}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                    <RemarksApproval
                        module={ApprovalsModule.RequisitionApproval}
                        status={status}
                        onStatusChanged={statusChanged => { setUpdatedStatus(statusChanged) }}
                        data={approvers}
                        title={requisitionDictionary.approvers}
                    />
                    <RemarksApproval
                        module={ApprovalsModule.RequisitionFinalApproval}
                        status={status}
                        onStatusChanged={statusChanged => {
                            setUpdatedStatus(statusChanged)
                            console.log(statusChanged)
                        }
                        }
                        data={finalApprovers}
                        title={requisitionDictionary.FinalApprovers}
                    />
                </div>
            )}
        </>
    );
}

export default RequisitionDetailCard;
