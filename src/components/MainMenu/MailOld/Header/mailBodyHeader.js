import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import backIcon from "../assests/backIcon.svg";
import reportIcon from "../assests/reportIcon.svg";
import markUnread from "../assests/markunread.svg";
import clockIcon from "../assests/clockIcon.svg";
import moveToInbox from "../assests/moveToInbox.svg";
import moreIcon from "../assests/moreIcon.svg";
import { Tooltip, Button, message } from "antd";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmail, moveEmailToTrash } from "../Store/Api";
import { unwrapResult } from "@reduxjs/toolkit";

const MailBodyHeader = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { mailDetail } = useSelector((state) => state?.mailSlice);
  const { pathname } = useLocation();
  const api_base = pathname.split("/")[2];

  const handleMoveToTrash = async () => {
    try {
      const resultAction = await dispatch(
        moveEmailToTrash({ id: mailDetail.id, folderPath: api_base })
      );
      const originalPromiseResult = unwrapResult(resultAction);
      if (originalPromiseResult?.data) {
        message.success("Email moved to trash.");
        navigate(-1);
      }
      console.log(originalPromiseResult, "originalPromiseResult");
    } catch (rejectedValueOrSerializedError) {}
  };

  const handleDeleteEmail = async () => {
    try {
      const resultAction = await dispatch(deleteEmail(mailDetail.id));
      const originalPromiseResult = unwrapResult(resultAction);
      if (originalPromiseResult?.data) {
        message.success("Email deleted forever.");
        navigate(-1);
      }
      console.log(originalPromiseResult, "originalPromiseResult");
    } catch (rejectedValueOrSerializedError) {}
  };

  const handleFun = async () => {
    if (api_base === "INBOX") {
      await handleMoveToTrash();
    } else await handleDeleteEmail();
  };

  const getTooltip = () => {
    if (api_base === "INBOX") {
      return "move to trash";
    } else if (api_base === "INBOX.Trash") return "delete forever";
    return "";
  };

  return (
    <div className="mailHeaderContainer">
      <div className="headerRightItem">
        <Tooltip title="back" placement="bottom" color={"#FFFFFF"}>
          <img
            src={backIcon}
            alt="backIcon"
            height={30}
            width={30}
            onClick={() => navigate(-1)}
          />
        </Tooltip>

        <div className="h-body">
          {/*<img src={reportIcon} alt="backIcon" height={15} width={15}/>*/}
          {/*<img src={reportIcon} alt="backIcon" height={15} width={15}/>*/}

          <Tooltip title={getTooltip()} placement="bottom" color={"#FFFFFF"}>
            <Button
              onClick={handleFun}
              shape="circle"
              icon={<MdDelete size={20} color={"#757d86"} />}
              size={"small"}
              style={{ border: "none" }}
            />
          </Tooltip>
          <img src={markUnread} alt="backIcon" height={15} width={15} />
          <img src={clockIcon} alt="backIcon" height={15} width={15} />
          <img src={moveToInbox} alt="backIcon" height={15} width={15} />
        </div>
      </div>

      <div className="headerLeftItem">
        {/*<div className="h-body">*/}
        {/*    <img src={markUnread} alt="backIcon" height={15} width={15}/>*/}
        {/*    <img src={clockIcon} alt="backIcon" height={15} width={15}/>*/}
        {/*    <img src={moveToInbox} alt="backIcon" height={15} width={15}/>*/}
        {/*</div>*/}

        <Tooltip title="more" placement="bottom" color={"#FFFFFF"}>
          <img src={moreIcon} alt="backIcon" height={30} width={30} />
        </Tooltip>
      </div>
    </div>
  );
};

export default MailBodyHeader;
