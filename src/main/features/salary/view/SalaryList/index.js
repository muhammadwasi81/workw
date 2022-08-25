import React, { useContext, useState } from "react";
import Header from "../../../../layout/header";
import {
  ContBody,
  TabbableContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import { Button } from "antd";
import { ROUTES } from "../../../../../utils/routes";
import SalaryList from "./salaryList";
import { useNavigate } from "react-router-dom";

function Salaries() {
    const navigate = useNavigate();
  const items = [
    {
      name: "Salary",
      to: `${ROUTES.SALARY.ROOT}`,
      renderButton: [1],
    },
  ]; 

  const buttons = [
    {
      buttonText: "",
      render: (
       <Button className="ThemeBtn" onClick={()=>navigate("create")} > Create Salary </Button>
      ),
    },
  ];

  const render = {
    List: <SalaryList />,
    // Table: <ExpenseTableView />,
  };
  return (
    <TabbableContainer>
      <Header items={items} buttons={buttons} />
     
      <ContBody>{render["List"]}</ContBody>
    </TabbableContainer>
  );
}

export default Salaries;
