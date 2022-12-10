import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { documentDictionaryList } from "../../localization/index";
import TopBar from "../../../../sharedComponents/topBar/topBar";
import { handleChangeTab, handleChangeView } from "../../store/slice";

const FilterBar = ({ width }) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { documentDictionary } = documentDictionaryList[userLanguage];
  const dispatch = useDispatch();
  const handleTabChange = (tab) => {
    dispatch(handleChangeTab(tab));
  };
  const handleTableChange = (status) => {
    dispatch(handleChangeView(status));
  };
  return (
    <TopBar
      width={width}
      onSearch={(value) => {
        console.log(value);
      }}
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
      segment={{
        onSegment: (value) => {
          if (value === documentDictionary.table) {
            handleTableChange(true);
          } else {
            handleTableChange(false);
          }
        },
        label1: documentDictionary.list,
        label2: documentDictionary.table,
      }}
    />
  );
};

export default FilterBar;
