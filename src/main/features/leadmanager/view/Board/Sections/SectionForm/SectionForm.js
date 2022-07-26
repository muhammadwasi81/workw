import React from "react";
import { Button, Form, Input, Radio } from "antd";
import { BiPencil, BiWorld } from "react-icons/bi";
import {
	EnvironmentOutlined,
	MailOutlined,
	PhoneOutlined,
} from "@ant-design/icons";
function SectionForm(props) {
	return (
		<div className="bg-white p-3 rounded-sm">
			<Form
				name="basic"
				initialValues={
					{
						// remember: true,
					}
				}
				layout={"vertical"}
				onFinish={props.onFinish}
				// onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					name="name"
					// rules={[
					// 	{
					// 		required: true,
					// 		message: "Title required!",
					// 	},
					// ]}
				>
					<Input
						prefix={<BiPencil className="!text-gray-500" />}
						placeholder="Lead Name"
					/>
				</Form.Item>
				<Form.Item name="contactNo">
					<Input
						prefix={
							<PhoneOutlined
								rotate={90}
								className="!text-gray-500"
							/>
						}
						placeholder="Lead Phone Number"
					/>
				</Form.Item>
				<Form.Item name="email">
					<Input
						// type={"email"}
						prefix={<MailOutlined className="!text-gray-500" />}
						placeholder="Lead Email Address"
					/>
				</Form.Item>
				<Form.Item name="address">
					<Input
						prefix={
							<EnvironmentOutlined className="!text-gray-500" />
						}
						placeholder="Lead Address"
					/>
				</Form.Item>
				<Form.Item name="url">
					<Input
						prefix={<BiWorld className="!text-gray-500" />}
						placeholder="Lead Url"
						// type={"url"}
					/>
				</Form.Item>
				<Form.Item>
					<Radio.Group defaultValue="business">
						<Radio value="business"> Business </Radio>
						<Radio value="individual"> Individual </Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item>
					<div className="flex items-end gap-2 justify-end">
						<Button
							htmlType="button"
							className="ThemeBtn"
							onClick={props.handleToggleForm}
						>
							Cancel
						</Button>
						<Button
							type="primary"
							htmlType="submit"
							className="ThemeBtn"
						>
							Add
						</Button>
					</div>
				</Form.Item>
			</Form>
		</div>
	);
}

export default SectionForm;
