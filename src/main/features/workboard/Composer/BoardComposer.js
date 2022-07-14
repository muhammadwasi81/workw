import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import WorkBoardMemberSelect from "./WorkBoardMemberSelect";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { useDispatch } from "react-redux";
import { addWorkBoard } from "../store/action";
import PrivacyOptions from "../../../sharedComponents/PrivacyOptionsDropdown/PrivacyOptions";
import { jsonToFormData } from "../../../../utils/base";
function BoardComposer() {
	const [membersData, setMembersData] = useState([]);
	const dispatch = useDispatch();
	const [image, setImage] = useState();
	const [privacyId, setPrivacyId] = useState(1);

	const onFinish = values => {
		// console.log("image object", image);
		// [{ memberId: asdf }, { memberId: asdfasdf }];
		let membersObj = membersData.map(member => {
			return { memberId: member };
		});
		let tempObj = values;
		tempObj.members = membersObj;
		tempObj.attachment = { file: image };
		tempObj.privacyId = privacyId;

		// Object.keys(tempObj).forEach(key => formData.append(key, tempObj[key]));
		dispatch(addWorkBoard(jsonToFormData(tempObj)));
	};

	const onFinishFailed = errorInfo => {
		console.log("Failed:", errorInfo);
	};

	const onPrivacyChange = value => {
		setPrivacyId(value);
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
					name="name"
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
							setImage(fileData[0].originFileObj);
						}}
						uploadText={"Upload Cover"}
						multiple={false}
					/>
				</Form.Item>
			</div>
			<Form.Item
				label="Board Description"
				name="description"
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
					<div className="flex items-center gap-2">
						<PrivacyOptions
							privacyId={privacyId}
							onPrivacyChange={onPrivacyChange}
						/>
						<Button
							type="primary"
							htmlType="submit"
							block
							className="ThemeBtn"
							size="large"
						>
							Create Board
						</Button>
					</div>
				</Form.Item>
			</div>
		</Form>
	);
}

export default BoardComposer;
