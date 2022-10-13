import React, { useEffect } from "react";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "./Header/filterBar";
import Header from "./Header/header";
import CareersListView from "./CareersListView";
import { getAllCareerAction } from "../store/action";
import MyCareersListView from "./MyCareersListView";

function Careers() {
  const CurrentTab = useSelector((state) => state.careerSlice.currentTab);
  console.log(CurrentTab);
  const dispatch = useDispatch();
  useEffect(() => {
    if (CurrentTab === "careers") {
      console.log("careers");
      let payload = {
        filterType: 0,
      };
      dispatch(getAllCareerAction(payload));
    } else {
      console.log("careers");
      let payload = {
        filterType:
          CurrentTab === "myCareers"
            ? 1
            : CurrentTab === "forApprovals"
            ? 2
            : null,
      };
      dispatch(getAllCareerAction(payload));
    }
  }, [CurrentTab]);

  let RenderTab = {
    careers: <MyCareersListView />,
    myCareers: <MyCareersListView />,
    forApprovals: <MyCareersListView />,
  };

  return (
    <>
      <TabbableContainer>
        <Header />
        <TopBar />
        <ContBody>
          {RenderTab[CurrentTab]}
          {/* <CareersListView /> */}
        </ContBody>
      </TabbableContainer>
    </>
  );
}

export default Careers;
