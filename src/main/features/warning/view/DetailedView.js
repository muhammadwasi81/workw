import React, { useContext } from "react";
import { Button, Drawer, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { warningDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import RemarksApproval from "../../../sharedComponents/AppComponents/Approvals/view";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import DefaultAttachment from "../../../../content/NewContent/warning/warningsDefaultAttachment.svg";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import moment from "moment";
import { ItemContent, ItemHeader } from "../../../sharedComponents/Card/CardStyle";
import { cancelWarning } from "../store/actions";
import { ApprovalStatus } from "../../../sharedComponents/AppComponents/Approvals/enums";

function DetailedView(props) {
  const dispatch = useDispatch()
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels, Direction, complainDictionary, warningDictionary } = warningDictionaryList[userLanguage];
  const { user } = useSelector(state => state.userSlice);
  const { warningDetail } = useSelector((state) => state.warningSlice);

  const { id, creator, description, image = DefaultAttachment, category, status, createDate, members = [], approvers, referenceNo } = warningDetail;
  let { InProcess, Approved, Declined, Resend, Inactive, NotRequired, Cancelled, ApprovalRequired, Hold, NoStatus } = ApprovalStatus
  let userId = user.id

  const isTablet = useMediaQuery({ maxWidth: 800 });

  const handleCancel = (e, payload) => {
    // e.preventDefault()
    // e.stopPropagation();
    console.log(e, payload, "PAYLOADDDD!!!!")
    dispatch(cancelWarning(payload));
}

  return (
    <Drawer
      title={<h1 style={{ fontSize: "20px", margin: 0 }}>{warningDictionary.warning}</h1>}
      width="768"
      placement={(Direction === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")}
      onClose={props.onClose}
      visible={props.visible}
      className="detailedViewComposer drawerSecondary">
      <div className="detailedCard ">
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
              userId === creator.id ? status != Declined && status != Resend && status != Approved ? <Button className="ThemeBtn" onClick={(e) => console.log(props.id, "IDDDDDD")}>Cancel</Button> :
              "" : ""
            }
          </div>
        </ItemHeader>
        <ItemContent className="flex">
          <div className="description w-full">
            <p>{description}</p>
          </div>
        </ItemContent>
        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">{warningDictionary.category}</div>
            <div className="cardSection__body"><Tag className="IdTag">{category ? category : "Default Category"}</Tag></div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{warningDictionary.warningTo}</div>
            <div className="cardSection__body">
              {members &&
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"Members"}
                  membersData={members}
                  text={"Members"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              }
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{warningDictionary.approvers}</div>
            <div className="cardSection__body">
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
      <RemarksApproval data={approvers} title="Approvers" />
    </div>
    </Drawer >
  );
}

export default DetailedView;
