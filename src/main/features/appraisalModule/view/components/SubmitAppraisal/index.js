import React from "react";
import {
  ContBody,
  TabbableContainer,
} from "../../../../../sharedComponents/AppComponents/MainFlexContainer";

import Header from "../../../../../layout/header/index";
import SubmitAppraisalBody from "./submitAppraisalBody";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

function Index() {
  const CurrentTab = useSelector(
    (state) => state.appraisalModuleSlice.currentTab
  );

  return (
    <>
      <TabbableContainer>
        <Header
          buttons={[
            {
              buttonText: "Submit Appraisals",
              render: (
                <Button
                  className="ThemeBtn"
                  onClick={() => console.log("dispatch submit appraisal here")}
                >
                  <PlusOutlined />
                  Submit Appraisals
                </Button>
              ),
            },
          ]}
        />

        <ContBody>
          <SubmitAppraisalBody />
        </ContBody>
      </TabbableContainer>
    </>
  );
}

export default Index;
