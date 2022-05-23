import React from "react";
import { Table } from "antd";

function CustomTable(props) {
	const { columns, pagination, dataSource, bordered, onRow } = props;

	return (
		<>
			<Table
				columns={columns}
				pagination={pagination}
				dataSource={dataSource}
				bordered={bordered}
				onRow={onRow}
				// scroll={{ x: 500, y: 500 }}
			/>
		</>
	);
}

export default CustomTable;
