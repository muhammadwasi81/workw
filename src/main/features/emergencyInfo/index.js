import React from "react";
import { useParams } from "react-router-dom";
import EmergencyForm from "../employee/view/emergencyForm";

function Index() {
  const { id } = useParams();
  return <EmergencyForm id={id} mode="edit" />;
}

export default Index;
