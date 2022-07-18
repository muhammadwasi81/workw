import { Button, Form, Input } from "antd";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";

import { FormTextArea } from "../../../../components/HrMenu/Administration/StyledComponents/adminForm";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import * as S from "../../employee/Styles/employee.style";
import { FormLabel } from "./FormLabel";
import { addBusinessPolicy } from "../store/action";

function BusinessPolicyComposer() {
	const dispatch = useDispatch();
	const { userLanguage } = useContext(LanguageChangeContext);
	const { administration, sharedLabels, Direction } =
		dictionaryList[userLanguage];

	const onFinish = values => {
		console.log(values, "HELLO BUSINESS COMPOSER");
		dispatch(addBusinessPolicy(values))
	};

	return (
		<div className="ar_container">
			<Form
				onFinish={onFinish}
				className="ar_form businessPolicyForm"
				layout="vertical"
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
						/>
					</S.FormItem>
					<S.FormItem
						direction={Direction}
						name="description"
						rules={[
							{
								required: true,
								message:
									"Please Enter Description",
							},
						]}
						label={
							<FormLabel>{"Description"}</FormLabel>
						}
					>
						<FormTextArea
							direction={Direction}
							placeholder={
								"Enter Description"
							}
						/>
					</S.FormItem>
				</div>

				<Form.Item>
					<Button type="primary" size="large" className="ThemeBtn" block htmlType="submit" title={"Create"}>
						{" "}
						{"Create"}{" "}
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default BusinessPolicyComposer;
