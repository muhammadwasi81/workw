import { Input } from "antd";
import React from "react";
import ReactQuill from "react-quill";

function ComposeEmail() {
	return (
		<div className="flex flex-col ">
			<div className="p-2">
				<Input placeholder="To:" />
			</div>
			<div className="p-2">
				<Input placeholder="Subject" />
			</div>
			<div className="p-2">
				<ReactQuill />
			</div>
		</div>
	);
}

export default ComposeEmail;
