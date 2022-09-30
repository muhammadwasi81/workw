import { Button, Form, Input, message, Select } from "antd";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill"
import { FormTextArea } from "../../../../components/HrMenu/Administration/StyledComponents/adminForm";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import * as S from "../../employee/Styles/employee.style";
import { FormLabel } from "./FormLabel";
import { addBusinessPolicy, updateBusinessPolicy } from "../store/action";
import 'react-quill/dist/quill.snow.css';
import { handleEdit } from "../store/slice";
const { Option } = Select;

const modules = {
	toolbar: [
		[{ 'font': [] }],
		[{ 'size': ['small', false, 'large', 'huge'] }],
		[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
		['bold', 'italic', 'underline', 'link', 'image'],
		[{ 'list': 'ordered' }, { 'list': 'bullet' }],
		[{ 'script': 'sub' }, { 'script': 'super' }],
		//[{ 'indent': '-1'}, { 'indent': '+1' }],
		[{ 'direction': 'rtl' }],
		[{ 'align': ['center'] }],
		[{ 'color': [] }, { 'background': [] }],
		['clean']
	]
}
const formats = {
	toolbar: [
		[{ 'font': [] }],
		[{ 'size': ['small', false, 'large', 'huge'] }],
		[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
		['bold', 'italic', 'underline', 'link', 'image'],
		[{ 'list': 'ordered' }, { 'list': 'bullet' }],
		[{ 'script': 'sub' }, { 'script': 'super' }],
		//[{ 'indent': '-1'}, { 'indent': '+1' }],
		[{ 'direction': 'rtl' }],
		[{ 'align': ['center'] }],
		[{ 'color': [] }, { 'background': [] }],
		['clean']
	]
}




function BusinessPolicyComposer({editData}) {
	const dispatch = useDispatch();
	const { userLanguage } = useContext(LanguageChangeContext);
	const { administration, sharedLabels, Direction } =
		dictionaryList[userLanguage];

	const onFinish = values => {
		if (values.name.length > 20) {
			message.error("Name characters limit exeeded")
		} else {
			if (editData) {
				dispatch(updateBusinessPolicy({...values, id: editData.id}))
		   } else {
			   dispatch(addBusinessPolicy(values))
		   }
		}
	};

	return (
		<div className="ar_container">
			<Form
				onFinish={onFinish}
				className="ar_form businessPolicyForm"
				layout="vertical"
				initialValues={editData}
			>
				<div>
					<S.FormItem
						direction={Direction}
						name="name"
						label={
							<FormLabel>
								{
									"Name"
								}
							</FormLabel>
						}
						rules={[
							{
								required: true,
								message:
									"Please Enter Name",
							},
						]}
					>
						<Input
							placeholder={
								"Enter Name"
							}
							size="large"
						/>
					</S.FormItem>
					<S.FormItem
						direction={Direction}
						name="typeId"
						rules={[
							{
								required: true,
								message:
									"Please Select Type",
							},
						]}
						label={
							<FormLabel>{"Type"}</FormLabel>
						}
					>
						<Select
							showSearch
							placeholder="Select Type"
							size="large"
						>
							<Option value={1}>HR</Option>
							<Option value={2}>Other</Option>
						</Select>
					</S.FormItem>
					<S.FormItem name="description" rules={[
						{
							required: true,
							message:
								"Please Enter Description",
						},
					]}
						label={
							<FormLabel>{"Description"}</FormLabel>
						} >
						<ReactQuill
							style={{overflow: "hidden"}}
							className="ReactQuill"
							onChange={(e) => console.log(e)}
							modules={modules}
							formats={formats}
						/>
					</S.FormItem>
				</div>

				<Form.Item>
					<Button type="primary" size="large" className="ThemeBtn" block htmlType="submit" title={"Create"}>
						{" "}
						{ editData ? "Save" : "Create"}{" "}
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default BusinessPolicyComposer;
