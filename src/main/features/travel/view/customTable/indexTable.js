import { DragOutlined, MenuOutlined } from "@ant-design/icons";
import React from "react";
import ReactDragListView from "react-drag-listview";
import CustomTable from "./CustomTable";
import "./table.css";
const DragHandle = () => (
	<MenuOutlined style={{ cursor: "grab", color: "#999" }} />
);
const dragTitle = name => {
	return (
		<div className="flex items-center gap-2">
			<DragOutlined style={{ cursor: "grab", color: "#999" }} />
			{name}
		</div>
	);
};
export class Index extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [
				{
					key: "1",
					name: "Boran",
					gender: "male",
					age: "12",
					address: "New York",
				},
				{
					key: "2",
					name: "JayChou",
					gender: "male",
					age: "38",
					address: "TaiWan",
				},
				{
					key: "3",
					name: "Lee",
					gender: "female",
					age: "22",
					address: "BeiJing",
				},
				{
					key: "4",
					name: "ChouTan",
					gender: "male",
					age: "31",
					address: "HangZhou",
				},
				{
					key: "5",
					name: "AiTing",
					gender: "female",
					age: "22",
					address: "Xi’An",
				},
			],
			columns: [
				{
					title: dragTitle("Sort"),
					dataIndex: "sort",

					render: (text, record, index) => (
						<p className="drag-handle">{<DragHandle />}</p>
					),
				},

				{
					title: dragTitle("Key"),
					dataIndex: "key",
				},
				{
					title: dragTitle("Name"),
					dataIndex: "name",
				},
				{
					title: dragTitle("Gender"),
					dataIndex: "gender",
				},
				{
					title: dragTitle("Age"),
					dataIndex: "age",
				},
				{
					title: dragTitle("Address"),
					dataIndex: "address",
				},
				// {
				// 	title: "Operates",
				// 	key: "operate",
				// 	render: (text, record, index) => (
				// 		<p className="drag-handle">Drag</p>
				// 	),
				// },
			],
		};

		const that = this;
		this.dragColumnProps = {
			onDragEnd(fromIndex, toIndex) {
				const columns = [...that.state.columns];
				const item = columns.splice(fromIndex, 1)[0];
				columns.splice(toIndex, 0, item);
				that.setState({
					columns,
				});
			},
			nodeSelector: "th",
			handleSelector: "div",
		};
		this.dragRowProps = {
			onDragEnd(fromIndex, toIndex) {
				const data = [...that.state.data];
				const item = data.splice(fromIndex, 1)[0];
				data.splice(toIndex, 0, item);
				that.setState({
					data,
				});
			},
			handleSelector: "p",
		};
	}
	render() {
		return (
			<div>
				<ReactDragListView.DragColumn {...this.dragColumnProps}>
					<ReactDragListView {...this.dragRowProps}>
						<CustomTable
							columns={this.state.columns}
							pagination={false}
							dataSource={this.state.data}
							bordered={true}
						/>
					</ReactDragListView>
				</ReactDragListView.DragColumn>
			</div>
		);
	}
}

// ReactDOM.render(<DraggableList />, document.getElementById("container"));
