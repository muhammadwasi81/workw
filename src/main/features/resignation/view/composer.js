import { Button, Form, Input, Avatar, Select, DatePicker } from "antd";
import React, { useEffect, useState, useContext, } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
// import NewSelect from "../../../sharedComponents/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import {
	getAllEmployees,
	getRewardCategory,
} from "../../../../utils/Shared/store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { resignationDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import CustomSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { getNameForImage, STRINGS } from "../../../../utils/base";
import { emptyEmployeesData } from "../../../../utils/Shared/store/slice";
import { addResignation } from "../store/action";
import { ResignationPurposeEnum } from "../enums";
import TextArea from "antd/lib/input/TextArea";
const { Option } = Select;

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

const Composer = props => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction, resignationDictionary } = resignationDictionaryList[userLanguage];

	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [profileImage, setProfileImage] = useState(null);
	const [state, setState] = useState(initialState);
	const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
	const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
	const [value, setValue] = useState([]);

	const { rewardCategories } = useSelector(state => state.sharedSlice);
	const { success } = useSelector(state => state.rewardSlice);
	const employees = useSelector(state => state.sharedSlice.employees);

	const selectedData = (data, obj) => {
		setValue(data);
		handleMember(obj);
		// setMembers(obj);
		// onChange(data, obj);
	};
	useEffect(() => {
		fetchEmployees("", 0);
	}, []);

	useEffect(() => {
		dispatch(getRewardCategory());
	}, []);

	const handleMember = val => {
		setNewState({
			...newState,
			members: [...val],
		});
	};

	const fetchEmployees = (text, pgNo) => {
		dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
	};

	const [newState, setNewState] = useState({
		members: [],
		memberType: null,
	});

	useEffect(() => {
		if (employees.length > 0 && !isFirstTimeDataLoaded) {
			setIsFirstTimeDataLoaded(true);
			setFirstTimeEmpData(employees);
		}
	}, [employees]);

	useEffect(() => {
		if (employees.length !== 0) {
			dispatch(emptyEmployeesData());
			setIsFirstTimeDataLoaded(false);
		}
		dispatch(getRewardCategory());
	}, []);

	const handleImageUpload = data => {
		setProfileImage(data);
	};

	const onFinish = (values) => {
		console.log(values, "FINAL")
		let approvers = [];
		let hr = [];
		let finance = [];
		if (typeof values.approvers === 'string') {
			approvers.push({
				approverId: values.approvers
			})
		}
		else {
			approvers = values.approvers.map((approver) => {
				return {
					approverId: approver
				};
			});
		}
		if (typeof values.hr === 'string') {
			members.push({
				memberId: values.hr
			})
		} else {
			members = values.hr.map((hr) => {
				return {
					memberId: hr
				};
			});
		}
		if (typeof values.finance === 'string') {
			members.push({
				memberId: values.finance
			})
		} else {
			members = values.finance.map((finance) => {
				return {
					memberId: finance
				};
			});
		}

		let image = {
			id: STRINGS.DEFAULTS.guid,
			file: profileImage && profileImage[0]?.originFileObj,
		};

		if (Object.keys(image).length > 0) {
			let payload = { ...values, hr, image };
			console.log(values, "VALUESSS")
			dispatch(addResignation(payload));
		} else {
			let payload = {...values, hr};
			console.log(payload, "PAYLOADDD!!!!")
			dispatch(addResignation(payload));
		}
	};
	useEffect(() => {
		if (success) {
			form.resetFields();
		}
	}, [success]);

	const onFinishFailed = errorInfo => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			<Form
				form={form}
				name="addResignation"
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
					label={"Select Reason"}
					name="purposeId"
					rules={[
						{
							required: true,
							message: "Please Select Reason",
						},
					]}
				>
					<Select
						showSearch
						placeholder="Select Reason"
						optionFilterProp="children"
						style={{
							width: "100%",
							borderRadius: "5px",
						}}
						size="large"
					// onChange={onChange}
					// onSearch={onSearch}
					// filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
					>
						{
							ResignationPurposeEnum.map((item) =>
								<Option value={item.value}>{item.label}</Option>
							)
						}
					</Select>
				</Form.Item>
				<Form.Item
					label={"Resignation Date"}
					name="resignationDate"
					rules={[
						{
							required: true,
							message: "Please Select Date",
						},
					]}
				>
					<DatePicker size="large" style={{ width: "100%" }} />
				</Form.Item>
				<Form.Item
					label={"Description"}
					name="description"
				>
					<TextArea placeholder="Enter Description" />
				</Form.Item>

				<Form.Item
					name="hr"
					label={"HR"}
					showSearch={true}
					direction={Direction}
					style={{ marginBottom: "0px" }}
				>
					<CustomSelect
						style={{ marginBottom: "0px" }}
						data={firstTimeEmpData}
						selectedData={selectedData}
						canFetchNow={isFirstTimeDataLoaded}
						fetchData={fetchEmployees}
						placeholder={"Select HR"}
						mode={"multiple"}
						isObject={true}
						loadDefaultData={false}
						optionComponent={opt => {
							return (
								<>
									<Avatar
										name={opt.name}
										src={opt.image}
										className="!bg-black"
									>
										{getNameForImage(opt.name)}
									</Avatar>
									{opt.name}
								</>
							);
						}}
						dataVal={value}
						name="hr"
						showSearch={true}
						direction={Direction}
						rules={[
							{
								required: true,
								message: "Please Select Member",
							},
						]}
					/>
				</Form.Item>

				<Form.Item
					name="finance"
					label={"Finance"}
					showSearch={true}
					direction={Direction}
					style={{ marginBottom: "0px" }}
				>
					<CustomSelect
						style={{ marginBottom: "0px" }}
						data={firstTimeEmpData}
						selectedData={selectedData}
						canFetchNow={isFirstTimeDataLoaded}
						fetchData={fetchEmployees}
						placeholder={"Select Finance"}
						mode={"multiple"}
						isObject={true}
						loadDefaultData={false}
						optionComponent={opt => {
							return (
								<>
									<Avatar
										name={opt.name}
										src={opt.image}
										className="!bg-black"
									>
										{getNameForImage(opt.name)}
									</Avatar>
									{opt.name}
								</>
							);
						}}
						dataVal={value}
						name="finance"
						showSearch={true}
						direction={Direction}
						rules={[
							{
								required: true,
								message: "Please Select Member",
							},
						]}
					/>
				</Form.Item>

				<Form.Item area="true">
					<SingleUpload
						handleImageUpload={handleImageUpload}
						img="Add Image"
						position="flex-start"
						uploadText={resignationDictionary.upload}
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						size="medium"
						className="ThemeBtn"
						block
						htmlType="submit"
						title={"Create"}
					>
						{" "}
						{"Create"}{" "}
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Composer;
