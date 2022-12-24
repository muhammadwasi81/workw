import React from "react";
import { useParams } from "react-router-dom";
import {
  ContBody,
  TabbableContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import TravelDetail from "./TravelDetail";

function IndividualDetail(props) {
  const param = useParams();
  const id = param.travelId;

  const detailId = id ? id : props.travelId;
  console.log(detailId);
  return (
    <TabbableContainer>
      <ContBody>
        <div className="DetailContainer w-full">
          <TravelDetail id={detailId} />
        </div>
      </ContBody>
    </TabbableContainer>
  );
}

export default IndividualDetail;
