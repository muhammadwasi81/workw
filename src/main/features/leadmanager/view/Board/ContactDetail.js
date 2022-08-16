import { Button, Form, Input, Select, Tag } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { jsonToFormData } from "../../../../../utils/base";
import { DEFAULT_GUID } from "../../../../../utils/constants";
import CommentWrapper from "../../../../sharedComponents/Comment/CommentWrapper";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { addLeadManagerContact } from "../../store/actions";
const { Option } = Select;
function ContactDetail() {
	const [image, setImage] = useState();
	const dispatch = useDispatch();
	const handleChange = value => {
		console.log(`selected ${value}`);
	};
	const prefixSelector = (
		<Form.Item name="titleId" noStyle>
			<Select>
				<Option value={1}>Mr</Option>
				<Option value={2}>Ms</Option>
				<Option value={3}>Mrs</Option>
			</Select>
		</Form.Item>
	);

	const onFinish = value => {
		const imageObj = {
			id: DEFAULT_GUID,
			file: image,
		};
		dispatch(
			addLeadManagerContact(
				jsonToFormData({ image: { ...imageObj }, ...value })
			)
		);
	};
	return (
		<Form
			name="basic"
			autoComplete="off"
			layout="vertical"
			initialValues={{ titleId: 1 }}
			onFinish={onFinish}
		>
			<div className="grid gap-x-5 grid-cols-[1.8fr_1.3fr_0.3fr]">
				<div className="flex gap-5">
					<Form.Item
						label="Friendly Status"
						name="friendlyStatusId"
						className=""
					>
						<Select
							// onChange={handleChange}
							placeholder="Select Friendly Status"
						>
							<Option value={1}>
								<Tag color="green">Friendly Status</Tag>
							</Option>
							<Option value={2}>
								<Tag color="yellow">Friendly Status</Tag>
							</Option>
							<Option value={3}>
								<Tag color="red">Friendly Status</Tag>
							</Option>
						</Select>
					</Form.Item>
					<Form.Item
						label={"Active Status"}
						name="activeStatusId"
						className=""
					>
						<Select
							// onChange={handleChange}
							placeholder="Select Active Status"
						>
							<Option value={1}>
								<Tag color="green">Active</Tag>
							</Option>
							<Option value={2}>
								<Tag color="red">In-Active</Tag>
							</Option>
						</Select>
					</Form.Item>
				</div>
				<div></div>

				<Form.Item label={"Name"} name="name" className="w-full">
					<Input
						placeholder="Write name"
						addonBefore={prefixSelector}
					/>
				</Form.Item>
				<div
					style={{ gridArea: "1/3/span 2/ span 1" }}
					className="flex items-end"
				>
					<SingleUpload
						handleImageUpload={fileData => {
							setImage(fileData[0].originFileObj);
						}}
						// uploadText={labels.uploadCvr}
						// multiple={false}
						// url={composerData.image}

						position={"justify-end item-end"}
					/>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-x-5">
				<Form.Item label={"Phone"} name="phoneNumber" className="">
					<Input placeholder="Write phone number" />
				</Form.Item>
				<Form.Item label={"Email"} name="email" className="">
					<Input placeholder="Write email address" type={"email"} />
				</Form.Item>
				<Form.Item
					label={"Office Address"}
					name="officeAddress"
					className=""
				>
					<Input placeholder="Write office address" />
				</Form.Item>
				<Form.Item label={"Address"} name="address" className="">
					<Input placeholder="Write address" />
				</Form.Item>
				<Form.Item label={"Gender"} name="genderId" className="">
					<Select placeholder="Select gender">
						<Option value={1}>Male</Option>
						<Option value={2}>Female</Option>
					</Select>
				</Form.Item>
				<Form.Item
					label={"Designation"}
					name="designation"
					className=""
				>
					<Input placeholder="Write designation" />
				</Form.Item>
				<Form.Item
					label={"Description"}
					name="description"
					className=""
				>
					<Input placeholder="Write designation" />
				</Form.Item>
			</div>
			{/* <div>
				<CommentWrapper />
			</div> */}
			<Form.Item className="!mt-5">
				<Button
					type="primary"
					htmlType="submit"
					className="ThemeBtn !block ml-auto"
				>
					Update
				</Button>
			</Form.Item>
		</Form>
	);
}

export default ContactDetail;
