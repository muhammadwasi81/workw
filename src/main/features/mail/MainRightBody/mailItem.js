import React from "react";
// import AntTooltip from "../../../SharedComponent/Tooltip/AntTooltip";
import { Button, Rate, Tooltip, message } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
	createGuid,
	parseDate,
	parseDateWithMontAndYear,
	STRINGS,
} from "../../../../utils/base";
import mailAttachmentIcon from "../assests/mailAttachmentIcon.svg";
import { MdDelete } from "react-icons/md";
import { deleteEmail, moveEmailToTrash } from "../Store/Api";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import AntTooltip from "../../../sharedComponents/Tooltip/AntTooltip";
import { ROUTES } from "../../../../utils/routes";

const MailItem = ({ data, changeSeenFlag }) => {
	const dispatch = useDispatch();
	const {
		from = [],
		subject = "",
		id,
		isRead = false,
		date = new Date(),
		hasAttachments,
		content = "",
	} = data;
	const { pathname } = useLocation();
	const api_base = pathname.split("/")[2];

	const handleMoveToTrash = async () => {
		message.loading("Action in progress..", 2, async () => {
			try {
				const resultAction = await dispatch(
					moveEmailToTrash({ id: id, folderPath: api_base })
				);
				const originalPromiseResult = unwrapResult(resultAction);
				if (originalPromiseResult?.data) {
					message.success("Email moved to trash.");
				}
				console.log(originalPromiseResult, "originalPromiseResult");
			} catch (rejectedValueOrSerializedError) { }
		});
	};

	const handleDeleteEmail = async () => {
		message.loading("Action in progress..", 2, async () => {
			try {
				const resultAction = await dispatch(deleteEmail(id));
				const originalPromiseResult = unwrapResult(resultAction);
				if (originalPromiseResult?.data) {
					message.success("Email deleted forever.");
				}
				console.log(originalPromiseResult, "originalPromiseResult");
			} catch (rejectedValueOrSerializedError) { }
		});
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
		<div
			className="mailItem"
			key={id}
			style={{ backgroundColor: !isRead && "#e5e5e554" }}
		>
			<div className="mailName">
				<input type="checkbox" />
				<AntTooltip
					value={!isRead ? "Mark as read" : "Mark as unread"}
					placement="bottom"
					color={"#FFFFFF"}
				>
					<Rate
						count={1}
						onChange={() => changeSeenFlag(id, isRead ? 2 : 1)}
						value={!isRead}
						style={{
							fontSize: "15px",
							marginLeft: 10,
							color: "#406776",
						}}
					/>
				</AntTooltip>

				<NavLink
					className="mailFrom"
					to={`${id}`}
				>
					{from && from[0]?.name}
				</NavLink>
			</div>
			<NavLink
				className="subjectAndBody"
				to={`${id}`}
			>
				{subject} {content && "-"} {content}
			</NavLink>

			<div className="mailDateBox" style={{ flex: "25%" }}>
				{hasAttachments && (
					<img
						src={mailAttachmentIcon}
						alt="mailAttachmentIcon"
						style={{ marginRight: "10px" }}
					/>
				)}
				{parseDateWithMontAndYear(parseDate(date))}
			</div>

			<div className="hoverEmailAction">
				<Tooltip
					title={getTooltip()}
					placement="bottom"
					color={"#FFFFFF"}
				>
					<Button
						shape="circle"
						icon={<MdDelete size={18} color={"#757d86"} />}
						size={"middle"}
						onClick={handleFun}
					/>
				</Tooltip>
				{/*<Tooltip title={"delete"} placement="bottom" color={"#FFFFFF"}>*/}
				{/*    <Button shape="circle" icon={<MdDelete size={18} color={"#757d86"}/>} size={"middle"}/>*/}
				{/*</Tooltip>*/}
				{/*<Tooltip title={"delete"} placement="bottom" color={"#FFFFFF"}>*/}
				{/*    <Button shape="circle" icon={<MdDelete size={18} color={"#757d86"}/>} size={"middle"}/>*/}
				{/*</Tooltip>*/}
			</div>
		</div>
	);
};

export default MailItem;
