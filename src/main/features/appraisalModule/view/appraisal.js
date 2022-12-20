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
import { tableColumn } from "./tableColumn";
import { Table } from "../../../sharedComponents/customTable";

function Appraisals() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { appraisalDictionary } = appraisalDictionaryList[userLanguage];
  const { Appraisals, createAppraisals } = appraisalDictionary;
  const [view, setView] = useState("List");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CurrentTab = useSelector(
    (state) => state.appraisalModuleSlice.currentTab
  );
  const { appraisals } = useSelector((state) => state.appraisalModuleSlice);
  console.log(appraisals);
  let RenderTab = {
    teamAppraisals: <TeamAppraisals />,
    myAppraisals: <TeamAppraisals />,
    forApprovals: <ForApproval />,
  };

  const items = [
    {
      name: Appraisals,
      to: `${ROUTES.APPRAISALS.ROOT}`,
      renderButton: [1],
    },
  ];

  useEffect(() => {
    dispatch(
      getAllAppraisalAction({
        pageNo: 1,
        filterType: 1,
      })
    );
  }, []);

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
        <TopBar
          onSearch={(val) => console.log(val)}
          segment={(val) => setView(val)}
        />
        <ContBody>
          {view === "List" && RenderTab[CurrentTab]}
          {view === "Table" && (
            <Table
              columns={tableColumn()}
              // handleChange={handleColumnSorting}
              dragable={true}
              data={appraisals ? appraisals : []}
            />
          )}
        </ContBody>
      </TabbableContainer>
    </>
  );
}

export default Appraisals;
