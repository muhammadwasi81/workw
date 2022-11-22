import React, { useContext, useState } from "react";
import { STRINGS } from "../../../utils/base";
import { dictionaryList } from "../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import Header from "../../layout/header";
import {
	ContBody,
	TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import TopBar from "../../sharedComponents/topBar/topBar";
import { ExpenseDictionary } from "./localization";
import ExpenseListView from "./view/ExpenseListView";
import { useDispatch, useSelector } from "react-redux";
import "./style/style.css";
import CreateExpense from "./view/CreateExpense";
import { toggleCreateComposer } from "./store/slice";
import ExpenseTableView from "./view/ExpenseTableView";
import { ExpenseFilterType } from "./enums/expenseCategory";
import { defaultUiid } from "../../../utils/Shared/enums/enums";
import { ExpenseReferenceTypeEnum } from "./enums";
import { handleOpenExpenseComposer } from "./store/slice";
import { Button, Drawer } from "antd";
import OpenCreateExpense from "./view/CreateExpense/OpenCreateExpense";
import SideDrawer from "../../sharedComponents/Drawer/SideDrawer";

function Expenses({
	referenceId = defaultUiid,
	referenceType = ExpenseReferenceTypeEnum.General,
	width = "",
	routeLink,
	backButton,
	feature = "",
}) {
	const [filterType, setFilterType] = useState(ExpenseFilterType.myExpense);
	const { userLanguage } = useContext(LanguageChangeContext);
	const { appHeader, sharedLabels } = dictionaryList[userLanguage];
	const { ExpenseDictionaryList } = ExpenseDictionary[userLanguage];
	const { isCreateComposer, drawerOpen } = useSelector(
		state => state.expenseSlice
	);
	console.log(drawerOpen, "drawerOpen slice");
	const [view, setView] = useState("List");
	const dispatch = useDispatch();
	const { labels } = ExpenseDictionaryList;
	const items = [
		{
			name: appHeader.expense.expenses,
			to: routeLink
				? routeLink
				: `${STRINGS.ROUTES.EXPENSE.DEFAULT}?f=my`,
			renderButton: [1],
		},
	];

	const render = {
		List: (
			<ExpenseListView
				filterType={filterType}
				referenceId={referenceId}
				referenceType={referenceType}
			/>
		),
		Table: <ExpenseTableView />,
	};
	return (
		<TabbableContainer>
			<Header
				items={items}
				buttons={[
					{
						buttonText: ExpenseDictionaryList.createTextBtn,
						render: (
							<SideDrawer
								title={ExpenseDictionaryList.createTextBtn}
								buttonText={ExpenseDictionaryList.createTextBtn}
								handleClose={() =>
									dispatch(handleOpenExpenseComposer(false))
								}
								handleOpen={() =>
									dispatch(handleOpenExpenseComposer(true))
								}
								isOpen={drawerOpen}
								children={<CreateExpense feature={feature} />}
							/>
						),
					},
				]}
				width={width}
				backButton={backButton}
			/>
			<TopBar
				width={width}
				onSearch={value => {
					console.log(value);
				}}
				filter={{
					onFilter: () => {},
				}}
				buttons={[
					{
						name: labels.myExpense,
						onClick: () => {
							setFilterType(ExpenseFilterType.myExpense);
						},
					},
					{
						name: labels.approvals,
						onClick: () => {
							console.log("end");
							setFilterType(ExpenseFilterType.forApprovals);
						},
					},

					{
						name: labels.forExecution,
						onClick: () => {
							setFilterType(ExpenseFilterType.forExcecution);
						},
					},
					{
						name: labels.forFinance,
						onClick: () => {
							setFilterType(ExpenseFilterType.forFinance);
						},
					},
				]}
				segment={{
					onSegment: value => {
						setView(value);
					},
					label1: sharedLabels.List,
					label2: sharedLabels.Table,
				}}
			/>
			<ContBody className={width}>{render[view]}</ContBody>
		</TabbableContainer>
	);
}

export default Expenses;
