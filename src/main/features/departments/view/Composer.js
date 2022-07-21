import { Button, Form, Input, Skeleton } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllEmployees,
	getRewardCategory,
} from "../../../../utils/Shared/store/actions";
import { addDepartment } from "../store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { departmentDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { uploadImage } from "../../../../utils/Shared/store/actions";
// import NewCustomSelect from "../../../sharedComponents/CustomSelect/newCustomSelect";
import MemberListItem from "../../../sharedComponents/MemberByTag/Index";
import MemberComposer from "./MemberComposer";
import { STRINGS } from "../../../../utils/base";
import MemberSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";

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
	const dispatch = useDispatch();

	const { employees } = useSelector(state => state.sharedSlice);

	const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
	const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);

	useEffect(() => {
		dispatch(getRewardCategory());
		fetchEmployees("", 0);
	}, []);

	useEffect(() => {
		if (employees.length > 0 && !isFirstTimeDataLoaded) {
			setIsFirstTimeDataLoaded(true);
			setFirstTimeEmpData(employees);
		}
	}, [employees]);

	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction, departmentDictionary } =
		departmentDictionaryList[userLanguage];

	const [form] = Form.useForm();
	const [profileImage, setProfileImage] = useState(null);

	const [state, setState] = useState(initialState);

	const [memberList, setMemberList] = useState([]);

	const fetchEmployees = (text, pgNo) => {
		dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
	};

	const selectedData = (data, obj) => {
		console.log("wrapper select data", data, obj);
	};

	if (!isFirstTimeDataLoaded) {
		return <Skeleton active />;
	}
	const onChange = value => {
		console.log(`selected ${value}`);
	};

	const onSearch = value => {
		console.log("search:", value);
	};

	const handleImageUpload = data => {
		setProfileImage(data);
	};

	const handelAddMember = data => {
		console.log("data of handle member", data);
		setMemberList([...memberList, data]);
	};

	const onFinish = values => {
		console.log("values", values);
		form.resetFields();

		dispatch(uploadImage(profileImage)).then(x => {
			console.log(x, "FIRST ONE");
			let photoId = x.payload.data[0].id;

			let members = memberList.map(member => {
				return {
					memberId: member.user[0].id,
					memberType: member.memberType,
				};
			});

			let payload = {
				...values,
				imageId: photoId,
				members,
				parentId: STRINGS.DEFAULTS.guid,
			};
			dispatch(addDepartment(payload));
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
							label={departmentDictionary.name}
							name="name"
							labelPosition="top"
							rules={[
								{
									required: true,
									message:
										departmentDictionary.pleaseEnterRewardName,
								},
							]}
						>
							<TextInput
								placeholder={
									departmentDictionary.enterRewardName
								}
							/>
						</Form.Item>
					</div>
					<div className="flex gap-4">
						<Form.Item area="true" style={{ marginBottom: 0 }}>
							<SingleUpload
								handleImageUpload={handleImageUpload}
								img="Add Image"
								position="flex-start"
								uploadText={departmentDictionary.upload}
							/>
						</Form.Item>
					</div>
				</div>

				<Form.Item
					label={departmentDictionary.description}
					name="description"
					rules={[
						{
							required: true,
							message: departmentDictionary.enterDescription,
						},
					]}
				>
					<Input.TextArea
						placeholder={departmentDictionary.enterDescription}
					/>
				</Form.Item>

				<Form.Item
					name="hodId"
					label={"HOD"}
					showSearch={true}
					direction={Direction}
					rules={[{ required: true }]}
				>
					<MemberSelect
						data={firstTimeEmpData}
						selectedData={selectedData}
						canFetchNow={isFirstTimeDataLoaded}
						fetchData={fetchEmployees}
						name="hodId"
						placeholder={"Select HOD"}
						optionComponent={opt => {
							return (
								<>
									<Avatar
										name={opt.name}
										src={opt.image}
										round={true}
										width={"30px"}
										height={"30px"}
									/>
									{opt.name}
								</>
							);
						}}
					/>
					{/* <NewCustomSelect
						name="hodId"
						label={"HOD"}
						showSearch={true}
						direction={Direction}
						endPoint="api/Reference/GetAllUserReference"
						requestType="get"
						placeholder={"Select HOD"}
					/> */}
				</Form.Item>

				<MemberComposer
					handleAdd={handelAddMember}
					firstTimeEmpData={firstTimeEmpData}
					selectedData={selectedData}
					isFirstTimeDataLoaded={isFirstTimeDataLoaded}
					fetchEmployees={fetchEmployees}
				/>

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

				<Form.Item>
					<Button
						type="primary"
						size="large"
						className="ThemeBtn"
						block
						htmlType="submit"
						title={departmentDictionary.createReward}
					>
						{" "}
						{"Create Department"}{" "}
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Composer;
