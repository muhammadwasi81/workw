import React, { useContext, useEffect, useRef, useState } from "react";
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
import { TravelReferenceTypeEnum } from "../../projects/enum/enums";
import Scroll from "../../../sharedComponents/ScrollSelect/infinteScoll";
import { Skeleton } from "antd";
import { resetTravelData } from "../store/slice";
import { NoDataFound } from "../../../sharedComponents/NoDataIcon";

function Travel({
	referenceType = TravelReferenceTypeEnum.General,
	referenceId = defaultUiid,
	backButton = true,
}) {
	// const isFirstRun = useRef(true);
	const [firstTimeRender, setFirstTimeRender] = useState(false);
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
		if (!firstTimeRender) {
			// console.log("1");
			setFirstTimeRender(true);

			dispatch(
				getAllTravel({
					pageNo,
					pageSize: page,
					search: value,
					sortBy: sort,
					filterType,
					approverStatus: [],
					agentStatus: [],
					referenceId,
					referenceType,
				})
			);
		}
	}, []);

	useEffect(() => {
		if (firstTimeRender) {
			// console.log("2");
			dispatch(resetTravelData());
			dispatch(
				getAllTravel({
					pageNo: 1,
					pageSize: page,
					search: value,
					sortBy: sort,
					filterType,
					approverStatus: [],
					agentStatus: [],
					referenceId,
					referenceType,
				})
			);
		}
	}, [value, page, filterType]);

	useEffect(() => {
		if (firstTimeRender) {
			// console.log("3");
			// dispatch(resetTravelData());
			dispatch(
				getAllTravel({
					pageNo,
					pageSize: page,
					search: value,
					sortBy: sort,
					filterType,
					approverStatus: [],
					agentStatus: [],
					referenceId,
					referenceType,
				})
			);
		}
	}, [pageNo, sort]);

	// useEffect(() => {
	// 	dispatch(getAllTravel(tableColumnFilter));
	// }, [tableColumnFilter, dispatch]);
	// console.log("asdfasdfasdf", referenceId, referenceType);

	return (
		<TabContainer>
			<Header
				label={TravelDictionaryList}
				success={isAdded}
				backButton={backButton}
				referenceId={referenceId}
				referenceType={referenceType}
			/>
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
				{
				   tableView &&
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

				}
				{
					travels?.length > 0 && !loader && !tableView ? (
						<Scroll
						isLoading={loader}
						data={travels}
						fetchMoreData={pageNo => {
							setPageNo(pageNo);
						}}
						loader={[0, 0, 0].map(() => (
							<Skeleton
								active
								avatar
								paragraph={{
									rows: 4,
								}}
							/>
						))}
						endMessage={"No more travels..."}
					>
						<ListView
							data={travels}
							loader={loader}
							labels={headings}
						/>
					</Scroll>

					): !loader && !tableView && <NoDataFound/>
				} 
			

				{/* 
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
					<Scroll
						isLoading={loader}
						data={travels}
						fetchMoreData={pageNo => {
							setPageNo(pageNo);
						}}
						loader={[0, 0, 0].map(() => (
							<Skeleton
								active
								avatar
								paragraph={{
									rows: 4,
								}}
							/>
						))}
						endMessage={"No more travels..."}
					>
						<ListView
							data={travels}
							loader={loader}
							labels={headings}
						/>
					</Scroll>
				)} 
				*/}
			</ContBody>
		</TabContainer>
	);
}

export default Travel;
