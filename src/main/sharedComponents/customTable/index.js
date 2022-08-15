import React from "react";
import { DragOutlined, MenuOutlined, MoreOutlined } from "@ant-design/icons";
import ReactDragListView from "react-drag-listview";
import CustomTable from "./CustomTable";
import { Menu, Dropdown, Space, Tag, Skeleton, Empty } from "antd";
import PropTypes, { object } from "prop-types";
import "./table.css";
import produce from "immer";

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

const customTags = (tag, status) => {
	let color;
	let text;
	if (tag === status.DeclineByApproves) {
		color = "!bg-red-500";
	}
	if (tag === status.Approved) {
		color = "!bg-lime-500";
	}
	if (tag === status.InProcess) {
		color = "!bg-primary-color";
		text = "In-Process";
	}
	if (tag === "Hold") {
		color = "!bg-yellow-500";
	}
	if (tag === 0) {
		color = "!bg-red-500";
		text = "No Status";
	}

	return (
		<Tag key={tag} className={`${color} !text-white !border-none`}>
			{text.toUpperCase()}
		</Tag>
	);
};

const menu = (actions, row, actionClick) => {
	let items = [];
	actions.forEach((element, index) => {
		items.push({
			label: element,
			key: index + 1,
		});
	});
	return (
		<Menu
			items={items}
			onClick={() => {
				actionClick(row);
				// console.log("click row data", row);
			}}
		/>
	);
};
const dragable = () => (text, record, index) => (
	<p className="drag-handle">{<DragHandle />}</p>
);

const tagable = (tags, status) => customTags(tags, status);

const action = (actions, row, actionClick) => {
	return (
		<div>
			<Dropdown
				overlay={menu(actions, row, actionClick)}
				trigger={["click"]}
			>
				<a>
					<Space>
						<MoreOutlined className="text-2xl " />
					</Space>
				</a>
			</Dropdown>
		</div>
	);
};

export class Table extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			columns: [],
			isColumnPopulated: false,
			isDataPopulated: false,
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
	componentDidMount() {
		// console.log("table mounting");
		const { columns: col, dragable } = this.props;
		// console.log("columns", col);
		const finalArray = col,
			filterArray = ["sort", "drag", "tag", "action", "actions"];

		const result = finalArray.map(jsonData =>
			Object.fromEntries(
				Object.entries(jsonData).filter(
					([key, value]) => !filterArray.includes(key.toLowerCase())
				)
			)
		);
		// console.log("result", result);

		this.setState(
			produce(state => {
				if (state.columns.length > 0) {
					state.columns.length = 0;
					state.isColumnPopulated = false;
				}
				result.forEach((element, i) => {
					if (dragable) {
						if (
							element.title === "Sort" ||
							element.title === "Actions"
						) {
							state.columns.push({
								...element,
							});
						} else {
							state.columns.push({
								...element,
								title: dragTitle(element.title),
							});
						}
					}
					if (!dragable) {
						state.columns.push({
							...element,
						});
					}
				});
			})
		);
	}
	componentDidUpdate(prevProps, prevState) {
		// console.log("this.props.columns", this.props.columns);
		if (
			JSON.stringify(prevProps.columns) !==
			JSON.stringify(this.props.columns)
		) {
			this.componentDidMount();
		}
		if (
			// JSON.stringify(prevState.data) !==
			// 	JSON.stringify(this.state.data) &&
			// this.state.length > 0 &&
			!this.state.isDataPopulated
		) {
			this.setState(
				produce(state => {
					state.data = this.props.data;
					state.isDataPopulated = true;
				})
			);
		}
		if (
			JSON.stringify(prevState.columns) !==
			JSON.stringify(this.state.columns) &&
			!this.state.isColumnPopulated
		) {
			const { columns: col } = this.props;
			for (let i = 0; i < col.length; i++) {
				const updateColumnState = produce(state => {
					if (col[i].sort) {
						state.columns[i].sorter = true;
					}
					if (col[i].drag) {
						state.columns[i].render = dragable();
					}
					if (col[i].tag) {
						state.columns[i].render = status =>
							tagable(status, this.props.status);
					}
					if (col[i].action && !col[i].customAction) {
						state.columns[i].render = (_, row) =>
							action(
								col[i].actions,
								row,
								this.props.onActionClick
							);
					}
				});
				this.setState(updateColumnState);
				this.setState(
					produce(state => {
						state.isColumnPopulated = true;
					})
				);
			}
		}
		if (
			JSON.stringify(prevProps.data) !==
			JSON.stringify(this.props.data)
		) {
			this.setState(
				produce(state => {
					state.data = this.props.data;
					state.isDataPopulated = true;
				})
			);
		}
	}

	render() {
		const {
			dragable,
			handleChange,
			onPageChange,
			onRow,
			loading,
		} = this.props;
		return (
			<div className="w-full">
				{dragable ? (
					<ReactDragListView.DragColumn {...this.dragColumnProps}>
						<ReactDragListView {...this.dragRowProps}>
							<CustomTable
								columns={this.state.columns}
								pagination={{
									defaultPageSize: 20,
									showSizeChanger: true,
									pageSizeOptions: ["20", "50", "100"],
									responsive: true,
									onChange: onPageChange,
								}}
								dataSource={this.state.data}
								bordered={true}
								onRow={onRow}
								onChange={handleChange}
								locale={{
									emptyText: loading ? (
										Array(13).fill(1).map(() => <Skeleton.Input
											active="true"
											size="medium"
											block={true}
											round="true"
											shape="circle"
											style={{ width: "100%", margin: "8px 0px" }}
										/>)
									) : (
										<Empty />
									),
								}}
							/>
						</ReactDragListView>
					</ReactDragListView.DragColumn>
				) : (
					<CustomTable
						columns={this.state.columns}
						pagination={{
							defaultPageSize: 20,
							showSizeChanger: true,
							pageSizeOptions: ["20", "50", "100"],
							responsive: true,
							onChange: onPageChange,
						}}
						dataSource={this.state.data}
						bordered={true}
						onRow={onRow}
						onChange={handleChange}
						locale={{
							emptyText: loading ? (
								<Skeleton active={true} />
							) : (
								<Empty />
							),
						}}
					/>
				)}
			</div>
		);
	}
}
Table.propTypes = {
	dragable: PropTypes.bool,
	columns: PropTypes.arrayOf(object).isRequired,
	handleChange: PropTypes.func.isRequired,
	onPageChange: PropTypes.func.isRequired,
	onRow: PropTypes.func.isRequired,
};
Table.defaultProps = {
	dragable: false,
	columns: [],
	handleChange: () => { },
	onPageChange: () => { },
	onRow: () => { },
};
