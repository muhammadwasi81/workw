import React from "react";
import Tab from "../../../../sharedComponents/Tab";
import QuestionList from "./TeamAppraisal/questionList";
import TaskList from "./TeamAppraisal/TaskList";

function DetailTabs({ questions, tasks }) {
  //TODO: approvers will be added when we will get approvers from the backend
  const panes = [
    {
      featureId: 0,
      featureName: "Questions",
      content: <QuestionList questions={questions} />,
    },
    {
      featureId: 1,
      featureName: "Approvers",
      content: <div>my dummy approvers</div>,
    },
    {
      featureId: 2,
      featureName: "Tasks",
      content: <TaskList tasks={tasks} />,
    },
  ];
  return (
    <div className="detailTabs">
      <Tab panes={panes} />
    </div>
  );
}

export default DetailTabs;
