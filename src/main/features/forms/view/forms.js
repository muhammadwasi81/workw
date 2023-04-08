import React, { useState, useEffect, useContext } from "react";
import Header from "./header";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import FilterBar from "./filterBar";
// import FormDetailCards from "./formDetailCards";
import FormShortCard from "./formShortCards";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../../sharedComponents/customTable";
import { getAllForms } from "../store/actions";
import { tableColumn } from "../TableColumn";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { documentDictionaryList } from "../localization/index";
import { Skeleton } from "antd";
import { FeaturePermissionEnum } from "../../../../utils/Shared/enums/featuresEnums";
import DetailedFormView from "./DetailedFormView";

const Forms = ({ dictionary }) => {
  const [filter, setFilter] = useState({ filterType: 0, search: "" });
  const [search, setSearch] = useState("");
  const [tableView, setTableView] = useState(false);
  const { forms } = useSelector((state) => state.formSlice);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { documentDictionary } = documentDictionaryList[userLanguage];
  const dispatch = useDispatch();
  const [detailId, setDetailId] = useState("");

  const [visible, setVisible] = useState(false);

  const onRow = (record, rowIndex) => {
    return {
      onClick: (event) => {
        setDetailId(record.id);
        setVisible(true);
      },
      onDoubleClick: (event) => {}, // double click row
      onContextMenu: (event) => {}, // right button click row
      onMouseEnter: (event) => {}, // mouse enter row
      onMouseLeave: (event) => {}, // mouse leave row
    };
  };

  const handleDrawerClose = () => {
    setVisible(false);
    setDetailId(null);
  }

  useEffect(() => {
    dispatch(
      getAllForms({
        filter,
        search,
      })
    );
  }, [filter, search]);

  const setView = (val) => {
    console.log("set table value");
    setTableView(val);
  };

  return (
    <TabbableContainer>
      <Header />
      <FilterBar onSegment={(val) => setView(val)} />
      <ContBody>
        {tableView && (
          <Table
            columns={tableColumn(documentDictionary)}
            dragable={true}
            data={forms ? forms : []}
            onRow={onRow}
          />
        )}
        {!tableView && <FormShortCard />}
      </ContBody>

      <DetailedFormView id={detailId} visible={visible} onClose={handleDrawerClose}/>
    </TabbableContainer>
  );
};

export default Forms;
