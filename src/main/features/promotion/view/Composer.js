import { Button, Form, Input } from "antd";
import React, { useEffect, useState, useContext } from "react";
import Select from "../../../sharedComponents/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { addPromotion } from "../store/actions";
import { promotionDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import CustomSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { getAllEmployeeShort } from "../../../../utils/Shared/store/actions";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import { getAllGrades } from "../../grade/store/actions";
import "./style.css"

const initialState = {
	id: "",
	description: "",
	gradeId: "",
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
	const { Direction, promotionDictionary } =
		promotionDictionaryList[userLanguage];

	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [profileImage, setProfileImage] = useState(null);
	const [state, setState] = useState(initialState);
	const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
	const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
	const [value, setValue] = useState([]);
	const [previousGrade, setPreviousGrade] = useState(null);

	const { employeeShort } = useSelector(
		state => state.sharedSlice
	);

	const { grades } = useSelector(
		state => state.gradeSlice
	);

	useEffect(() => {
		dispatch(getAllGrades());
	}, []);

	const selectedData = (data, obj) => {
		setValue(data);
		handleMember(obj);
		console.log(data, obj[0].grade, "MAIN")
		setPreviousGrade(obj[0].grade === '' ? "Not Available" : obj[0].grade)
	};
	const selectedDataApprover = (data, obj) => {
		setValue(data);
		handleMember(obj);
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
		dispatch(getAllEmployeeShort({ text, pgNo, pgSize: 20 }));
	};

	const [newState, setNewState] = useState({
		members: [],
		memberType: null,
	});

	useEffect(() => {
		if (employeeShort.length > 0 && !isFirstTimeDataLoaded) {
			setIsFirstTimeDataLoaded(true);
			setFirstTimeEmpData(employeeShort);
		}
	}, [employeeShort]);

	const onFinish = values => {
		let approvers = [];
		let currentGrade = employeeShort.filter(item => item.id === values.memberId)[0].grade
		console.log(currentGrade, "HELLO NEW")
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
		let payload = { ...values, approvers, previousGrade: currentGrade };
		console.log(payload, "Payload")
		dispatch(addPromotion(payload))
	};

	const onFinishFailed = errorInfo => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			<Form
				form={form}
				name="addPromotion"
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
					name="memberId"
					label={promotionDictionary.promotionTo}
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
						placeholder={promotionDictionary.selectMember}
						isObject={true}
						formItem={false}
						sliceName="employeeShort"
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
						name="memberId"
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
				<div className="currentGrade">
					<h5>Current Grade : </h5>
					<h5>&nbsp;&nbsp;{previousGrade && previousGrade}</h5>
				</div>
			<Form.Item
				label={"New Grade"}
				name="gradeId"
				rules={[
					{
						required: true,
						message: "Please Enter Category",
					},
				]}
			>
				<Select
					data={grades}
					placeholder={"Grades"}
					style={{
						width: "100%",
						borderRadius: "5px",
					}}
					size="large"
				/>
			</Form.Item>

			<Form.Item
				name="approvers"
				label={promotionDictionary.approvers}
				showSearch={true}
				direction={Direction}
				style={{ marginBottom: "0px" }}
			>
				<CustomSelect
					style={{ marginBottom: "0px" }}
					data={firstTimeEmpData}
					selectedData={selectedDataApprover}
					canFetchNow={isFirstTimeDataLoaded}
					fetchData={fetchEmployees}
					placeholder={promotionDictionary.selectMember}
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
				label={promotionDictionary.description}
				name="description"
				rules={[
					{
						required: true,
						message: promotionDictionary.enterDescription,
					},
				]}>
				<Input.TextArea placeholder={promotionDictionary.enterDescription} />
			</Form.Item>

			<Form.Item>
				<Button
					type="primary"
					size="medium"
					className="ThemeBtn"
					block
					htmlType="submit"
					title={promotionDictionary.create}
				>
					{" "}
					{promotionDictionary.create}{" "}
				</Button>
			</Form.Item>
		</Form>
		</>
	);
};

export default Composer;
