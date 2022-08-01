import React, { useEffect, useState } from "react";
import { Button, Form, Input, Skeleton } from "antd";
import WorkBoardMemberSelect from "./WorkBoardMemberSelect";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { useDispatch } from "react-redux";
// import { addWorkBoard, updateWorkBoard } from "../store/action";
import PrivacyOptions from "../../../../sharedComponents/PrivacyOptionsDropdown/PrivacyOptions";
import { jsonToFormData } from "../../../../../utils/base";
import { defaultUiid } from "../../../../../utils/Shared/enums/enums";
import { addLeadManager, updateLeadManager } from "../../store/actions";
function BoardComposer({
	isEdit,
	composerData,
	loading,
	dataLoading,
	dictionary,
	direction,
}) {
	const { placeHolder, labels } = dictionary;
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
			dispatch(updateLeadManager(jsonToFormData(tempObj)));
			return;
		}
		dispatch(addLeadManager(jsonToFormData(tempObj)));
	};

	const onFinishFailed = errorInfo => {
		console.log("Failed:", errorInfo);
	};

	const onPrivacyChange = value => {
		setPrivacyId(value);
	};
	useEffect(() => {
		form.setFieldsValue(composerData);
		if (isEdit) {
			form.setFieldsValue({
				members: composerData.members.map(members => {
					return members.memberId;
				}),
			});
		}
		setPrivacyId(composerData.privacyId);
	}, [form, composerData]);

	return (
		<Form
			name="lead manager form"
			layout="vertical"
			initialValues={{}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			form={form}
			dir={direction}
			className={`${direction}`}
		>
			<div className="flex-col-reverse flex gap-2 sm:gap-10 sm:flex-row justify-center">
				<Form.Item
					label={labels.grpName}
					name="name"
					rules={[
						{
							required: true,
							message: "Please input your board name!",
						},
					]}
					className="w-full"
				>
					{dataLoading ? (
						<Skeleton.Input active={true} block size={"large"} />
					) : (
						<Input
							size="large"
							placeholder={placeHolder.grpNamePH}
						/>
					)}
				</Form.Item>
				<Form.Item area="true" className="!m-0">
					{dataLoading ? (
						<Skeleton.Image active={true} />
					) : (
						<SingleUpload
							handleImageUpload={fileData => {
								// console.log("fileData", fileData[0]);
								setImage(fileData[0].originFileObj);
							}}
							uploadText={labels.uploadCvr}
							multiple={false}
							url={composerData.image}
							position={"justify-center"}
						/>
					)}
				</Form.Item>
			</div>
			<Form.Item
				label={labels.grpDescription}
				name="description"
				rules={[
					{
						required: true,
						message: "Please input your board description!",
					},
				]}
			>
				{dataLoading ? (
					<Skeleton.Input active={true} block size={"large"} />
				) : (
					<Input
						size="large"
						placeholder={placeHolder.grpNameDescPH}
					/>
				)}
			</Form.Item>

			<Form.Item
				label={labels.members}
				rules={[
					{
						required: true,
						message: "Members is required",
					},
				]}
				name="members"
			>
				{dataLoading ? (
					<Skeleton.Input active={true} block size={"large"} />
				) : (
					<WorkBoardMemberSelect
						onChange={(val, obj) => {
							setMembersData(val);
						}}
						defaultData={composerData.members.map(members => {
							return members.memberId;
						})}
						loadDefaultData={true}
						placeholder={placeHolder.serachMembersPH}
					/>
				)}
			</Form.Item>
			<Form.Item>
				<div className="flex items-center gap-2">
					{dataLoading ? (
						<>
							<Skeleton.Avatar
								active={true}
								size={"large"}
								shape={"square"}
							/>
							<Skeleton.Button
								active={true}
								size={"large"}
								shape={"square"}
								block
							/>
						</>
					) : (
						<>
							<PrivacyOptions
								privacyId={privacyId}
								onPrivacyChange={onPrivacyChange}
								labels={labels}
							/>
							<Button
								type="primary"
								htmlType="submit"
								block
								className="ThemeBtn"
								size="large"
								loading={loading}
							>
								{isEdit ? labels.updateGrp : labels.createGrp}
							</Button>
						</>
					)}
				</div>
			</Form.Item>
		</Form>
	);
}

export default BoardComposer;
