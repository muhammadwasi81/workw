import React from "react";
import { Tabs } from "antd";
import "./tab.css";
import { useDispatch } from "react-redux";
import { getAllFeed } from "../../features/feed/store/actions";
const { TabPane } = Tabs;
const onChange = key => {
	// console.log(key);
};
function Tab(props) {
	// const dispatch = useDispatch();
	// dispatch(getAllFeed());
	const { panes } = props;
	return (
		<Tabs
			// defaultActiveKey={"0"}
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
			{panes?.map(pane => (
				<TabPane tab={pane.featureName} key={pane.id}>
					{pane.content}
				</TabPane>
			))}
		</Tabs>
	);
}

export default Tab;
