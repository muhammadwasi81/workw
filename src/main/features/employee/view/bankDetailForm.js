import { PlusOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React, { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";
import * as S from "../Styles/employee.style";
import SharedSelect from "../../../sharedComponents/Select/Select";
import { getCitiesService } from "../../../../utils/Shared/services/services";
// import NewCustomSelect from "./newCustomSelect";
import TextInput from "../../../sharedComponents/Input/TextInput";
import { employeeDictionaryList } from "../localization/index";
import NewCustomSelect from "../../../sharedComponents/CustomSelect/newCustomSelect";

const BankForm = ({ onBankInfo, bankInfo }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [cityIdData, setCityData] = useState([]);
	const [counter, setCounter] = useState(0);
	const [searching, setSearching] = useState(false);
	const { countries } = useSelector(state => state.sharedSlice);

	const { userLanguage } = useContext(LanguageChangeContext);
	const debouncedSearchTerm = useDebounce(searchTerm, 500);
	const { sharedLabels } = dictionaryList[userLanguage];
	const { employeesDictionary, Direction } =
		employeeDictionaryList[userLanguage];
	const value = employeesDictionary.BankForm;
	const placeholder = employeesDictionary.placeholders;
	const [isSubmit, setIsSubmit] = useState(false);
	const [cities, setCities] = useState({});

	console.log(bankInfo, "BANK INFORMATION")

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
	const [state, setState] = useState({
		bankName: "",
		accountTitle: "",
		bankBranchCode: "",
		accountNumber: "",
		ibanNumber: "",
		sortCode: "",
		countryId: "",
		cityId: "",
	});
	const [error, setError] = useState({
		bankName: false,
		accountTitle: false,
		bankBranchCode: false,
		accountNumber: false,
		ibanNumber: false,
		sortCode: false,
		countryId: false,
		cityId: false,
	});
	const handleChange = useCallback((value, name) => {
		setState(prevState => ({
			...prevState,
			[name]: value,
		}));
	}, []);
	const columns = [
		{
			title: value.BankName,
			dataIndex: "bankName",
			key: "bankName",
		},
		{
			title: value.AccountTitle,
			dataIndex: "accountTitle",
			key: "accountTitle",
		},
		{
			title: value.BranchCode,
			dataIndex: "bankBranchCode",
			key: "bankBranchCode",
		},
		{
			title: value.AccountNumber,
			dataIndex: "accountNumber",
			key: "accountNumber",
		},
		{
			title: value.IBAN,
			dataIndex: "ibanNumber",
			key: "ibanNumber",
		},
		{
			title: value.SortCode,
			dataIndex: "sortCode",
			key: "sortCode",
		},
		{
			title: value.Country,
			dataIndex: "countryId",
			key: "countryId",
			render: value => {
				return countries.filter(item => item.id === value)[0].name;
			},
		},
		{
			title: value.City,
			dataIndex: "cityId",
			key: "cityId",
			render: value => {
				return cities[value];
			},
		},

		{
			title: sharedLabels.action,
			render: value => {
				return (
					<a
						href="asdasd"
						onClick={e => {
							e.preventDefault();
							const index = bankInfo.findIndex(object => {
								return object === value;
							});
							const filterArray = bankInfo.filter((value, i) => {
								if (index !== i) return value;
							});
							onBankInfo(filterArray);
						}}
					>
						{sharedLabels.Delete}
					</a>
				);
			},
		},
	];
	const checkValidation = () => {
		if (!state.bankName) {
			setError(prevErrors => ({
				...prevErrors,
				bankName: true,
			}));
		} else {
			setError(prevErrors => ({
				...prevErrors,
				bankName: false,
			}));
		}
		if (!state.accountTitle) {
			setError(prevErrors => ({
				...prevErrors,
				accountTitle: true,
			}));
		} else {
			setError(prevErrors => ({
				...prevErrors,
				accountTitle: false,
			}));
		}
		if (!state.bankBranchCode) {
			setError(prevErrors => ({
				...prevErrors,
				bankBranchCode: true,
			}));
		} else {
			setError(prevErrors => ({
				...prevErrors,
				bankBranchCode: false,
			}));
		}
		if (!state.accountNumber) {
			setError(prevErrors => ({
				...prevErrors,
				accountNumber: true,
			}));
		} else {
			setError(prevErrors => ({
				...prevErrors,
				accountNumber: false,
			}));
		}
		if (!state.ibanNumber) {
			setError(prevErrors => ({
				...prevErrors,
				ibanNumber: true,
			}));
		} else {
			setError(prevErrors => ({
				...prevErrors,
				ibanNumber: false,
			}));
		}
		if (!state.sortCode) {
			setError(prevErrors => ({
				...prevErrors,
				sortCode: true,
			}));
		} else {
			setError(prevErrors => ({
				...prevErrors,
				sortCode: false,
			}));
		}
		if (!state.countryId) {
			setError(prevErrors => ({
				...prevErrors,
				countryId: true,
			}));
		} else {
			setError(prevErrors => ({
				...prevErrors,
				countryId: false,
			}));
		}
		if (!state.cityId) {
			setError(prevErrors => ({
				...prevErrors,
				cityId: true,
			}));
		} else {
			setError(prevErrors => ({
				...prevErrors,
				cityId: false,
			}));
		}
	};
	useEffect(() => {
		if (isSubmit) {
			if (
				!error.bankName &&
				!error.accountTitle &&
				!error.bankBranchCode &&
				!error.accountNumber &&
				!error.ibanNumber &&
				!error.sortCode &&
				!error.countryId &&
				!error.cityId
			) {
				handleInfoArray(true);
			}
		}
	}, [error, isSubmit]);

	const handleInfoArray = isSubmit => {
		if (isSubmit) {
			onBankInfo(preValues => [...preValues, state]);
			setIsSubmit(false);
			setState({
				bankName: "",
				accountTitle: "",
				bankBranchCode: "",
				accountNumber: "",
				ibanNumber: "",
				sortCode: "",
				countryId: "",
				cityId: "",
			});
		}
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
					<>
						<S.CustomSpace align="baseline" direction={Direction}>
							<S.FormItem direction={Direction}>
								<div className="input-row">
									<Typography
										level={5}
										className="required_typography"
									>
										{value.BankName}:
									</Typography>
									<TextInput
										placeholder={placeholder.bankName}
										name="bankName"
										onChange={value => {
											handleChange(value, "bankName");
										}}
										error={error.bankName}
										value={state.bankName}
										size="large"
									/>
									{error.bankName && (
										<div
											style={{
												color: "red",
												fontWeight: 400,
											}}
										>
											Please enter Bank Name.
										</div>
									)}
								</div>
							</S.FormItem>

							<S.FormItem direction={Direction}>
								<div className="input-row">
									<Typography
										level={5}
										className="required_typography"
									>
										{value.AccountTitle}:
									</Typography>
									<TextInput
										placeholder={placeholder.accTitle}
										name="accountTitle"
										onChange={value => {
											handleChange(value, "accountTitle");
										}}
										error={error.accountTitle}
										value={state.accountTitle}
										size="large"
									/>
									{error.accountTitle && (
										<div
											style={{
												color: "red",
												fontWeight: 400,
											}}
										>
											Please enter Account Title.
										</div>
									)}
								</div>
							</S.FormItem>

							<S.FormItem direction={Direction}>
								<div className="input-row">
									<Typography
										level={5}
										className="required_typography"
									>
										{value.BranchCode}:
									</Typography>
									<TextInput
										placeholder={placeholder.branchCode}
										name="bankBranchCode"
										onChange={value => {
											handleChange(
												value,
												"bankBranchCode"
											);
										}}
										error={error.bankBranchCode}
										value={state.bankBranchCode}
										size="large"
									/>
									{error.bankBranchCode && (
										<div
											style={{
												color: "red",
												fontWeight: 400,
											}}
										>
											Please enter Bank Branch Code.
										</div>
									)}
								</div>
							</S.FormItem>

							<S.FormItem direction={Direction}>
								<div className="input-row">
									<Typography
										level={5}
										className="required_typography"
									>
										{value.AccountNumber}:
									</Typography>
									<TextInput
										placeholder={placeholder.accNo}
										name="accountNumber"
										onChange={value => {
											handleChange(
												value,
												"accountNumber"
											);
										}}
										error={error.accountNumber}
										value={state.accountNumber}
										size="large"
									/>
									{error.accountNumber && (
										<div
											style={{
												color: "red",
												fontWeight: 400,
											}}
										>
											Please enter Account Number.
										</div>
									)}
								</div>
							</S.FormItem>

							<S.FormItem direction={Direction}>
								<div className="input-row">
									<Typography
										level={5}
										className="required_typography"
									>
										{value.IBAN}:
									</Typography>
									<TextInput
										placeholder={placeholder.iban}
										name="ibanNumber"
										onChange={value => {
											handleChange(value, "ibanNumber");
										}}
										error={error.ibanNumber}
										value={state.ibanNumber}
										size="large"
									/>
									{error.ibanNumber && (
										<div
											style={{
												color: "red",
												fontWeight: 400,
											}}
										>
											Please enter IBAN Number.
										</div>
									)}
								</div>
							</S.FormItem>

							<S.FormItem direction={Direction}>
								<div className="input-row">
									<Typography
										level={5}
										className="required_typography"
									>
										{value.SortCode}:
									</Typography>
									<TextInput
										placeholder={placeholder.sortCode}
										name="sortCode"
										onChange={value => {
											handleChange(value, "sortCode");
										}}
										error={error.sortCode}
										value={state.sortCode}
										size="large"
									/>
									{error.sortCode && (
										<div
											style={{
												color: "red",
												fontWeight: 400,
											}}
										>
											Please enter SortCode.
										</div>
									)}
								</div>
							</S.FormItem>

							<div className="input-row">
								<Typography
									level={5}
									className="required_typography"
									style={{ fontWeight: 600 }}
								>
									{value.Country}:
								</Typography>
								<div
									style={{
										display: "flex",
										gap: "0px",
										flexDirection: "column",
									}}
								>
									<S.FormItem
										name="countryId"
										direction={Direction}
									>
										<SharedSelect
											data={countries}
											placeholder="Select Country"
											size={"large"}
											status={
												error.countryId ? "error" : ""
											}
											onChange={value => {
												setState(prevValues => ({
													...prevValues,
													countryId: value,
												}));
											}}
										/>

										{error.countryId && (
											<div
												style={{
													color: "red",
													fontWeight: 400,
												}}
											>
												Please select country.
											</div>
										)}
									</S.FormItem>
								</div>
							</div>

							<div className="input-row">
								<Typography
									level={5}
									className="required_typography"
									style={{ fontWeight: 600 }}
								>
									{value.City}:
								</Typography>
								<div
									style={{
										display: "flex",
										gap: "0px",
										flexDirection: "column",
									}}
								>
									<NewCustomSelect
										valueObject={true}
										name="cityId"
										showSearch={true}
										status={error.cityId ? "error" : ""}
										endPoint="/api/Utility/GetAllCities"
										placeholder="Select City"
										requestType="post"
										onChange={value => {
											const { id, name } =
												JSON.parse(value);
											setCities(prevValues => ({
												...prevValues,
												[id]: name,
											}));
											setState(prevValues => ({
												...prevValues,
												cityId: id,
											}));
										}}
									/>
									{error.cityId && (
										<div
											style={{
												color: "red",
												fontWeight: 400,
											}}
										>
											Please select city.
										</div>
									)}
								</div>
							</div>
							<S.FormItem
								name=""
								direction={Direction}
							></S.FormItem>
						</S.CustomSpace>

						<S.ButtonContainer>
							<S.EButton
								type="dashed"
								onClick={() => {
									checkValidation();
									setIsSubmit(true);
								}}
								block
								icon={<PlusOutlined />}
							>
								{value.AddMoreBank}
							</S.EButton>
						</S.ButtonContainer>
						{bankInfo  && bankInfo.length > 0 && (
							<S.Customtable
								direction={Direction}
								dataSource={bankInfo}
								columns={columns}
								pagination={false}
								style={{ margin: "2rem" }}
							/>
						)}
					</>
				</S.AddMoreDiv>
			</>
		</>
	);
};

export default BankForm;
