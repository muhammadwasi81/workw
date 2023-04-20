import React, { useEffect } from "react";
import Header from "../../../layout/header";
import { ROUTES } from "../../../../utils/routes";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import GroupContainer from "./groupsConatiner/GroupContainer";
import "../styles/style.css";
import RewardContainer from "./rewardsConatiner/RewardContainer";
import UserContainer from "./usersContainer";
import LeadContainer from "./leadContainer/LeadContainer";
import { globalSearch } from "../store/actions";
import { Route, Routes } from "react-router-dom";
import Groups from "../../groups/view";
import { useDispatch, useSelector } from "react-redux";
import GlobalSearch from "../panel";
function Index() {
  const dispatch = useDispatch();

  const items = [
    {
      name: "Search",
      to: `${ROUTES.SEARCH.DEFAULT}`,
      renderButton: [1],
    },
  ];

  return (
    <TabbableContainer>
      <Header items={items} />
      <ContBody>
        <GlobalSearch />
      </ContBody>
    </TabbableContainer>
  );
}

export default Index;
