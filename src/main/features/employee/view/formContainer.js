import React, { useState } from "react";
import * as S from "../Styles/employee.style";
import { Button, Form } from "antd";
// import { useMediaQuery } from "react-responsive";
import EmployeeForm from "./employeeForm";
import EducationForm from "./educationForm";
import EmergencyForm from "./emergencyForm";
import ExperienceForm from "./experienceForm";
import UserRightForm from "./userRightForm";
import BankForm from "./bankDetailForm";
import "../Styles/employee.css";
import { useSelector } from "react-redux";

const EmployeeFormContainer = props => {
	// const [form] = Form.useForm();
	const { loader: imgLoader } = useSelector(state => state.sharedSlice);
	const { loader: employeeLoader } = useSelector(
		state => state.employeeSlice
	);

	const validateMessages = {
		required: "Field is required!",
		types: {
			text: "${label} is not a valid name!",
			email: "${label} is not a valid email!",
			number: "${label} is not a valid number!",
		},
		number: {
			range: "${label} must be between ${min} and ${max}",
		},
	};

	const onFinish = values => {
		console.log("Received values of form: ", values);
		props.handleSubmit(values);
		// form.resetFields();
	};

	return (
		<S.Container
			form={props.form}
			onFinish={onFinish}
			name="EmployeeFormConatiner"
			validateMessages={validateMessages}
			scrollToFirstError={true}
			initialValues={{ titleId: 1 }}
		>
			<EmployeeForm handleImageUpload={props.handleImageUpload} />
			<EducationForm />
			<ExperienceForm />
			<EmergencyForm />
			<BankForm />
			{/* <UserRightForm /> */}

			<div className="employeeSubmitButton">
				<Button
					size="large"
					type="primary"
					htmlType="submit"
					loading={imgLoader || employeeLoader}
					className="ThemeBtn"
				>
					Submit
				</Button>
			</div>
		</S.Container>
	);
};

export default EmployeeFormContainer;
