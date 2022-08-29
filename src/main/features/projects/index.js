import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ContainerHeader } from "../../sharedComponents/AppComponents/MainHeader";
import {
	ContBody,
	HeaderMenuContainer,
	TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import { Skeleton } from "antd";
import { projectsDictionaryList } from "./localization/index";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import SideDrawer from "../../sharedComponents/Drawer/SideDrawer";
import ListItem from "./UI/ListItem";
import Composer from "./UI/Composer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllProjects } from "./store/actions";
import FilterSearchButton from "../../sharedComponents/FilterSearch";
import { CardWrapper2 } from "../../sharedComponents/Card/CardStyle";
import { tableColumn } from "./UI/TableColumn";
import { Table } from "../../sharedComponents/customTable";
import TopBar from "../../sharedComponents/topBar/topBar";
import Header from "../../layout/header/index";
import { Avatar, Card } from "antd";
import ExampleAntdCustomSelect from "../../sharedComponents/AntdCustomSelects";
const { Meta } = Card;

const Projects = props => {
	const dispatch = useDispatch();
	const { userLanguage } = useContext(LanguageChangeContext);
	const { projectsDictionary, Direction } = projectsDictionaryList[
		userLanguage
	];
	const { createTextBtn, topBar } = projectsDictionary;

	const [loading, setLoading] = useState(true);
	const [tableView, setTableView] = useState(false);
	const [visible, setVisible] = useState(false);

	const { projects, loader } = useSelector(state => state.projectSlice);

	// console.log(projects, "HELLLOOOO!!!!!!");

	const onClose = () => {
		setVisible(false);
	};

	useEffect(() => {
		dispatch(
			getAllProjects({
				pageNo: 1,
				pageSize: 20,
				search: "",
				sortBy: 1,
			})
		);
	}, []);

	return (
		<>
			<TabbableContainer className="">
				<Header
					buttons={[
						{
							buttonText: createTextBtn,
							// onClick: () => setVisible(true),
							render: (
								<SideDrawer
									title={createTextBtn}
									buttonText={createTextBtn}
									isAccessDrawer={false}
								>
									<Composer />
								</SideDrawer>
							),
						},
					]}
				/>
				<TopBar
					onSearch={value => {
						console.log(value);
					}}
					segment={{
						onSegment: value => {
							if (value === topBar.table) {
								setTableView(true);
							} else {
								setTableView(false);
							}
						},
						label1: topBar.list,
						label2: topBar.table,
					}}
				/>

				<ContBody className="!block" direction={Direction}>
					<ExampleAntdCustomSelect />
					{projects?.length > 0 ? (
						tableView ? (
							<Table
								columns={tableColumn()}
								dragable={true}
								data={projects}
							/>
						) : (
							<>
								{loader ? (
									<>
										<CardWrapper2>
											<Skeleton
												loading={loading}
												avatar
												active
											>
												<Meta
													avatar={
														<Avatar src="https://joeschmoe.io/api/v1/random" />
													}
													title="Card title"
													description="This is the description"
												/>
											</Skeleton>
											<Skeleton
												loading={loading}
												avatar
												active
											>
												<Meta
													avatar={
														<Avatar src="https://joeschmoe.io/api/v1/random" />
													}
													title="Card title"
													description="This is the description"
												/>
											</Skeleton>
										</CardWrapper2>
									</>
								) : (
									<CardWrapper2>
										{projects.map((item, index) => {
											return (
												<>
													<ListItem
														item={item}
														id={item.id}
														key={index}
													/>
												</>
											);
										})}
									</CardWrapper2>
								)}
							</>
						)
					) : (
						"Data not found"
					)}
				</ContBody>
			</TabbableContainer>
		</>
	);
};

export default Projects;
