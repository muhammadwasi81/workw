import { Button, Checkbox, DatePicker, Form, Input, Radio, Select } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	DeploymentUnitOutlined,
	CalendarOutlined,
	EnvironmentOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";

import { getAllEmployees } from "../../../../utils/Shared/store/actions";
import MemberSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { ScheduleTypeEnum } from "../enum/enum";
import { addSchedule } from "../store/action";
import { defaultUiid } from "../../../../utils/Shared/enums/enums";
import { jsonToFormData } from "../../../../utils/base";

function CreateSchedule() {
	const [venue, setVenue] = useState("Venue");
	const [quillError, setQuillError] = useState(false);
	const [files, setFiles] = useState([]);
	const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
	const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
	const {
		sharedSlice: { employees },
	} = useSelector(state => state);
	const loading = useSelector(state => state.scheduleSlice.loading);
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const modules = {
		toolbar: [
			[{ font: [] }],
			[{ size: ["small", false, "large", "huge"] }],
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			["bold", "italic", "underline", "link", "image"],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ script: "sub" }, { script: "super" }],
			//[{ 'indent': '-1'}, { 'indent': '+1' }],
			[{ direction: "rtl" }],
			[{ align: ["center"] }],
			[{ color: [] }, { background: [] }],
			["clean"],
		],
		clipboard: {
			matchVisual: false,
		},
	};
	const formats = {
		toolbar: [
			[{ font: [] }],
			[{ size: ["small", false, "large", "huge"] }],
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			["bold", "italic", "underline", "link", "image"],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ script: "sub" }, { script: "super" }],
			//[{ 'indent': '-1'}, { 'indent': '+1' }],
			[{ direction: "rtl" }],
			[{ align: ["center"] }],
			[{ color: [] }, { background: [] }],
			["clean"],
		],
	};
	const meetingduration = [
		{ label: "15 min", value: "15 minutes" },
		{ label: "30 min", value: "30 minutes" },
		{ label: "45 min", value: "45 minutes" },
		{ label: "01 hr", value: "1 hours" },
		{ label: "02 hr", value: "2 hours" },
	];
	const travelDuration = [
		{ label: "0 min", value: 0 },
		{ label: "15 min", value: 15 },
		{ label: "30 min", value: 30 },
		{ label: "45 min", value: 45 },
	];
	const preparationDuration = [
		{ label: "0 min", value: 0 },
		{ label: "15 min", value: 15 },
		{ label: "30 min", value: 30 },
		{ label: "45 min", value: 45 },
	];
	const fetchEmployees = (text, pgNo) => {
		dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
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

	const onFinish = value => {
		console.log("value", value);
		let objToSend = value;
		if (objToSend.startDate) {
			objToSend.endDate = moment(value.startDate)
				.add(+value.endDate.split(" ")[0], value.endDate.split(" ")[1])
				.format();
			objToSend.startDate = moment(objToSend.startDate).format();
		}else{
      objToSend.endDate=""
    }
		if (objToSend.members) {
			objToSend.members = value.members.map(member => {
				return { memberId: member };
			});
		}
		let attachemnts;
		if (files.length > 0) {
			attachemnts = files.map(file => {
				return {
					id: defaultUiid,
					file: file.originFileObj,
				};
			});
		}

		if (venue !== "Venue") {
			objToSend.onVideoConference = true;
		}

		dispatch(
			addSchedule(
				jsonToFormData({
					...objToSend,
					attachemnts,
				})
			)
		);
	};
	const onFinishFailed = value => {
		// console.log('field validating', form.getFieldError("description")[0]);
		if (form.getFieldError("description")[0]) {
			setQuillError(true);
			return;
		}
		setQuillError(false);
		// if (
		// 	value.values.description.replace(/<(.|\n)*?>/g, "").trim()
		// 		.length === 0
		// ) {
		// 	form.setFieldsValue({
		// 		description: "",
		// 	});
		// }
	};

	const checkDesc = (_, value) => {
		if (value.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
			return Promise.reject(new Error(""));
		}
		return Promise.resolve();
	};

	return (
		<div className="createSchedule">
			<Form
				form={form}
				layout="vertical"
				initialValues={{
					description: "",
					location: "",
					scheduleType: ScheduleTypeEnum.Meeting,
					endDate: "15 minutes",
					onVideoConference: false,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					name="subject"
					label={"Task Subject:"}
					rules={[{ required: true, message: "Subject is required" }]}
				>
					<Input placeholder="Write Subject"></Input>
				</Form.Item>
				<Form.Item
					name="description"
					label={"Description:"}
					rules={[
						{
							required: true,
							message: "Description is required",
							// validator: checkDesc,
						},
					]}
				>
					<ReactQuill
						className={`${
							quillError
								? "ant-input ant-input-status-error !p-0"
								: "ReactQuill "
						} `}
						onChange={e => {
							if (
								e.replace(/<(.|\n)*?>/g, "").trim().length === 0
							) {
								form.setFieldsValue({
									description: "",
								});
								setQuillError(true);
								return;
							}
							if (quillError) {
								setQuillError(false);
							}
						}}
						modules={modules}
						formats={formats}
						placeholder="Description"
					/>
					{/* {quillError && (
						<div className="flex flex-nowrap -top-[5px] relative">
							<div className="ant-form-item-explain ant-form-item-explain-connected">
								<div className="ant-form-item-explain-error">
									Description is required
								</div>
							</div>
						</div>
					)} */}
				</Form.Item>
				<Form.Item label="Type:" name={"scheduleType"}>
					<Radio.Group
						onChange={e => {
							console.log("e", e.target.value);
						}}
					>
						<Radio.Button value={ScheduleTypeEnum.Meeting}>
							<DeploymentUnitOutlined />
							Meeting
						</Radio.Button>
						<Radio.Button value={ScheduleTypeEnum.Appointment}>
							<CalendarOutlined />
							Appointment
						</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item label="Loaction:">
					<Radio.Group
						onChange={e => {
							setVenue(e.target.value);
						}}
						defaultValue={venue}
					>
						<Radio.Button value="Venue">
							<EnvironmentOutlined />
							Venue
						</Radio.Button>
						<Radio.Button value="Workwise">
							<VideoCameraOutlined />
							Workwise
						</Radio.Button>
					</Radio.Group>
				</Form.Item>
				{venue === "Venue" && (
					<Form.Item label={"Venue:"} name="location">
						<Input placeholder="Write Venue" />
					</Form.Item>
				)}
				<div className="formInput w-50">
					<Form.Item label={"Time:"} name="startDate">
						<DatePicker
							format="YYYY-MM-DD HH:mm:ss"
							showTime={{
								defaultValue: moment("00:00:00", "HH:mm:ss"),
							}}
						/>
					</Form.Item>
					<Form.Item label={"Duration:"} name="endDate">
						<Select
							defaultValue="15min"
							options={meetingduration}
						></Select>
					</Form.Item>
				</div>

				<MemberSelect
					isObject={true}
					data={firstTimeEmpData}
					selectedData={(data, obj) => {}}
					canFetchNow={isFirstTimeDataLoaded}
					fetchData={fetchEmployees}
					name="members"
					mode="multiple"
					placeholder={"Select Employee"}
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
					label={"Members"}
					// rules={[{ required: true, message: "Members is required" }]}
					size="default"
				/>

				<div className="formInput w-50">
					{/* <Form.Item label={""}>
						<Checkbox>Travel Time</Checkbox>
					</Form.Item> */}
					<Form.Item label={"Travel Time:"} name="travelTime">
						<Select
							defaultValue={0}
							options={travelDuration}
						></Select>
					</Form.Item>
					<Form.Item
						label={"Preparation Time:"}
						name="preparationTime"
					>
						<Select
							defaultValue={0}
							options={preparationDuration}
						></Select>
					</Form.Item>
				</div>
				{/* <div className="formInput w-33">
					<Form.Item label={""}>
						<Checkbox>Preparation time</Checkbox>
					</Form.Item>
				</div> */}
				<Form.Item label={"Attachment"} labelPosition="top">
					<SingleUpload
						handleImageUpload={file => {
							// console.log(file);
							setFiles(file);
							// setFile(file[0].originFileObj);
						}}
						multiple={true}
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
						loading={loading}
					>
						{"Create Schedule"}
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default CreateSchedule;
