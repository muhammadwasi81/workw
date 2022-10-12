import React from "react";
import { Button, Checkbox, DatePicker, Form, Input } from "antd";
import { useState } from "react";

function WorkplaceForm({ handleShowWork }) {
	const [current, setCurrent] = useState(false);

	const onFinish = values => {
		console.log("Success:", values);
	};

	const onFinishFailed = errorInfo => {
		console.log("Failed:", errorInfo);
	};

	const handleCurrentWork = () => {
		setCurrent(!current);
	};

	return (
		<>
			<Form
				name="basic"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item name="company">
					<Input
						placeholder="Company"
						className="!rounded"
						size="large"
					/>
				</Form.Item>
				<Form.Item name="position">
					<Input
						placeholder="Position"
						className="!rounded"
						size="large"
					/>
				</Form.Item>
				<Form.Item name="city/town">
					<Input
						placeholder="City/Town"
						className="!rounded"
						size="large"
					/>
				</Form.Item>
				<Form.Item name="descriptiom">
					<Input.TextArea
						size="large"
						placeholder="Description"
						rows={4}
						className="!rounded"
					/>
				</Form.Item>
				<Form.Item name="remember" valuePropName="checked">
					<Checkbox onClick={handleCurrentWork}>
						I currently work here
					</Checkbox>
				</Form.Item>
				<div className="flex items-center gap-2">
					{current && <p>From</p>}
					<Form.Item name={current ? "endDate" : "startDate"}>
						<DatePicker size="large" />
					</Form.Item>
					{!current && (
						<>
							<p>to</p>
							<Form.Item name="endDate">
								<DatePicker size="large" />
							</Form.Item>
						</>
					)}
				</div>
				<div className="flex gap-5 justify-end">
					<Button
						onClick={handleShowWork}
						className="!rounded !border-none !bg-[#F4F4F4] !text-black !font-semibold hover:!bg-opacity-90 !px-6"
					>
						Cancel
					</Button>
					<Form.Item>
						<Button className="!rounded !border-none !bg-[#526bb1] !text-white !font-semibold hover:!bg-opacity-90 !px-6">
							Save
						</Button>
					</Form.Item>
				</div>
			</Form>
		</>
	);
}

export default WorkplaceForm;
