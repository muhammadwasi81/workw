import { Button, Form, Input, Avatar } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
import Select from "../../../sharedComponents/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import {
	getAllEmployees,
	getRewardCategory,
} from "../../../../utils/Shared/store/actions";
import { addReward } from "../store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { rewardDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import CustomSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { getNameForImage, STRINGS } from "../../../../utils/base";
import { emptyEmployeesData } from "../../../../utils/Shared/store/slice";

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
	const { Direction, rewardDictionary } = rewardDictionaryList[userLanguage];

	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [profileImage, setProfileImage] = useState(null);
	const [state, setState] = useState(initialState);
	const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
	const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
	const [value, setValue] = useState([]);

	const { rewardCategories } = useSelector(state => state.sharedSlice);
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
		// return () => {
		// 	dispatch(emptyEmployeesData());
		// };
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

		let image = {
			id: STRINGS.DEFAULTS.guid,
			file: profileImage[0].originFileObj,
		};
		let payload = { ...values, approvers, members, image };
		dispatch(addReward(payload));

		form.resetFields();
	};

	const onFinishFailed = errorInfo => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			<Form
				form={form}
				name="addReward"
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
				<Form.Item
					label={rewardDictionary.name}
					name="name"
					labelPosition="top"
					rules={[
						{
							required: true,
							message: rewardDictionary.pleaseEnterRewardName,
						},
					]}
				>
					<TextInput placeholder={rewardDictionary.enterRewardName} />
				</Form.Item>

<<<<<<< HEAD
  return (
    <>
      <Form
        form={form}
        name="addReward"
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
          label={rewardDictionary.name}
          name="name"
          labelPosition="top"
          rules={[
            {
              required: true,
              message: rewardDictionary.pleaseEnterRewardName,
            },
          ]}>
          <TextInput placeholder={rewardDictionary.enterRewardName} />
        </Form.Item>
=======
				<Form.Item
					label={rewardDictionary.category}
					name="categoryId"
					rules={[
						{
							required: true,
							message: "Please Enter Category",
						},
					]}
				>
					<Select
						data={rewardCategories}
						placeholder={rewardDictionary.category}
						style={{
							width: "100%",
							borderRadius: "5px",
						}}
						size="large"
					/>
				</Form.Item>
>>>>>>> e6d05b4aac3e85a4f95b3bdcb57e2ab603a29e58

				<Form.Item
					label={rewardDictionary.reason}
					name="reason"
					rules={[
						{
							required: true,
							message: rewardDictionary.enterRewardReason,
						},
					]}
				>
					<TextInput
						placeholder={rewardDictionary.enterRewardReason}
					/>
				</Form.Item>

				<Form.Item
					name="members"
					label={rewardDictionary.rewardTo}
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
						placeholder={rewardDictionary.selectMember}
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
					label={rewardDictionary.approvers}
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
						placeholder={rewardDictionary.selectMember}
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
					label={rewardDictionary.description}
					name="description"
					rules={[
						{
							required: true,
							message: rewardDictionary.enterDescription,
						},
					]}
				>
					<Input.TextArea
						placeholder={rewardDictionary.enterDescription}
					/>
				</Form.Item>

				<Form.Item area="true">
					<SingleUpload
						handleImageUpload={handleImageUpload}
						img="Add Image"
						position="flex-start"
						uploadText={rewardDictionary.upload}
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						size="medium"
						className="ThemeBtn"
						block
						htmlType="submit"
						title={rewardDictionary.createReward}
					>
						{" "}
						{rewardDictionary.createReward}{" "}
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Composer;
