import { Button, Form, Input } from "antd";
import React, { useState, useContext } from "react";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import { useDispatch } from "react-redux";
import NewCustomSelect from "../../../../sharedComponents/CustomSelect/newCustomSelect";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import PrivacyOptions from "../../../../sharedComponents/PrivacyOptionsDropdown/PrivacyOptions";
import { PostPrivacyType } from "../../../../../utils/Shared/enums/enums";
import { addDocument } from "../../store/actions";
import { DOCUMENT_ENUM } from "../../constant";
import { useSelector } from "react-redux";

const CreateMilepad = ({ isOpen, handleClose }) => {

	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [privacyId, setPrivacyId] = useState(PostPrivacyType.PUBLIC);
	const loader = useSelector(state => state.documentSlice.loader);
	const onPrivacyChange = value => {
		setPrivacyId(value);
	};

	const onFinish = (values) => {
		console.log(values);
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
			parentId: null,
			documentType: DOCUMENT_ENUM.DUCOMENT_TYPE.pad,
			privacyId: privacyId
		}
		dispatch(addDocument({ payload, form }))
	};

	const onFinishFailed = errorInfo => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			<SideDrawer title={"Create Milepad"}
				isDisable={true}
				isOpen={isOpen}
				isAccessDrawer={false}
				handleClose={handleClose}
			>
				<Form
					form={form}
					name="addMilepad"
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
								loading={loader}
							>
								{"Create"}
							</Button>
						</div>
					</Form.Item>
				</Form>
			</SideDrawer>
		</>
	);
};

export default CreateMilepad;
