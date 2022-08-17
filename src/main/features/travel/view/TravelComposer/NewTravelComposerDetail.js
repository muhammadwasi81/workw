import { Button, Form, Input, Typography } from "antd";
import React from "react";
import TravelCard from "../UI/TravelCard";

function NewTravelComposerDetail() {
	const [form] = Form.useForm();
	return (
		<Form
			form={form}
			layout="vertical"
			name="travelDetailForm"
			onFinish={values => {
				console.log("travelDetailForm:", values);
			}}
		>
			<Form.Item
				// direction={}
				rules={[
					{
						required: true,
						message: "Please enter valid reason.",
					},
				]}
				label={"Reason"}
				name="reason"
			>
				<Input
					placeholder={"adfasdf"}
					// onChange={onInputFieldChange}
					// error={errors.reason}
					// value={state.reason}
					size="large"
				/>
			</Form.Item>
			<Button
				htmlType="submit"
				onClick={e => {
					e.preventDefault();
					form.submit();
				}}
				// className={
				// 	"ThemeBtn  font_bold " +
				// 	`${isTablet ? "w-full" : "font_medium tag_btn"}`
				// }
				// onClick={checkValidation}
			>
				Add
			</Button>
		</Form>
	);
}

export default NewTravelComposerDetail;
