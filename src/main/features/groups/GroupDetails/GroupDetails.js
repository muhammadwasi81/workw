import React, { useContext } from "react";
import { ROUTES } from "../../../../utils/routes";
import Header from "../../../layout/header";
import {
	ContBody,
	TabContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import MemberCollapse from "../../../sharedComponents/Collapseable/MemberCollapse";
import Tab from "../../../sharedComponents/Tab";
import CoverDetail from "../../projects/UI/CoverDetail";
import CoverImage from "../../projects/UI/CoverImage";
import GroupCover from "../../../../content/png/groups_cover_image.jpg";
import WhiteCard from "../../projects/UI/WhiteCard";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { groupsDictionaryList } from "../localization";

function GroupDetails() {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { groupsDictionary, Direction } = groupsDictionaryList[userLanguage];
	const { groupDetail } = groupsDictionary;
	const panes = [
		{
			title: groupDetail.discussion,
			content: <div>Discussion div</div>,
			key: 0,
		},
		{
			title: groupDetail.schedule,
			content: <div>Schedule div</div>,
			key: 1,
		},

		{
			title: groupDetail.task,
			content: <div>Task div</div>,
			key: 2,
		},
		{
			title: groupDetail.expenses,
			content: <div>Expenses div</div>,
			key: 3,
		},
		{
			title: groupDetail.documents,
			content: <div>Documents div</div>,
			key: 4,
		},
	];
	const items = [
		{
			name: "Group Details",
			to: `${ROUTES.GROUP.DEFAULT}`,
			renderButton: [1],
		},
	];

	return (
		<TabContainer>
			<Header items={items} />
			<ContBody className="!block" direction={Direction}>
				<div className="flex flex-row gap-5 h-[calc(100vh_-_60px)]">
					<div className="rounded-xl basis-9/12 flex flex-col gap-5 overflow-scroll mt-10">
						<CoverImage image={GroupCover} />
						<CoverDetail />
						<Tab panes={panes} dir={Direction} />
					</div>

					<div className="basis-1/4 gap-5 flex flex-col overflow-scroll">
						<WhiteCard>
							<MemberCollapse />
						</WhiteCard>
					</div>
				</div>
			</ContBody>
		</TabContainer>
	);
}

export default GroupDetails;
