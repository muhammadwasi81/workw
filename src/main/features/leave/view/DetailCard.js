import React, { useContext, useEffect, useState } from "react";
import { Drawer, Tag, Image, Button } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { leaveDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import DefaultIcon from "../../../../content/NewContent/leaves/Leaves.svg";
import RemarksApproval from "../../../sharedComponents/AppComponents/Approvals/view";
import moment from "moment";
import { cancelReward, GetLeaveById } from "../store/actions";
import { ApprovalStatus } from "../../../sharedComponents/AppComponents/Approvals/enums";
import { getNameForImage } from "../../../../utils/base";
import Approval from "../../../sharedComponents/AppComponents/Approval/Approval";

import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { ItemContent, ItemHeader, SingleItem } from "../../../sharedComponents/Card/CardStyle";

function DetailCard(props) {
    const { userLanguage } = useContext(LanguageChangeContext);
    const { leaveDictionary } = leaveDictionaryList[userLanguage];
    const { user } = useSelector(state => state.userSlice);
    const dispatch = useDispatch();

    let { InProcess, Approved, Declined, Resend, Inactive, NotRequired, Cancelled, ApprovalRequired, Hold, NoStatus } = ApprovalStatus
    let userId = user.id

    useEffect(() => {
        props.id && dispatch(GetLeaveById(props.id));
    }, [props.id]);

    const { leaveDetail } = useSelector((state) => state.leaveSlice);

    const {
        creator,
        startDate,
        createDate,
        endDate,
        description,
        image = DefaultIcon,
        status,
        referenceNo,
        members = [],
        approvers,
    } = leaveDetail;

    var a = moment(startDate);
    var b = moment(endDate);
    const days = a.diff(b, "days");

    // const isTablet = useMediaQuery({ maxWidth: 800 });

    // const handleCancel = (e, payload) => {
    //     e.preventDefault()
    //     e.stopPropagation();
    //     dispatch(cancelReward(payload));
    // }

    return (
        <>
            {leaveDetail.id && (
                <div id={props.id} className="detailedViewComposer">
                    <SingleItem onClick={props.onClick}>
                        <div className="new" id={props.id}></div>
                        <ItemHeader>
                            <div className="left">
                                <UserInfo
                                    avatarSrc={creator.image}
                                    name={creator.name}
                                    Subline={<SublineDesigWithTime designation={creator.designation} time={moment(createDate).format("DD/MM/YYYY")} />}
                                />
                            </div>
                            <div className="right">
                                <Tag className="IdTag">{referenceNo}</Tag>
                                <StatusTag status={status}></StatusTag>
                            </div>
                        </ItemHeader>
                        <ItemContent className="flex description">
                            <div className="w-full">
                                <p>{description}</p>
                            </div>
                            <div className="attachmentBox">
                                <Image preview={false} width={60} src={image === "" ? DefaultIcon : image} />
                            </div>
                        </ItemContent>
                        <div className="cardSections">
                            <div className="cardSectionItem">
                                <div className="cardSection__title">{leaveDictionary.startDate}</div>
                                <div className="cardSection__body">{moment(startDate).format("ddd,MMM DD,YYYY")}</div>
                            </div>
                            <div className="cardSectionItem">
                                <div className="cardSection__title">{leaveDictionary.endDate}</div>
                                <div className="cardSection__body">{moment(endDate).format("ddd,MMM DD,YYYY")}</div>
                            </div>
                            <div className="cardSectionItem">
                                <div className="cardSection__title">{leaveDictionary.days}</div>
                                <div className="cardSection__body">{leaveDictionary.days}</div>
                            </div>
                            <div className="cardSectionItem">
                                <div className="cardSection__title">{leaveDictionary.approvers}</div>
                                <div className="cardSection__body" >
                                    {approvers &&
                                        <Avatar
                                            isAvatarGroup={true}
                                            isTag={false}
                                            heading={"Approvers"}
                                            membersData={approvers}
                                            text={"Approvers"}
                                            image={"https://joeschmoe.io/api/v1/random"}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </SingleItem>
                    <RemarksApproval data={approvers} title="Approvals" /> 
                </div>
            )}
        </>
    );
}

export default DetailCard;
