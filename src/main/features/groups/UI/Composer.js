import { Button, Form, Input, message, Select } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
import { useDispatch } from "react-redux";
import { addGroup } from "../store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { groupsDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

import MemberListItem from "../../../sharedComponents/MemberByTag/Index";
import MemberComposer from "./MemberComposer";
import { jsonToFormData, STRINGS } from "../../../../utils/base";

import { defaultUiid } from "../../../../utils/Shared/enums/enums";
import { DepartmentMemberTypeList } from "../constant";

const initialState = {
	id: "",
	name: "",
	description: "",
	imageId: "",
	members: [],
	hodId: "",
	parentId: "",
};

const Composer = props => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction, groupsDictionary } = groupsDictionaryList[userLanguage];
	const { labels, placeHolders, errors } = groupsDictionary;
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [profileImage, setProfileImage] = useState(null);

	const [state, setState] = useState(initialState);

	const [memberList, setMemberList] = useState([]);

	const handleImageUpload = fileData => {
		setProfileImage(fileData[0].originFileObj);
	};

	const handelAddMember = data => {
		setMemberList([...memberList, data]);
	};

	const onFinish = values => {
		if (profileImage === null) {
			return message.error({
				content: "Please upload group image.",
			});
		}
		let members = memberList.map(member => {
			return {
				memberId: member.members[0].id,
				memberType: member.memberType,
			};
		});
		let imgObj = { file: profileImage, id: defaultUiid };

		dispatch(
			addGroup(
				jsonToFormData({
					image: { ...imgObj },
					name: values.name,
					description: values.description,
					members,
				})
			)
		);
	};

	const onFinishFailed = errorInfo => {
		// console.log("Failed:", errorInfo);
	};

	return (
		<>
			<Form
				form={form}
				name="addDepartment"
				labelCol={{
					span: 24,
				}}
				wrapperCol={{
					span: 24,
				}}
				initialValues={{
					memberType: null,
					members: [],
					name: "",
					description: "",
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				dir={Direction}
				className={`${Direction}`}
			>
				<div className="flex justify-between gap-4">
					<div className="w-full">
						<Form.Item
							label={labels.name}
							name="name"
							labelPosition="top"
							rules={[
								{
									required: true,
									message: errors.name,
								},
							]}
						>
							<TextInput placeholder={placeHolders.namePh} />
						</Form.Item>
					</div>
					<div className="flex gap-4">
						<Form.Item area="true" style={{ marginBottom: 0 }}>
							<SingleUpload
								handleImageUpload={handleImageUpload}
								img="Add Image"
								position="flex-start"
								uploadText={labels.upload}
								multiple={false}
							/>
						</Form.Item>
					</div>
				</div>

				<Form.Item
					style={{ marginTop: "-18px" }}
					label={labels.desc}
					name="description"
					rules={[
						{
							required: true,
							message: errors.desc,
						},
					]}
				>
					<Input.TextArea placeholder={placeHolders.descPh} />
				</Form.Item>

				<Form.Item
					shouldUpdate={(prevValues, curValues) =>
						prevValues.members !== curValues.members
					}
				>
					{form => {
						return (
							<MemberComposer
								handleAdd={handelAddMember}
								state={state}
								defaultData={state.members.map(members => {
									return members.memberId;
								})}
								form={form}
								placeholder={placeHolders}
								error={errors}
							/>
						);
					}}
				</Form.Item>

				{memberList?.length > 0 ? (
					<MemberListItem
						data={memberList}
						onRemove={(row, ind) => {
							setMemberList(
								memberList.filter((_, index) => index !== ind)
							);
						}}
					/>
				) : (
					""
				)}

				<Form.Item>
					<Button
						type="primary"
						size="large"
						className="ThemeBtn"
						block
						htmlType="submit"
						title={"Create"}
					>
						{groupsDictionary.createTextBtn}
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Composer;
