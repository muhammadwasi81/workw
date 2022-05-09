import React, { useContext } from "react";
import { useState } from "react";
import {
	DeleteOutlined,
	DeleteTwoTone,
	MinusCircleOutlined,
	PlusOutlined,
	UploadOutlined,
} from "@ant-design/icons";
import {
	Button,
	Select,
	Upload,
	Input,
	DatePicker,
	Checkbox,
	Form,
} from "antd";
import * as S from "../Styles/employee.style";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import NewCustomSelect from "./newCustomSelect";
const { Option } = Select;
const { RangePicker } = DatePicker;

const validateMessages = {
	required: "${label} is required!",
};
const EducationForm = () => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { employees, Direction } = dictionaryList[userLanguage];
	const value = employees.EducationForm;
	const placeholder = employees.placeholders;

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
				{value.EducationInfo}
			</S.ContentDivider>

			<>
				<S.AddMoreDiv>
					<Form.List name="educations" initialValue={[""]}>
						{(fields, { add, remove }) => (
							<>
								{fields.map(
									({ key, name, ...restField }, i) => (
										<S.CustomSpace
											key={key}
											align="baseline"
										>
											<S.EFormItem
												{...restField}
												direction={Direction}
												name={[name, "degree"]}
												rules={[
													{
														required: true,
													},
												]}
												label={value.Degree}
											>
												<Input
													placeholder={placeholder.degree}
													size="large"
												/>
											</S.EFormItem>
											<S.EFormItem
												{...restField}
												rules={[
													{
														required: true,
													},
												]}
												label={value.Institute}
												name={[name, "institute"]}
												direction={Direction}
											>
												<Input
													placeholder={placeholder.institute}
													size="large"
												/>
											</S.EFormItem>
											<S.EFormItem
												{...restField}
												rules={[
													{
														required: true,
													},
												]}
												label={value.Description}
												name={[name, "description"]}
												direction={Direction}
											>
												<Input
													placeholder={placeholder.desc}
													size="large"
												/>
											</S.EFormItem>
											<S.EFormItem
												{...restField}
												rules={[
													{
														required: true,
													},
												]}
												label={value.TotalMarks}
												name={[name, "totalMarks"]}
												direction={Direction}
											>
												<Input
													placeholder={placeholder.tMarks}
													size="large"
													type={"number"}
												/>
											</S.EFormItem>
											<S.EFormItem
												{...restField}
												rules={[
													{
														required: true,
													},
												]}
												label={value.ObtainedMarks}
												name={[name, "obtainedMarks"]}
												direction={Direction}
											>
												<Input
													placeholder={placeholder.oMarks}
													size="large"
													type={"number"}
												/>
											</S.EFormItem>
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
													{...restField}
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
													{...restField}
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
														getPopupContainer={trigger =>
															trigger.parentNode
														}
														format={"DD/MM/YYYY"}
														placeholder={placeholder.selectDate}
													/>
												</S.EFormItem>
											)}
											<S.EFormItem
												rules={[{ required: true }]}
												direction={Direction}
											>
												<div className="custom-for-attachment-1">
													<Checkbox
														onChange={() =>
															checkHandler(i)
														}
													>
														{value.Present}
													</Checkbox>
													{/* <div className="custom-for-attachment-2">
														<S.EFormItem
															name="Attachments"
															label={
																value.Attachments
															}
															{...restField}
														>
															<Upload>
																<Button
																	icon={
																		<UploadOutlined />
																	}
																>
																	{
																		value.Upload
																	}
																</Button>
															</Upload>
														</S.EFormItem>
													</div> */}
													{/* <MinusCircleOutlined
														style={{s
															paddingTop: "15px",
														}}
														onClick={() =>
															remove(name)
														}
													/> */}
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
										{value.AddMoreEducation}
									</S.EButton>
								</S.ButtonContainer>
							</>
						)}
					</Form.List>
				</S.AddMoreDiv>
			</>
		</>
	);
};

export default EducationForm;
