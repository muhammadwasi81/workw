import { Button, Form, Input, message, Select } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { getRewardCategory } from "../../../../utils/Shared/store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { projectsDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import MemberListItem from "../../../sharedComponents/MemberByTag/Index";
import MemberComposer from "./MemberComposer";
import FeatureSelect from "../../../sharedComponents/FeatureSelect/Index";
import { DatePicker } from "antd";
import { validateEmail } from "../../../../utils/Shared/helper/validateEmail";

const { RangePicker } = DatePicker;

const initialState = {
	id: "",
	name: "",
	description: "",
	imageId: "",
	members: [
		{
			memberId: "",
			memberType: 1,
		},
	],
	hodId: "",
	parentId: "",
};

const Composer = props => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction, projectsDictionary } = projectsDictionaryList[
		userLanguage
	];
	const { labels, placeholders, features, errors } = projectsDictionary;

	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [profileImage, setProfileImage] = useState(null);

	const [state, setState] = useState(initialState);

	const [memberList, setMemberList] = useState([]);

	const onChange = value => {
		console.log(`selected ${value}`);
	};

	const onSearch = value => {
		console.log("search:", value);
	};

	useEffect(() => {
		dispatch(getRewardCategory());
	}, []);

	const handleImageUpload = data => {
		setProfileImage(data);
	};

	const handelAddMember = data => {
		setMemberList([...memberList, data]);
	};

	const handleEndStartDate = (value, dateString, name) => {
		setState({
			...state,
			[name]: dateString,
		});
	};

	const onFinish = values => {
		console.log("values", form.getFieldsValue(true));
		// form.resetFields();
	};

	const onFinishFailed = errorInfo => {
		// console.log("Failed:", errorInfo);
	};

	return (
		<>
			<Form
				form={form}
				initialValues={{ features: [{ featureId: 1 }] }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				dir={Direction}
				layout={"vertical"}
				className={`${Direction}`}
				// className={Direction === "ltr" ? "align-right" : ""}
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
							<Input
								placeholder={placeholders.name}
								size="large"
								className="!rounded"
							/>
						</Form.Item>
					</div>
					<div className="flex gap-4">
						<Form.Item area="true" style={{ marginBottom: 0 }}>
							<SingleUpload
								handleImageUpload={handleImageUpload}
								img="Add Image"
								position="flex-start"
								uploadText={"Upload"}
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
					<Input.TextArea
						placeholder={placeholders.desc}
						rows={4}
						className="!rounded"
					/>
				</Form.Item>

				<Form.Item label={labels.projectDate} name="startEndDate">
					<RangePicker
						format={"DD/MM/YYYY"}
						placeholder={[
							placeholders.startDate,
							placeholders.endDate,
						]}
						onChange={(value, dateString) => {
							handleEndStartDate(value, dateString, "start_end");
						}}
						size="large"
						className="!rounded"
					/>
				</Form.Item>

				<Form.Item
					name={"external"}
					label={labels.externals}
					direction={Direction}
					rules={[
						{
							// required: true,
							// message: errors.members,
							validator: (_, value) => {
								if (validateEmail(value[value.length - 1])) {
									form.setFieldsValue({ external: value });
									return;
								} else {
									message.error("Please add validate email.");
									form.setFieldsValue({
										external: form
											.getFieldValue("external")
											.slice(
												0,
												form.getFieldValue("external")
													.length - 1
											),
									});
								}
							},
						},
					]}
				>
					<Select
						mode="tags"
						dropdownClassName="hidden"
						placeholder="Please add external members"
						size="large"
					/>
				</Form.Item>

				<MemberComposer handleAdd={handelAddMember} />

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
				<FeatureSelect features={features} form={form} />

				<Form.Item>
					<Button
						type="primary"
						className="ThemeBtn"
						block
						size="large"
						htmlType="submit"
					>
						Create Project
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Composer;
