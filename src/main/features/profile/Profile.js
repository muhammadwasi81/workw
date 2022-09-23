import React from "react";
import {
	ContBody,
	TabContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import Tab from "../../sharedComponents/Tab";
import CoverImage from "../projects/UI/CoverImage";
import ProfileCoverDetail from "./ProfileCoverDetail";
import ProjectCover from "../../../content/png/project_cover_img.png";
import ProfilePanel from "./view/ProfilePanel";
import { useParams } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";
import "./styles/profileStyle.css";
import NewsFeed from "../feed/ui";
import { useEffect } from "react";
import { getEducationDetailByUser } from "../education/store/actions";
import { useDispatch } from "react-redux";
import { getUserWorkExperience } from "../experienceInfo/store/actions";

function Profile() {
	const param = useParams();
	const { id } = param;

	const panes = [
		{
			featureName: `Feed`,
			content: (
				<NewsFeed
					isScheduler={false}
					isCheckedIn={false}
					width={"!w-full"}
					referenceType={4}
					referenceId={id}
					backButton={false}
					routeLink={ROUTES.USER.DEFAULT + id}
				/>
			),
			featureId: ROUTES.USER.DEFAULT + id,
		},
		{
			featureName: `About`,
			content: <ProfilePanel />,
			featureId: ROUTES.USER.DEFAULT + id + "/about",
		},
	];
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getEducationDetailByUser(id));
		dispatch(getUserWorkExperience(id));
	}, []);
	return (
		<TabContainer>
			<ContBody className="!block">
				<div className="flex flex-row gap-5 h-[calc(100vh_-_60px)] w-full">
					<div className="rounded-xl flex flex-col gap-5 overflow-scroll w-full">
						<CoverImage image={ProjectCover} />
						<ProfileCoverDetail />
						<Tab panes={panes} canChangeRoute={true} />
					</div>
				</div>
			</ContBody>
		</TabContainer>
	);
}

export default Profile;
