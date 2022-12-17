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
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { appraisalDictionaryList } from "../localization/index";
import { getAllAppraisalAction } from "../store/action";

function Appraisals() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { appraisalDictionary } = appraisalDictionaryList[userLanguage];
  const { appraisals, createAppraisals } = appraisalDictionary;
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
      name: appraisals,
      to: `${ROUTES.APPRAISALS.ROOT}`,
      renderButton: [1],
    },
  ];

  useEffect(()=> {
    dispatch(getAllAppraisalAction({
      pageSize: 50,
      search: "",
      filterType: 0,
      sortBy: 1
    }))
  },[])

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
              buttonText: createAppraisals,
              render: (
                <Button
                  className="ThemeBtn"
                  onClick={() => onCreateAppraisal()}
                >
                  <PlusOutlined />
                  {createAppraisals}
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
