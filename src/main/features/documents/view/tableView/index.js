import React from "react";
import { Table } from "../../../../sharedComponents/customTable";
import { tableColumn } from "./TaskColumns";

const DocumentTableView = ({ isTable, list }) => {
  if (!isTable)
    return <></>

  return (
    <div>
      <Table
        columns={tableColumn()}
        dragable={true}
        data={list ? list : []}
      />
    </div>
  )
};

export default DocumentTableView;
