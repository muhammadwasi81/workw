import React, { useContext, useState } from "react";
import Header from "../../../../layout/header";
import {
  ContBody,
  TabbableContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import { Button } from "antd";
import { ROUTES } from "../../../../../utils/routes";
import PayrollList from "./payrollList";
import { useNavigate } from "react-router-dom";

function Payroll() {
    const navigate = useNavigate();
  const items = [
    {
      name: "Payroll",
      to: `${ROUTES.PAYROLL.ROOT}`,
      renderButton: [1],
    },
  ]; 

  const buttons = [
    {
      buttonText: "",
      render: (
       <Button className="ThemeBtn" onClick={()=>navigate("create")} > Create Payroll </Button>
      ),
    },
  ];

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
