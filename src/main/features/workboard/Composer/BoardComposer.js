import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import WorkBoardMemberSelect from "./WorkBoardMemberSelect";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { useDispatch } from "react-redux";
import { addWorkBoard, updateWorkBoard } from "../store/action";
import PrivacyOptions from "../../../sharedComponents/PrivacyOptionsDropdown/PrivacyOptions";
import { jsonToFormData } from "../../../../utils/base";
import { useSelector } from "react-redux";
import { defaultUiid } from "../../../../utils/Shared/enums/enums";
function BoardComposer({ isEdit, composerData, loading }) {
	const [form] = Form.useForm();

	const [membersData, setMembersData] = useState([]);
	const dispatch = useDispatch();

	const [image, setImage] = useState("");
	const [privacyId, setPrivacyId] = useState(1);

	const onFinish = values => {
		// console.log("values", values);
		let membersObj = membersData.map(member => {
			return { memberId: member };
		});
		let imgObj = { file: image, id: defaultUiid };
		let tempObj = values;
		tempObj.members = membersObj;
		tempObj.attachment = imgObj;
		tempObj.privacyId = privacyId;
		if (isEdit) {
			if (!image) {
				tempObj.attachment = { ...imgObj, id: composerData.imageId };
			}
			tempObj.id = composerData.id;
			dispatch(updateWorkBoard(jsonToFormData(tempObj)));
			return;
		}
		dispatch(addWorkBoard(jsonToFormData(tempObj)));
	};

	const onFinishFailed = errorInfo => {
		console.log("Failed:", errorInfo);
	};

	const onPrivacyChange = value => {
		setPrivacyId(value);
	};
	useEffect(() => {
		form.setFieldsValue(composerData);
		setPrivacyId(composerData.privacyId);
		// setImage(composerData.imageId);
	}, [form, composerData]);
	// console.log("composerData", composerData);
	return (
		<Form
			name="basic"
			layout="vertical"
			initialValues={{}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			form={form}
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
						url={composerData.image}
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

			<Form.Item label="Members">
				<WorkBoardMemberSelect
					onChange={(val, obj) => {
						setMembersData(val);
					}}
					defaultData={composerData.members.map(members => {
						return members.memberId;
					})}
					loadDefaultData={true}
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
						loading={loading}
					>
						{isEdit ? "Update " : "Create "}Board
					</Button>
				</div>
			</Form.Item>
		</Form>
	);
}

export default BoardComposer;
