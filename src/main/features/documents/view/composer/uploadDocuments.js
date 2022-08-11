import { Button, Form, Input } from "antd";
import React, { useState, useContext, useEffect } from "react";
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

const CreateUpload = ({ isOpen, handleClose }) => {

	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [attachment, setAttachment] = useState(null);
	const [fileNames, setFileNames] = useState([]);
	const ParentId = useSelector(state => state.documentSlice.parentId);
	const [privacyId, setPrivacyId] = useState(PostPrivacyType.PUBLIC);
	const defaultFiles = useSelector(state => state.documentSlice.defaultFiles);
	console.log(defaultFiles, "defaultFiles")
	useEffect(() => {
		let defaultFileName = defaultFiles.map((item) => item.name);
		setFileNames(defaultFileName)
		console.log(defaultFileName, "MOUNT")
	}, [defaultFiles])
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
			attachments: defaultFiles.length === 0 ?
				[
					{
						documentName: values.name,
						attachment: {
							id: STRINGS.DEFAULTS.guid,
							file: attachment[0].originFileObj,
						}
					}
				] :
				defaultFiles.length === 1 ?
					[
						{
							documentName: values.name,
							attachment: {
								id: STRINGS.DEFAULTS.guid,
								file: defaultFiles[0]
							}
						}
					] :
					defaultFiles.length > 1 ?
						[...defaultFiles.map((item, index) => ({
							documentName: fileNames[index],
							attachment: {
								id: STRINGS.DEFAULTS.guid,
								file: item,
							}
						}))]
						: []
		}
		dispatch(addDocument({ payload, form }))
	};
	const handleNameChange = (value, index) => {
		let tempFileNames = [...fileNames];
		tempFileNames[index] = value;
		setFileNames(tempFileNames);
	};

	const onFinishFailed = errorInfo => {
		console.log("Failed:", errorInfo);
	};
	console.log(fileNames)
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

					{defaultFiles.length === 0 && <Form.Item area="true">
						<SingleUpload
							handleImageUpload={handleImageUpload}
							img="Add Image"
							position="flex-start"
							uploadText={"Upload"}
						/>
					</Form.Item>}
					{
						defaultFiles.length > 1 &&
						<div className="mt-8 w-full">
							{
								defaultFiles.map((item, index) =>
									<div className="flex mt-4 w-full" >
										<div className="flex-1 flex items-center" >
											<TextInput placeholder={"Enter Name"}
												value={fileNames[index]}
												onChange={(value) => handleNameChange(value, index)}
											/>
										</div>
										<div className="w-[100px] ml-4 cursor-pointer" >
											<img className="h-[50px] rounded-md m-auto" src={item.src} />
										</div>

									</div>
								)
							}
						</div>
					}
					{
						defaultFiles.length === 1 &&
						<div className="w-[100px] ml-4 cursor-pointer" >
							<img className="h-[100px] rounded-md mb-6" src={defaultFiles[0].src} />
						</div>
					}

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
