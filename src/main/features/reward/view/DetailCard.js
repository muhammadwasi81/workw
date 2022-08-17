import React, { useContext, useEffect, useState } from "react";
import { Drawer, Tag, Image, Button } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { rewardDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import RewardDefaultIcon from "../../../../content/svg/menu/rewardIcon.svg";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { ItemContent, ItemHeader, SingleItem } from "../../../sharedComponents/Card/CardStyle";
import RemarksApproval from "../../../sharedComponents/AppComponents/Approvals/view";
import moment from "moment";
import { cancelReward, GetRewardById } from "../store/actions";
import { ApprovalStatus } from "../../../sharedComponents/AppComponents/Approvals/enums";

function RewardDetailCard(props) {
    const { userLanguage } = useContext(LanguageChangeContext);
    const { rewardDictionary } = rewardDictionaryList[userLanguage];
    const { rewardDetail } = useSelector((state) => state.rewardSlice);
    const { user } = useSelector(state => state.userSlice);
    const dispatch = useDispatch();

    let { InProcess, Approved, Declined, Resend, Inactive, NotRequired, Cancelled, ApprovalRequired, Hold, NoStatus } = ApprovalStatus

    let userId = user.id
    

    useEffect(() => {
        props.id && dispatch(GetRewardById(props.id));
    }, [props.id]);

    const {
        creator,
        name,
        description,
        image = "http://localhost:3000/static/media/rewardIcon.1872d27791f08290da2b85977f16cf07.svg",
        reason,
        category,
        status,
        createDate,
        referenceNo,
        members = [],
        approvers,
    } = rewardDetail;

    const handleCancel = (e, payload) => {
        e.preventDefault()
        e.stopPropagation();
        dispatch(cancelReward(payload));
    }

    const isTablet = false;

    return (
        <>
            {rewardDetail.id && (
                <div id={props.id} className="detailedViewComposer">
                    <ItemHeader>
                        <div className="left">
                            <UserInfo
                                avatarSrc={creator.image}
                                name={creator.name}
                                Subline={<SublineDesigWithTime designation={creator.designation ? creator.designation : ""} time={moment(createDate).fromNow()} />}
                            />
                        </div>
                        <div className="right">
                            <Tag className="IdTag">{referenceNo}</Tag>
                            <StatusTag status={status}></StatusTag>
                            {
                                userId === creator.id ? status != Declined && status != Resend && status != Approved ? <Button className="ThemeBtn" onClick={(e) => handleCancel(e, props.id)}>Cancel</Button> :
                                "" : ""
                            }
                        </div>
                    </ItemHeader>
                    <ItemContent className="flex">
                        <div className="description w-full">
                            <p>{description}</p>
                        </div>
                        <div className="attachmentBox">
                            <Image preview={false} width={60} src={image === "" ? RewardDefaultIcon : image} />
                        </div>
                    </ItemContent>
                    <div className="flex justify-between">
                        <div className="innerCard w-full">
                            <div className="innerCard__header">
                                <div className="left">
                                    Category :
                                    <span className="" style={{ color: "#757D86" }}>
                                        {category}
                                    </span>
                                </div>
                                <div className="right">
                                    <div className="left">
                                        Name :
                                        <span className="" style={{ color: "#757D86" }}>
                                            {name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="innerCard__footer">
                                <div className="left">
                                    Reason :
                                    <span className="" style={{ color: "#757D86" }}>
                                        {reason}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ListItemInner">
                        <div className="ItemDetails">
                            <div className="innerDiv">
                                <span className="text-black font-extrabold smallHeading">{rewardDictionary.rewardTo}</span>
                                <Avatar
                                    isAvatarGroup={true}
                                    isTag={false}
                                    heading={"Members"}
                                    membersData={members}
                                    text={"Danish"}
                                    image={"https://joeschmoe.io/api/v1/random"}
                                />
                            </div>
                        </div>
                    </div>
                    <RemarksApproval data={approvers} title="Approvals" />
                </div>
            )}
        </>
    );
}

export default RewardDetailCard;
