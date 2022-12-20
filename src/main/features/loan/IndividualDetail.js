import React from "react";
import { useParams } from "react-router-dom";
import {
  ContBody,
  TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import LoanDetail from "./LoanDetail";

function IndividualDetail(props) {
  const param = useParams();
  const id = param.id;

  const detailId = id ? id : props.id;

  return (
    <TabbableContainer>
      <ContBody>
        <div className="DetailContainer w-full">
          <LoanDetail id={detailId} />
        </div>
      </ContBody>
    </TabbableContainer>
  );
}

export default IndividualDetail;
