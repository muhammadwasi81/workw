import { Button, Form, Input } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../../components/SharedComponent/Input/TextInput";
// import Button from "../../../../components/SharedComponent/button/index";
import Select from "../../../../components/SharedComponent/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { addComplain } from "../store/actions";
import { getComplainCategory } from "../../../../utils/Shared/store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { uploadImage } from "../../../../utils/Shared/store/actions";
import NewCustomSelect from "../../employee/view/newCustomSelect";

const initialState = {
	id : "",
	description: "",
	categoryId: "",
	imageId: "",
	members: [
	  {
		memberId: "",
		memberType: 1
	  }
	],
	approvers: [
	  {
		approverId: "",
		approverType: 0,
		isDefault: true,
		status: 1,
		email: ""
	  }
	]
  }

const Composer = props => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { sharedLabels, Direction, complainDictionary } = dictionaryList[userLanguage];

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
		form.resetFields();

		dispatch(uploadImage(profileImage)).then(x => {
			console.log(x, "FIRST ONE")
			let photoId = x.payload.data[0].id;
				console.log(values.approvers, "sadasdsada")
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
					label={sharedLabels.category}
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
						placeholder={sharedLabels.category}
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
						label={sharedLabels.members}
						showSearch={true}
						direction={Direction}
						mode="multiple"
						endPoint="api/Reference/GetAllUserReference"
						requestType="get"
						placeholder={sharedLabels.selectMember}
					/>
				</Form.Item>

				<Form.Item
					name="approvers"
					label={sharedLabels.approvers}
					showSearch={true}
					direction={Direction}
					rules={[{ required: true }]}
				>
					<NewCustomSelect
						name="approvers"
						label={sharedLabels.approvers}
						showSearch={true}
						direction={Direction}
						mode="multiple"
						endPoint="api/Reference/GetAllUserReference"
						requestType="get"
						placeholder={sharedLabels.approvers}
					/>
				</Form.Item>

				<Form.Item
					label={sharedLabels.description}
					name="description"
					rules={[
						{
							required: true,
							message: sharedLabels.enterDescription,
						},
					]}
				>
					<Input.TextArea placeholder={sharedLabels.enterDescription} />
				</Form.Item>

				<Form.Item area="true">
					<SingleUpload
						handleImageUpload={handleImageUpload}
						img="Add Image"
						position="flex-start"
						uploadText={sharedLabels.upload}
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						size="medium"
						className="ThemeBtn"
						block
						htmlType="submit"
						title={sharedLabels.create}
					>
						{" "}
						{sharedLabels.create}{" "}
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Composer;
