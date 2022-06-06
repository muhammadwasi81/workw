import React from "react";
import "./index.css";
import { ContBody, TabbableContainer } from "../../sharedComponents/AppComponents/MainFlexContainer";
import Header from "./header";
import LeftColumn from "./LeftColumn/index";
import RightColumn from "./RightColumn/index";

const Index = () => {
  return (
    <TabbableContainer>
      <Header />
      <ContBody>
        <LeftColumn />
        <RightColumn />
      </ContBody>
    </TabbableContainer>
  );
};

export default Index;
