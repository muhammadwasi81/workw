import { Table } from "antd";
import React from "react";

function CustomTable(props) {
	const { columns, dataSource, pagination, rowKey, components } = props;

	return (
		<>
			<Table
				pagination={pagination}
				dataSource={dataSource}
				columns={columns}
				rowKey={rowKey}
				components={components}
				scroll={{ x: 500, y: 500 }}
				style={{ zIndex: 100000 }}
			/>
		</>
	);
}

export default CustomTable;
