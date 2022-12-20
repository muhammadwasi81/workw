import React from "react";
import { Table } from "../../../../../sharedComponents/customTable";
import { tableColumn } from "../SubmitAppraisal/TableColumn";

const TaskList = ({ tasks }) => {
  return (
    <>
      <Table
        columns={tableColumn()}
        // handleChange={handleColumnSorting}
        dragable={true}
        // Data will be from get all Tasks of that user
        data={tasks ? tasks : []}
      />
    </>
  );
};

export default TaskList;
