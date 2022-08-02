import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { documentDictionaryList } from "../../localization/index";
import TopBar from "../../../../sharedComponents/topBar/topBar";
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
      // onSearch={(value) => {
      //   console.log(value);
      // }}
      buttons={[
        {
          name: documentDictionary.AllDocuments,
          to: "allDocuments",
          onClick: handleTabChange,
        },
        {
          name: documentDictionary.MyDocuments,
          to: "myDocuments",
          onClick: handleTabChange,  
        },
        {
          name: documentDictionary.ForApprovals,
          to: "forApprovals",
          onClick: handleTabChange,
        },
      ]}
    // filter={{
    //   onFilter: () => {},
    // }}
    // segment={{
    //   onSegment: (value) => {
    //     if (value === "Table") {
    //       // setTableView(true);
    //     } else {
    //       // setTableView(false);
    //     }
    //   },
    //   label1: "List",
    //   label2: "Table",
    // }}
    />
  );
};

export default FilterBar;
