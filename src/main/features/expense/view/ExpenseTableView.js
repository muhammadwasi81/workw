import React, { useContext, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { FilterSortEnum } from "../../../../utils/Shared/enums/enums";
import { Table } from "../../../sharedComponents/customTable";
import { ExpenseDictionary } from "../localization";
import { tableColumn, tableColumns } from "./tableColumns";

function ExpenseTableView(props) {
  const initialTableFilter = {
    pageNo: 1,
    pageSize: 20,
    search: "",
    approverStatus: [],
    agentStatus: [],
    filterType: 1,
    sortBy: 1,
    referenceId: "00000000-0000-0000-0000-000000000000",
    referenceType: 0,
  };

  const { userLanguage } = useContext(LanguageChangeContext);
  const { ExpenseDictionaryList } = ExpenseDictionary[userLanguage];
  const { Direction, sharedLabels } = ExpenseDictionaryList;
  const { expenses, loader } = useSelector((state) => state.expenseSlice);
  const [tableColumnFilter, setTableColumnFilter] = useState(
    initialTableFilter
  );
  const onPageChange = (page, pageSize) => {
    console.log("pagination value", page, pageSize);
  };
  const onRow = (record, rowIndex) => {
    return {
        onClick: (event) => {
          props.detail(record.id);
          props.open(true);
        },
      onDoubleClick: (event) => {}, // double click row
      onContextMenu: (event) => {}, // right button click row
      onMouseEnter: (event) => {}, // mouse enter row
      onMouseLeave: (event) => {}, // mouse leave row
    };
  };

  const onActionClick = (row) => {
    console.log("on action click", row);
  };
  const handleChange = (pagination, filters, sorter) => {
    // console.log("pagination", pagination);
    // console.log("filters", filters);
    // console.log("sorter", sorter);

    let filter = onSortClick(sorter);
    setTableColumnFilter((prevState) => ({
      ...prevState,
      ...filter,
    }));
    const onSortClick = (sorter) => {
      let filter = tableColumnFilter;
      if (sorter.field === "referenceNo" && sorter.order === "ascend") {
        filter.sortBy = FilterSortEnum.ReferenceNoAsc;
      }
      if (sorter.field === "referenceNo" && sorter.order === "descend") {
        filter.sortBy = FilterSortEnum.ReferenceNoDesc;
      }
      if (sorter.field === "createDate" && sorter.order === "ascend") {
        filter.sortBy = FilterSortEnum.CreateDateAsc;
      }
      if (sorter.field === "createDate" && sorter.order === "descend") {
        filter.sortBy = FilterSortEnum.CreateDateDesc;
      }
      if (sorter.field === "subject" && sorter.order === "ascend") {
        filter.sortBy = FilterSortEnum.SubjectAsc;
      }
      if (sorter.field === "subject" && sorter.order === "descend") {
        filter.sortBy = FilterSortEnum.SubjectDesc;
      }
      if (sorter.field === "status" && sorter.order === "ascend") {
        filter.sortBy = FilterSortEnum.StatusAsc;
      }
      if (sorter.field === "status" && sorter.order === "descend") {
        filter.sortBy = FilterSortEnum.StatusDesc;
      }
      if (sorter.field === "approverStatus" && sorter.order === "ascend") {
        filter.sortBy = FilterSortEnum.ApproverStatusAsc;
      }
      if (sorter.field === "approverStatus" && sorter.order === "descend") {
        filter.sortBy = FilterSortEnum.ApproverStatusDesc;
      }
      if (sorter.field === "agentStatus" && sorter.order === "ascend") {
        filter.sortBy = FilterSortEnum.AgentStatusAsc;
      }
      if (sorter.field === "agentStatus" && sorter.order === "descend") {
        filter.sortBy = FilterSortEnum.AgentStatusDesc;
      }
      return filter;
    };
    // const offset =
    // 	pagination.current * pagination.pageSize - pagination.pageSize;
    // const limit = pagination.pageSize;
    // const params = {};

    // if (sorter.hasOwnProperty("column")) {
    // 	params.order = { field: sorter.field, dir: sorter.order };
    // }

    // getData(offset, limit, params);
  };
  return (
    <Table
      columns={tableColumn()}
      dragable={true}
      // handleChange={handleChange}
      // onPageChange={onPageChange}
      onRow={onRow}
      data={expenses ? expenses : []}
      // status={travelStatus}
      // loadding={loader}
      // success={success}
      // onActionClick={onActionClick}
    />
  );
}

export default ExpenseTableView;
