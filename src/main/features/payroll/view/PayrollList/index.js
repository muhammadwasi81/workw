import React, { useContext, useEffect, useState } from "react";
import Header from "../../../../layout/header";
import {
  ContBody,
  TabbableContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import { Button } from "antd";
import { ROUTES } from "../../../../../utils/routes";
import PayrollList from "./payrollList";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllPayroll } from "../../store/actions";
import { payrollDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

function Payroll() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { payrollDictionary, Direction } = payrollDictionaryList[userLanguage];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = [
    {
      name: payrollDictionary.payroll,
      to: `${ROUTES.PAYROLL.ROOT}`,
      renderButton: [1],
    },
  ];
  const buttons = [
    {
      buttonText: "",
      render: (
        <Button className="ThemeBtn" onClick={() => navigate("create")}>
          {payrollDictionary.createPayroll}
        </Button>
      ),
    },
  ];
  useEffect(() => {
    dispatch(getAllPayroll());
  }, []);
  const render = {
    List: <PayrollList />,
    // Table: <ExpenseTableView />,
  };
  return (
    <TabbableContainer>
      <Header items={items} buttons={buttons} />

      <ContBody>{render["List"]}</ContBody>
    </TabbableContainer>
  );
}

export default Payroll;
