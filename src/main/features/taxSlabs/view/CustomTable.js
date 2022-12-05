import React, { useEffect, useState } from "react";
import { Table, Tag, Space, message, Empty, Skeleton } from "antd";
import PropTypes from "prop-types";
import "../style/customTable.css";
function CustomTable(props) {
	const [columns, setColumns] = useState([]);
	const [isColumnsAdded, setIsColumnsAdded] = useState(false);
	const { columns: col, actions, ActionNode } = props;

	useEffect(() => {
		if (col.length > 0) {
			col.forEach(element => {
				// console.log("col", col.length);
				const columnObj = {
					title: capitalizeFirstLetter(element),
					key: element,
					dataIndex: element,
				};
				setColumns(prevColumns => [...prevColumns, columnObj]);
				setIsColumnsAdded(true);
			});
		}
	}, [col.length]);
	// console.log("action node");
	const onActionClick = (text, record) => {
		props.onActionClick(text, record);
	};
	useEffect(() => {
		if (isColumnsAdded) {
			if (actions) {
				const columnObj = {
					title: "Action",
					key: "action",
					render: (text, record) => (
						<ActionNode
							onClick={() => {
								onActionClick(text, record);
							}}
						/>
					),
				};
				setColumns(prevColumns => [...prevColumns, columnObj]);
			}
		}
	}, [actions, isColumnsAdded]);

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	return (
		<div className="custom_table_container">
			<Table
				pagination={props.pagination}
				columns={columns}
				dataSource={props.dataSource}
				className={props.className}
				bordered={props.bordered}
				rowClassName={(record, index) =>
					index % 2 === 0 ? "table-row-light" : "table-row-dark"
				}
				locale={{
					emptyText: props.loading ? (
						<Skeleton active={true} />
					) : (
						<Empty />
					),
				}}
				onRow={(record, rowIndex) => {
					return {
						onClick: event => {}, // click row
						onDoubleClick: event => {}, // double click row
						onContextMenu: event => {}, // right button click row
						onMouseEnter: event => {}, // mouse enter row
						onMouseLeave: event => {}, // mouse leave row
					};
				}}
			/>
		</div>
	);
}
CustomTable.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
	className: PropTypes.string,
	bordered: PropTypes.bool,
	loading: PropTypes.bool,
};

CustomTable.defaultProps = {
	columns: [],
	dataSource: [],
	className: "",
	bordered: true,
	loading: false,
};
export default CustomTable;
