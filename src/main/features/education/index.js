import React from "react";
import { useParams } from "react-router-dom";
import EducationForm from "../employee/view/educationForm";

function Index() {
  const { id } = useParams();
  return <EducationForm mode={"edit"} id={id} />;
}

export default Index;
