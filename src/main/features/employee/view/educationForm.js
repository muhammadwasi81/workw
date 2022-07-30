import React, { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import {useParams} from 'react-router-dom';
import { PlusOutlined } from "@ant-design/icons";
import * as S from "../Styles/employee.style";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
// import NewCustomSelect from "./newCustomSelect";
import { employeeDictionaryList } from "../localization/index";
import TextInput from "../../../sharedComponents/Input/TextInput";
import { DatePicker, Checkbox, Typography } from "antd";
import NewCustomSelect from "../../../sharedComponents/CustomSelect/newCustomSelect";
import { getAllEducationService } from "../../education/service/service";
import { Table } from "../../../sharedComponents/customTable";
const { RangePicker } = DatePicker;

const EducationForm = ({ onEducationInfo, educationInfo, isEdit }) => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const [cities, setCities] = useState({});
	const detailId = useParams();
	const { sharedLabels } = dictionaryList[userLanguage];
	const { employeesDictionary, Direction } =
		employeeDictionaryList[userLanguage];
	const value = employeesDictionary.EducationForm;
	const placeholder = employeesDictionary.placeholders;
	const [isSubmit, setIsSubmit] = useState(false);
	const [present, setPresent] = useState(false);
	const [education, setEducation] = useState([])
	const [editIndex, setEditIndex] = useState()
	const [editMode, setEditMode] = useState(false)

	const [state, setState] = useState({
		degree: "",
		institute: "",
		description: "",
		totalMarks: "",
		obtainedMarks: "",
		start_end: "",
		cityId: "",
		start: "",
	});
	const [error, setError] = useState({
		degree: false,
		institute: false,
		description: false,
		totalMarks: false,
		obtainedMarks: false,
		start_end: false,
		cityId: false,
		start: false,
	});

	console.log(detailId.id, "Hello ID")

	useEffect(() => {
		if (isEdit) {
			getEducation()	
		} 
		setEducation([...educationInfo])
		console.log("SASASAS")
	},[])

	const getEducation = async() => {
		const response = await  getAllEducationService(detailId.id)
		setEducation(response.data)
	}

	const handleChange = useCallback((value, name) => {
		setState(prevState => ({
			...prevState,
			[name]: value,
		}));
	}, []);
	const checkValidation = () => {
		if (!state.degree) {
			setError(prevErrors => ({
				...prevErrors,
				degree: true,
			}));
		} else {
			setError(prevErrors => ({
				...prevErrors,
				degree: false,
			}));
		}
		if (!state.institute) {
			setError(prevErrors => ({
				...prevErrors,
				institute: true,
			}));
		} else {
			setError(prevErrors => ({
				...prevErrors,
				institute: false,
			}));
		}
		if (!state.description) {
			setError(prevErrors => ({
				...prevErrors,
				description: true,
			}));
		} else {
			setError(prevErrors => ({
				...prevErrors,
				description: false,
			}));
		}
		if (!state.totalMarks) {
			setError(prevErrors => ({
				...prevErrors,
				totalMarks: true,
			}));
		} else {
			setError(prevErrors => ({
				...prevErrors,
				totalMarks: false,
			}));
		}
		if (!state.obtainedMarks) {
			setError(prevErrors => ({
				...prevErrors,
				obtainedMarks: true,
			}));
		} else {
			setError(prevErrors => ({
				...prevErrors,
				obtainedMarks: false,
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
	const onChange = (value, dateString, name) => {
		setState({
			...state,
			[name]: dateString,
		});
	};
	const columns = [
		{
			title: value.Degree,
			dataIndex: "degree",
			key: "degree",
		},
		{
			title: value.Institute,
			dataIndex: "institute",
			key: "institute",
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
			title: value.Description,
			dataIndex: "description",
			key: "description",
		},
		{
			title: value.ObtainedMarks,
			dataIndex: "obtainedMarks",
			key: "obtainedMarks",
		},
		{
			title: value.TotalMarks,
			dataIndex: "totalMarks",
			key: "totalMarks",
		},

		// {
		// 	title: value.StartEndDate,
		// 	dataIndex: "start_end",
		// 	key: "start_end",
		// 	render: (value, row, index) => {
		// 		return educationInfo[index].start_end.length !== 0
		// 			? `${educationInfo[index].start_end[0]} - ${educationInfo[index].start_end[1]}`
		// 			: `${educationInfo[index].start} -  Present`;
		// 	},
		// },

		{
			title: sharedLabels.action,
			render: value => {
				return (
					<>
						<a
							href="asdasd"
							
							onRowClick={(e, a, b) => {
								e.preventDefault();
								console.log(e, a, b, "EEE")
							}}
						>
							{"Edit"}
						</a>
					</>
				);
			},
		},

		// {
		// 	title: sharedLabels.action,
		// 	render: value => {
		// 		return (
		// 			<a
		// 				href="asdasd"
		// 				onClick={e => {
		// 					e.preventDefault();
		// 					const index = educationInfo.findIndex(object => {
		// 						return object === value;
		// 					});
		// 					const filterArray = educationInfo.filter(
		// 						(value, i) => {
		// 							if (index !== i) return value;
		// 						}
		// 					);
		// 					onEducationInfo(filterArray);
		// 				}}
		// 			>
		// 				{sharedLabels.Delete}
		// 			</a>
		// 		);
		// 	},
		// },
	];
	useEffect(() => {
		if (isSubmit) {
			if (
				!error.degree &&
				!error.description &&
				!error.institute &&
				!error.obtainedMarks &&
				!error.totalMarks &&
				!error.cityId &&
				(!error.start_end || error.start)
			) {
				handleInfoArray(true);
			}
		}
	}, [error, isSubmit]);

	const handleInfoArray = isSubmit => {
		if (isSubmit) {
			onEducationInfo(preValues => [...preValues, state]);

			setIsSubmit(false);
			setState({
				degree: "",
				institute: "",
				description: "",
				totalMarks: "",
				obtainedMarks: "",
				start_end: "",
				cityId: "",
				start: "",
			});
		}
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
					<S.CustomSpace align="baseline" direction={Direction}>
						<S.FormItem direction={Direction}>
							<div className="input-row">
								<Typography
									level={5}
									className="required_typography"
								>
									{value.Degree}:
								</Typography>
								<TextInput
									placeholder={placeholder.degree}
									name="degree"
									onChange={value => {
										handleChange(value, "degree");
									}}
									error={error.degree}
									value={state.degree}
									size="large"
								/>
								{error.degree && (
									<div
										style={{
											color: "red",
											fontWeight: 400,
										}}
									>
										Please enter Degree.
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
									{value.Institute}:
								</Typography>
								<TextInput
									placeholder={placeholder.institute}
									name="institute"
									onChange={value => {
										handleChange(value, "institute");
									}}
									error={error.institute}
									value={state.institute}
									size="large"
								/>
								{error.institute && (
									<div
										style={{
											color: "red",
											fontWeight: 400,
										}}
									>
										Please enter Institute.
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
									{value.Description}:
								</Typography>
								<TextInput
									placeholder={placeholder.desc}
									name="description"
									onChange={value => {
										handleChange(value, "description");
									}}
									error={error.description}
									value={state.description}
									size="large"
								/>
								{error.description && (
									<div
										style={{
											color: "red",
											fontWeight: 400,
										}}
									>
										Please enter Description.
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
									{value.TotalMarks}:
								</Typography>
								<TextInput
									placeholder={placeholder.tMarks}
									name="totalMarks"
									type={"number"}
									onChange={value => {
										handleChange(value, "totalMarks");
									}}
									error={error.totalMarks}
									value={state.totalMarks}
									size="large"
								/>
								{error.totalMarks && (
									<div
										style={{
											color: "red",
											fontWeight: 400,
										}}
									>
										Please enter Total Marks.
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
									{value.ObtainedMarks}:
								</Typography>
								<TextInput
									placeholder={placeholder.oMarks}
									name="obtainedMarks"
									type={"number"}
									onChange={value => {
										handleChange(value, "obtainedMarks");
									}}
									error={error.obtainedMarks}
									value={state.obtainedMarks}
									size="large"
								/>
								{error.obtainedMarks && (
									<div
										style={{
											color: "red",
											fontWeight: 400,
										}}
									>
										Please enter Obtained Marks.
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
										setCities(preValues => ({
											...preValues,
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
									setEditMode(false)
								}}
								block
								icon={<PlusOutlined />}
							>
								{ editMode ? "Save" : value.AddMoreEducation}
							</S.EButton>
						</S.ButtonContainer>
					{education  && education.length > 0 && (
							<Table
							columns={columns}
							dragable={true}
							data={education}
							onRow = {(record, rowIndex) => {
								return {
									onClick: event => {
										event.preventDefault();
										setState(education[rowIndex])
										setEditIndex([rowIndex])
										setEditMode(true)
						;
									}
								};
							}}
						/>
						)}
				</S.AddMoreDiv>
			</>
		</>
	);
};

export default EducationForm;
