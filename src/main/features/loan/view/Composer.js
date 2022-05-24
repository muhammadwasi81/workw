import { Button, Form, Input,Select } from "antd";
import React, { useEffect, useState, useContext } from "react";
//import LoanPurpose from "../enum/loanPurpose";
import TextInput from "../../../sharedComponents/Input/TextInput";
// import Button from "../../../../components/SharedComponent/button/index";
//import Select from "../../../../components/SharedComponent/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { addLoan } from "../store/actions";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import NewCustomSelect from "../../employee/view/newCustomSelect";
import {userTitle} from "../../../../utils/Shared/enums/enums";

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
	const { sharedLabels, Direction, loan, loanDictionary } = dictionaryList[userLanguage];

	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const [state, setState] = useState({
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

	const calculateDeduction=(e)=>{



	}
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
			{/*<Form.Item
				label={sharedLabels.purpose}
				name="purposeId"
				rules={[
					{
						required: true,
						message: sharedLabels.SelectPurpose
					},
				]}
			>
				<Select
					// value={
					//   "3fa85f64-5717-4562-b3fc-2c963f66afa6"
					// }
					data={[]}
					placeholder={sharedLabels.purpose}
					style={{
						width: "100%",
						borderRadius: "5px",
					}}
					size="large"
					{LoanPurpose.map(x => (
						<Option value={x.value}>{x.label}</Option>
					))}
				/>
			</Form.Item>*/}
			<Form.Item
				label={sharedLabels.amount}
				name="amount"
				labelPosition="top"
				rules={[
					{
						required: true,
						message: sharedLabels.pleaseEnterAmount
					},
				]}
				initialValue={state.amount}
			>
				<Input placeholder={sharedLabels.amount}
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
			{/*	<TextInput name="deduction"

						   value={state.amount}
					type="number"
					placeholder={loanDictionary.deductionPerMonth}/>*/}
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
