import { Button, Form, Input } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
import Select from "../../../sharedComponents/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { addComplain } from "../store/actions";
import { getComplainCategory } from "../../../../utils/Shared/store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { complainDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { uploadImage } from "../../../../utils/Shared/store/actions";
import NewCustomSelect from "../../../sharedComponents/CustomSelect/newCustomSelect";

const initialState = {
	id: "",
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

const Composer = props => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction, complainDictionary } =
		complainDictionaryList[userLanguage];

	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [profileImage, setProfileImage] = useState(null);
	const { complainCategories } = useSelector(state => state.sharedSlice);

	useEffect(() => {
		dispatch(getComplainCategory());
	}, []);

	const handleImageUpload = data => {
		setProfileImage(data);
	};

	const onFinish = values => {
		dispatch(uploadImage(profileImage)).then(x => {
			console.log(x, "FIRST ONE");
			let photoId = x.payload.data[0].id;
			console.log(values.approvers, "sadasdsada");
			let approvers = values.approvers.map(approver => {
				return {
					approverId: approver,
					approverType: 0,
					isDefault: true,
					status: 0,
					email: "",
				};
			});
			let members = values.members.map(member => {
				return {
					memberId: member,
					memberType: 0,
					email: "",
				};
			});

			let payload = { ...values, imageId: photoId, approvers, members };

			dispatch(addComplain(payload));
			form.resetFields();
		});
	};

	const onFinishFailed = errorInfo => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			<Form
				form={form}
				name="addReward"
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
					label={complainDictionary.category}
					name="categoryId"
					rules={[
						{
							required: true,
							message: "Please Enter Category",
						},
					]}
				>
					<Select
						// value={
						//   "3fa85f64-5717-4562-b3fc-2c963f66afa6"
						// }
						data={complainCategories}
						placeholder={complainDictionary.category}
						style={{
							width: "100%",
							borderRadius: "5px",
						}}
						size="large"
					/>
				</Form.Item>

				<Form.Item
					name="members"
					label={complainDictionary.complainOf}
					showSearch={true}
					direction={Direction}
					rules={[{ required: true }]}
				>
					<NewCustomSelect
						name="members"
						label={complainDictionary.members}
						showSearch={true}
						direction={Direction}
						mode="multiple"
						endPoint="api/Reference/GetAllUserReference"
						requestType="get"
						placeholder={complainDictionary.selectMember}
					/>
				</Form.Item>

				<Form.Item
					name="approvers"
					label={complainDictionary.approvers}
					showSearch={true}
					direction={Direction}
					rules={[{ required: true }]}
				>
					<NewCustomSelect
						name="approvers"
						label={complainDictionary.approvers}
						showSearch={true}
						direction={Direction}
						mode="multiple"
						endPoint="api/Reference/GetAllUserReference"
						requestType="get"
						placeholder={complainDictionary.approvers}
					/>
				</Form.Item>

				<Form.Item
					label={complainDictionary.description}
					name="description"
					rules={[
						{
							required: true,
							message: complainDictionary.enterDescription,
						},
					]}
				>
					<Input.TextArea
						placeholder={complainDictionary.enterDescription}
					/>
				</Form.Item>

				{/* <Form.Item area="true">
					<SingleUpload
						handleImageUpload={handleImageUpload}
						img="Add Image"
						position="flex-start"
						uploadText={sharedLabels.upload}
					/>
				</Form.Item> */}

				<Form.Item>
					<Button
						type="primary"
						size="medium"
						className="ThemeBtn"
						block
						htmlType="submit"
						title={complainDictionary.create}
					>
						{" "}
						{complainDictionary.create}{" "}
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Composer;
