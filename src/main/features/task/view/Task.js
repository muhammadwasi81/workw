import React, { useContext, useEffect, useState } from "react";
import { STRINGS } from "../../../../utils/base";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import {
	ContBody,
	TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import TaskComposer from "./TaskComposer";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header";
import { buttonsEnum } from "../utils/enum/enum";
import MyTaskList from "./MyTask";
import { useDispatch } from "react-redux";
import { getAllTask } from "../store/actions";
import { useSelector } from "react-redux";
import { Table } from "../../../sharedComponents/customTable";
import { tableColumn } from "./TaskTable/TaskColumns";
import { taskDictionary } from "../localization";
import { defaultUiid } from "../../../../utils/Shared/enums/enums";
import { TaskReferenceTypeEnum } from "../enums/enum";
import { handleOpenComposer } from "../store/taskSlice";
import { Button, Drawer } from "antd";

import "../view/style/task.css";

function Task({
	referenceId = defaultUiid,
	referenceType = TaskReferenceTypeEnum.General,
	width = "",
	routeLink,
	backButton,
	feature = "",
}) {
	let defaultFilter = {
		filterType: 2,
		pageNo: 1,
		pageSize: 40,
		search: "",
	};
	const { userLanguage } = useContext(LanguageChangeContext);
	const { appHeader, sharedLabels, navMenuLabel } = dictionaryList[
		userLanguage
	];
	const { taskDictionaryList } = taskDictionary[userLanguage];
	const [filterType, setFilterType] = useState(2);
	const [tableView, setTableView] = useState(false);
	const [search, setSearch] = useState("");
	const dispatch = useDispatch();
	const {
		taskList: { list },
		success,
		drawerOpen,
	} = useSelector(state => state.taskSlice);
	useEffect(() => {
		dispatch(
			getAllTask({
				...defaultFilter,
				filterType,
				referenceId,
				referenceType,
				search,
			})
		);
	}, [filterType, search]);

	const items = [
		{
			name: navMenuLabel.tasks,
			to: `${routeLink ? routeLink : STRINGS.ROUTES.TASK.ROOT}`,
			renderButton: buttonsEnum.dashboard,
		},
	];
	//   const buttons = [
	//     {
	//       buttonText: taskDictionaryList.createTextBtn,
	//       render: (
	//         <SideDrawer
	//           success={success}
	//           isAccessDrawer={true}
	//           openDrawer={success}
	//           children={
	//             <TaskComposer
	//               referenceId={referenceId}
	//               referenceType={referenceType}
	//             />
	//           }
	//           title={taskDictionaryList.createTextBtn}
	//           buttonText={taskDictionaryList.createTextBtn}
	//         />
	//       ),
	//     },
	//   ];

	return (
		<TabbableContainer>
			<Header
				items={items}
				buttons={[
					{
						buttonText: taskDictionaryList.createTextBtn,
						render: (
							<Button
								className="ThemeBtn"
								onClick={() =>
									dispatch(handleOpenComposer(true))
								}
							>
								{taskDictionaryList.createTextBtn}
							</Button>
						),
					},
				]}
				width={width}
				backButton={backButton}
			/>
			<TopBar
				width={width}
				onSearch={value => {
					setSearch(value);
				}}
				buttons={[
					{
						name: appHeader.Task.myTask,
						onClick: () => setFilterType(2),
					},
					{
						name: appHeader.Task.assignedByMe,
						onClick: () => setFilterType(1),
					},
					{
						name: appHeader.Task.teamTask,
						onClick: () => setFilterType(3),
					},
				]}
				segment={{
					onSegment: value => {
						if (value === "Table") {
							setTableView(true);
						} else {
							setTableView(false);
						}
					},
					label1: sharedLabels.List,
					label2: sharedLabels.Table,
				}}
			/>
			<ContBody className={width}>
				<div className="lf-col">
					{tableView ? (
						<Table
							columns={tableColumn()}
							dragable={true}
							data={list ? list : []}
						/>
					) : (
						<MyTaskList
							filterType={filterType}
							referenceId={referenceId}
							referenceType={referenceType}
						/>
					)}
				</div>
			</ContBody>
			<Drawer
				title={
					<h1
						style={{
							fontSize: "20px",
							margin: 0,
						}}
					>
						{taskDictionaryList.createTextBtn}
					</h1>
				}
				width="768"
				onClose={() => {
					dispatch(handleOpenComposer(false));
				}}
				visible={drawerOpen}
				destroyOnClose={true}
				className="detailedViewComposer drawerSecondary"
			>
				<TaskComposer
					referenceId={referenceId}
					referenceType={referenceType}
					feature={feature}
				/>
			</Drawer>
		</TabbableContainer>
	);
}

export default Task;
