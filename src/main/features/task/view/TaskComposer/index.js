import { CheckCircleOutlined } from "@ant-design/icons";
import {
	Avatar,
	Button,
	DatePicker,
	Form,
	Input,
	Popconfirm,
	Radio,
	Select,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { useDispatch } from "react-redux";
import { addNewTask } from "../../store/actions";
import { getNameForImage, STRINGS } from "../../../../../utils/base";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { taskDictionary } from "../../localization";
import MemberSelect from "../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { useSelector } from "react-redux";
import { getAllEmployees } from "../../../../../utils/Shared/store/actions";
import NewCustomSelect from "../../../../sharedComponents/CustomSelect/newCustomSelect";
import { TaskReferenceTypeEnum } from "../../enums/enum";
import { defaultUiid } from "../../../../../utils/Shared/enums/enums";
const { Option } = Select;
const { RangePicker } = DatePicker;
let newType;
function TaskComposer({
	referenceId = defaultUiid,
	referenceType = TaskReferenceTypeEnum.General,
	feature = "",
}) {
	const [form] = Form.useForm();
	const [isAssignTo, setIsAssignTo] = useState(false);
	const [attachments, setAttachments] = useState([]);
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction, taskDictionaryList } = taskDictionary[userLanguage];
	const { labels, createTextBtn, placeHolder } = taskDictionaryList;
	const dispatch = useDispatch();
	const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
	const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
	const [employeesData, setEmployeesData] = useState([]);

	const [type, setType] = useState("1");
	const [visible, setVisible] = useState(false);
	const {
		sharedSlice: { employees },
	} = useSelector(state => state);
	const { success, taskList, loading } = useSelector(
		state => state.taskSlice
	);
	const { list } = taskList;
	const options = [
		{ label: labels.selfTask, value: "self" },
		{ label: labels.assignTo, value: "assign" },
	];
	const initialValues = {
		subject: "",
		parentId: [],
		description: "",
		type: feature || "1",
		taskType: "self",
		assign: [],
		taskDate: "",
		referenceId,
		priority: "2",
		checkList: "",
	};

	const confirm = () => {
		setVisible(false);
		setEmployeesData([]);
		form.setFieldValue("assign", []);
		form.setFieldValue("type", newType);
		setType(newType);
		form.setFieldValue("referenceId", []);
	};
	const cancel = () => {
		setVisible(false);
	};
	const fetchEmployees = (text, pgNo) => {
		dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
	};

	const handleTaskType = ({ target }) => {
		const isShow = target.value !== "self";
		form.setFieldValue("assign", []);
		setIsAssignTo(isShow);
	};

	const handleSubmit = values => {
		let {
			date,
			description,
			priority,
			subject,
			taskType,
			parentId,
			// referenceId,
		} = values;
		let requestData = {
			subject,
			description,
			parentId: parentId || STRINGS.DEFAULTS.guid,
			// referenceId: referenceId
			// 	? JSON.parse(referenceId ? referenceId : referenceIdProps)?.id
			// 	: STRINGS.DEFAULTS.guid,
			referenceId,
			referenceType,
			startDate: date[0].format(),
			endDate: date[1].format(),
			priority: Number(priority),
			members:
				taskType === "self"
					? []
					: employeesData.map(item => ({ memberId: item.id })),
			attachments: attachments,
		};
		dispatch(addNewTask(requestData));
	};
	useEffect(() => {
		if (success) {
			form.resetFields();
			setVisible(false);
		}
	}, [success]);

	const selectedData = (data, obj) => {
		setEmployeesData(JSON.parse(data).members);
	};

	useEffect(() => {
		if (employees.length > 0 && !isFirstTimeDataLoaded) {
			setIsFirstTimeDataLoaded(true);
			setFirstTimeEmpData(employees);
		}
	}, [employees]);

	useEffect(() => {
		fetchEmployees("", 0);
	}, []);

	let classes = "task-composer  ";
	classes += Direction === "ltr" ? "ltr" : "rtl";

	const endpoint =
		type === "2" ? "api/Project/GetAllProject" : "api/Group/GetAllGroup";
	return (
		<Form
			className={classes}
			name="createTask"
			layout="vertical"
			initialValues={initialValues}
			onFinish={handleSubmit}
			form={form}
		>
			<Form.Item
				label={labels.taskSubject}
				name="subject"
				rules={[
					{
						required: true,
						message: "Please input subject!",
					},
				]}
			>
				<Input placeholder={placeHolder.writeSubject} />
			</Form.Item>
			<Form.Item label={labels.predecessor} name="parentId">
				<Select
					getPopupContainer={trigger => trigger.parentNode}
					placeholder={placeHolder.writePredecessor}
					size={"large"}
				>
					{list &&
						list.map(({ id, subject }) => (
							<Option key={id} value={id}>
								{subject}
							</Option>
						))}
				</Select>
				{/* <Input  /> */}
			</Form.Item>
			<Form.Item
				label={labels.description}
				name="description"
				rules={[
					{
						required: true,
						message: "Please input description!",
					},
				]}
			>
				<Input.TextArea
					placeholder={placeHolder.writeDescription}
					rows={4}
					maxLength={200}
					name="description"
				/>
			</Form.Item>
			<Form.Item
				label={labels.type}
				name="type"
				rules={[
					{
						required: true,
						message: "Please select type!",
					},
				]}
			>
				<Radio.Group
					className="radioPrimary"
					onChange={event => {
						if (form.getFieldValue("assign").length > 0) {
							setVisible(true);
							form.setFieldValue("type", type);
							newType = event.target.value;
						} else {
							setType(event.target.value);
							form.setFieldValue("referenceId", []);
						}
					}}
					disabled={feature ? true : false}
				>
					<Radio.Button value="1">
						<CheckCircleOutlined />
						{labels.general}
					</Radio.Button>
					<Radio.Button value="2">
						<CheckCircleOutlined />
						{labels.project}
					</Radio.Button>
					<Radio.Button value="3">
						<CheckCircleOutlined />
						{labels.group}
					</Radio.Button>
				</Radio.Group>
			</Form.Item>

			{type !== "1" && (
				<Form.Item
					name="referenceId"
					label={type === "2" ? "Projects" : "Groups"}
					direction={Direction}
					rules={[
						{
							required: true,
							message: `Please select ${
								type === "2" ? "Projects" : "Groups"
							}!`,
						},
					]}
				>
					<NewCustomSelect
						name="referenceId"
						label={type === "2" ? "Select Project" : "Select Group"}
						showSearch={true}
						onChange={(data, obj) => {
							selectedData(data, obj);
							form.setFieldValue("assign", []);
						}}
						valueObject={true}
						direction={Direction}
						endPoint={endpoint}
						requestType="post"
						placeholder={
							type === "2" ? "Select Project" : "Select Group"
						}
					/>
				</Form.Item>
			)}

			<Form.Item
				label=""
				name="taskType"
				rules={[
					{
						required: true,
						message: "Please select type!",
					},
				]}
			>
				<Radio.Group options={options} onChange={handleTaskType} />
			</Form.Item>
			{isAssignTo && (
				<>
					<Popconfirm
						title="Are you sure? Change Type will remove assign members."
						visible={visible}
						onConfirm={confirm}
						onCancel={cancel}
						okText="Yes"
						cancelText="No"
					/>
					{type === "1" ? (
						<Form.Item
							label={labels.assignTo}
							name="assign"
							rules={[
								{
									required: true,
									message: "Please Select Assign Member!",
								},
							]}
						>
							<MemberSelect
								onDeselect={value => {
									let memberArr = [...employeesData];
									memberArr = memberArr.filter(
										item => item.id !== value
									);
									setEmployeesData(memberArr);
									form.setFieldValue("assign", memberArr);
									form.setFieldValue("assign", memberArr);
								}}
								name="managerId"
								mode="multiple"
								formitem={false}
								isObject={true}
								data={firstTimeEmpData}
								canFetchNow={isFirstTimeDataLoaded}
								fetchData={fetchEmployees}
								placeholder={placeHolder.selectAssign}
								selectedData={(_, obj) => {
									setEmployeesData([...obj]);
								}}
								optionComponent={opt => {
									return (
										<>
											<Avatar
												src={opt.image}
												className="!bg-black"
											>
												{getNameForImage(opt.name)}
											</Avatar>
											{opt.name}
										</>
									);
								}}
							/>
						</Form.Item>
					) : (
						<Form.Item
							label={labels.assignTo}
							name="assign"
							rules={[
								{
									required: true,
									message: "Please Select Assign Member!",
								},
							]}
						>
							<Select
								mode="multiple"
								name="assign"
								size="large"
								getPopupContainer={trigger =>
									trigger.parentNode
								}
								placeholder={placeHolder.selectAssign}
								onDeselect={value => {
									let memberArr = [...employeesData];
									memberArr = memberArr.filter(
										item => item.id !== value
									);
									setEmployeesData(memberArr);
									form.setFieldValue("assign", memberArr);
								}}
							>
								{employeesData.map((item, index) => {
									return (
										<Option
											key={item?.id}
											value={item?.id}
											className="hover:!bg-primary-color hover:!text-white"
										>
											<Avatar
												src={item.member.image}
												className="!bg-black flex !mr-1"
											>
												{getNameForImage(
													item.member.name
												)}
											</Avatar>

											{item?.member?.name}
										</Option>
									);
								})}
							</Select>
						</Form.Item>
					)}
				</>
			)}

			<Form.Item
				label={labels.taskDate}
				name="date"
				rules={[
					{
						required: true,
						message: "Please select date!",
					},
				]}
			>
				<RangePicker
					getPopupContainer={trigger => trigger.parentNode}
					placeholder={[placeHolder.startDate, placeHolder.endtDate]}
					disabledDate={current =>
						current && current.valueOf() < Date.now()
					}
				/>
			</Form.Item>
			<Form.Item
				label={labels.priority}
				name="priority"
				rules={[
					{
						required: true,
						message: "Please select priority!",
					},
				]}
			>
				<Radio.Group className="radioPrimary radioPriority">
					{/* <Radio.Button value="1">
            <CheckCircleOutlined />
            {labels.default}
          </Radio.Button> */}
					<Radio.Button value="2">
						<CheckCircleOutlined />
						{labels.low}
					</Radio.Button>
					<Radio.Button value="3">
						<CheckCircleOutlined />
						{labels.medium}
					</Radio.Button>
					<Radio.Button value="4">
						<CheckCircleOutlined />
						{labels.high}
					</Radio.Button>
				</Radio.Group>
			</Form.Item>
			{/* <Form.Item label="" name="checkList">
        <Checkbox> {labels.checkList}</Checkbox>
      </Form.Item> */}
			<Form.Item label={labels.attachments} name="" className="w-max">
				<SingleUpload
					handleImageUpload={fileData => {
						setAttachments([
							...attachments,
							{
								id: STRINGS.DEFAULTS.guid,
								file: fileData[0].originFileObj,
							},
						]);
					}}
					uploadText={"Upload"}
					multiple={true}
				/>
			</Form.Item>
			<Form.Item>
				<Button
					loading={loading}
					className="ThemeBtn"
					block
					htmlType="submit"
				>
					{createTextBtn}
				</Button>
			</Form.Item>
		</Form>
	);
}

export default TaskComposer;
