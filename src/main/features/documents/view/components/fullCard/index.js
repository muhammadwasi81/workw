import React from "react";
import "./style.css";
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";
import {
	ItemHeader,
	SingleItem,
} from "../../../../../sharedComponents/Card/CardStyle";
import UserInfo from "../../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import moment from "moment";
import { Button, Tag, Image } from "antd";
import StatusTag from "../../../../../sharedComponents/Tag/StatusTag";
import { useDispatch } from "react-redux";
import { DOCUMENT_ENUM } from "../../../constant";
import { handleParentId } from "../../../store/slice";
import { getIconByExtensionType } from "../../../constant/helpers";

const DocFullCard = ({ data }) => {
	const disptach = useDispatch()

	let { name, documentType, creator, createDate, description, id, path, members, approvers, image } = data
	let { DUCOMENT_TYPE } = DOCUMENT_ENUM;

	const handleType = (() => {
		disptach(handleParentId({
			id,
			name
		}))
	})

	return (
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
						<Tag className="IdTag">TRA-000085</Tag>
						<StatusTag status={"In Proccess"}></StatusTag>
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
											<span className="text-black font-extrabold smallHeading">{"Approvers"}</span>
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
							onClick={handleType}
							alt=""
							src={documentType === DUCOMENT_TYPE.image && path ?
								path : getIconByExtensionType(documentType)}
						/>
					</div>
					<div className="downloadBtn">
						{
							documentType === DUCOMENT_TYPE.attachment ?
								<Button className="ThemeBtn downloadBtn">Download</Button> : ""
						}
					</div>
				</div>
			</div>
		</SingleItem >
	);
};

export default DocFullCard;
