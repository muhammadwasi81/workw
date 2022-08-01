import React from "react";
import { Tabs } from "antd";
import "./tab.css";
const { TabPane } = Tabs;
const onChange = key => {
	// console.log(key);
};
function Tab(props) {
	const { panes } = props;
	return (
		<Tabs
			defaultActiveKey="0"
			onChange={onChange}
			className="custom_tab"
			tabBarStyle={{
				background: "white",
				padding: "2px 5px",
				borderRadius: "10px",
				color: "var(--primary_theme_color_green)",
				fontWeight: "bold",
			}}
			dir={props.dir}
		>
			{panes.map(pane => (
				<TabPane tab={pane.title} key={pane.key}>
					{pane.content}
				</TabPane>
			))}
		</Tabs>
	);
}

export default Tab;
