import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { documentDictionaryList } from "../../localization/index";
import TopBar from "../../../../sharedComponents/topBar/topBar";
import { handleChangeTab, handleChangeView } from "../../store/slice";
import { getAllDocument, getAllDocumentList } from "../../store/actions";

const FilterBar = ({
  width,
  CurrentTab,
  ParentId,
  referenceId,
  referenceType,
}) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { documentDictionary } = documentDictionaryList[userLanguage];
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (CurrentTab === "allDocuments") {
      let payload = {
        parentId: ParentId,
        referenceId,
        referenceType,
        search,
      };
      dispatch(getAllDocumentList(payload));
    } else {
      let payload = {
        filterType:
          CurrentTab === "myDocuments"
            ? 2
            : CurrentTab === "forApprovals"
            ? 3
            : null,
        referenceId,
        referenceType,
        search,
      };
      dispatch(getAllDocument(payload));
    }
  }, [ParentId, CurrentTab, search]);
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
        setSearch(value);
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
        }
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
