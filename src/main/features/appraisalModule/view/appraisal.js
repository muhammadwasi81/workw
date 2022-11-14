import React, { useEffect, useState, useContext } from "react";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import TopBar from "./Header/filterBar";
import TeamAppraisals from "./components/TeamAppraisal/index";
import Header from "../../../layout/header/index";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { handleOpenComposer } from "../store/slice";
import { useDispatch, useSelector } from "react-redux";
import ForApproval from "./components/ForApproval";

function Appraisals() {
  const dispatch = useDispatch();
  const CurrentTab = useSelector(
    (state) => state.appraisalModuleSlice.currentTab
  );
  let RenderTab = {
    teamAppraisals: <TeamAppraisals />,
    myAppraisals: <ForApproval />,
    forApprovals: <ForApproval />,
  };

  return (
    <>
      <TabbableContainer>
        <Header
          buttons={[
            {
              buttonText: "Create Appraisals",
              render: (
                <Button
                  className="ThemeBtn"
                  onClick={() => dispatch(handleOpenComposer(true))}
                >
                  <PlusOutlined />
                  Submit Appraisals
                </Button>
              ),
            },
          ]}
        />
        <TopBar onSearch={(val) => console.log(val)} />
        <ContBody>{RenderTab[CurrentTab]}</ContBody>
      </TabbableContainer>
    </>
  );
}

export default Appraisals;
