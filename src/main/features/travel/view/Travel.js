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
import TopBar from "../../../layout/topBar/topBar";

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
	const [filter, setFilter] = useState({
		filterType: 1,
	});
	const [tableView, setTableView] = useState(false);
	const [tableColumnFilter, setTableColumnFilter] =
		useState(initialTableFilter);
	const { travels, loader, success } = useSelector(
		state => state.travelSlice
	);
	const dispatch = useDispatch();
	const { userLanguage } = useContext(LanguageChangeContext);
	const label = dictionaryList[userLanguage];
	const { Direction, sharedLabels } = dictionaryList[userLanguage];

	const handleChange = (pagination, filters, sorter) => {
		// console.log("pagination", pagination);
		// console.log("filters", filters);
		// console.log("sorter", sorter);

		let filter = onSortClick(sorter);
		setTableColumnFilter(prevState => ({
			...prevState,
			...filter,
		}));
		// const offset =
		// 	pagination.current * pagination.pageSize - pagination.pageSize;
		// const limit = pagination.pageSize;
		// const params = {};

		// if (sorter.hasOwnProperty("column")) {
		// 	params.order = { field: sorter.field, dir: sorter.order };
		// }

		// getData(offset, limit, params);
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

	return (
		<TabContainer>
			<Header label={label} />
			<TopBar
				onSearch={value => {
					console.log(value);
				}}
				buttons={[
					{
						name: "Travels",
						onClick: () => setFilter({ filterType: 1 }),
					},
					{
						name: "For Approval",
						onClick: () => setFilter({ filterType: 2 }),
					},
					{
						name: "Agent Process",
						onClick: () => setFilter({ filterType: 3 }),
					},
				]}
				filter={{
					onFilter: () => {},
				}}
				segment={{
					onSegment: value => {
						if (value === "Table") {
							setTableView(true);
						} else {
							setTableView(false);
						}
					},
					lable1: "List",
					lable2: "Table",
				}}
			/>
			<ContBody className="!block">
				{tableView ? (
					<Table
						columns={tableColumns(
							onActionClick,
							Direction,
							sharedLabels
						)}
						dragable={true}
						handleChange={handleChange}
						onPageChange={onPageChange}
						onRow={onRow}
						data={travels}
						status={travelStatus}
						loadding={loader}
						success={success}
						onActionClick={onActionClick}
					/>
				) : (
					<ListView data={travels} loader={loader} />
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
