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
import { resetProjectDetail } from "../store/slice";
import { FeaturesEnum } from "../../../../utils/Shared/enums/enums";
import WorkBoard from "../../workboard";

function ProjectDetails() {
	const params = useParams();
	const dispatch = useDispatch();
	const detail = useSelector(state => state.projectSlice.projectDetail);
	const [features, setFeatures] = useState([]);
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

	useEffect(() => {
		return () => {
			dispatch(resetProjectDetail());
		};
	}, []);

	useEffect(() => {
		let temp = detail?.features.map(feat => {
			return {
				...feat,
				content: featuresComp[feat.featureId],
			};
		});
		// console.log("temp features", temp);

		setFeatures(temp);
	}, [detail]);

	// useEffect(() => {
	// }, [features]);

	const panes = [
		{
			title: `Travel`,
			content: (
				<Travel
					referenceType={FeaturesEnum.Project}
					referenceId={id}
					backButton={false}
				/>
			),
			key: 11,
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

	const featuresComp = {
		11: (
			<Travel
				referenceType={FeaturesEnum.Project}
				referenceId={id}
				backButton={false}
			/>
		),
		// 10: <Schedule/>
		7: (
			<WorkBoard
				referenceType={FeaturesEnum.Project}
				referenceId={id}
				backButton={false}
			/>
		),
	};

	return (
		<>
			<TabContainer>
				<LayoutHeader items={items} buttons={buttons} />
				<ContBody className="!block">
					<div className="flex flex-row gap-5 h-[calc(100vh_-_60px)]">
						<div className="rounded-xl basis-9/12 flex flex-col gap-5 overflow-scroll">
							<CoverImage image={detail?.image} />
							<CoverDetail detail={detail} />
							<Tab panes={features} id={id} features={panes} />
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
					id={id}
				/>
			</Drawer>
		</>
	);
}

export default ProjectDetails;
