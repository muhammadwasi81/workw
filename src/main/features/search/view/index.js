import React, { useEffect } from "react";
import Header from "../../../layout/header";
import { ROUTES } from "../../../../utils/routes";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import GroupContainer from "../components/groupsConatiner/GroupContainer";
import "../styles/style.css";
import RewardContainer from "../components/rewardsConatiner/GroupContainer";
import UserContainer from "../components/usersContainer";
import { globalSearch } from "../store/actions";
import { Route, Routes } from "react-router-dom";
import Groups from "../../groups/view";
import { useDispatch, useSelector } from "react-redux";
import { SearchFilterEnum } from "../enums/enums";

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
        <div className="mainSearchContainer">
          <GroupContainer />
          <RewardContainer />
          <UserContainer />
          {/* <Routes>
            <Route path="/search?q=groups" element={<Groups />} />
          </Routes> */}
        </div>
      </ContBody>
    </TabbableContainer>
  );
}

export default Index;
