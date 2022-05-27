import React, { useContext, useEffect, useState } from "react";
import { STRINGS } from "../../../../../utils/base";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import {
	HeaderMenuContainer,
	TabContainer,
	ContBody,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import { ContainerHeader } from "../../../../sharedComponents/AppComponents/MainHeader";
import HeaderNavLink from "../../../../sharedComponents/AppComponents/MainHeader/HeaderNavLink";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import "../../styles/Travel.css";
import TravelComposer from "../TravelComposer/TravelComposer";
import TopBar from "../../../../sharedComponents/topBar/topBar";
import BarNavLink from "./Link";
import {
	AppstoreFilled,
	FilterFilled,
	UnorderedListOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Table } from "../customTable/index";
import { FilterSortEnum } from "../../../../../utils/Shared/enums/enums";
import { useDispatch, useSelector } from "react-redux";
import { getAllTravel } from "../../store/actions";
import { travelStatus } from "../../enums/enums";
const columns = [
	{
		title: "Sort",
		dataIndex: "sort",
		drag: true,
		width: 10,
	},

	{
		title: "Reference No",
		dataIndex: "referenceNo",
		sort: true,
		width: 100,
	},
	{
		title: "Status",
		dataIndex: "status",
		sort: true,
		tag: true,
		width: 50,
	},
	{
		title: "Subject",
		dataIndex: "subject",
		width: 200,
	},
	{
		title: "Description",
		dataIndex: "description",
		width: 200,
	},
	{
		title: "Agent Status",
		dataIndex: "agentStatus",
		width: 200,
	},
	{
		title: "Actions",
		key: "action",
		action: true,
		actions: ["edit"],
		key: "6",
		width: 100,
	},
];
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

function TravelHeader() {
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
				console.log("onCLick");
			}, // click row
			onDoubleClick: event => {}, // double click row
			onContextMenu: event => {}, // right button click row
			onMouseEnter: event => {}, // mouse enter row
			onMouseLeave: event => {}, // mouse leave row
		};
	};

	useEffect(() => {
		dispatch(getAllTravel(tableColumnFilter));
	}, [tableColumnFilter, dispatch]);

	return (
		<TabContainer>
			<ContainerHeader>
				<HeaderMenuContainer>
					<HeaderNavLink
						activeName={"travel"}
						to={STRINGS.ROUTES.TRAVEL.DEFAULT}
						isDefault={true}
						linkName={label.appHeader.travel.travels}
					/>
				</HeaderMenuContainer>

				<div className="right-menu">
					<div className="travel_drawer">
						<SideDrawer
							children={<TravelComposer />}
							title="Create Travel Expense"
							buttonText="Create Travel"
							isAccessDrawer={false}
						/>
					</div>
				</div>
			</ContainerHeader>
			<TopBar
				buttons={[
					<Button className="filterButton topBtn !h-full !flex !items-center">
						Filter
						<FilterFilled />
					</Button>,
					<BarNavLink
						activeName={"travles"}
						linkName={"Travels"}
						filterType={filter.filterType === 1 && true}
						onClick={() => setFilter({ filterType: 1 })}
					/>,
					<BarNavLink
						activeName={"aprrovals"}
						linkName={"For Approval"}
						filterType={filter.filterType === 2 && true}
						onClick={() => setFilter({ filterType: 2 })}
					/>,
					<BarNavLink
						activeName={"process"}
						linkName={"Agent Process"}
						filterType={filter.filterType === 3 && true}
						onClick={() => setFilter({ filterType: 3 })}
					/>,
				]}
				gridIcons={[
					<div
						onClick={() => setTableView(false)}
						className={`flex justify-center items-center gap-1 ${
							!tableView
								? "topBarIcon gridIcon isActive transition"
								: "topBarIcon gridIcon"
						}`}
					>
						ListView
						<UnorderedListOutlined />
					</div>,
					<div
						onClick={() => setTableView(true)}
						className={`flex justify-center items-center gap-1 ${
							tableView
								? "topBarIcon gridIcon isActive transition"
								: "topBarIcon gridIcon "
						}`}
					>
						TableView
						<AppstoreFilled />
					</div>,
				]}
			/>
			<ContBody className="!block">
				<Table
					columns={columns}
					dragable={true}
					handleChange={handleChange}
					onPageChange={onPageChange}
					onRow={onRow}
					data={success ? travels : []}
					status={travelStatus}
					loadding={loader}
					success={success}
				/>
			</ContBody>
		</TabContainer>
	);
}

export default TravelHeader;
