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
import { current } from "@reduxjs/toolkit";
import DetailedView from "./components/DetailedView";

function Appraisals() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { appraisalDictionary } = appraisalDictionaryList[userLanguage];
  const { Appraisals, createAppraisals } = appraisalDictionary;
  const [view, setView] = useState("List");
  const [detailId, setDetailId] = useState(null);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CurrentTab = useSelector(
    (state) => state.appraisalModuleSlice.currentTab
  );
  const { appraisals } = useSelector((state) => state.appraisalModuleSlice);
  let RenderTab = {
    allAppraisals: <TeamAppraisals />,
    myAppraisals: <TeamAppraisals />,
    forApprovals: <TeamAppraisals />,
  };

  const items = [
    {
      name: Appraisals,
      to: `${ROUTES.APPRAISALS.ROOT}`,
      renderButton: [1],
    },
  ];

  useEffect(() => {
    if (CurrentTab === "allAppraisals") {
      let payload = {
        filterType: 0,
        search: search,
        // sortBy: sort,
      };
      dispatch(getAllAppraisalAction(payload));
    } else {
      let payload = {
        filterType:
          CurrentTab === "myAppraisals"
            ? 1
            : CurrentTab === "forApprovals"
            ? 2
            : null,
        search: search,
        // sortBy: sort,
      };
      dispatch(getAllAppraisalAction(payload));
    }
  }, [CurrentTab, search]);

  const onCreateAppraisal = () => {
    navigate("submitAppraisal");
  };

  const onClose = () => {
    setDetailId(null);
    console.log("onclose");
  };

  const onRow = (record, rowIndex) => {
    return {
      onClick: (event) => {
        console.log(record.id, "ID");
        setDetailId(record.id);
      },
      onDoubleClick: (event) => {}, // double click row
      onContextMenu: (event) => {}, // right button click row
      onMouseEnter: (event) => {}, // mouse enter row
      onMouseLeave: (event) => {}, // mouse leave row
    };
  };

  return (
    <>
      <DetailedView id={detailId} onClose={onClose} />
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
          onSearch={(val) => setSearch(val)}
          segment={(val) => setView(val)}
        />
        <ContBody>
          {view === "List" && RenderTab[CurrentTab]}
          {view === "Table" && (
            <Table
              columns={tableColumn()}
              // handleChange={handleColumnSorting}
              onRow={onRow}
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
