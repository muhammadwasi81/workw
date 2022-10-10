import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TabbableContainer, ContBody } from "../../layout/GridStyle";
import Header from "../../layout/header";
import SideDrawer from "../../sharedComponents/Drawer/SideDrawer";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { LoanDictionary } from "./localization";
import TopBar from "../../sharedComponents/topBar/topBar";
import { toggleCreateComposer } from "./store/slice";
import Composer from "./composer";
import "./style.css";
import styled from "styled-components";
import ListView from "./ListView";
import ListBoxes from "./ListBoxes";
import DetailedView from "./DetailedView";
import { CloseDetailView } from "../../../store/appReducer/loanSlice";
import { Table } from "../../sharedComponents/customTable";
import { tableColumn } from "./TableColumn";
import { LoanFilterTypeEnum } from "./enum/index";
import getStoredState from "redux-persist/es/getStoredState";
import { getAllLoans } from "./store/actions";

function Index() {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { loanDictionaryList } = LoanDictionary[userLanguage];
	const dispatch = useDispatch();
	const { loanList, listItem, isCreateComposer } = useSelector(
		state => state.loanSlice
	);

	const [tableView, setTableView] = useState(false);
	const [viewType, setViewType] = useState("List");
	const [search, setSearch] = useState("");

	const [filter, setFilter] = useState({ filterType: 0, search: "" });

	// const [detailViewIsVisible, setDetailViewIsVisible] = useState(true);

	// useEffect(() => {
	//   dispatch(getAllRewards(filter));
	// }, [filter]);

	useEffect(() => {
		dispatch(
			getAllLoans({
				filter,
				search,
			})
		);
	}, [filter, search]);

	const closeDetailView = () => {
		dispatch(CloseDetailView());
		// setDetailViewIsVisible(false);
	};

	const onSearch = value => setSearch(value);
	const onSegment = value => setViewType(value);
	console.log("iscerate***", isCreateComposer);
	return (
		<TabbableContainer>
			<Header
				buttons={[
					{
						buttonText: "Create Loan",
						// onClick: () => setVisible(true),
						render: (
							<SideDrawer
								title={loanDictionaryList.createLoan}
								buttonText={loanDictionaryList.createLoan}
								success={isCreateComposer}
								setOpenDrawer={() =>
									dispatch(toggleCreateComposer())
								}
								isAccessDrawer={true}
								openDrawer={isCreateComposer}
								setIsEdited={() => {}}
							>
								<Composer />
							</SideDrawer>
						),
					},
				]}
			/>
			<TopBar
				onSearch={onSearch}
				buttons={[
					{
						name: "Loans",
						onClick: () =>
							setFilter({ filterType: LoanFilterTypeEnum.All }),
					},
					{
						name: "For Approval",
						onClick: () =>
							setFilter({
								filterType: LoanFilterTypeEnum.ForApproval,
							}),
					},
					{
						name: "Loans To Me",
						onClick: () =>
							setFilter({
								filterType:
									LoanFilterTypeEnum.CreatedByMeAndLoanOfMe,
							}),
					},
				]}
				filter={{
					onFilter: () => {},
				}}
				segment={{
					onSegment: value => {
						if (value === "Table") {
							setTableView(true);
							console.log(tableView);
						} else {
							setTableView(false);
						}
					},
					label1: "List",
					label2: "Table",
				}}
			/>

			<ContBody className="!block">
				{tableView && (
					<Table
						columns={tableColumn()}
						dragable={true}
						data={loanList ? loanList : []}
					/>
				)}

				{/* {!tableView && <ListBoxes />} */}

				{!tableView && <ListView filter={filter} />}
				{/* 
        {render[view]}
        {render[viewType]} */}
			</ContBody>
			{/* {listItem && (
				<DetailedView onClose={closeDetailView} visible={listItem} />
			)} */}
		</TabbableContainer>
	);
}

export default Index;
