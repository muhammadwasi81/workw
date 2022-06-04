import {
	AppstoreOutlined,
	BarsOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { Segmented } from "antd";
import React from "react";
import SearchInput from "../../../../sharedComponents/searchBox/SearchInput";

function TopBar() {
	return (
		<div className="flex items-center justify-between w-90p">
			<div className="flex items-center gap-3">
				<SearchInput
					style={{
						backgroundColor: "#F4F4F4",
						border: "1px solid #1A5669",
						height: "100%",
					}}
					className="bg-zinc-100 border border-primary-color h-8"
					onChange={e => console.log("hello")}
					// onBlur={() => setFullWidth(false)}
					icon={<SearchOutlined />}
					placeholder="Search"
					size="larger"
				/>
				<Segmented
					options={[
						"Daily",
						"Weekly",
						"Monthly",
						"Quarterly",
						"Yearly",
					]}
					className=""
					onChange={value => {
						console.log("value", value);
					}}
					size="large"
				/>
			</div>
			<div>
				<Segmented
					options={[
						{
							label: "List",
							value: "List",
							icon: <BarsOutlined />,
						},
						{
							label: "Kanban",
							value: "Kanban",
							icon: <AppstoreOutlined />,
						},
					]}
					size="large"
				/>
			</div>
		</div>
	);
}

export default TopBar;
