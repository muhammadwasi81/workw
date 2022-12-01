import { Button, Form, Input, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import CustomSelect from "../../../sharedComponents/Select/Select";
import { useDispatch } from "react-redux";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import * as S from "../../employee/Styles/employee.style";
import { FormLabel } from "./FormLabel";
import { addBusinessPolicy, updateBusinessPolicy } from "../store/action";
import { handleEdit } from "../store/slice";
import { getCountries } from "../../../../utils/Shared/store/actions";
import { useSelector } from "react-redux";
import SlabCreateTable from "./TaxSlabEntryTable";
const { Option } = Select;

function Composer({editData}) {
	const dispatch = useDispatch();
	const { userLanguage } = useContext(LanguageChangeContext);
	const { administration, sharedLabels, Direction } =
		dictionaryList[userLanguage];

	const { countries } = useSelector((state) => state.sharedSlice);

	useEffect(() => {
		dispatch(getCountries());
	}, [])

	const onFinish = values => {
		console.log(values, "VALUES")
		// dispatch(addBusinessPolicy(values))
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
						showSearch={true}
						placeholder="Please select country."
						size="large"
						name="countryId"
						label={"Country"}
						rules={[{ required: true }]}
					>
					<CustomSelect
						data={countries}
						size="large"
					/>
					</S.FormItem>
					<S.FormItem
						label={"Description"}
						name="description"
						rules={[
							{
							required: true,
							message: "Please Enter Description",
							},
						]}
						>
						<Input.TextArea placeholder={"Enter Description"} />
					</S.FormItem>
				</div>

				<Form.Item>
					<Button type="primary" size="large" className="ThemeBtn" block htmlType="submit" title={"Create"}>
						{" "}
						{ editData ? "Save" : "Create"}{" "}
					</Button>
				</Form.Item>
			</Form>
			  <div className='slabTable' >
			  <SlabCreateTable defaultRows={12} />
			</div>
	</div>
	);
}

export default Composer;
