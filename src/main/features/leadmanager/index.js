import React, { useContext, useEffect, useState } from "react";
import {
	ContBody,
	TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import Header from "./view/Header/Header";
import LeadTopBar from "./view/LeadTopBar/TopBar";
import LeadDashboard from "./view/Dashboard/Dashboard";
import { LeadManagerDictionary } from "./localization";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { useDispatch, useNavigate, useSelector } from "react-redux";
import { getAllLeadManager } from "./store/actions";
import useDebounce from "../../../utils/Shared/helper/use-debounce";
import Spinner from "../../sharedComponents/spinner/spinner";

function LeadManager() {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { LeadManagerDictionaryList, Direction } = LeadManagerDictionary[
		userLanguage
	];
	const { topBar } = LeadManagerDictionaryList;
	const [isTableView, setIsTableView] = useState(false);
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState(1);
	const [page, setPage] = useState(20);
	const [pageNo, setPageNo] = useState(1);
	const value = useDebounce(search, 500);
	const dispatch = useDispatch();
	const leadManagerData = useSelector(
		state => state.leadMangerSlice.leadManagersData
	);
	const loading = useSelector(state => state.leadMangerSlice.loading);
	useEffect(() => {
		dispatch(
			getAllLeadManager({
				pageNo,
				pageSize: page,
				search: value,
				sortBy: sort,
			})
		);
	}, [value, sort, page, pageNo]);

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
	return (
		<TabbableContainer>
			<Header
				dictionary={LeadManagerDictionaryList}
				direction={Direction}
			/>
			<LeadTopBar
				handleView={isTable => {
					setIsTableView(isTable);
				}}
				handleSearch={search => {
					setSearch(search);
				}}
				topBar={topBar}
			/>
			<ContBody className="!block" direction={Direction}>
				<LeadDashboard
					isTableView={isTableView}
					dictionary={LeadManagerDictionaryList}
					data={leadManagerData}
					onChange={handleColumnSorting}
				/>
			</ContBody>
		</TabbableContainer>
	);
}

export default LeadManager;
