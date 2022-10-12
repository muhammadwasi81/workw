import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Select, Input, DatePicker, Form } from "antd";
import React, { useContext } from "react";
import { useState } from "react";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import * as S from "../Styles/employee.style";
const { Option } = Select;
const { RangePicker } = DatePicker;


const validateMessages = {
	required: "${label} is required!",
};
const BankForm = () => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { employees, Direction } = dictionaryList[userLanguage];
	const value = employees.BankForm;
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
				{value.BankInfo}
			</S.ContentDivider>
			<>
				<S.AddMoreDiv>
					<Form.List style={{ display: "flex" }} name="bankform">
						{(fields, { add, remove }) => (
							<>
								{fields.map(
									({ key, name, ...restField }, i) => (
										<S.CustomSpace
											key={key}
											style={{ marginBottom: 8 }}
											align="baseline"
										>
											<S.EFormItem
												size="large"
												rules={[{ required: true }]}
												name={[name, "bankName"]}
												label={value.BankName}
												direction={Direction}
											>
												<S.CustomSelect placeholder="Select Bank">
													<Option value="Mr">
														Mr
													</Option>
													<Option value="Ms">
														Ms
													</Option>
												</S.CustomSelect>
											</S.EFormItem>
											<S.EFormItem
												rules={[{ required: true }]}
												label={value.AccountTitle}
												name={[name, "accountTitle"]}
												direction={Direction}
											>
												<Input placeholder="Write Account Title"></Input>
											</S.EFormItem>
											<S.EFormItem
												rules={[{ required: true }]}
												label={value.BranchCode}
												name={[name, "branchCode"]}
												direction={Direction}
											>
												<Input placeholder="Write Branch Code"></Input>
											</S.EFormItem>
											<S.EFormItem
												rules={[{ required: true }]}
												label={value.AccountNumber}
												name={[name, "accountNumber"]}
												direction={Direction}
											>
												<Input placeholder="Write Account Number"></Input>
											</S.EFormItem>
											<S.EFormItem
												rules={[{ required: true }]}
												label={value.IBAN}
												name={[name, "iban"]}
												direction={Direction}
											>
												<Input placeholder="Write IBAN Number"></Input>
											</S.EFormItem>
											<S.EFormItem
												rules={[{ required: true }]}
												label={value.SortCode}
												name={[name, "sortCode"]}
												direction={Direction}
											>
												<Input placeholder="Write Sort Code"></Input>
											</S.EFormItem>

											<S.EFormItem
												rules={[{ required: true }]}
												label={value.City}
												name={[name, "city"]}
												direction={Direction}
											>
												<S.CustomSelect
													size="large"
													placeholder="Select City"
												>
													<Option value="Mr">
														Mr
													</Option>
													<Option value="Ms">
														Ms
													</Option>
												</S.CustomSelect>
											</S.EFormItem>

											<S.EFormItem
												rules={[{ required: true }]}
												label={value.Country}
												name={[name, "country"]}
												direction={Direction}
											>
												<S.CustomSelect
													size="large"
													placeholder="Select Country"
												>
													<Option value="Mr">
														Mr
													</Option>
													<Option value="Ms">
														Ms
													</Option>
												</S.CustomSelect>
											</S.EFormItem>

											<MinusCircleOutlined
												onClick={() => remove(name)}
											/>
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
										{value.AddMoreBank}
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

export default BankForm;
