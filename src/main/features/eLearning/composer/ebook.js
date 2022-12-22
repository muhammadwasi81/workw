import { Button, Form, Input } from "antd";
import React, { useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import PrivacyOptions from "../../../sharedComponents/PrivacyOptionsDropdown/PrivacyOptions";
import { PostPrivacyType } from "../../../../utils/Shared/enums/enums";
// import { addDirectory, addDocument } from "../../store/actions";
// import { DOCUMENT_ENUM } from "../constant";
import { useSelector } from "react-redux";
import { elearningDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import NewCustomSelect from "../../../sharedComponents/CustomSelect/newCustomSelect";
import TextInput from "../../../sharedComponents/Input/TextInput";

const CreateEbook = ({ isOpen, handleClose, referenceId, referenceType }) => {
	// const dispatch = useDispatch();
	const loader = useSelector(state => state.documentSlice.loader);
	const ParentId = useSelector(state => state.documentSlice.parentId);
	const folderInitState = useSelector(state => state.documentSlice.composersInitState.folder);
	const [form] = Form.useForm();
	const [privacyId, setPrivacyId] = useState(PostPrivacyType.PUBLIC);

	useEffect(() => {
		setPrivacyId(folderInitState.privacyId)
	}, [])

	const onPrivacyChange = value => {
		setPrivacyId(value);
	};

	const onFinish = values => {
		console.log(values)
		let payload = {
			name: values.name,
			description: values.description,
			members: values.readers
				? values.readers.map(item => ({
					memberId: item,
					// memberType: 1,
					// memberRightType: DOCUMENT_ENUM.MEMBER_RIGHT_TYPE.READER,
				}))
				: [],
			parentId: ParentId,
			privacyId: privacyId,
			referenceId,
			referenceType,
		};
		// dispatch(addDirectory({ payload, form }));
	};

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

	return (
		<>
			<SideDrawer
				title={"Create eBook"}
				isDisable={true}
				isOpen={isOpen}
				isAccessDrawer={false}
				handleClose={handleClose}
			>
				{isOpen &&
					<Form
						form={form}
						name="addEbook"
						labelCol={{
							span: 24,
						}}
						wrapperCol={{
							span: 24,
						}}
						initialValues={folderInitState}
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

						<Form.Item label={"Description"} name="description">
							<Input.TextArea placeholder={"Enter Description"} />
						</Form.Item>

						{privacyId === PostPrivacyType.PRIVATE && (
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
						)}
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
									{" "}
									{"Create Folder"}{" "}
								</Button>
							</div>
						</Form.Item>
					</Form>}
			</SideDrawer>
		</>
	);
};

export default CreateEbook;
