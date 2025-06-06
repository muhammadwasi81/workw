import React from "react";
import { useParams } from "react-router-dom";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import AssetsDetailCard from "./assetsDetailedCard";
function IndividualDetail(props) {
  const param = useParams();
  const id = param.id;

  const detailId = id ? id : props.id;

  return (
    <TabbableContainer>
      <ContBody>
        <div className="DetailContainer w-full">
          <AssetsDetailCard id={detailId} />
        </div>
      </ContBody>
    </TabbableContainer>
  );
}

export default IndividualDetail;
