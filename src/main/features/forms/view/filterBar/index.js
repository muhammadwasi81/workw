import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import TopBar from "../../../../sharedComponents/topBar/topBar";
import { documentDictionaryList } from "../../localization/index";
import { handleChangeTab } from "../../store/slice";

const FilterBar = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { documentDictionary } = documentDictionaryList[userLanguage];
  const dispatch = useDispatch();
  const handleTabChange = (tab) => {
    dispatch(handleChangeTab(tab))
  }
  return (
    <TopBar
    onSearch={(value) => {
      console.log(value);
    }}
    buttons={[
      {
        name: "All Forms",
        to:"allForms",
        onClick: handleTabChange,
      },
      {
        name: "My Forms",
        to:"myForms",
        onClick: handleTabChange,
      },
      {
        name: "For Approvals",
        to:"forApprovals",
        onClick: handleTabChange,
      },
    ]}
    // filter={{
    //   onFilter: () => {},
    // }}
    segment={{
      onSegment: (value) => {
        if (value === "Table") {
          // setTableView(true);
        } else {
          // setTableView(false);
        }
      },
      label1: "List",
      label2: "Table",
    }}
  />
  );
};

export default FilterBar;
