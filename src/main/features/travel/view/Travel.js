import React, { useContext, useEffect, useState } from "react";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import {
	TabContainer,
	ContBody,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import "../styles/Travel.css";
import { Table } from "../../../sharedComponents/customTable/index";
import { FilterSortEnum } from "../../../../utils/Shared/enums/enums";
import { useDispatch, useSelector } from "react-redux";
import { getAllTravel } from "../store/actions";
import { travelStatus } from "../enums/enums";
import ListView from "./ListView/ListView";
import Header from "./Header";
import { tableColumns } from "./TableColumns/Columns";
import TopBar from "../../../sharedComponents/topBar/topBar";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { TravelDictionary } from "../localization";

const initialTableFilter = {
	pageNo: 1,
	pageSize: 20,
	search: "",
	approverStatus: [],
	agentStatus: [],
	filterType: 1,
	sortBy: 1,
	referenceId: "00000000-0000-0000-0000-000000000000",
	referenceType: 0,
};

function Travel() {
	const [tableView, setTableView] = useState(false);
	const [tableColumnFilter, setTableColumnFilter] = useState(
		initialTableFilter
	);
	const { travels, loader, success, isAdded } = useSelector(
		state => state.travelSlice
	);
	const dispatch = useDispatch();
	const { userLanguage } = useContext(LanguageChangeContext);
	const { TravelDictionaryList, Direction } = TravelDictionary[userLanguage];
	const { topBar, headings, table } = TravelDictionaryList;
	// const { Direction, sharedLabels } = dictionaryList[userLanguage];

	const handleChange = (pagination, filters, sorter) => {
		let filter = onSortClick(sorter);
		setTableColumnFilter(prevState => ({
			...prevState,
			...filter,
		}));
	};
	const onSortClick = sorter => {
		let filter = tableColumnFilter;
		if (sorter.field === "referenceNo" && sorter.order === "ascend") {
			filter.sortBy = FilterSortEnum.ReferenceNoAsc;
		}
		if (sorter.field === "referenceNo" && sorter.order === "descend") {
			filter.sortBy = FilterSortEnum.ReferenceNoDesc;
		}
		if (sorter.field === "createDate" && sorter.order === "ascend") {
			filter.sortBy = FilterSortEnum.CreateDateAsc;
		}
		if (sorter.field === "createDate" && sorter.order === "descend") {
			filter.sortBy = FilterSortEnum.CreateDateDesc;
		}
		if (sorter.field === "subject" && sorter.order === "ascend") {
			filter.sortBy = FilterSortEnum.SubjectAsc;
		}
		if (sorter.field === "subject" && sorter.order === "descend") {
			filter.sortBy = FilterSortEnum.SubjectDesc;
		}
		if (sorter.field === "status" && sorter.order === "ascend") {
			filter.sortBy = FilterSortEnum.StatusAsc;
		}
		if (sorter.field === "status" && sorter.order === "descend") {
			filter.sortBy = FilterSortEnum.StatusDesc;
		}
		if (sorter.field === "approverStatus" && sorter.order === "ascend") {
			filter.sortBy = FilterSortEnum.ApproverStatusAsc;
		}
		if (sorter.field === "approverStatus" && sorter.order === "descend") {
			filter.sortBy = FilterSortEnum.ApproverStatusDesc;
		}
		if (sorter.field === "agentStatus" && sorter.order === "ascend") {
			filter.sortBy = FilterSortEnum.AgentStatusAsc;
		}
		if (sorter.field === "agentStatus" && sorter.order === "descend") {
			filter.sortBy = FilterSortEnum.AgentStatusDesc;
		}
		return filter;
	};
	const onPageChange = (page, pageSize) => {
		console.log("pagination value", page, pageSize);
	};
	const onRow = (record, rowIndex) => {
		return {
			onClick: event => {
				// console.log("onCLick");
			}, // click row
			onDoubleClick: event => {}, // double click row
			onContextMenu: event => {}, // right button click row
			onMouseEnter: event => {}, // mouse enter row
			onMouseLeave: event => {}, // mouse leave row
		};
	};

	const onActionClick = row => {
		console.log("on action click", row);
	};

	useEffect(() => {
		dispatch(getAllTravel(tableColumnFilter));
	}, [tableColumnFilter, dispatch]);

	useEffect(() => {
		if (isAdded) {
			dispatch(
				openNotification({
					message: "Travel Added Successfull.",
					direction: "topRight",
				})
			);
		}
	}, [isAdded]);

	return (
		<TabContainer>
			<Header label={TravelDictionaryList} success={isAdded} />
			<TopBar
				onSearch={value => {
					// console.log(value);
				}}
				buttons={[
					{
						name: topBar.travels,
						onClick: () =>
							setTableColumnFilter({
								...tableColumnFilter,
								filterType: 1,
							}),
					},
					{
						name: topBar.approval,
						onClick: () =>
							setTableColumnFilter({
								...tableColumnFilter,
								filterType: 2,
							}),
					},
					{
						name: topBar.agentProcess,
						onClick: () =>
							setTableColumnFilter({
								...tableColumnFilter,
								filterType: 3,
							}),
					},
				]}
				filter={{
					onFilter: () => {},
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
			<ContBody className={`!block ${Direction}`} direction={Direction}>
				{tableView ? (
					<Table
						columns={tableColumns(onActionClick, Direction, table)}
						dragable={true}
						handleChange={handleChange}
						onPageChange={onPageChange}
						onRow={onRow}
						data={travels}
						status={travelStatus}
						loading={loader}
						success={success}
						onActionClick={onActionClick}
					/>
				) : (
					<ListView
						data={travels}
						loader={loader}
						labels={headings}
					/>
				)}
			</ContBody>
		</TabContainer>
	);
}

export default Travel;

// const columns = [
// 	{
// 		title: "Sort",
// 		dataIndex: "sort",
// 		drag: true,
// 		width: 10,
// 	},

// 	{
// 		title: "Reference No",
// 		dataIndex: "referenceNo",
// 		sort: true,
// 		width: 100,
// 	},
// 	{
// 		title: "Status",
// 		dataIndex: "status",
// 		sort: true,
// 		tag: true,
// 		width: 50,
// 	},
// 	{
// 		title: "Subject",
// 		dataIndex: "subject",
// 		width: 200,
// 	},
// 	{
// 		title: "Description",
// 		dataIndex: "description",
// 		width: 200,
// 	},
// 	{
// 		title: "Agent Status",
// 		dataIndex: "agentStatus",
// 		width: 200,
// 	},
// 	{
// 		title: "Actions",
// 		key: "action",
// 		action: true,
// 		customAction: false,
// 		actions: ["edit"],
// 		key: "6",
// 		width: 100,
// 		render: (_, row) => {
// 			return Edit(row);
// 		},
// 	},
// ];
