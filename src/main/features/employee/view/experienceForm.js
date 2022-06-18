import { PlusOutlined } from "@ant-design/icons";
import { DatePicker, Checkbox, Typography } from "antd";
import React, { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { employmentType } from "../../../../utils/Shared/enums/enums";
import TextInput from "../../../sharedComponents/Input/TextInput";
import * as S from "../Styles/employee.style";
// import NewCustomSelect from "./newCustomSelect";
import SharedSelect from "../../../sharedComponents/Select/Select";
import NewCustomSelect from "../../../sharedComponents/CustomSelect/newCustomSelect";
const { RangePicker } = DatePicker;

const ExperienceForm = ({ experienceInfo, onExperienceInfo }) => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { sharedLabels, employees, Direction } = dictionaryList[userLanguage];
	const value = employees.WorkExperienceForm;
	const [cities, setCities] = useState({});
	const placeholder = employees.placeholders;
	const [present, setPresent] = useState(false);
	const [isSubmit, setIsSubmit] = useState(false);
	const [state, setState] = useState({
		position: "",
		employmentTypeId: "",
		cityId: "",
		start: "",
		start_end: "",
	});
	const [error, setError] = useState({
		position: false,
		empType: false,
		cityId: false,
		start: false,
		start_end: false,
	});
	const checkValidation = () => {
		if (!state.position) {
			setError(prevErrors => ({
				...prevErrors,
				position: true,
			}));
		} else {
			setError(prevErrors => ({
				...prevErrors,
				position: false,
			}));
		}
		if (!state.employmentTypeId) {
			setError(prevErrors => ({
				...prevErrors,
				empType: true,
			}));
		} else {
			setError(prevErrors => ({
				...prevErrors,
				empType: false,
			}));
		}
		if (!state.start_end && !present) {
			setError(prevErrors => ({
				...prevErrors,
				start_end: true,
			}));
		} else {
			setError(prevErrors => ({
				...prevErrors,
				start_end: false,
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
		if (!state.start && present) {
			setError(prevErrors => ({
				...prevErrors,
				start: true,
			}));
		} else {
			setError(prevErrors => ({
				...prevErrors,
				start: false,
			}));
		}
	};
	const handleChange = useCallback((value, name) => {
		setState(prevState => ({
			...prevState,
			[name]: value,
		}));
	}, []);
	const onChange = (value, dateString, name) => {
		setState({
			...state,
			[name]: dateString,
		});
	};
	const columns = [
		{
			title: value.Position,
			dataIndex: "position",
			key: "position",
		},

		{
			title: value.EmploymentType,
			dataIndex: "employmentTypeId",
			key: "employmentTypeId",
			render: value => {
				return employmentType[value - 1].name;
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
			title: value.StartEndDate,
			dataIndex: "start_end",
			key: "start_end",
			render: (value, row, index) => {
				return experienceInfo[index].start_end.length !== 0
					? `${experienceInfo[index].start_end[0]} - ${experienceInfo[index].start_end[1]}`
					: `${experienceInfo[index].start} -  Present`;
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
							const index = experienceInfo.findIndex(object => {
								return object === value;
							});
							const filterArray = experienceInfo.filter(
								(value, i) => {
									if (index !== i) return value;
								}
							);
							onExperienceInfo(filterArray);
						}}
					>
						{sharedLabels.Delete}
					</a>
				);
			},
		},
	];
	useEffect(() => {
		if (isSubmit) {
			if (
				!error.position &&
				!error.empType &&
				!error.cityId &&
				!error.start &&
				(!error.start_end || error.start)
			) {
				handleInfoArray(true);
			}
		}
	}, [error, isSubmit]);

	const handleInfoArray = isSubmit => {
		if (isSubmit) {
			onExperienceInfo(preValues => [...preValues, state]);
			setIsSubmit(false);
			setState({
				position: "",
				employmentTypeId: "",
				cityId: "",
				start: "",
				start_end: "",
			});
		}
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
					<S.CustomSpace align="baseline" direction={Direction}>
						<S.FormItem direction={Direction}>
							<div className="input-row">
								<Typography
									level={5}
									className="required_typography"
								>
									{value.Position}:
								</Typography>
								<TextInput
									placeholder={placeholder.position}
									name="position"
									onChange={value => {
										handleChange(value, "position");
									}}
									error={error.position}
									value={state.position}
									size="large"
								/>
								{error.position && (
									<div
										style={{
											color: "red",
											fontWeight: 400,
										}}
									>
										Please enter Position.
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
								{value.EmploymentType}:
							</Typography>
							<div
								style={{
									display: "flex",
									gap: "0px",
									flexDirection: "column",
								}}
							>
								<S.FormItem
									name="employmentTypeId"
									direction={Direction}
								>
									<SharedSelect
										data={employmentType}
										placeholder={placeholder.empType}
										size={"large"}
										status={error.empType ? "error" : ""}
										onChange={value => {
											setState(prevValues => ({
												...prevValues,
												employmentTypeId: value,
											}));
										}}
									/>

									{error.empType && (
										<div
											style={{
												color: "red",
												fontWeight: 400,
											}}
										>
											Please select Employment Type.
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
										const { id, name } = JSON.parse(value);
										setCities(prevValues => ({
											prevValues,
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
						{!present && (
							<div className="input-row">
								<Typography
									level={5}
									style={{ fontWeight: 600 }}
								>
									{value.StartEndDate}:
								</Typography>
								<div>
									<RangePicker
										format={"DD/MM/YYYY"}
										placeholder={[
											placeholder.sDate,
											placeholder.eDate,
										]}
										status={error.start_end ? "error" : ""}
										onChange={(value, dateString) => {
											onChange(
												value,
												dateString,
												"start_end"
											);
										}}
									/>
									{error.start_end && (
										<div
											style={{
												color: "red",
												fontWeight: 400,
											}}
										>
											Please enter Start/End Date.
										</div>
									)}
								</div>
							</div>
						)}

						{present && (
							<div className="input-row">
								<Typography
									level={5}
									style={{ fontWeight: 600 }}
								>
									{value.StartDate}:
								</Typography>
								<div>
									<DatePicker
										format={"DD/MM/YYYY"}
										placeholder={value.start}
										status={error.start ? "error" : ""}
										onChange={(value, dateString) => {
											onChange(
												value,
												dateString,
												"start"
											);
										}}
									/>
									{error.start && (
										<div
											style={{
												color: "red",
												fontWeight: 400,
											}}
										>
											Please enter Start Date.
										</div>
									)}
								</div>
							</div>
						)}
						<Checkbox
							checked={present}
							onChange={() => {
								setPresent(!present);
								setState(preValues => ({
									...preValues,
									start_end: "",
									start: "",
								}));
							}}
						>
							{value.Present}
						</Checkbox>
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
							{value.AddMoreExperience}
						</S.EButton>
					</S.ButtonContainer>
					{experienceInfo.length > 0 && (
						<S.Customtable
							direction={Direction}
							dataSource={experienceInfo}
							columns={columns}
							pagination={false}
							style={{ margin: "2rem" }}
						/>
					)}
				</S.AddMoreDiv>

				{/* <S.FormContainer type="constant"></S.FormContainer> */}
			</>
		</>
	);
};

export default ExperienceForm;
