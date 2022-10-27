import React from "react";
import { Collapse } from "antd";
import { RightOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

function DetailCollapse(props) {
	const { Component, ExpandIcon = RightOutlined, iconRotate = 90 } = props;
	return (
		<Collapse
			defaultActiveKey={["1"]}
			ghost
			accordion
			expandIconPosition={props.expandIconPosition}
			expandIcon={panelProps => {
				return panelProps.isActive ? (
					<ExpandIcon className="!text-base" rotate={iconRotate} />
				) : (
					<ExpandIcon className="!text-base" />
				);
			}}
			className={" " + props.className}
		>
			{props.data.map((data, index) => (
				<Panel
					header={
						<span
							className={`font-bold text-base ${props.headerClasses}`}
						>
							{data.name}
						</span>
					}
					key={index + 1}
				>
					<Component data={data} />
				</Panel>
			))}
		</Collapse>
	);
}

export default DetailCollapse;
