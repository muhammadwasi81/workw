import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import TopBar from "../../../../sharedComponents/topBar/topBar";
import { handleChangeTab } from "../../store/slice";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { appraisalDictionaryList } from "../../localization/index";

function Index(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { appraisalDictionary } = appraisalDictionaryList[userLanguage];
  const { allAppraisals, myAppraisals, forApprovals } = appraisalDictionary;
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({ filterType: 0, search: "" });
  const [search, setSearch] = useState("");

  const handleTabChange = (tab) => {
    dispatch(handleChangeTab(tab));
    console.log(props);
  };

  const onSegmentChange = (val) => {
    props.segment(val);
  };

  return (
    <>
      <TopBar
        onSearch={(value) => {
          props.onSearch(value);
        }}
        buttons={[
          {
            name: allAppraisals,
            to: "allAppraisals",
            onClick: handleTabChange,
          },
          {
            name: myAppraisals,
            to: "myAppraisals",
            onClick: handleTabChange,
          },
          {
            name: forApprovals,
            to: "forApprovals",
            onClick: handleTabChange,
          },
        ]}
        segment={{
          onSegment: (value) => onSegmentChange(value),
          label1: "List",
          label2: "Table",
        }}
      />
    </>
  );
}

export default Index;
