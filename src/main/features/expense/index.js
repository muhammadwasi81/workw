import React, { useContext, useState } from "react";
import { STRINGS } from "../../../utils/base";
import { dictionaryList } from "../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import Header from "../../layout/header";
import {
  ContBody,
  TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import SideDrawer from "../../sharedComponents/Drawer/SideDrawer";
import TopBar from "../../sharedComponents/topBar/topBar";
import { ExpenseDictionary } from "./localization";
import ExpenseListView from "./view/ExpenseListView";
import { useDispatch, useSelector } from "react-redux";
import "./style/style.css";
import CreateExpense from "./view/CreateExpense";
import { toggleCreateComposer } from "./store/slice";
import ExpenseTableView from "./view/ExpenseTableView";

function Expenses() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { appHeader, sharedLabels } = dictionaryList[userLanguage];
  const { ExpenseDictionaryList } = ExpenseDictionary[userLanguage];
  const { isCreateComposer } = useSelector((state) => state.expenseSlice);
  const [view, setView] = useState("List");
  const dispatch = useDispatch();
  const { labels } = ExpenseDictionaryList;
  const items = [
    {
      name: appHeader.expense.expenses,
      to: `${STRINGS.ROUTES.EXPENSE.DEFAULT}?f=my`,
      renderButton: [1],
    },
  ];
  console.log(isCreateComposer, "isCreateComposer");

  const buttons = [
    {
      buttonText: ExpenseDictionaryList.createTextBtn,
      render: (
        <SideDrawer
          children={<CreateExpense />}
          title={ExpenseDictionaryList.createTextBtn}
          buttonText={ExpenseDictionaryList.createTextBtn}
          success={isCreateComposer}
          setOpenDrawer={() => dispatch(toggleCreateComposer())}
          isAccessDrawer={true}
          openDrawer={isCreateComposer}
          setIsEdited={() => {}}
        />
      ),
    },
  ];

  const render = {
    List: <ExpenseListView />,
    Table: <ExpenseTableView />,
  };
  return (
    <TabbableContainer>
      <Header items={items} buttons={buttons} />
      <TopBar
        onSearch={(value) => {
          console.log(value);
        }}
        filter={{
          onFilter: () => {},
        }}
        buttons={[
          {
            name: labels.approvals,
            onClick: () => {},
          },
          {
            name: labels.myExpense,
            onClick: () => {},
          },
          {
            name: labels.forExecution,
            onClick: () => {},
          },
          {
            name: labels.forFinance,
            onClick: () => {},
          },
        ]}
        segment={{
          onSegment: (value) => {
            setView(value);
          },
          label1: sharedLabels.List,
          label2: sharedLabels.Table,
        }}
      />
      <ContBody>{render[view]}</ContBody>
    </TabbableContainer>
  );
}

export default Expenses;
