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
import { ROUTES } from "../../../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import ForApproval from "./components/ForApproval";
import { useNavigate } from "react-router-dom";

function Appraisals() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CurrentTab = useSelector(
    (state) => state.appraisalModuleSlice.currentTab
  );
  let RenderTab = {
    teamAppraisals: <TeamAppraisals />,
    myAppraisals: <ForApproval />,
    forApprovals: <ForApproval />,
  };

  const items = [
    {
      name: "Appraisals",
      to: `${ROUTES.APPRAISALS.ROOT}`,
      renderButton: [1],
    },
  ];

  const onCreateAppraisal = () => {
    navigate("submitAppraisal");
  };

  return (
    <>
      <TabbableContainer>
        <Header
          items={items}
          buttons={[
            {
              buttonText: "Create Appraisals",
              render: (
                <Button
                  className="ThemeBtn"
                  onClick={() => onCreateAppraisal()}
                >
                  <PlusOutlined />
                  Create Appraisals
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
