import { Button, Input } from "antd";
import React from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";

import CustomModal from "../../../workboard/Modal/CustomModal";
import { handleComposeEmail } from "../../store/slice";
import { SendOutlined } from "@ant-design/icons";

function EmailForm() {
	return (
		<div className="flex flex-col ">
			<div className="p-2">
				<Input placeholder="To:" />
			</div>
			<div className="p-2">
				<Input placeholder="Subject" />
			</div>
			<div className="p-2">
				<ReactQuill />
			</div>
		</div>
	);
}

function ComposeEmail() {
	const dispatch = useDispatch();
	const composeEmail = useSelector(
		state => state.leadMangerSlice.composeEmail
	);

	return (
		<CustomModal
			isModalVisible={composeEmail}
			onCancel={() => {
				dispatch(handleComposeEmail(false));
			}}
			title={<div className="flex justify-center">Compose Email</div>}
			footer={
				<div className="flex justify-end gap-2 items-center">
					<Button className="primary_btn !w-fit">Preview</Button>
					<Button className="primary_btn !w-fit">
						Send <SendOutlined />
					</Button>
				</div>
			}
			centered={true}
			children={<EmailForm />}
			className={"rounded-lg"}
			width={"50%"}
		/>
	);
}

export default ComposeEmail;
