import { Button, Form, Input } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
import { useDispatch } from "react-redux";
import { getRewardCategory } from "../../../../utils/Shared/store/actions";
import { addDepartment } from "../store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { projectsDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { uploadImage } from "../../../../utils/Shared/store/actions";
import NewCustomSelect from "../../../sharedComponents/CustomSelect/newCustomSelect";
import MemberListItem from "../../../sharedComponents/MemberByTag/Index";
import MemberComposer from "./MemberComposer";
import { STRINGS } from "../../../../utils/base";
import FeatureSelect from "../../../sharedComponents/FeatureSelect/Index";
import { DatePicker } from "antd";

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
		form.resetFields();

		dispatch(uploadImage(profileImage)).then(x => {
			console.log(x, "FIRST ONE");
			let photoId = x.payload.data[0].id;

			let members = memberList.map(member => {
				return {
					memberId: member.user.id,
					memberType: member.memberType,
				};
			});

			let payload = {
				...values,
				imageId: photoId,
				members,
				parentId: STRINGS.DEFAULTS.guid,
			};
			// dispatch(addDepartment(payload));
		});
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
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				// className={Direction === "ltr" ? "align-right" : ""}
			>
				<div className="flex justify-between gap-4">
					<div className="w-full">
						<Form.Item
							label={"Name"}
							name="name"
							labelPosition="top"
							rules={[
								{
									required: true,
									message: "Please Enter Name",
								},
							]}
						>
							<TextInput
								placeholder={"Please Enter Project Name"}
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
					label={"Description"}
					name="description"
					rules={[
						{
							required: true,
							message: "Enter Description",
						},
					]}
				>
					<Input.TextArea placeholder={"Enter Description"} />
				</Form.Item>

				<Form.Item label="Project Date" name="startEndDate">
					<RangePicker
						format={"DD/MM/YYYY"}
						placeholder={["Start Start", "End Date"]}
						onChange={(value, dateString) => {
							handleEndStartDate(value, dateString, "start_end");
						}}
					/>
				</Form.Item>

				<Form.Item
					name="hodId"
					label={"Externals"}
					showSearch={true}
					direction={Direction}
					rules={[{ required: true }]}
				>
					<NewCustomSelect
						name="hodId"
						label={"Externals"}
						showSearch={true}
						direction={Direction}
						endPoint="api/Reference/GetAllUserReference"
						requestType="get"
						placeholder={"Select Externals"}
					/>
				</Form.Item>

				<MemberComposer handleAdd={handelAddMember} />

				{memberList?.length > 0 ? (
					<MemberListItem
						data={memberList}
						onRemove={row =>
							setMemberList(
								memberList.filter(
									item => item.user.id !== row.user.id
								)
							)
						}
					/>
				) : (
					""
				)}
				<Form.Item
					label={"Features"}
					style={{
						color: "#1b5669",
						fontSize: "17px",
						marginBottom: "14px",
					}}
				></Form.Item>
				<FeatureSelect />

				<Form.Item>
					<Button
						type="primary"
						size="large"
						className="ThemeBtn"
						block
						htmlType="submit"
						title={"Create"}
					>
						{" "}
						{"Create Project"}{" "}
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Composer;
