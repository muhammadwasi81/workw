import React, { useContext, useEffect, useState } from "react";
import {
	CheckCircleOutlined,
	WalletOutlined,
	TeamOutlined,
	BankOutlined,
	PieChartOutlined,
} from "@ant-design/icons";
import "swiper/css";
import ExpenseType from "../components/ExpenseType";
import { Button, Form, Input, Radio, DatePicker, Checkbox } from "antd";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../store/actions";
import MemberSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import { getAllEmployees } from "../../../../utils/Shared/store/actions";
import { DEFAULT_GUID } from "../../../../utils/constants";
import moment from "moment";
import Select from "../../../sharedComponents/Select/Select";
import { getAllExpenseHeaderService } from "../../expenseHeader/services/service";
import { defaultUiid } from "../../../../utils/Shared/enums/enums";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { ExpenseDictionary } from "../localization";
const { TextArea } = Input;

function CreateExpense() {
	const [isExecutor, setIsExecutor] = useState(false);
	const { userLanguage } = useContext(LanguageChangeContext);
	const {
		Direction,
		ExpenseDictionaryList: { labels, placeHolder },
	} = ExpenseDictionary[userLanguage];
	const [type, setType] = useState(1);
	const dispatch = useDispatch();
	const {
		sharedSlice: { employees },
	} = useSelector(state => state);

	const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
	const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
	const [allHeader, setAllHeader] = useState([]);
	const [file, setFile] = useState("");
	const listObj = {
		1: labels.general,
		2: labels.project,
		3: labels.group,
		4: labels.travel,
		5: labels.assets,
	};
	const [employeeData, setEmployeeData] = useState({
		approvers: [],
		executors: [],
		finance: [],
	});
	useEffect(() => {
		if (employees.length > 0 && !isFirstTimeDataLoaded) {
			setIsFirstTimeDataLoaded(true);
			setFirstTimeEmpData(employees);
		}
	}, [employees]);
	const selectedData = (_, obj, name) => {
		if (name === "approvers") {
			setEmployeeData(preValue => {
				return {
					...preValue,
					approvers: obj.map(({ type, id }) => {
						return { approverType: type, approverId: id };
					}),
				};
			});
		} else if (name === "executors") {
			setEmployeeData(preValue => {
				return {
					...preValue,
					executors: obj.map(({ type, id }) => {
						return { approverType: type, approverId: id };
					}),
				};
			});
		} else if (name === "finance") {
			setEmployeeData(preValue => {
				return {
					...preValue,
					finance: obj.map(({ type, id }) => {
						return { approverType: type, approverId: id };
					}),
				};
			});
		}
	};
	const getAllHeaderExpense = async () => {
		const { data } = await getAllExpenseHeaderService();
		if (data?.length) setAllHeader(data);
	};
	useEffect(() => {
		fetchEmployees("", 0);
		getAllHeaderExpense();
	}, []);
	const fetchEmployees = (text, pgNo) => {
		dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
	};
	const handleHeader = value => {
		console.log(value);
	};
	const onFinish = values => {
		const {
			categoryId,
			headerId,
			amount,
			expenseDate,
			description,
			referenceType,
		} = values;

		const expenseObj = {
			id: DEFAULT_GUID,
			referenceId: defaultUiid,
			categoryId,
			headerId,
			referenceType,
			amount,
			expenseDate: moment(expenseDate._d).format(),
			isReimbursable: isExecutor,
			description,
			attachments: { id: DEFAULT_GUID, file: file },
			approvers: [...employeeData.approvers],
			executors: [...employeeData.executors],
			financers: [...employeeData.finance],
		};
		dispatch(addExpense(expenseObj));
	};

	const [form] = Form.useForm();
	return (
		<Form
			style={{ direction: Direction }}
			form={form}
			name="addExpense"
			onFinish={onFinish}
			autoComplete="off"
			layout="vertical"
			className={Direction === "ltr" ? "addExpense" : "addExpense rtl"}
			initialValues={{ categoryId: 1, referenceType: 1 }}
		>
			<ExpenseType labels={labels} />
			<Form.Item label={labels.types} name="referenceType">
				<Radio.Group
					defaultValue={1}
					rules={[{ required: true }]}
					className="radioPrimary"
					onChange={value => {
						setType(value.target.value);
					}}
				>
					<Radio.Button value={1}>
						<WalletOutlined />
						{labels.general}
					</Radio.Button>
					<Radio.Button value={2}>
						<PieChartOutlined />
						{labels.project}
					</Radio.Button>
					<Radio.Button value={3}>
						<TeamOutlined />
						{labels.group}
					</Radio.Button>
					<Radio.Button value={4}>
						<CheckCircleOutlined />
						{labels.travel}
					</Radio.Button>
					<Radio.Button value={5}>
						<BankOutlined />
						{labels.assets}
					</Radio.Button>
				</Radio.Group>
			</Form.Item>
			{type !== 1 && (
				<Form.Item
					rules={[{ required: true }]}
					label={`${listObj[type]} List`}
					name="amount"
					labelPosition="top"
				>
					<Input placeholder={listObj[type]} />
				</Form.Item>
			)}
			<Form.Item
				rules={[{ required: true }]}
				label={labels.header}
				name="headerId"
				labelPosition="top"
			>
				<Select
					placeholder={placeHolder.writeHeaderHere}
					data={allHeader}
					onChange={handleHeader}
					style={{
						width: "100%",
						borderRadius: "5px",
					}}
					size="large"
				/>
			</Form.Item>
			<div className="formItem-w50">
				<Form.Item
					label={labels.amount}
					name="amount"
					labelPosition="top"
					rules={[{ required: true }]}
				>
					<Input
						placeholder={placeHolder.enterAmount}
						type={"number"}
					/>
				</Form.Item>
				<Form.Item
					label={labels.date}
					name="expenseDate"
					labelPosition="top"
					rules={[{ required: true }]}
				>
					<DatePicker placeholder={placeHolder.pickCurrentDate} />
				</Form.Item>
				<Form.Item label="" name="isReimbursable" labelPosition="top">
					<Checkbox
						onChange={() => {
							setIsExecutor(!isExecutor);
						}}
					>
						{labels.isReimbursable}
					</Checkbox>
				</Form.Item>
			</div>
			<Form.Item
				name="approver"
				label={labels.approvers}
				rules={[{ required: true }]}
			>
				<MemberSelect
					isObject={true}
					data={firstTimeEmpData}
					selectedData={(data, obj, name = "approvers") =>
						selectedData(data, obj, name)
					}
					canFetchNow={isFirstTimeDataLoaded}
					fetchData={fetchEmployees}
					name="approvers"
					mode="multiple"
					placeholder={placeHolder.selectApprovers}
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
			</Form.Item>

			{!isExecutor && (
				<Form.Item
					rules={[{ required: true }]}
					name="Executor"
					label={labels.executors}
				>
					<MemberSelect
						isObject={true}
						data={firstTimeEmpData}
						selectedData={(data, obj, name = "executors") =>
							selectedData(data, obj, name)
						}
						canFetchNow={isFirstTimeDataLoaded}
						fetchData={fetchEmployees}
						name="Executors"
						mode="multiple"
						placeholder={placeHolder.selectExecutors}
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
				</Form.Item>
			)}
			<Form.Item
				name="Finance"
				label={labels.financers}
				rules={[{ required: true }]}
			>
				<MemberSelect
					isObject={true}
					data={firstTimeEmpData}
					selectedData={(data, obj, name = "finance") =>
						selectedData(data, obj, name)
					}
					canFetchNow={isFirstTimeDataLoaded}
					fetchData={fetchEmployees}
					name="Finance"
					mode="multiple"
					placeholder={placeHolder.selectFinancers}
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
			</Form.Item>

			<Form.Item
				label={labels.description}
				name="description"
				labelPosition="top"
				rules={[{ required: true }]}
			>
				<TextArea
					placeholder={placeHolder.writeDescription}
					name=""
					id=""
				></TextArea>
			</Form.Item>
			<Form.Item
				label={labels.attachments}
				name="attachments"
				labelPosition="top"
			>
				<SingleUpload
					handleImageUpload={file => {
						// console.log(file[0].originFileObj);
						setFile(file[0].originFileObj);
					}}
					position={"left"}
				/>
			</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					size="large"
					className="ThemeBtn"
					block
					htmlType="submit"
				>
					{labels.createExpense}
				</Button>
			</Form.Item>
		</Form>
	);
}

export default CreateExpense;
