import React from "react";
import {
	ContBody,
	TabContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import Tab from "../../sharedComponents/Tab";
import CoverImage from "../projects/UI/CoverImage";
import ProfileCoverDetail from "./ProfileCoverDetail";
import ProjectCover from "../../../content/png/project_cover_img.png";

function Profile() {
	const panes = [
		{
			title: `Posts`,
			content: <div>Posts div</div>,
			key: 0,
		},
		{
			title: `Information`,
			content: <div>Information div</div>,
			key: 1,
		},
		{
			title: `Apraisals`,
			content: <div>Apraisals div</div>,
			key: 2,
		},
		{
			title: `Salary`,
			content: <div>Salary div</div>,
			key: 3,
		},
		{
			title: `Task`,
			content: <div>Task div</div>,
			key: 4,
		},
		{
			title: `Activity`,
			content: <div>Activity div</div>,
			key: 5,
		},
		{
			title: `About`,
			content: <div>About div</div>,
			key: 6,
		},
	];
	return (
		<TabContainer>
			<ContBody className="!block">
				<div className="flex flex-row gap-5 h-[calc(100vh_-_60px)]">
					<div className="rounded-xl flex flex-col gap-5 overflow-scroll">
						<CoverImage image={ProjectCover} />
						<ProfileCoverDetail />
						<Tab panes={panes} />
					</div>
				</div>
			</ContBody>
		</TabContainer>
	);
}

export default Profile;
