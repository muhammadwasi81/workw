import React, { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAllGroup } from ".././store/actions";
import {
	ContBody,
	TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { groupsDictionaryList } from ".././localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { ROUTES } from "../../../../utils/routes";
import { tableColumn } from "./UI/TableColumn";
import { Table } from "../../../sharedComponents/customTable";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import Composer from "./UI/Composer";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";
import GridView from "../../leadmanager/view/Dashboard/GridView/GridView";
import Spinner from "../../../sharedComponents/spinner/spinner";

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
	const items = [
		{
			name: topBar.group,
			to: "/groups",
			renderButton: [1],
		},
	];
	return (
		<>
			<TabbableContainer className="">
				<Header
					items={items}
					buttons={[
						{
							buttonText: createTextBtn,
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
