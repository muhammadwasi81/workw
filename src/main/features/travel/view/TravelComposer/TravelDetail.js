import { Button, Checkbox, DatePicker, Typography } from "antd";
import React, { useCallback, useContext, useEffect, useState } from "react";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import TravelCard from "../UI/TravelCard";
import { travelCategoryData } from "./TravelCategories";
import NewCustomSelect from "../../../employee/view/newCustomSelect";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../../utils/localization/languages";
import * as S from "../../../employee/Styles/employee.style";

const initialState = {
	reason: "",
	departureId: null,
	arrivalId: null,
	departureDate: moment().format("YYYY-MM-DD, h:mm"),
	returnDate: moment().format("YYYY-MM-DD, h:mm"),
	isHotelRequired: false,
	isTADARequired: false,
	travelById: null,
};

const options = [
	{
		label: "Hotel Required",
		value: "hotelRequired",
	},
	{
		label: "TADA Application",
		value: "tadaRequired",
	},
];

function TravelDetail(props) {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction } = dictionaryList[userLanguage];
	const isTablet = useMediaQuery({ maxWidth: 650 });

	const {
		errors,
		setErrors,
		state,
		setState,
		checkValidation,
		submit,
		setSubmit,
		travelDetails,
	} = props;

	const [items] = useState(travelCategoryData);
	const [selected, setSelected] = useState(null);
	const [isReturn, setIsReturn] = useState(false);

	const handleClick = id => {
		setSelected(id);
		setState({
			...state,
			travelById: Number(id),
		});
	};

	const onCheckboxChange = value => {
		const isHotelRequired =
			value.findIndex(element => element.includes("hotelRequired")) > -1;
		const isTADAApplicable =
			value.findIndex(element => element.includes("tadaRequired")) > -1;

		if (isHotelRequired) {
			setState(state => ({
				...state,
				isHotelRequired: true,
			}));
		} else {
			setState(state => ({
				...state,
				isHotelRequired: false,
			}));
		}
		if (isTADAApplicable) {
			setState(state => ({
				...state,
				isTADARequired: true,
			}));
		} else {
			setState(state => ({
				...state,
				isTADARequired: false,
			}));
		}
	};

	const onInputFieldChange = (value, name) => {
		setState(prevState => ({
			...prevState,
			[name]: value,
		}));
		// checkValidation();
	};
	const handleChange = useCallback((value, name) => {
		setState(prevState => ({
			...prevState,
			[name]: value,
		}));
		// checkValidation();
	}, []);

	function onChange(value, dateString, name) {
		setState({
			...state,
			[name]: dateString,
		});
	}

	// const checkValidation = () => {
	// 	if (state.reason.length === 0) {
	// 		setErrors(prevErrors => ({
	// 			...prevErrors,
	// 			reason: true,
	// 		}));
	// 	} else {
	// 		setErrors(prevErrors => ({
	// 			...prevErrors,
	// 			reason: false,
	// 		}));
	// 	}
	// 	if (state.arrivalId === null) {
	// 		setErrors(prevErrors => ({
	// 			...prevErrors,
	// 			arrivalId: true,
	// 		}));
	// 	} else {
	// 		setErrors(prevErrors => ({
	// 			...prevErrors,
	// 			arrivalId: false,
	// 		}));
	// 	}
	// 	if (state.departureId === null) {
	// 		setErrors(prevErrors => ({
	// 			...prevErrors,
	// 			departureId: true,
	// 		}));
	// 	} else {
	// 		setErrors(prevErrors => ({
	// 			...prevErrors,
	// 			departureId: false,
	// 		}));
	// 	}
	// 	if (state.travelById === null) {
	// 		setErrors(prevErrors => ({
	// 			...prevErrors,
	// 			travelBy: true,
	// 		}));
	// 	} else {
	// 		setErrors(prevErrors => ({
	// 			...prevErrors,
	// 			travelBy: false,
	// 		}));
	// 	}
	// 	setSubmit(true);
	// 	// props.checkCardValidation(checkValidation());
	// };
	const addTravelDetails = () => {
		let tempArr = [];
		tempArr.push(state);
		if (isReturn && state.returnDate.length > 0) {
			// console.log("isReturn", isReturn);
			let tempObj;
			tempObj = { ...state };
			tempObj.returnDate = state.departureDate;
			tempObj.departureDate = state.returnDate;
			tempObj.arrivalId = state.departureId;
			tempObj.departureId = state.arrivalId;
			tempArr.push(tempObj);
		}
		props.addTravelDetails(tempArr);
		setState(initialState);
		setIsReturn(false);
		setSelected(null);
		//console.log("state he travel detail me", tempArr);
		//setTravelDetails(prevTravel => [...prevTravel, state]);
	};
	useEffect(() => {
		if (submit) {
			if (
				!errors.reason &&
				!errors.arrivalId &&
				!errors.departureId &&
				!errors.travelBy
			) {
				addTravelDetails();
				setSubmit(false);
			}
		}
	}, [errors, submit, isReturn]);

	return (
		<TravelCard>
			<S.FormItem direction={Direction}>
				<div className="input-row">
					<Typography level={5} className="required_typography">
						Reason
					</Typography>
					<TextInput
						placeholder="Write Reason to Travel"
						name="reason"
						onChange={onInputFieldChange}
						error={errors.reason}
						value={state.reason}
						size="large"
					/>
					{errors.reason && (
						<div style={{ color: "red" }}>
							Please enter valid reason.
						</div>
					)}
				</div>
			</S.FormItem>
			<div className="input-row">
				<Typography level={5} className="required_typography">
					Travel
				</Typography>
				<div
					style={{
						display: "flex",
						gap: "10px",
						flexDirection: "column",
					}}
				>
					<NewCustomSelect
						valueObject={true}
						name="travel"
						showSearch={true}
						status={errors.departureId ? "error" : ""}
						endPoint="/api/Utility/GetAllCities"
						requestType="post"
						placeholder="Search Departure To Select"
						value={state.departureId}
						onChange={value => {
							handleChange(value, "departureId");
						}}
					/>
					{errors.departureId && (
						<div style={{ color: "red" }}>
							Please select departure city.
						</div>
					)}

					<NewCustomSelect
						valueObject={true}
						name="travel"
						showSearch={true}
						status={errors.arrivalId ? "error" : ""}
						endPoint="/api/Utility/GetAllCities"
						requestType="post"
						placeholder="Search Destination To Select"
						value={state.arrivalId}
						// searchValue={state.arrivalId}
						onChange={value => {
							handleChange(value, "arrivalId");
						}}
						// label={value.City}
						// direction={Direction}
					/>
					{errors.arrivalId && (
						<div style={{ color: "red" }}>
							Please select destination city.
						</div>
					)}
				</div>
			</div>

			<div className="input-row">
				<Typography level={5}>Date</Typography>
				<div
					className={`${
						isTablet ? "flex wrap gap-10" : "travel_date"
					}`}
				>
					<DatePicker
						format="YYYY-MM-DD HH:mm"
						showTime={{ defaultValue: moment("00:00", "HH:mm") }}
						onChange={(value, dateString) => {
							onChange(value, dateString, "departureDate");
						}}
						value={
							state.departureDate !== ""
								? moment(state.departureDate)
								: moment()
						}
						placeholder="Departure Date"
					/>
					{isReturn && (
						// <Form.Item></Form.Item>
						<DatePicker
							format="YYYY-MM-DD HH:mm"
							showTime={{
								defaultValue: moment("00:00", "HH:mm"),
							}}
							onChange={(value, dateString) => {
								onChange(value, dateString, "returnDate");
							}}
							value={
								state.returnDate !== ""
									? moment(state.returnDate)
									: moment()
							}
							placeholder="Return Date"
						/>
					)}
					<Checkbox
						checked={isReturn}
						onChange={() => {
							setIsReturn(!isReturn);
							// setState(prevState => ({
							// 	...prevState,
							// 	returnDate: "",
							// }));
						}}
					>
						{"Return"}
					</Checkbox>
				</div>
			</div>

			<div className="task-checkbox-container">
				<Typography level={5}>Hotel & TADA</Typography>

				<Checkbox.Group
					options={options}
					onChange={onCheckboxChange}
					value={[
						state.isHotelRequired ? options[0].value : "",
						state.isTADARequired ? options[1].value : "",
					]}
				/>
			</div>

			<Typography level={5} className="required_typography">
				Travel By
			</Typography>
			<div className={`travel_tags_flex ${isTablet && "wrap "}`}>
				<div
					className={
						"travel-type " +
						`${isTablet && "wrap justify-evenly w-full"}`
					}
				>
					{items.map(({ id, name, image }) => (
						<Card
							itemId={id}
							title={name}
							image={image}
							key={id}
							handleClick={handleClick}
							selected={selected}
						/>
					))}
				</div>
				<Button
					className={
						"ThemeBtn  font_bold " +
						`${isTablet ? "w-full" : "font_medium tag_btn"}`
					}
					onClick={checkValidation}
				>
					Add
				</Button>
			</div>
			{errors.travelBy && (
				<div style={{ color: "red" }}>Please select travel by.</div>
			)}
		</TravelCard>
	);
}
function Card({ handleClick, selected, title, itemId, image }) {
	const handleOnClick = e => {
		handleClick(e.target.id);
	};

	return (
		<div
			className={`expense-tag tag_relate ${
				String(selected) === String(itemId)
					? "expense_tag_selected"
					: ""
			}`}
			tabIndex={0}
		>
			<div className="tag_icon" id={itemId} onClick={handleOnClick} />
			{image}
			<span className="expense_tag_title">{title}</span>
		</div>
	);
}

export default TravelDetail;
