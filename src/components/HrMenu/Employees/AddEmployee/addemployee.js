import React, { useState } from "react";
import * as S from "../Styles/employee.style";
import EmployeeForm from "./employeeform";
import EducationForm from "./educationform";
import { Button, Form } from "antd";
// import { useMediaQuery } from "react-responsive";
import EmergencyForm from "./emergencyForm";
import ExperienceForm from "./experienceform";
import UserRightForm from "./userrightform";
import BankForm from "./bankform";

const AddEmployee = () => {
	// const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1160px)" });
	const handleSubmit = e => {
		console.log(e);
		e.preventDefault();
	};

	const validateMessages = {
		required: "${name} is required!",
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
	};
	const handleInputChange = e => {
		console.log("e", e);
	};
	return (
		<S.Container
			onFinish={onFinish}
			name="nest-messages"
			onSubmit={handleSubmit}
			validateMessages={validateMessages}
		>
			<EmployeeForm handleInputChange={handleInputChange} />
			<EmergencyForm />
			<EducationForm />
			<ExperienceForm />
			<UserRightForm />
			<BankForm />
			<div
				style={{
					alignSelf: "flex-end",
					marginRight: "70px",
					marginTop: "20px",
				}}
			>
				<Button
					size="large"
					type="primary"
					htmlType="submit"
					style={{}}
				>
					Submit
				</Button>
			</div>
		</S.Container>
	);
};

export default AddEmployee;
