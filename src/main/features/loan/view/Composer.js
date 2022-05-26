import {Button, DatePicker, Form, Input} from "antd";
import 	Select from "../../../sharedComponents/Select/Select";
import React, { useState, useContext } from "react";
import {loanPurposeList} from "../enum";
import { useDispatch } from "react-redux";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { loanDictionaryList } from "../localization/index";
import moment from "moment";
import NewCustomSelect from "../../employee/view/newCustomSelect";
import {approvalDictionaryList} from "../../approval/localization";

const initialState = {
	id : "",
	amount: 0,
	deduction:150,
	loanTenure: 0,
	description: "",
	purposeId: "",
	imageId: "",
	userId:"",
	approvers: [
	  {
		approverId: "",
		approverType: 1,
	  }
	]
  }

const Composer = props => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { loanDictionary } = loanDictionaryList[userLanguage];
	const { approvalDictionary } = approvalDictionaryList[userLanguage];
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [state, setState] = useState({
		id : "",
		amount: 0,
		deduction:150,
		loanTenure: 0,
		description: "",
		deadline:moment(new Date()),
		purposeId: "",
		imageId: "",
		userId:"",
		approvers: [
			{
				approverId: "",
				approverType: 1,
			}
		]
	});

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
	return <>
		<Form
			form={form}
			name="addLoan"
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
				label={loanDictionary.purpose}
				name="purposeId"
				rules={[
					{
						required: true,
						message: loanDictionary.SelectPurpose
					},
				]}
			>

				<Select
					placeholder={loanDictionary.selectPurpose}
					data={loanPurposeList()}
					style={{
						width: "100%",
						borderRadius: "5px",
					}}
					size="large"
				/>
			</Form.Item>
			<Form.Item
				label={loanDictionary.amount}
				name="amount"
				labelPosition="top"
				rules={[
					{
						required: true,
						message: loanDictionary.pleaseEnterAmount
					},
				]}
				initialValue={state.amount}
			>
				<Input placeholder={loanDictionary.amount}
					   name="amount"
					   value={state.amount}
					   type="number"
					   onChange={(e) => {

						   form.setFieldsValue({
							   deduction:parseFloat(e.target.value).toFixed(2)/ state.loanTenure
						   });

					setState({...state,amount: parseFloat(e.target.value).toFixed(2),deduction:parseFloat(e.target.value).toFixed(2)/ state.loanTenure });

				}}/>
			</Form.Item>
			<Form.Item
				label={loanDictionary.loanTenureInMonths}
				name="loanTenure"
				labelPosition="top"
				rules={[
					{
						required: true,
						message: loanDictionary.pleaseEnterloanTenureInMonths
					},
				]}
				initialValue={state.loanTenure}
			>
				<Input placeholder={loanDictionary.loanTenureInMonths}
					   name="loanTenure"
					   type="number"
					   value={state.loanTenure}
					   onChange={(e) => {

						   form.setFieldsValue({
							   deduction:state.amount/ parseFloat(e.target.value).toFixed(2)
						   });

						   setState({...state,loanTenure: parseFloat(e.target.value).toFixed(2),deduction:state.amount/ parseFloat(e.target.value).toFixed(2) });
				}}/>
			</Form.Item>
			<Form.Item
				label={loanDictionary.deductionPerMonth}
				name="deduction"
				labelPosition="top"
				initialValue={state.amount}

			>
				<Input placeholder={loanDictionary.loanTenureInMonths}
					   type="number"
					   />
			</Form.Item>
			<Form.Item
				name="approvers"
				label={approvalDictionary.approvers}
				showSearch={true}
				direction={Direction}
				rules={[{ required: true }]}
			>
				<NewCustomSelect
					name="approvers"
					label={approvalDictionary.approvers}
					showSearch={true}
					direction={Direction}
					mode="multiple"
					endPoint="api/Reference/GetAllUserReference"
					requestType="get"
					placeholder={approvalDictionary.approvers}
				/>
			</Form.Item>
			<Form.Item
				label={loanDictionary.deadline}
				name="deadline"
				labelPosition="top"
				initialValue={state.deadline}
			>
				<DatePicker
					placeholder={loanDictionary.deadline}
					size="large"
					format={"DD/MM/YYYY"}
					getPopupContainer={trigger => trigger.parentNode}
					showTime={{
						defaultValue: state.deadline,
					}}
					disabledDate={current => {
						return current && current < moment().add(-1, "day");
					}}
				/>
			</Form.Item>
			<Form.Item
				label={loanDictionary.description}
				name="description"
				initialValue={state.description}
			>
				<Input.TextArea placeholder={loanDictionary.description} />
			</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					size="medium"
					className="ThemeBtn"
					block
					htmlType="submit"
					title={loanDictionary.createLoan}
				>
					{" "}
					{loanDictionary.createLoan}{" "}
				</Button>
			</Form.Item>
		</Form>
	</>;
};

export default Composer;
