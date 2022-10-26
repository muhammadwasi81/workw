import { Radio, Space } from "antd";
import React, { useState } from "react";

function CourseQuizes() {
	const [value, setValue] = useState(1);
	const onChange = e => {
		console.log("radio checked", e.target.value);
		setValue(e.target.value);
	};
	return [1, 1, 2, 1].map(value => (
		<div className="mb-10">
			<p>
				1. Fill in the blank: Designers that work as freelancers can
				expect to _____.
			</p>
			<Radio.Group
				onChange={onChange}
				// value={value}
				className="!px-5"
			>
				<Space direction="vertical">
					<Radio value={1}>Option A</Radio>
					<Radio value={2}>Option B</Radio>
					<Radio value={3}>Option C</Radio>
				</Space>
			</Radio.Group>
		</div>
	));
}

export default CourseQuizes;
