import React from "react";
import { useParams } from "react-router-dom";
import ExperienceForm from "../employee/view/experienceForm";

function Index() {
  const { id } = useParams();
  return <ExperienceForm id={id} mode="edit" />;
}

export default Index;
