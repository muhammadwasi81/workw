import { Button, Form, Input } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../../components/SharedComponent/Input/TextInput";
// import Button from "../../../../components/SharedComponent/button/index";
import Select from "../../../../components/SharedComponent/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { getRewardCategory } from "../../../../utils/Shared/store/actions";
import { addReward } from "../store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { uploadImage } from "../../../../utils/Shared/store/actions";
import NewCustomSelect from "../../employee/view/newCustomSelect";

const initialState = {
	id : "",
	name: "",
	reason: "",
	description: "",
	categoryId: "",
	imageId: "",
	members: [
	  {
		memberId: "",
		memberType: 1
	  }
	],
	approvers: [
	  {
		approverId: "",
		approverType: 0,
		isDefault: true,
		status: 1,
		email: ""
	  }
	]
  }

const Composer = props => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { sharedLabels, Direction, rewards, rewardsDictionary } = dictionaryList[userLanguage];

	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [profileImage, setProfileImage] = useState(null);
	const { rewardCategories } = useSelector(state => state.sharedSlice);

	const [state, setState] = useState(initialState);



	useEffect(() => {
		dispatch(getRewardCategory());
		// dispatch(getAllEmployee());
		// console.log(employeesList, "EMPLOYEES")
	}, []);

	const handleImageUpload = data => {
		setProfileImage(data);
	};

	const onFinish = values => {
		form.resetFields();

		dispatch(uploadImage(profileImage)).then(x => {
			// console.log(
			// 	x.payload.data[0].id,
			// 	"Hurry i got image if from server"
			// );
			console.log(x, "FIRST ONE")
			let photoId = x.payload.data[0].id;

			let approvers = values.approvers.map(approver => {
				return {
					approverId: approver,
					approverType: 0,
					isDefault: true,
					status: 0,
					email: "",
				};
			});
			let members = values.members.map(approver => {
				return {
					approverId: approver,
					approverType: 0,
					isDefault: true,
					status: 0,
					email: "",
				};
			});

			let payload = { ...values, imageId: photoId, approvers, members };

			dispatch(addReward(payload));
			console.log(payload, "FINALLLLL")
			// console.log(payload, "Final Data");
		});
		// const { id, name, reason, categoryId, imageId  } = values;
		// setState(prevState => ({
		// 	...prevState,
		// 	id,
		// 	name,
		// 	reason,
		// 	categoryId,
		// 	imageId,
		// 	members,
		// 	approvers
		// }));

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
					label={sharedLabels.name}
					name="name"
					labelPosition="top"
					rules={[
						{
							required: true,
							message: rewards.PleaseEnterAwardName,
						},
					]}
				>
					<TextInput placeholder={rewards.EnterAwardName} />
				</Form.Item>

				<Form.Item
					label={sharedLabels.award}
					name="reason"
					rules={[
						{
							required: true,
							message: rewards.EnterAwardReason,
						},
					]}
				>
					<TextInput placeholder={rewards.EnterAwardReason} />
				</Form.Item>

				<Form.Item
					label={sharedLabels.description}
					name="description"
					rules={[
						{
							required: true,
							message: sharedLabels.enterDescription,
						},
					]}
				>
					<Input.TextArea placeholder={sharedLabels.enterDescription} />
				</Form.Item>

				<Form.Item
					label={sharedLabels.category}
					name="categoryId"
					rules={[
						{
							required: true,
							message: "Please Enter Category",
						},
					]}
				>
					<Select
						// value={
						//   "3fa85f64-5717-4562-b3fc-2c963f66afa6"
						// }
						data={rewardCategories}
						placeholder={sharedLabels.category}
						style={{
							width: "100%",
							borderRadius: "5px",
						}}
						size="large"
					/>
				</Form.Item>

				<Form.Item
					name="members"
					label={sharedLabels.members}
					showSearch={true}
					direction={Direction}
					rules={[{ required: true }]}
				>
					<NewCustomSelect
						name="members"
						label={sharedLabels.members}
						showSearch={true}
						direction={Direction}
						mode="multiple"
						endPoint="api/Reference/GetAllUserReference"
						requestType="get"
						placeholder={sharedLabels.selectMember}
					/>
				</Form.Item>

				<Form.Item
					name="approvers"
					label={sharedLabels.approvers}
					showSearch={true}
					direction={Direction}
					rules={[{ required: true }]}
				>
					<NewCustomSelect
						name="approvers"
						label={sharedLabels.approvers}
						showSearch={true}
						direction={Direction}
						mode="multiple"
						endPoint="api/Reference/GetAllUserReference"
						requestType="get"
						placeholder={sharedLabels.approvers}
					/>
				</Form.Item>

				<Form.Item area="true">
					<SingleUpload
						handleImageUpload={handleImageUpload}
						img="Add Image"
						position="flex-start"
						uploadText={sharedLabels.upload}
					/>
				</Form.Item>

				{/*
        <Form.Item 
          label="Award To"
          name="members"
          rules={[
            {
              required: true,
              message: "Please Select Members",
            }
          ]}
          >
          <Select
            showSearch
            size="large"
            placeholder="Search Members"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value="1">Not Identified</Option>
            <Option value="2">Closed</Option>
            <Option value="3">Communicated</Option>
            <Option value="4">Identified</Option>
            <Option value="5">Resolved</Option>
            <Option value="6">Cancelled</Option>
          </Select>
        </Form.Item>

        <Form.Item 
          label="Approvers"
          name="approvers"
          rules={[
            {
              required: true,
              message: "Please Select Approvers",
            }
          ]}
          >
          <Select
            showSearch
            size="large"
            placeholder="Search Approvers"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value="1">Not Identified</Option>
            <Option value="2">Closed</Option>
            <Option value="3">Communicated</Option>
            <Option value="4">Identified</Option>
            <Option value="5">Resolved</Option>
            <Option value="6">Cancelled</Option>
          </Select>
        </Form.Item> */}

				<Form.Item>
					<Button
						type="primary"
						size="medium"
						className="ThemeBtn"
						block
						htmlType="submit"
						title={sharedLabels.createReward}
					>
						{" "}
						{rewardsDictionary.createReward}{" "}
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Composer;
