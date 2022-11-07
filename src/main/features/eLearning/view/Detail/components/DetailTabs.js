import React from "react";
import { Tabs } from "antd";

function DetailTabs(props) {
	return (
		<>
			<Tabs
				className="course_detail_tab"
				defaultActiveKey="1"
				tabBarStyle={{
					color: "#707070",
				}}
				items={props.items || []}
			/>
		</>
	);
}

export default DetailTabs;
