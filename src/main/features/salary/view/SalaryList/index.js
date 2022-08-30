import React, { useContext, useEffect, useState } from "react";
import Header from "../../../../layout/header";
import {
  ContBody,
  TabbableContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import { Button } from "antd";
import { ROUTES } from "../../../../../utils/routes";
import SalaryList from "./salaryList";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMultipleEmployeeSalary, getAllEmployeeSalary } from "../../store/actions";

function Salaries() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        <Button className="ThemeBtn" onClick={() => navigate("create")} > Create Salary </Button>
      ),
    }
  ];
  useEffect(() => {
    dispatch(getAllEmployeeSalary())
  }, [])

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
