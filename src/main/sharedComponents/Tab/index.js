import React from "react";
import { Tabs } from "antd";
import "./tab.css";
const { TabPane } = Tabs;
function Tab(props) {
	const { panes, id, features } = props;
	return (
		<Tabs
			// defaultActiveKey={"0"}
			// onChange={onChange}
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
			{panes?.map(pane => (
				<TabPane tab={pane.featureName} key={pane.featureId}>
					{pane.content}
				</TabPane>
			))}
		</Tabs>
	);
}

export default Tab;
