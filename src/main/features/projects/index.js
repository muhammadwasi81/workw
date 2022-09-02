import React, { useEffect, useContext, useState } from "react";

import {
	ContBody,
	TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import { Skeleton } from "antd";
import { projectsDictionaryList } from "./localization/index";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";

import ListItem from "./UI/ListItem";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllProjects } from "./store/actions";

import { CardWrapper2 } from "../../sharedComponents/Card/CardStyle";
import { tableColumn } from "./UI/TableColumn";
import { Table } from "../../sharedComponents/customTable";
import TopBar from "../../sharedComponents/topBar/topBar";
import { Avatar, Card } from "antd";

import Header from "./view/Header/Header";
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
	// const [visible, setVisible] = useState(false);

	const { projects, loader } = useSelector(state => state.projectSlice);

	// console.log(projects, "HELLLOOOO!!!!!!");

	// const onClose = () => {
	// 	setVisible(false);
	// };

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
				<Header createTextBtn={createTextBtn} />
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
					{projects?.length > 0 ? (
						tableView ? (
							<Table
								columns={tableColumn()}
								dragable={true}
								data={projects}
							/>
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
