import { Button, Form, Input } from "antd";
import React, { useState, useContext } from "react";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import Select from "../../../../sharedComponents/Select/Select";
import { useDispatch } from "react-redux";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { uploadImage } from "../../../../../utils/Shared/store/actions";
import NewCustomSelect from "../../../../sharedComponents/CustomSelect/newCustomSelect";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import PrivacyOptions from "../../../../sharedComponents/PrivacyOptionsDropdown/PrivacyOptions";
import { PostPrivacyType } from "../../../../../utils/Shared/enums/enums";
import { addDocument } from "../../store/actions";
import { DOCUMENT_ENUM } from "../../constant";
import { STRINGS } from "../../../../../utils/base";
import { useSelector } from "react-redux";

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

const CreateUpload = ({ isOpen, handleClose }) => {

	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [attachment, setAttachment] = useState(null);
	const ParentId = useSelector(state => state.documentSlice.parentId);
	const [privacyId, setPrivacyId] = useState(PostPrivacyType.PUBLIC);

	const handleImageUpload = data => {
		setAttachment(data);
	};

	const onPrivacyChange = value => {
		setPrivacyId(value);
	};

	const onFinish = (values) => {
		let readers = values.readers ? values.readers : [];
		let collaborators = values.collaborators ? values.collaborators : [];
		let members = [
			...readers.map((item) => ({
				memberId: item,
				memberType: 1,
				memberRightType: DOCUMENT_ENUM.MEMBER_RIGHT_TYPE.READER
			})),
			...collaborators.map((item) => ({
				memberId: item,
				memberType: 1,
				memberRightType: DOCUMENT_ENUM.MEMBER_RIGHT_TYPE.COLLABRATOR
			}))
		];
		let payload = {
			name: values.name,
			description: values.description,
			approvers: values.approvers ? values.approvers.map((item) => ({ approverId: item })) : [],
			members: members,
			parentId: ParentId,
			documentType: DOCUMENT_ENUM.DUCOMENT_TYPE.attachment,
			privacyId: privacyId,
			attachments: [{
				documentName: values.name,
				attachment:{
					id: STRINGS.DEFAULTS.guid,
					file: attachment[0].originFileObj,
				}
			}
			]
		}
		dispatch(addDocument({ payload, form }))
	};

	const onFinishFailed = errorInfo => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			<SideDrawer title={"Upload"}
				isDisable={true}
				isOpen={isOpen}
				isAccessDrawer={false}
				handleClose={handleClose}
			>
				<Form
					form={form}
					name="uploadFile"
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

					<Form.Item
						name="collaborator"
						label={"Collaborators"}
						showSearch={true}
					// direction={Direction}
					>
						<NewCustomSelect
							name="collaborator"
							label={"Collaborators"}
							showSearch={true}
							// direction={Direction}
							mode="multiple"
							endPoint="api/Reference/GetAllUserReference"
							requestType="get"
							placeholder={"Select Collaborators"}
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

					{privacyId === PostPrivacyType.PRIVATE &&
						<Form.Item
							name="readers"
							label={"Readers"}
							showSearch={true}
						// direction={Direction}
						>
							<NewCustomSelect
								name="readers"
								label={"Readers"}
								showSearch={true}
								// direction={Direction}
								mode="multiple"
								endPoint="api/Reference/GetAllUserReference"
								requestType="get"
								placeholder={"Select Readers"}
							/>
						</Form.Item>
					}
					<Form.Item>
						<div className="flex items-center gap-2">
							<PrivacyOptions
								privacyId={privacyId}
								onPrivacyChange={onPrivacyChange}
							/>
							<Button
								type="primary"
								size="medium"
								className="ThemeBtn"
								block
								htmlType="submit"
								title={"Create Milepad"}
							>
								{" "}
								{"Create"}{" "}
							</Button>
						</div>
					</Form.Item>
				</Form>
			</SideDrawer>
		</>
	);
};

export default CreateUpload;
