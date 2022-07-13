import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import WorkBoardMemberSelect from "./WorkBoardMemberSelect";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";

function BoardComposer() {
	const [membersData, setMembersData] = useState([]);
	const [image, setImage] = useState();
	const formData = new FormData();
	const onFinish = values => {
		let tempObj = values;
		tempObj.members = membersData;
		tempObj.attachments = image;
		Object.keys(tempObj).forEach(key => formData.append(key, tempObj[key]));
	};

	const onFinishFailed = errorInfo => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Form
			name="basic"
			layout="vertical"
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<div className="flex gap-10">
				<Form.Item
					label="Board Name"
					name="boardName"
					rules={[
						{
							required: true,
							message: "Please input your board name!",
						},
					]}
					className="w-full"
				>
					<Input size="large" />
				</Form.Item>
				<Form.Item area="true" className="!m-0">
					<SingleUpload
						handleImageUpload={fileData => {
							// console.log("fileData", fileData[0]);
							setImage(fileData[0]);
						}}
						uploadText={"Upload"}
						multiple={false}
					/>
				</Form.Item>
			</div>
			<Form.Item
				label="Board Description"
				name="boardDescription"
				rules={[
					{
						required: true,
						message: "Please input your board description!",
					},
				]}
			>
				<Input size="large" />
			</Form.Item>
			<div className="bg-[#faf9f9] p-5 rounded-md">
				<Form.Item label="Members">
					<WorkBoardMemberSelect
						onChange={(val, obj) => {
							setMembersData(val);
						}}
					/>
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						block
						className="ThemeBtn"
						size="large"
					>
						Create Board
					</Button>
				</Form.Item>
			</div>
		</Form>
	);
}

export default BoardComposer;
