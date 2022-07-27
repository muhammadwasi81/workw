import React from "react";
import { Table } from "antd";

function CustomTable(props) {
	return (
		<Table
			{...props}
			className="custom_table"
			rowClassName={"cursor-pointer"}
		/>
	);
}

export default CustomTable;
