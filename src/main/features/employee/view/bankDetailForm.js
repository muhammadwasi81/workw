import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Select, Input, DatePicker, Form } from "antd";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";
import * as S from "../Styles/employee.style";
import SharedSelect from "../../../sharedComponents/Select/Select";
// import { getCities } from "../../../../utils/Shared/store/actions";
import CustomScrollSelect from "../../../sharedComponents/ScrollSelect/customScrollSelect";
import { getCitiesService } from "../../../../utils/Shared/services/services";
import NewCustomSelect from "./newCustomSelect";
const { Option } = Select;

// const validateMessages = {
// 	required: "${label} is required!",
// };
const BankForm = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [cityData, setCityData] = useState([]);
	const [counter, setCounter] = useState(0);
	const [searching, setSearching] = useState(false);
	// const dispatch = useDispatch();
	const { countries } = useSelector(state => state.sharedSlice);

	const { userLanguage } = useContext(LanguageChangeContext);
	const debouncedSearchTerm = useDebounce(searchTerm, 500);
	const { employees, Direction } = dictionaryList[userLanguage];
	const value = employees.BankForm;
	const placeholder = employees.placeholders;


	const onSearch = e => {
		setCounter(0);
		setSearchTerm(e);
	};
	const onIncreaseCounter = () => {
		setCounter(counter + 1);
	};

	useEffect(() => {
		if (debouncedSearchTerm) {
			setSearching(true);
			getCitiesService({
				textData: debouncedSearchTerm,
				page: counter,
			}).then(res => {
				if (res.message === "success") {
					setCityData([...res.data]);
				}
				setSearching(false);
			});
		}
	}, [debouncedSearchTerm, counter]);

	// useEffect(() => {
	// 	if (debouncedSearchTerm) {
	// 		dispatch(
	// 			getCities({ textData: debouncedSearchTerm, page: counter })
	// 		);
	// 	}
	// }, [debouncedSearchTerm]);
	// useEffect(() => {
	// 	if (searchTerm.length > 0) {
	// 		fetchCities();
	// 	}
	// }, [counter]);

	// const fetchCities = () => {
	// 	dispatch(getCities({ textData: searchTerm, page: counter }));
	// };
	// useEffect(() => {
	// 	// setCityData([...cityData, ...cities]);
	// 	if (searchTerm.length > 0) {
	// 		setCityData([...cities]);
	// 	}
	// }, [cities]);

	// const checkHandler = i => {
	// 	const list = [...present];
	// 	list[i] = !list[i];
	// 	setPresent(list);
	// };

	// const handleFilterOption = (input, option) => {
	// 	return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
	// };
	// const handleFilterSort = (optionA, optionB) => {
	// 	return optionA.children
	// 		.toLowerCase()
	// 		.localeCompare(optionB.children.toLowerCase());
	// };
	return (
		<>
			<S.ContentDivider
				orientation={Direction === "ltr" ? "left" : "right"}
			>
				{value.BankInfo}
			</S.ContentDivider>
			<>
				<S.AddMoreDiv>
					<Form.List name="bankDetails" initialValue={[""]}>
						{(fields, { add, remove }) => (
							<>
								{fields.map(
									({ key, name, ...restField }, i) => (
										<S.CustomSpace
											key={key}
											align="baseline"
										>
											<S.EFormItem
												size="large"
												rules={[{ required: true }]}
												name={[name, "bankName"]}
												label={value.BankName}
												direction={Direction}
											>
												<Input
													placeholder={placeholder.bankName}
													size="large"
												/>
											</S.EFormItem>
											{/* <S.CustomSelect
													showSearch
													placeholder="Select Bank"
													size="large"
													getPopupContainer={trigger =>
														trigger.parentNode
													}
												>
													<Option value="Mr">
														Allied
													</Option>
													<Option value="Ms">
														BAHL
													</Option>
												</S.CustomSelect> */}

											<S.EFormItem
												rules={[{ required: true }]}
												label={value.AccountTitle}
												name={[name, "accountTitle"]}
												direction={Direction}
											>
												<Input
													size="large"
													placeholder={placeholder.accTitle}
												/>
											</S.EFormItem>
											<S.EFormItem
												rules={[{ required: true }]}
												label={value.BranchCode}
												name={[name, "bankBranchCode"]}
												direction={Direction}
											>
												<Input
													size="large"
													placeholder={placeholder.branchCode}
												/>
											</S.EFormItem>
											<S.EFormItem
												rules={[{ required: true }]}
												label={value.AccountNumber}
												name={[name, "accountNumber"]}
												direction={Direction}
											>
												<Input
													size="large"
													placeholder={placeholder.accNo}
												/>
											</S.EFormItem>
											<S.EFormItem
												rules={[{ required: true }]}
												label={value.IBAN}
												name={[name, "ibanNumber"]}
												direction={Direction}
											>
												<Input
													size="large"
													placeholder={placeholder.iban}
												/>
											</S.EFormItem>
											<S.EFormItem
												rules={[{ required: true }]}
												label={value.SortCode}
												name={[name, "sortCode"]}
												direction={Direction}
											>
												<Input
													size="large"
													placeholder={placeholder.sortCode}
												/>
											</S.EFormItem>

											<S.EFormItem
												rules={[{ required: true }]}
												label={value.Country}
												name={[name, "countryId"]}
												direction={Direction}
											>
												<SharedSelect
													showSearch={true}
													size={"large"}
													placeholder={placeholder.searchToSelect}
													data={countries}
												/>
											</S.EFormItem>

											{/* <S.EFormItem
												rules={[{ required: true }]}
												label={value.City}
												name={[name, "city"]}
												direction={Direction}
											>
												<SharedSelect
													showSearch={true}
													size={"large"}
													placeholder={
														"Search to Select"
													}
													data={[
														{
															id: 1,
															name: "Karachi",
														},
													]}
													onSearch={e => {
														setSearchTerm(e);
													}}
												/>
											</S.EFormItem> */}

											{/* <CustomScrollSelect
												loading={
													searchTerm.length > 0 &&
													searching
												}
												size="large"
												name="cityId"
												label={value.City}
												direction={Direction}
												rules={[{ required: true }]}
												data={cityData}
												// fetchCities={fetchCities}
												onIncreaseCounter={
													onIncreaseCounter
												}
												value={searchTerm}
												onSearch={onSearch}
												top="bank"
											/> */}
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
											<S.EFormItem
												rules={[{ required: true }]}
												direction={Direction}
												style={{ width: "min-content" }}
											>
												<div className="custom-for-attachment-1">
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
