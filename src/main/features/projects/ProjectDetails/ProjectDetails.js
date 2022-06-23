import React from "react";
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

function ProjectDetails() {
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
			name: "Project Details",
			to: `${ROUTES.PROJECT.DEFAULT}`,
			renderButton: [1],
		},
	];
	const buttons = [
		{
			buttonText: "Edit Projects",
			icon: <EditOutlined />,
		},
	];
	// const [scroll, setScroll] = useState(false);
	// useEffect(() => {
	// 	window.addEventListener("scroll", () => {
	// 		setScroll(window.scrollY > 50);
	// 	});
	// 	console.log("scroll", scroll);
	// }, []);
	return (
		<TabContainer>
			<LayoutHeader items={items} buttons={buttons} />
			<ContBody className="!block">
				<div className="flex flex-row gap-5 h-[calc(100vh_-_60px)]">
					<div className="rounded-xl basis-9/12 flex flex-col gap-5 overflow-scroll">
						<CoverImage image={ProjectCover} />
						<CoverDetail />
						<Tab panes={panes} />
					</div>

					<div className="basis-1/4 gap-5 flex flex-col overflow-scroll">
						<Budget />
						<MemberCollapse />
					</div>
				</div>
			</ContBody>
		</TabContainer>
	);
}

export default ProjectDetails;
