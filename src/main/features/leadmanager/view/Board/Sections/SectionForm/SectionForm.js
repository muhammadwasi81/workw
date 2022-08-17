import React from "react";
import { Button, Form, Input, Radio } from "antd";
import { BiPencil, BiWorld } from "react-icons/bi";
import {
	EnvironmentOutlined,
	MailOutlined,
	PhoneOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
function SectionForm(props) {
	const loading = useSelector(state => state.leadMangerSlice.loading);
	return (
		<div className="bg-white p-3 rounded-sm">
			<Form
				name="basic"
				initialValues={{ typeId: 1 }}
				layout={"vertical"}
				onFinish={props.onFinish}
				autoComplete="off"
			>
				<Form.Item
					name="name"
					rules={[
						{
							required: true,
							message: "Name required!",
						},
					]}
				>
					<Input
						prefix={<BiPencil className="!text-gray-500" />}
						placeholder="Lead Name"
					/>
				</Form.Item>
				<Form.Item name="phoneNumber">
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
				<Form.Item name="emailAddress">
					<Input
						type={"email"}
						prefix={<MailOutlined className="!text-gray-500" />}
						placeholder="Lead Email Address"
					/>
				</Form.Item>
				<Form.Item
					name="address"
					rules={[
						{
							required: true,
							message: "Address required!",
						},
					]}
				>
					<Input
						prefix={
							<EnvironmentOutlined className="!text-gray-500" />
						}
						placeholder="Lead Address"
					/>
				</Form.Item>
				<Form.Item
					name="website"
					rules={[
						{
							required: true,
							message: "Website required!",
						},
					]}
				>
					<Input
						prefix={<BiWorld className="!text-gray-500" />}
						placeholder="Lead Website"
						type={"url"}
					/>
				</Form.Item>
				<Form.Item name="typeId">
					<Radio.Group>
						<Radio value={1}> Business</Radio>
						<Radio value={2}> Individual</Radio>
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
							loading={loading}
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
