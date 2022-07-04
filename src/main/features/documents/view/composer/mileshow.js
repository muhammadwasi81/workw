import { Button, Form, Input } from "antd";
import React, { useState, useContext } from "react";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import Select from "../../../../sharedComponents/Select/Select";
import {useDispatch } from "react-redux";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { uploadImage } from "../../../../../utils/Shared/store/actions";
import NewCustomSelect from "../../../../sharedComponents/CustomSelect/newCustomSelect";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";

const initialState = {
	id: "",
	name: "",
	reason: "",
	description: "",
	categoryId: "",
	imageId: "",
	members: [
		{
			memberId: "",
			memberType: 1,
		},
	],
	approvers: [
		{
			approverId: "",
			approverType: 0,
			isDefault: true,
			status: 1,
			email: "",
		},
	],
};

const Mileshow = ({isOpen, handleClose}) => {

	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [profileImage, setProfileImage] = useState(null);

	const [state, setState] = useState(initialState);

	const handleImageUpload = data => {
		setProfileImage(data);
	};

	const onFinish = values => {
		form.resetFields();

		dispatch(uploadImage(profileImage)).then(x => {
			let photoId = x.payload.data[0].id;

			let approvers = values.approvers.map(approver => {
				return {
					approverId: approver,
					approverType: 0,
					email: "",
				};
			});
			let members = values.members.map(member => {
				return {
					memberId: member,
					memberType: 0,
				};
			});

			let payload = { ...values, imageId: photoId, approvers, members };

			// dispatch(addReward(payload));
		});
	};

	const onFinishFailed = errorInfo => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
            <SideDrawer title={"Create Mileshow"}
                isDisable={true}
                isOpen={isOpen}
                isAccessDrawer={false}
                handleClose={handleClose}
                >
			<Form
				form={form}
				name="addMileBoard"
				labelCol={{
					span: 24,
				}}
				wrapperCol={{
					span: 24,
				}}
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label={"Name"}
					name="name"
					labelPosition="top"
					rules={[
						{
							required: true,
							message: "Name",
						},
					]}
				>
					<TextInput placeholder={"Enter Name"} />
				</Form.Item>

				<Form.Item
					label={"Description"}
					name="description"
					rules={[
						{
							required: true,
							message: "Enter Description",
						},
					]}
				>
					<Input.TextArea
						placeholder={"Enter Description"}
					/>
				</Form.Item>

				<Form.Item
					name="approvers"
					label={"Approvers"}
					showSearch={true}
					// direction={Direction}
					rules={[{ required: true }]}
				>
					<NewCustomSelect
						name="approvers"
						label={"Approvers"}
						showSearch={true}
						// direction={Direction}
						mode="multiple"
						endPoint="api/Reference/GetAllUserReference"
						requestType="get"
						placeholder={"Approvers"}
					/>
				</Form.Item>

				<Form.Item area="true">
					<SingleUpload
						handleImageUpload={handleImageUpload}
						img="Add Image"
						position="flex-start"
						uploadText={"Upload"}
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						size="medium"
						className="ThemeBtn"
						block
						htmlType="submit"
						title={"Create Mileshow"}
					>
						{" "}
						{"Create Mileshow"}{" "}
					</Button>
				</Form.Item>
			</Form>
            </SideDrawer>
		</>
	);
};

export default Mileshow;
