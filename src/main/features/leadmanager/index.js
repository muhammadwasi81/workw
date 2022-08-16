import React, { useContext, useEffect, useState } from "react";
import {
	ContBody,
	TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import Header from "./view/Header/Header";
import Board from "./view/Board/Board";
import LeadTopBar from "./view/LeadTopBar/TopBar";
import LeadDashboard from "./view/Dashboard/Dashboard";
import { LeadManagerDictionary } from "./localization";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { useDispatch, useNavigate, useSelector } from "react-redux";
import { getAllLeadManager } from "./store/actions";

function LeadManager() {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { LeadManagerDictionaryList, Direction } = LeadManagerDictionary[
		userLanguage
	];
	const { topBar } = LeadManagerDictionaryList;
	const [isTableView, setIsTableView] = useState(false);
	const [search, setSearch] = useState("");
	const dispatch = useDispatch();
	const leadManagerData = useSelector(
		state => state.leadMangerSlice.leadManagersData
	);
	// const loading = useSelector(state => state.leadMangerSlice.loading);
	useEffect(() => {
		dispatch(
			getAllLeadManager({
				pageNo: 1,
				pageSize: 20,
				search,
				sortBy: 1,
			})
		);
	}, [search]);
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
				/>
			</ContBody>
		</TabbableContainer>
	);
}

export default LeadManager;
