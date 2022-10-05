import React from "react";
import {
	ContBody,
	TabContainer,
} from "../../../../../sharedComponents/AppComponents/MainFlexContainer";
import { Table } from "../../../../../sharedComponents/customTable";
import { tableColumns } from "./tableColumns";

function BoardTable({ data }) {
	// let details = data?.sections.map(det => ());
	console.log("details", details);
	return (
		<Table
			columns={tableColumns(data)}
			dragable={false}
			// handleChange={handleColumnSorting}
			// onPageChange={onPageChange}
			// onRow={onRow}
			data={data?.sections}
			// status={travelStatus}
			// loading={loader}
			// success={success}
			// onActionClick={onActionClick}
		/>
	);
}

export default BoardTable;
