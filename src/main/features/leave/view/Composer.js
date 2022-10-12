import { Button, Form, Input } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
import Select from "../../../sharedComponents/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { getAllEmployees } from "../../../../utils/Shared/store/actions";
import { addLeave } from "../store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { leaveDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { uploadImage } from "../../../../utils/Shared/store/actions";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import CustomSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { getAllLeaveType } from "../leaveType/store/actions";
import { DatePicker, Checkbox, Typography } from "antd";
import { STRINGS } from "../../../../utils/base";

const { RangePicker } = DatePicker;

const initialState = {
	id: "",
	description: "",
	leaveTypeId: "",
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
	const { Direction, leaveDictionary } = leaveDictionaryList[userLanguage];

	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [profileImage, setProfileImage] = useState(null);
	const [state, setState] = useState(initialState);
	const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
	const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
	const [value, setValue] = useState([]);


	const { leaveTypes } = useSelector(state => state.leaveTypeSlice);
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

	const handleImageUpload = (data) => {
		setProfileImage(data);
	};

	useEffect(() => {
		dispatch(getAllLeaveType());
		// dispatch(getAllEmployee());
		// console.log(employeesList, "EMPLOYEES")
	}, []);

	const handleEndStartDate = (value, dateString, name) => {
		setState({
			...state,
			[name]: dateString,
		});
	};

	const onFinish = values => {
		let approvers = [];
		let members = [];
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
		if (typeof values.members === 'string') {
			members.push({
				memberId: values.members
			})
		} else {
			members = values.members.map((memeber) => {
				return {
					memberId: memeber
				};
			});
		}

		let image = { id: STRINGS.DEFAULTS.guid, file: profileImage[0].originFileObj }
		let payload = { ...values, approvers, members, image };

		dispatch(addLeave(payload));
		console.log(payload, "FINALLLLL");
	};

	const onFinishFailed = errorInfo => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			<Form
				form={form}
				name="addLeave"
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
					label={"Leave Type"}
					name="leaveTypeId"
					rules={[
						{
							required: true,
							message: "Please Enter Category",
						},
					]}
				>
					<Select
						data={leaveTypes}
						placeholder={"Select Type"}
						style={{
							width: "100%",
							borderRadius: "5px",
						}}
						size="large"
					/>
				</Form.Item>

				<Form.Item
					name="members"
					label={"On Behalf Of"}
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
						placeholder={leaveDictionary.selectMember}
						mode={"multiple"}
						isObject={true}
						loadDefaultData={false}
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
						dataVal={value}
						name="members"
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
					name="approvers"
					label={leaveDictionary.approvers}
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
						placeholder={leaveDictionary.selectMember}
						mode={"multiple"}
						isObject={true}
						loadDefaultData={false}
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
						dataVal={value}
						name="approvers"
						showSearch={true}
						direction={Direction}
						rules={[
							{
								required: true,
								message: "Please Select Approver",
							},
						]}
					/>
				</Form.Item>

				<Form.Item
					label={leaveDictionary.description}
					name="description"
					rules={[
						{
							required: true,
							message: leaveDictionary.enterDescription,
						},
					]}
				>
					<Input.TextArea
						placeholder={leaveDictionary.enterDescription}
					/>
				</Form.Item>

				<Form.Item label="Leaves Dates" name="startEndDate">
					<RangePicker
						format={"DD/MM/YYYY"}
						placeholder={["Start Start", "End Date"]}
						onChange={(value, dateString) => {
							handleEndStartDate(value, dateString, "start_end");
						}}
					/>
				</Form.Item>

				<Form.Item area="true">
					<SingleUpload
						handleImageUpload={handleImageUpload}
						img="Add Image"
						position="flex-start"
						uploadText={leaveDictionary.upload}
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						size="medium"
						className="ThemeBtn"
						block
						htmlType="submit"
						title={"Create Leave"}
					>
						{" "}
						{"Create Leave"}{" "}
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Composer;
