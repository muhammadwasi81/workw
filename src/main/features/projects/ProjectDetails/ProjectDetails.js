import React, { useContext, useEffect } from "react";
import { ROUTES } from "../../../../utils/routes";
import {
	ContBody,
	TabContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import Tab from "../../../sharedComponents/Tab";
import LayoutHeader from "../../../layout/header/index";
import { EditOutlined } from "@ant-design/icons";
import Travel from "../../travel/index";
import "../styles/projects.css";
import Budget from "../UI/Budget";
import CoverDetail from "../UI/CoverDetail";
import CoverImage from "../UI/CoverImage";
import MemberCollapse from "../../../sharedComponents/Collapseable/MemberCollapse";
import ProjectCover from "../../../../content/png/project_cover_img.png";
import WhiteCard from "../UI/WhiteCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjectById } from "../store/actions";
import { Drawer } from "antd";
import Composer from "../UI/Composer";
import { useState } from "react";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { projectsDictionaryList } from "../localization";

function ProjectDetails() {
	const params = useParams();
	const dispatch = useDispatch();
	const detail = useSelector(state => state.projectSlice.projectDetail);
	const { userLanguage } = useContext(LanguageChangeContext);
	const { projectsDictionary, Direction } = projectsDictionaryList[
		userLanguage
	];
	const { updateTextBtn } = projectsDictionary;
	const [open, setOpen] = useState(false);
	const { id } = params;
	useEffect(() => {
		dispatch(getProjectById(id));
	}, [id]);

	const panes = [
		{
			title: `Discussion`,
			content: <div>Discussion div</div>,
			key: 0,
		},
		{
			title: `Schedule`,
			content: <div>Schedule div</div>,
			key: 1,
		},
		{
			title: `Workboard`,
			content: <div>Workboard div</div>,
			key: 2,
		},
		{
			title: `Documents`,
			content: <div>Documents div</div>,
			key: 3,
		},
		{
			title: `Task`,
			content: <div>Task div</div>,
			key: 4,
		},
		{
			title: `Expenses`,
			content: <div>Expenses div</div>,
			key: 5,
		},
		{
			title: `Travel`,
			content: <Travel />,
			key: 6,
		},
		{
			title: `Approvals`,
			content: <div>Approvals div</div>,
			key: 7,
		},
	];
	const items = [
		{
			name: detail?.name,
			to: `${ROUTES.PROJECT.DEFAULT}`,
			renderButton: [1],
		},
	];
	const handleEditComposer = () => {
		setOpen(!open);
	};
	const buttons = [
		{
			buttonText: "Edit Projects",
			icon: <EditOutlined />,
			onClick: handleEditComposer,
		},
	];

	return (
		<>
			<TabContainer>
				<LayoutHeader items={items} buttons={buttons} />
				<ContBody className="!block">
					<div className="flex flex-row gap-5 h-[calc(100vh_-_60px)]">
						<div className="rounded-xl basis-9/12 flex flex-col gap-5 overflow-scroll">
							<CoverImage image={detail?.image} />
							<CoverDetail detail={detail} />
							<Tab panes={detail?.features} />
						</div>

						<div className="basis-1/4 gap-5 flex flex-col overflow-scroll">
							<Budget data={detail} />
							<WhiteCard>
								<MemberCollapse data={detail?.members} />
							</WhiteCard>
						</div>
					</div>
				</ContBody>
			</TabContainer>
			<Drawer
				open={open}
				width={"786px"}
				onClose={handleEditComposer}
				title={updateTextBtn}
				className={"shared_drawer drawerSecondary"}
			>
				<Composer
					buttonText={updateTextBtn}
					detail={detail}
					update={true}
				/>
			</Drawer>
		</>
	);
}

export default ProjectDetails;
