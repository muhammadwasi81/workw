// import { Space, Tag } from "antd";
import React from "react";
import "./table.css";
import CustomTable from "./CustomTable";
import {
	SortableContainer,
	SortableElement,
	SortableHandle,
} from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { DragOutlined, MenuOutlined } from "@ant-design/icons";
const DragHandle = SortableHandle(() => (
	<MenuOutlined style={{ cursor: "grab", color: "#999" }} />
));

const DragColumn = SortableHandle(() => (
	<DragOutlined style={{ cursor: "grab", color: "#999" }} />
));
const dragTitle = name => {
	return (
		<div className="flex items-center gap-2">
			<DragColumn />
			{name}
		</div>
	);
};
let columns = [
	{
		title: "Sort",
		dataIndex: "sort",
		key: "0",
		render: () => <DragHandle />,
	},
	{
		title: dragTitle("Name"),
		dataIndex: "name",
		key: "1",
	},
	{
		title: dragTitle("Age"),
		dataIndex: "age",
		key: "2",
	},
	{
		title: dragTitle("Address"),
		dataIndex: "address",
		key: "3",
	},
];

const data = [
	{
		key: "asdasd",
		name: "John Brown",
		age: 32,
		address: "New York No. 1 Lake Park",
		index: 0,
	},
	{
		key: "2",
		name: "Jim Green",
		age: 42,
		address: "London No. 1 Lake Park",
		index: 1,
	},
	{
		key: "3",
		name: "Joe Black",
		age: 32,
		address: "Sidney No. 1 Lake Park",
		index: 2,
	},
];
const SortableColumn = SortableElement(props => <th {...props} />);
const SortableHeader = SortableContainer(props => <thead {...props} />);
const SortableItem = SortableElement(props => {
	return <tr {...props} />;
});
const SortableBody = SortableContainer(props => <tbody {...props} />);

function Table() {
	return (
		<>
			{/* <CustomTable columns={columns} data={data} /> */}
			<SortableTable style={{ zIndex: 99999999 }} />
		</>
	);
}
class SortableTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: data,
			columns,
		};
		// const that = this;
		// this.dragProps = {
		// 	onDragEnd(fromIndex, toIndex) {
		// 		const columns = that.state.columns;
		// 		const item = columns.splice(fromIndex, 1)[0];
		// 		columns.splice(toIndex, 0, item);
		// 		that.setState({
		// 			columns,
		// 		});
		// 	},
		// 	nodeSelector: "th",
		// };
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		const { dataSource } = this.state;
		if (oldIndex !== newIndex) {
			const newData = arrayMoveImmutable(
				[].concat(dataSource),
				oldIndex,
				newIndex
			).filter(el => !!el);
			console.log("Sorted items: ", newData);
			this.setState({ dataSource: newData });
		}
	};
	onSortColumnEnd = ({ oldIndex, newIndex }) => {
		console.log("column drag", oldIndex, newIndex);

		// const { columns } = this.state;
		// if (oldIndex !== newIndex) {
		// 	const newData = arrayMoveImmutable(
		// 		[].concat(columns),
		// 		oldIndex,
		// 		newIndex
		// 	).filter(el => !!el);
		// 	console.log("Sorted items: ", newData);
		// 	this.setState({ columns: newData });
		// }
	};

	DraggableContainer = props => (
		<SortableBody
			useDragHandle
			disableAutoscroll
			helperClass="row-dragging"
			onSortEnd={this.onSortEnd}
			{...props}
		/>
	);
	DraggableColumnContainer = props => {
		console.log("column", props);
		return (
			<SortableHeader
				useDragHandle
				disableAutoscroll
				helperClass="row-dragging"
				onSortEnd={this.onSortEnd}
				{...props}
			/>
		);
	};

	DraggableBodyRow = ({ className, style, ...restProps }) => {
		const { dataSource } = this.state;
		// function findIndex base on Table rowKey props and should always be a right array index
		const index = dataSource.findIndex(
			x => x.index === restProps["data-row-key"]
		);
		return <SortableItem index={index} {...restProps} />;
	};
	DraggableHeadColumn = ({ className, style, ...restProps }) => {
		const { dataSource } = this.state;
		// function findIndex base on Table rowKey props and should always be a right array index
		const index = dataSource.findIndex(
			x => x.index === restProps["data-row-key"]
		);
		return <SortableColumn index={index} {...restProps} />;
	};

	render() {
		const { dataSource } = this.state;

		return (
			<CustomTable
				pagination={false}
				dataSource={dataSource}
				columns={columns}
				rowKey="index"
				components={{
					header: {
						wrapper: this.DraggableColumnContainer,
						// row: HeaderRow,
						cell: this.DraggableHeadColumn,
					},

					body: {
						wrapper: this.DraggableContainer,
						row: this.DraggableBodyRow,
					},
				}}
			/>
		);
	}
}

export default Table;
