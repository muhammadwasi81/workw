import { Image, Tag } from "antd";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { departmentDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../utils/base";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import RewardDefaultIcon from "../../../../content/svg/menu/rewardIcon.svg";
import moment from "moment";
import GroupDefaultImage from "../../../../content/NewContent/groups/GroupDefaultImage.svg";
// import CardDetailView from "./CardDetailView";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../utils/routes";
const { Meta } = Card;

function ListItem(props) {
	//   const { userLanguage } = useContext(LanguageChangeContext);
	//   const { Direction, departmentDictionary } = departmentDictionaryList[userLanguage];
	const navigate = useNavigate();
	const {
		name,
		description,
		image = GroupDefaultImage,
		members = [],
	} = props.item;

	return (
		<>
			<Card
				className={"Card2"}
				cover={
					<img alt="example" className="object-cover" src={image} />
				}
				actions={[]}
				hoverable
				onClick={e => {
					navigate(`${ROUTES.GROUP.DETAIL}`);
				}}
			>
				<Meta title={name} description={description} />

				<Avatar
					isAvatarGroup={true}
					isTag={false}
					heading={"Members"}
					membersData={members}
				/>
			</Card>
		</>
	);
}

export default ListItem;
