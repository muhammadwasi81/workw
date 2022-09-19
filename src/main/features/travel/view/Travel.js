import React, { useContext, useEffect, useState } from "react";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import {
	TabContainer,
	ContBody,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import "../styles/Travel.css";
import { Table } from "../../../sharedComponents/customTable/index";
import {
	defaultUiid,
	FilterSortEnum,
} from "../../../../utils/Shared/enums/enums";
import { useDispatch, useSelector } from "react-redux";
import { getAllTravel } from "../store/actions";
import { travelStatus } from "../enums/enums";
import ListView from "./ListView/ListView";
import Header from "./Header";
import { tableColumns } from "./TableColumns/Columns";
import TopBar from "../../../sharedComponents/topBar/topBar";
import { TravelDictionary } from "../localization";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";

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

function Travel({ referenceId, referenceType }) {
	const [tableView, setTableView] = useState(false);
	const [search, setSearch] = useState("");
	const value = useDebounce(search, 500);
	const [sort, setSort] = useState(1);
	const [page, setPage] = useState(20);
	const [pageNo, setPageNo] = useState(1);
	const [filterType, setFilterType] = useState(1);
	const { travels, loader, success, isAdded } = useSelector(
		state => state.travelSlice
	);
	const dispatch = useDispatch();
	const { userLanguage } = useContext(LanguageChangeContext);
	const { TravelDictionaryList, Direction } = TravelDictionary[userLanguage];
	const { topBar, headings, table } = TravelDictionaryList;
	// const { Direction, sharedLabels } = dictionaryList[userLanguage];

	// const handleChange = (pagination, filters, sorter) => {
	// 	let filter = onSortClick(sorter);
	// 	setTableColumnFilter(prevState => ({
	// 		...prevState,
	// 		...filter,
	// 	}));
	// };
	// const onSortClick = sorter => {
	// 	let filter = tableColumnFilter;
	// 	if (sorter.field === "referenceNo" && sorter.order === "ascend") {
	// 		filter.sortBy = FilterSortEnum.ReferenceNoAsc;
	// 	}
	// 	if (sorter.field === "referenceNo" && sorter.order === "descend") {
	// 		filter.sortBy = FilterSortEnum.ReferenceNoDesc;
	// 	}
	// 	if (sorter.field === "createDate" && sorter.order === "ascend") {
	// 		filter.sortBy = FilterSortEnum.CreateDateAsc;
	// 	}
	// 	if (sorter.field === "createDate" && sorter.order === "descend") {
	// 		filter.sortBy = FilterSortEnum.CreateDateDesc;
	// 	}
	// 	if (sorter.field === "subject" && sorter.order === "ascend") {
	// 		filter.sortBy = FilterSortEnum.SubjectAsc;
	// 	}
	// 	if (sorter.field === "subject" && sorter.order === "descend") {
	// 		filter.sortBy = FilterSortEnum.SubjectDesc;
	// 	}
	// 	if (sorter.field === "status" && sorter.order === "ascend") {
	// 		filter.sortBy = FilterSortEnum.StatusAsc;
	// 	}
	// 	if (sorter.field === "status" && sorter.order === "descend") {
	// 		filter.sortBy = FilterSortEnum.StatusDesc;
	// 	}
	// 	if (sorter.field === "approverStatus" && sorter.order === "ascend") {
	// 		filter.sortBy = FilterSortEnum.ApproverStatusAsc;
	// 	}
	// 	if (sorter.field === "approverStatus" && sorter.order === "descend") {
	// 		filter.sortBy = FilterSortEnum.ApproverStatusDesc;
	// 	}
	// 	if (sorter.field === "agentStatus" && sorter.order === "ascend") {
	// 		filter.sortBy = FilterSortEnum.AgentStatusAsc;
	// 	}
	// 	if (sorter.field === "agentStatus" && sorter.order === "descend") {
	// 		filter.sortBy = FilterSortEnum.AgentStatusDesc;
	// 	}
	// 	return filter;
	// };
	// const onPageChange = (page, pageSize) => {
	// 	console.log("pagination value", page, pageSize);
	// };
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

	const handleColumnSorting = (pagination, filters, sorter) => {
		const { current, pageSize } = pagination;
		setPage(pageSize);
		setPageNo(current);
		const { order } = sorter;
		if (order === "ascend") {
			setSort(2);
			return;
		}
		setSort(1);
	};

	// const { referenceId, referenceType } = props;

	useEffect(() => {
		dispatch(
			getAllTravel({
				pageNo,
				pageSize: page,
				search: value,
				sortBy: sort,
				filterType,
				approverStatus: [],
				agentStatus: [],
				referenceId: (referenceId = defaultUiid),
				referenceType: (referenceType = 0),
			})
		);
	}, [value, sort, page, pageNo, filterType]);

	// useEffect(() => {
	// 	dispatch(getAllTravel(tableColumnFilter));
	// }, [tableColumnFilter, dispatch]);

	return (
		<TabContainer>
			<Header label={TravelDictionaryList} success={isAdded} />
			<TopBar
				onSearch={value => {
					setSearch(value);
				}}
				buttons={[
					{
						name: topBar.travels,
						onClick: () => setFilterType(1),
					},
					{
						name: topBar.approval,
						onClick: () => setFilterType(2),
					},
					{
						name: topBar.agentProcess,
						onClick: () => setFilterType(3),
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
						handleChange={handleColumnSorting}
						// onPageChange={onPageChange}
						onRow={onRow}
						data={travels}
						status={travelStatus}
						loading={loader}
						success={success}
						// onActionClick={onActionClick}
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
