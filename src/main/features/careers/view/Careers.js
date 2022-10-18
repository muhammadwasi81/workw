import React, { useEffect, useState } from "react";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "./Header/filterBar";
import Header from "../../../layout/header/index";
import CareersListView from "./CareersListView";
import { getAllCareerAction } from "../store/action";
import { handleOpenComposer } from "../store/slice";
import MyCareersListView from "./MyCareersListView";
import CareerCard from "./CareersCard/index";
import MyCareerCard from "./MyCareerCard/index";
import ForApprovalCard from "./ForApprovalCard/index";
import Composer from "./Composers/index";

function Careers() {
  const CurrentTab = useSelector((state) => state.careerSlice.currentTab);
  const { drawerOpen } = useSelector((state) => state.careerSlice);
  // console.log(drawerOpen);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("List");
  // console.log(CurrentTab);
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

  // const onClose = (val) => {
  //   console.log("settng drawer close");
  //   setDrawerOpen(val);
  // };

  return (
    <>
      <TabbableContainer>
        <Header
          buttons={[
            {
              buttonText: "Create Career",
              render: (
                <Button
                  className="ThemeBtn"
                  onClick={() => dispatch(handleOpenComposer(true))}
                >
                  Create Career
                </Button>
              ),
            },
          ]}
        />
        <TopBar
          segment={(val) => segmentChange(val)}
          onSearch={(val) => setSearch(val)}
        />
        <ContBody>{RenderTab[CurrentTab]}</ContBody>
        <Drawer
          title={
            <h1
              style={{
                fontSize: "20px",
                margin: 0,
              }}
            >
              Create Job
            </h1>
          }
          width="768"
          onClose={() => {
            dispatch(handleOpenComposer(false));
          }}
          visible={drawerOpen}
          destroyOnClose={true}
          className="detailedViewComposer drawerSecondary"
        >
          <Composer />
        </Drawer>
      </TabbableContainer>
    </>
  );
}

export default Careers;
