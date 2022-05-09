import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Input, Tag, Typography } from "antd";
import React from "react";
import TextInput from "../../../../../components/SharedComponent/Input/TextInput";
// import SuggestionBox from "../../../../../components/SharedComponent/searchSelect/SuggestionBox"
import ImageUpload from "../../../../../components/SharedComponent/Input/ImageUpload";
const { TextArea } = Input;
const { RangePicker } = DatePicker;
function TaskComposer() {
	const options = [
		{ label: "Assign Task", value: "Apple" },
		{ label: "Self Task", value: "Pear" },
	];
	return (
		<form className="task-composer">
			<div className="input-row">
				<Typography level={5} style={{ marginTop: "0px" }}>
					Task Subject
				</Typography>
				<TextInput placeholder="Enter Group Name..." />
			</div>

			<div className="input-row">
				<Typography level={5}>Description</Typography>
				<TextArea
					style={{ borderRadius: "5px" }}
					placeholder="Enter Description"
					rows={4}
				/>
			</div>

			{/* Type tags */}

			<div className="type-tag-containet">
				<Typography>Type</Typography>

				<Tag
					icon={<CheckCircleOutlined />}
					className="select-tag"
					color="default"
				>
					success
				</Tag>
				<Tag
					icon={<CheckCircleOutlined />}
					color="default"
					className="select-tag"
				>
					success
				</Tag>
				<Tag
					icon={<CheckCircleOutlined />}
					color="default"
					className="select-tag"
				>
					success
				</Tag>
				<Tag
					icon={<CheckCircleOutlined />}
					color="default"
					className="select-tag"
				>
					success
				</Tag>
			</div>

			{/* Task-checkbox */}

			<div className="task-checkbox-container">
				<Checkbox.Group
					options={options}
					defaultValue={["Apple"]}
					//   onChange={onChange}
				/>
			</div>

			<div className="input-row">
				<Typography level={5}>Task Subject</Typography>
				{/* <SuggestionBox/> */}
			</div>

			<div className="input-row">
				<Typography level={5}>Task Subject</Typography>
				<RangePicker showTime />
			</div>

			<div className="priority-container">
				<Typography>Priority</Typography>

				<Tag
					icon={<CheckCircleOutlined />}
					className="select-tag"
					color="default"
				>
					success
				</Tag>
			</div>

			<div className="input-row">
				<Typography level={5}>Predecessor</Typography>
				{/* <SuggestionBox /> */}
			</div>

			<div className="attachment-container">
				<Typography level={5}>Attachment</Typography>
				<ImageUpload />
			</div>

			<Button type="primary" style={{ fontWeight: "bold" }} block>
				Create Task
			</Button>
		</form>
	);
}

export default TaskComposer;
