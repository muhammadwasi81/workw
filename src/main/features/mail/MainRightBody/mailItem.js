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
import moment from "moment";

const MailItem = ({ data, changeSeenFlag, handleClick }) => {
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
			onClick={() => handleClick(id)}
		>
			<div className="flex">
				<div className="flex-1 overflow-hidden">
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

						{/* <NavLink
							className="mailFrom"
							to={`${id}`}
						> */}
						<div className="mailFrom">
							{from && from[0]?.name}
						</div>
						{/* </NavLink> */}
					</div>
					<div className="subjectAndBody">
						{/* <NavLink
						className="subjectAndBody"
						to={`${id}`}
					> */}
						{subject}
						{/* </NavLink> */}
					</div>

					{/* <NavLink
						className="subjectAndBody detail"
						to={`${id}`}
					> */}
					<div className="subjectAndBody detail">
						Dummy Mail Detail Content Here
					</div>
					{/* </NavLink> */}
				</div>

				<div className="mailDateBox w-[100px]">
					{hasAttachments && (
						<img
							src={mailAttachmentIcon}
							alt="mailAttachmentIcon"
							style={{ marginRight: "10px" }}
						/>
					)}
					{moment(date).format('MMM Do YYYY, h:mm a')}
				</div>

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
