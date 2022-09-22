import { Button, Checkbox, DatePicker, Form, Input } from "antd";
import React from "react";

function EducationForm({ handleEducation }) {
	const onFinish = values => {
		console.log("Success:", values);
	};

	const onFinishFailed = errorInfo => {
		console.log("Failed:", errorInfo);
	};
	return (
		<>
			<Form
				name="basic"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				layout="vertical"
			>
				<Form.Item name="university" label={"University"}>
					<Input
						placeholder="School"
						className="!rounded"
						size="large"
					/>
				</Form.Item>
				<div className="flex flex-col gap-2">
					<span>Time Period</span>
					<div className="flex items-center gap-2">
						<Form.Item name={"startDate"}>
							<DatePicker size="large" />
						</Form.Item>
						<p>to</p>
						<Form.Item name="endDate">
							<DatePicker size="large" />
						</Form.Item>
					</div>
				</div>
				<Form.Item name="remember" valuePropName="checked">
					<Checkbox>Graduated</Checkbox>
				</Form.Item>
				<Form.Item name="description">
					<Input.TextArea
						size="large"
						placeholder="Description"
						rows={4}
						className="!rounded"
					/>
				</Form.Item>
				<Form.Item name="degree">
					<Input
						placeholder="Degree"
						className="!rounded"
						size="large"
					/>
				</Form.Item>
				{/* <Form.Item name="remember" valuePropName="checked">
					<Checkbox onClick={handleCurrentWork}>
						I currently work here
					</Checkbox>
				</Form.Item> */}

				<div className="flex gap-5 justify-end">
					<Button
						onClick={handleEducation}
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

export default EducationForm;
