import React, { useEffect, useState } from "react";
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
import CareerCard from "./CareersCard/index";
import MyCareerCard from "./MyCareerCard/index";
import ForApprovalCard from "./ForApprovalCard/index";

function Careers() {
  const CurrentTab = useSelector((state) => state.careerSlice.currentTab);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("List");
  console.log(CurrentTab);
  const dispatch = useDispatch();
  useEffect(() => {
    if (CurrentTab === "careers") {
      console.log("careers");
      let payload = {
        filterType: 0,
        search: search,
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
        search: search,
      };
      dispatch(getAllCareerAction(payload));
    }
  }, [CurrentTab, search]);

  let RenderTab = {
    careers: <CareerCard view={view} />,
    myCareers: <MyCareerCard view={view} />,
    forApprovals: <ForApprovalCard view={view} />,
  };

  const segmentChange = (val) => {
    setView(val);
  };

  return (
    <>
      <TabbableContainer>
        <Header />
        <TopBar
          segment={(val) => segmentChange(val)}
          onSearch={(val) => setSearch(val)}
        />
        <ContBody>{RenderTab[CurrentTab]}</ContBody>
      </TabbableContainer>
    </>
  );
}

export default Careers;
