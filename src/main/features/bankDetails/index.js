import React from "react";
import { useParams } from "react-router-dom";
import BankForm from "../employee/view/bankDetailForm";

function Index() {
  const { id } = useParams();
  return <BankForm id={id} mode="edit" />;
}

export default Index;
