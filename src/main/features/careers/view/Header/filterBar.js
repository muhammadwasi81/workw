import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../../localization";
import TopBar from "../../../../sharedComponents/topBar/topBar";
import { getAllCareerAction } from "../../store/action";
import { handleChangeTab } from "../../store/slice";
import { CareerFilterEnum } from "../../enum/index";

function Index(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList } = CareerDictionary[userLanguage];
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({ filterType: 0, search: "" });
  const [search, setSearch] = useState("");
  // const [tableView, setTableView] = useState(false);
  const { labels } = CareerDictionaryList;
  // console.log(labels);

  const handleTabChange = (tab) => {
    dispatch(handleChangeTab(tab));
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
            name: labels.careers,
            to: "careers",
            onClick: handleTabChange,
          },
          {
            name: labels.myCareer,
            to: "myCareers",
            onClick: handleTabChange,
          },
          {
            name: labels.forApproval,
            to: "forApprovals",
            onClick: handleTabChange,
          },
        ]}
        // ]}
        // filter={{
        //   onFilter: () => {},
        // }}
        segment={{
          // onSegment: (value) => {
          //   if (value === "Table") {
          //     setTableView(true);
          //   } else {
          //     setTableView(false);
          //   }
          // },
          onSegment: (value) => onSegmentChange(value),
          label1: labels.list,
          label2: labels.table,
        }}
      />
    </>
  );
}

export default Index;
