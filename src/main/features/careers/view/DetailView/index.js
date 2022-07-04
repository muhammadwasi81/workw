import React from "react";
import { ROUTES } from "../../../../../utils/routes";
import { ContBody, TabbableContainer } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import Header from "../../view/Header/index";
import Card from "./Card";
import styled from "styled-components";
import "../styles/style.css";

function JobDetails() {
  return (
    <TabbableContainer>
      <Header />
      <ContBody>
        <CardWrapper>
          <Card />
        </CardWrapper>
      </ContBody>
    </TabbableContainer>
  );
}

export default JobDetails;

export const CardWrapper = styled.div`
  width: 100%;
  display: grid;
  margin-top: 5px;
  gap: 0.5rem;
  height: -moz-fit-content;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  direction: ltr;
  margin: 0 auto;
  display: block;
  &:hover {
  }
`;
