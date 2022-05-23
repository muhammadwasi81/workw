import React from "react";
import { DragOutlined, MenuOutlined, MoreOutlined } from "@ant-design/icons";
import ReactDragListView from "react-drag-listview";
import CustomTable from "./CustomTable";
import { Menu, Dropdown, Space, Tag } from "antd";
// import { DownOutlined } from "@ant-design/icons";
import "./table.css";

const DragHandle = () => (
	<MenuOutlined style={{ cursor: "grab", color: "#999" }} />
);
const dragTitle = name => {
	return (
		<div className="flex items-center gap-2">
			<DragOutlined style={{ cursor: "grab", color: "white" }} />
			{name}
		</div>
	);
};

const customTags = tags => (
	<>
		{tags.map(tag => {
			// let color = tag.length > 5 ? "geekblue" : "green";

			// if (tag === "loser") {
			// 	color = "volcano";
			// }
			let color;
			if (tag === "Declined") {
				color = "!bg-red-500";
			}
			if (tag === "Approved") {
				color = "!bg-lime-500";
			}
			if (tag === "In-Process") {
				color = "!bg-primary-color";
			}
			if (tag === "Hold") {
				color = "!bg-yellow-500";
			}
			return (
				<Tag key={tag} className={`${color} !text-white !border-none`}>
					{tag.toUpperCase()}
				</Tag>
			);
		})}
	</>
);

const menu = (
	<Menu
		items={[
			// {
			// 	label: <a href="https://www.antgroup.com">1st menu item</a>,
			// 	key: "0",
			// },
			// {
			// 	label: <a href="https://www.aliyun.com">2nd menu item</a>,
			// 	key: "1",
			// },
			// {
			// 	type: "divider",
			// },
			{
				label: "Edit",
				key: "1",
			},
		]}
	/>
);
export class Table extends React.Component {
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
					status: ["In-Process"],
				},
				{
					key: "2",
					name: "JayChou",
					gender: "male",
					age: "38",
					address: "TaiWan",
					status: ["Approved"],
				},
				{
					key: "3",
					name: "Lee",
					gender: "female",
					age: "22",
					address: "BeiJing",
					status: ["Hold"],
				},

				{
					key: "4",
					name: "ChouTan",
					gender: "male",
					age: "31",
					address: "HangZhou",
					status: ["Declined"],
				},
				{
					key: "5",
					name: "AiTing",
					gender: "female",
					age: "22",
					address: "Xi’An",
					status: ["Hold"],
				},
			],
			columns: [
				{
					title: "Sort",
					dataIndex: "sort",
					render: (text, record, index) => (
						<p className="drag-handle">{<DragHandle />}</p>
					),
					fixed: "left",
				},

				{
					title: dragTitle("Key"),
					dataIndex: "key",
				},
				{
					title: dragTitle("Status"),
					dataIndex: "status",
					render: (_, { status }) => customTags(status),
					sorter: (a, b) => a.status[0].localeCompare(b.status[0]),
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
					sorter: (a, b) => a.age - b.age,
				},
				{
					title: dragTitle("Address"),
					dataIndex: "address",
					sorter: (a, b) => a.address.localeCompare(b.address),
					fixed: "right",
				},
				{
					title: "Actions",
					key: "action",
					render: (text, record, index) => (
						<div>
							<Dropdown overlay={menu} trigger={["click"]}>
								<a onClick={e => e.preventDefault()}>
									<Space>
										<MoreOutlined className="text-2xl " />
									</Space>
								</a>
							</Dropdown>
						</div>
					),
				},
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
							onRow={(record, rowIndex) => {
								return {
									onClick: event => {
										event.stopPropagation();
										console.log("dsfdsf", event);
									}, // click row
									onDoubleClick: event => {}, // double click row
									onContextMenu: event => {}, // right button click row
									onMouseEnter: event => {}, // mouse enter row
									onMouseLeave: event => {}, // mouse leave row
								};
							}}
						/>
					</ReactDragListView>
				</ReactDragListView.DragColumn>
			</div>
		);
	}
}
