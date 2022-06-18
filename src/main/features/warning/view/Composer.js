import { Button, Form, Input } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
import Select from "../../../sharedComponents/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { addWarning } from "../store/actions";
import { warningDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { getAllWarningCategories } from "../warningCategory/store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
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
	const { Direction, warningDictionary } =
		warningDictionaryList[userLanguage];

	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [profileImage, setProfileImage] = useState(null);
	const { warningCategories } = useSelector(
		state => state.warningCategorySlice
	);

	useEffect(() => {
		dispatch(getAllWarningCategories());
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

			dispatch(addWarning(payload));
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
					label={warningDictionary.category}
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
						data={warningCategories}
						placeholder={warningDictionary.category}
						style={{
							width: "100%",
							borderRadius: "5px",
						}}
						size="large"
					/>
				</Form.Item>

				<Form.Item
					name="members"
					label={warningDictionary.warningTo}
					showSearch={true}
					direction={Direction}
					rules={[{ required: true }]}
				>
					<NewCustomSelect
						name="members"
						label={warningDictionary.members}
						showSearch={true}
						direction={Direction}
						mode="multiple"
						endPoint="api/Reference/GetAllUserReference"
						requestType="get"
						placeholder={warningDictionary.selectMember}
					/>
				</Form.Item>

				<Form.Item
					name="approvers"
					label={warningDictionary.approvers}
					showSearch={true}
					direction={Direction}
					rules={[{ required: true }]}
				>
					<NewCustomSelect
						name="approvers"
						label={warningDictionary.approvers}
						showSearch={true}
						direction={Direction}
						mode="multiple"
						endPoint="api/Reference/GetAllUserReference"
						requestType="get"
						placeholder={warningDictionary.selectApprovers}
					/>
				</Form.Item>

				<Form.Item
					label={warningDictionary.description}
					name="description"
					rules={[
						{
							required: true,
							message: warningDictionary.enterDescription,
						},
					]}
				>
					<Input.TextArea
						placeholder={warningDictionary.enterDescription}
					/>
				</Form.Item>

				<Form.Item area="true">
					<SingleUpload
						handleImageUpload={handleImageUpload}
						img="Add Image"
						position="flex-start"
						uploadText={warningDictionary.upload}
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						size="medium"
						className="ThemeBtn"
						block
						htmlType="submit"
						title={warningDictionary.create}
					>
						{" "}
						{warningDictionary.create}{" "}
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Composer;
