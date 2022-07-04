import React from "react";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import TopBar from "../view/TopBar/index";
import Header from "../view/Header/index";
import ListItem from "./ListItem/index";
import { CardWrapper3 } from "../../../sharedComponents/Card/CardStyle";

function Careers() {
  return (
    <>
      <TabbableContainer>
        <Header />
        <TopBar />
        <ContBody>
          <CardWrapper3>
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
          </CardWrapper3>
        </ContBody>
      </TabbableContainer>
    </>
  );
}

export default Careers;
