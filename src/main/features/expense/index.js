import React, { useContext } from "react";
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
import "./style/style.css";

function Expenses() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { appHeader, sharedLabels } = dictionaryList[userLanguage];
  const { ExpenseDictionaryList } = ExpenseDictionary[userLanguage];
  const { labels } = ExpenseDictionaryList;
  const items = [
    {
      name: appHeader.expense.expenses,
      to: `${STRINGS.ROUTES.EXPENSE.DEFAULT}?f=my`,
      renderButton: [1],
    },
  ];
  const buttons = [
    {
      buttonText: ExpenseDictionaryList.createTextBtn,
      render: (
        <SideDrawer
          title={ExpenseDictionaryList.createTextBtn}
          buttonText={ExpenseDictionaryList.createTextBtn}
        />
      ),
    },
  ];
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
          onSegment: (value) => {},
          label1: sharedLabels.List,
          label2: sharedLabels.Table,
        }}
      />
      <ContBody>
        <ExpenseListView />
      </ContBody>
    </TabbableContainer>
  );
}

export default Expenses;
