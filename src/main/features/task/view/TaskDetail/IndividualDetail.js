import React from "react";
import { useParams } from "react-router-dom";
import {
  ContBody,
  TabbableContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import TaskDetail from "./TaskDetail";
import "../style/task.css";

function IndividualDetail(props) {
  const param = useParams();
  const id = param.id;

  const detailId = id ? id : props.id;
  console.log(detailId, "task iddd");

  return (
    <TabbableContainer>
      <ContBody>
        <div className="DetailContainer w-full">
          <TaskDetail id={detailId} />
        </div>
      </ContBody>
    </TabbableContainer>
  );
}

export default IndividualDetail;
