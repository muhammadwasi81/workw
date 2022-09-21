import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ContainerHeader } from "../../sharedComponents/AppComponents/MainHeader";
import {
	ContBody,
	HeaderMenuContainer,
	TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import { Skeleton } from "antd";
import { groupsDictionaryList } from "./localization/index";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import SideDrawer from "../../sharedComponents/Drawer/SideDrawer";
import ListItem from "./UI/ListItem";
import Composer from "./UI/Composer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllGroup } from "./store/actions";

import { tableColumn } from "./UI/TableColumn";
import { Table } from "../../sharedComponents/customTable";
import TopBar from "../../sharedComponents/topBar/topBar";
import Header from "../../layout/header/index";

import GridView from "../leadmanager/view/Dashboard/GridView/GridView";
import { ROUTES } from "../../../utils/routes";
import { useNavigate } from "react-router-dom";
import Spinner from "../../sharedComponents/spinner/spinner";

const initialComposerData = {
	name: "",
	description: "",
	members: [],
	memberType: null,
};
const Groups = props => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userLanguage } = useContext(LanguageChangeContext);
	const { groupsDictionary, Direction } = groupsDictionaryList[userLanguage];
	const { createTextBtn, topBar } = groupsDictionary;

	const [tableView, setTableView] = useState(false);
	const { groups, success, getDataLoading } = useSelector(
		state => state.groupSlice
	);

	useEffect(() => {
		dispatch(
			getAllGroup({
				pageNo: 1,
				pageSize: 20,
				search: "",
				sortBy: 1,
			})
		);
	}, []);
	const handleClickNavigation = id => {
		navigate(`${ROUTES.GROUP.DEFAULT}/${id}`);
	};

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
									isAccessDrawer={true}
									success={success}
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
					buttons={[
						{
							name: topBar.group,
							// onClick: () => setFilter({ filterType: 0 }),
						},
					]}
					// filter={{
					//   onFilter: () => {},
					// }}
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
					{getDataLoading ? (
						<Spinner />
					) : groups?.length > 0 ? (
						tableView ? (
							<Table
								columns={tableColumn()}
								dragable={true}
								data={groups}
							/>
						) : (
							<>
								<GridView
									data={groups}
									loading={getDataLoading}
									dispatch={dispatch}
									handleClickNavigation={
										handleClickNavigation
									}
									dictionary={groupsDictionary}
								/>
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

export default Groups;
