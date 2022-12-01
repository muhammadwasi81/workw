import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { Table } from "../../../../../sharedComponents/customTable";
import { getLeadManagerDetailById } from "../../../store/actions";
import {
  handleAssignMemberModal,
  handleSectionDetailModal,
} from "../../../store/slice";
import { tableColumns } from "./tableColumns";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";

function BoardTable({ data, dictionary }) {
  // let details = data?.sections.map(det => ());
  let details = data?.sections.reduce((results, item) => {
    // console.log("results:", results);
    // console.log(item);
    return [...results, ...item.details.map((detail) => ({ ...detail }))];
  }, []);
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext)
  const handleMemberModal = (id) => {
    dispatch(
      handleAssignMemberModal({
        id,
      })
    );
  };

  // console.log("details", details);
  const onRow = (record, rowIndex) => {
    return {
      onClick: (event) => {
        dispatch(getLeadManagerDetailById(record.id));
        dispatch(handleSectionDetailModal());
      }, // click row
      onDoubleClick: (event) => { }, // double click row
      onContextMenu: (event) => { }, // right button click row
      onMouseEnter: (event) => { }, // mouse enter row
      onMouseLeave: (event) => { }, // mouse leave row
    };
  };
  return (
    <Table
      columns={tableColumns(data?.sections, handleMemberModal, userLanguage)}
      dragable={false}
      onRow={onRow}
      data={details}
    //   columns={tableColumns(dictionary)}
    // handleChange={handleColumnSorting}
    // onPageChange={onPageChange}
    // status={travelStatus}
    // loading={loader}
    // success={success}
    // onActionClick={onActionClick}
    />
  );
}

export default BoardTable;
