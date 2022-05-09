import {
	DeleteOutlined,
	MinusCircleOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { Select, DatePicker, Checkbox, Input, Form } from "antd";
import React, { useContext } from "react";
import { useState } from "react";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { employmentType } from "../../../../utils/Shared/enums/enums";
import * as S from "../Styles/employee.style";
import NewCustomSelect from "./newCustomSelect";
const { Option } = Select;
const { RangePicker } = DatePicker;

const validateMessages = {
	required: "${label} is required!",
};
const ExperienceForm = () => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { employees, Direction } = dictionaryList[userLanguage];
	const value = employees.WorkExperienceForm;
	const placeholder = employees.placeholders
	const [present, setPresent] = useState([false]);

	const checkHandler = i => {
		const list = [...present];
		list[i] = !list[i];
		setPresent(list);
	};
	return (
		<>
			<S.ContentDivider
				orientation={Direction === "ltr" ? "left" : "right"}
			>
				{value.WorkExperienceInfo}
			</S.ContentDivider>

			<>
				<S.AddMoreDiv>
					<Form.List name="experiences" initialValue={[""]}>
						{(fields, { add, remove }) => (
							<>
								{fields.map(
									({ key, name, ...restField }, i) => (
										<S.CustomSpace
											key={key}
											align="baseline"
											// type="constant"
										>
											{/* <S.EFormItem
												direction={Direction}
												rules={[
													{
														required: true,
													},
												]}
												name={"employerId"}
												label={value.Employer}
												direction={Direction}
											>
												<Input
													placeholder="Employer Name"
													size="large"
												/>
											</S.EFormItem> */}
											{/* <S.EFormItem
												name={[name, "initialPosition"]}
												rules={[
													{
														required: true,
													},
												]}
												label={value.InitialPosition}
												direction={Direction}
											>
												<Input
													placeholder="Write Initial Postion"
													size="large"
												/>
											</S.EFormItem> */}
											<S.EFormItem
												rules={[
													{
														required: true,
													},
												]}
												label={value.Position}
												name={[name, "position"]}
												direction={Direction}
											>
												<Input
													size="large"
													placeholder={placeholder.position}
												/>
											</S.EFormItem>
											<S.EFormItem
												name={[
													name,
													"employmentTypeId",
												]}
												label={value.EmploymentType}
												rules={[{ required: true }]}
												direction={Direction}
											>
												<Select
													size="large"
													getPopupContainer={trigger =>
														trigger.parentNode
													}
													placeholder={placeholder.empType}
												>
													{employmentType.map(
														employee => (
															<Option
																value={
																	employee.id
																}
															>
																{employee.name}
															</Option>
														)
													)}
												</Select>
											</S.EFormItem>
											{/* <S.EFormItem
												rules={[
													{
														required: true,
													},
												]}
												label={value.Department}
												name={[name, "departmentId"]}
												direction={Direction}
											>
												<Input
													size="large"
													placeholder="Write Department"
												/>
											</S.EFormItem> */}
											<S.EFormItem
												rules={[{ required: true }]}
												label={value.City}
												name={[name, "cityId"]}
												direction={Direction}
											>
												<NewCustomSelect
													name="cityId"
													size="large"
													label={value.City}
													showSearch={true}
													direction={Direction}
													rules={[{ required: true }]}
													endPoint="GetAllCities"
													requestType="post"
													placeholder={placeholder.searchToSelect}
												/>
											</S.EFormItem>
											{!present[i] && (
												<S.EFormItem
													rules={[
														{
															required: true,
														},
													]}
													label={value.StartEndDate}
													name={[name, "start/end"]}
													direction={Direction}
												>
													<RangePicker
														format={"DD/MM/YYYY"}
														getPopupContainer={trigger =>
															trigger.parentNode
														}
														placeholder={[placeholder.sDate,placeholder.eDate]}
													/>
												</S.EFormItem>
											)}
											{present[i] && (
												<S.EFormItem
													rules={[
														{
															required: true,
														},
													]}
													label={value.StartDate}
													name={[name, "start"]}
													direction={Direction}
												>
													<DatePicker
														format={"DD/MM/YYYY"}
														getPopupContainer={trigger =>
															trigger.parentNode
														}
														placeholder={placeholder.selectDate}
													/>
												</S.EFormItem>
											)}
											<S.EFormItem
												rules={[{ required: true }]}
											>
												<div className="custom-for-attachment-1">
													<Checkbox
														onChange={() =>
															checkHandler(i)
														}
													>
														{value.Present}
													</Checkbox>

													<DeleteOutlined
														className="epmloyeeDeleteIcon"
														onClick={() =>
															remove(name)
														}
													/>
												</div>
											</S.EFormItem>
										</S.CustomSpace>
									)
								)}
								<S.ButtonContainer>
									<S.EButton
										type="dashed"
										onClick={() => add()}
										block
										icon={<PlusOutlined />}
									>
										{value.AddMoreExperience}
									</S.EButton>
								</S.ButtonContainer>
							</>
						)}
					</Form.List>
				</S.AddMoreDiv>

				{/* <S.FormContainer type="constant"></S.FormContainer> */}
			</>
		</>
	);
};

export default ExperienceForm;
