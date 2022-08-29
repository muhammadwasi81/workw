import {
	Avatar,
	Button,
	Carousel,
	Checkbox,
	DatePicker,
	Form,
	Input,
	Typography,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import TextAreaInput from "../../../../sharedComponents/Input/TextArea";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import TravelCard from "../UI/TravelCard";
import TravelDetailCard from "../UI/TravelDetailCard";
import TravelComposerDetail from "./TravelComposerDetail";
import moment from "moment";
import * as S from "../../../employee/Styles/employee.style";
import "./travel.css";
import { defaultUiid } from "../../../../../utils/Shared/enums/enums";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { validateEmail } from "../../../../../utils/Shared/helper/validateEmail";
import { useMediaQuery } from "react-responsive";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { useDispatch, useSelector } from "react-redux";
import { addTravel } from "../../store/actions";
import NewCustomSelect from "../../../../sharedComponents/CustomSelect/newCustomSelect";
import NewTravelComposerDetail from "./NewTravelComposerDetail";
import {
	getAllEmployees,
	getCities,
} from "../../../../../utils/Shared/store/actions";
import { getNameForImage } from "../../../../../utils/base";
import MemberSelect from "../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";

const initialState = {
	subject: "",
	description: "",
	returnTicket: false,
	approvers: [],
	agents: [],
	cities: [],
	specialRequest: "",
	id: defaultUiid,
	// status: 0,
	// approverStatus: 0,
	// agentStatus: 0,
	referenceId: defaultUiid,
	referenceType: 0,
	attachments: [],
};
const initialErrors = {
	reason: false,
	departureId: false,
	arrivalId: false,
	travelBy: false,
};
const initialTravelDetailState = {
	reason: "",
	departureId: null,
	arrivalId: null,
	departureDate: moment().format("YYYY-MM-DD, h:mm"),
	returnDate: moment().format("YYYY-MM-DD, h:mm"),
	isHotelRequired: false,
	isTADARequired: false,
	travelById: null,
};

function NewTravelComposer(props) {
	const { label } = props;
	const { labels, placeHolder, travelBy } = label;
	// const [form] = Form.useForm();
	// const [state, setState] = useState(initialState);
	// const [stateCard, setStateCard] = useState(initialTravelDetailState);
	// const [errors, setErrors] = useState(initialErrors);
	// const [submit, setSubmit] = useState(false);
	// const [docsData, setDocsData] = useState(null);
	// const [isSubmit, setIsSubmit] = useState(false);
	// const [travelDetails, setTravelDetails] = useState([]);
	const { loader, success } = useSelector(state => state.travelSlice);

	const isTablet = useMediaQuery({ maxWidth: 650 });
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction } = dictionaryList[userLanguage];
	// const dispatch = useDispatch();
	// const onInputFieldChange = (value, name) => {
	// 	setState({
	// 		...state,
	// 		[name]: value,
	// 	});
	// };
	// const addTravelDetails = state => {
	// 	setTravelDetails(prevTravel => [...prevTravel, ...state]);
	// };

	// const onFinish = values => {
	// 	let cities = travelDetails.map(travel => {
	// 		return {
	// 			id: defaultUiid,
	// 			reason: travel.reason,
	// 			departureId: JSON.parse(travel.departureId).id,
	// 			arrivalId: JSON.parse(travel.arrivalId).id,
	// 			departureDate: moment(travel.departureDate).format(),
	// 			returnDate: moment(travel.returnDate).format(),
	// 			travelById: travel.travelById,
	// 			isTADARequired: travel.isTADARequired,
	// 			isHotelRequired: travel.isHotelRequired,
	// 		};
	// 	});
	// 	let approvers = values.approvers.map(approver => {
	// 		return {
	// 			approverId: approver,
	// 			approverType: 0,
	// 			isDefault: true,
	// 			status: 0,
	// 			email: "",
	// 		};
	// 	});
	// 	let agents = values.agents.map(agent => {
	// 		if (validateEmail(agent)) {
	// 			return {
	// 				approverId: defaultUiid,
	// 				approverType: 0,
	// 				isDefault: true,
	// 				status: 0,
	// 				email: agent,
	// 			};
	// 		}
	// 		return {
	// 			approverId: agent,
	// 			approverType: 0,
	// 			isDefault: true,
	// 			status: 0,
	// 			email: "",
	// 		};
	// 	});
	// 	const { subject, description, specialRequest } = values;
	// 	setState(prevState => ({
	// 		...prevState,
	// 		subject,
	// 		description,
	// 		specialRequest,
	// 		approvers,
	// 		agents,
	// 		cities,
	// 	}));
	// 	setIsSubmit(true);
	// 	// console.log("docsData", docsData);
	// };
	// const onCardSlide = e => {
	// 	// console.log("slider", e);
	// };

	// const onClick = index => {
	// 	const tempTravel = [...travelDetails];
	// 	//   const index = tempTravel.indexOf(5);
	// 	if (index != -1) {
	// 		tempTravel.splice(index, 1); // remove number using index
	// 	}
	// 	setTravelDetails(tempTravel);
	// };
	// const checkValidation = () => {
	// 	// if(travelDetails.length===0){}

	// 	if (stateCard.reason.length === 0) {
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
	// 	if (stateCard.arrivalId === null) {
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
	// 	if (stateCard.departureId === null) {
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
	// 	if (stateCard.travelById === null) {
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
	// };
	// const onFormSubmit = () => {
	// 	form.submit();
	// 	if (travelDetails.length === 0) {
	// 		checkValidation();
	// 	}
	// };
	// const handleDocsUpload = data => {
	// 	setDocsData(data);
	// };

	// useEffect(() => {
	// 	if (isSubmit) {
	// 		dispatch(addTravel(state));
	// 		form.resetFields();
	// 		setTravelDetails([]);
	// 		setIsSubmit(false);
	// 	}
	// }, [isSubmit]);
	const dispatch = useDispatch();
	useEffect(() => {
		fetchEmployees("", 1);
		fetchCityData("", 0);
	}, []);
	const fetchEmployees = (text, pgNo) => {
		dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
	};
	const fetchCityData = (text, pgNo) => {
		dispatch(getCities({ textData: text, page: pgNo }));
	};
	const employees = useSelector(state => state.sharedSlice.employees);

	const handleAttachmentsUpload = files => {
		console.log("files", files);
	};
	const [form] = Form.useForm();
	// const onFinishForm = () => {
	// 	console.log("form.travelForm", form.travelForm);
	// };
	return (
		<Form.Provider
			onFormFinish={async (name, { values, forms }) => {
				console.log("name", name);
				console.log("forms", forms, values, name);
				try {
					const { travelForm, travelDetailForm } = forms;
					// console.log("travelde", travelDetailForm);
					travelForm.validateFields();
					const isValidated = await travelDetailForm.validateFields();
					// console.log("isValidated", isValidated);
				} catch (error) {}
			}}
			key={1}
		>
			<Form>
				<Form
					className="travel-composer !rounded-b-none"
					// onFinish={values => {
					// 	console.log("travelForm:", form.getFieldsValue(true));
					// }}
					layout="vertical"
					// form={form}
					dir={Direction}
					name="travelForm"
				>
					<Form.Item
						name="subject"
						label={labels.subject}
						rules={[
							{
								required: true,
								message: "Please input your subject!",
							},
						]}
						direction={Direction}
					>
						<Input
							placeholder={placeHolder.subjectPh}
							size="middle"
						/>
					</Form.Item>
					<Form.Item
						name="description"
						label={labels.description}
						rules={[
							{
								required: true,
								message: "Please input your description!",
							},
						]}
						direction={Direction}
					>
						<Input.TextArea
							style={{ borderRadius: "5px" }}
							placeholder={placeHolder.DescPh}
							rows={4}
						/>
					</Form.Item>

					<MemberSelect
						data={employees}
						selectedData={value => {}}
						canFetchNow={employees && employees.length > 0}
						fetchData={fetchEmployees}
						placeholder={placeHolder.approversPh}
						mode={"multiple"}
						isObject={true}
						loadDefaultData={false}
						optionComponent={opt => {
							return (
								<>
									<Avatar
										src={opt.image}
										className="!bg-black"
									>
										{getNameForImage(opt.name)}
									</Avatar>
									{opt.name}
								</>
							);
						}}
						dataVal={[]}
						name="approvers"
						showSearch={true}
						direction={Direction}
						size="middle"
						rules={[
							{
								required: true,
								message: "Please select approvers!",
							},
						]}
						label={labels.approvers}
					/>

					<MemberSelect
						data={employees}
						selectedData={value => {}}
						canFetchNow={employees && employees.length > 0}
						fetchData={fetchEmployees}
						placeholder={placeHolder.agentPh}
						mode={"multiple"}
						size="middle"
						isObject={true}
						loadDefaultData={false}
						optionComponent={opt => {
							return (
								<>
									<Avatar
										src={opt.image}
										className="!bg-black"
									>
										{getNameForImage(opt.name)}
									</Avatar>
									{opt.name}
								</>
							);
						}}
						dataVal={[]}
						name="agents"
						showSearch={true}
						direction={Direction}
						rules={[
							{
								required: true,
								message: "Please select agents!",
							},
						]}
						label={labels.agent}
					/>
					{/* <TravelComposerDetail
					addTravelDetails={addTravelDetails}
					errors={errors}
					setErrors={setErrors}
					initialState={initialTravelDetailState}
					state={stateCard}
					setState={setStateCard}
					checkValidation={checkValidation}
					submit={submit}
					setSubmit={setSubmit}
					travelDetails={travelDetails}
					labels={label}
				/> */}

					{/* <TravelCard>
					<Carousel
						afterChange={onCardSlide}
						infinite={false}
						prevArrow={<LeftOutlined />}
						nextArrow={<RightOutlined />}
						slidesToShow={1}
						dots={true}
						arrows
					>
						{travelDetails.map((travel, index) => (
							<div className="carrouselbox">
								<TravelDetailCard
									travel={travel}
									index={index}
									onClick={onClick}
									isCloseable={true}
								/>
							</div>
						))}
					</Carousel>
				</TravelCard> */}
				</Form>
				<NewTravelComposerDetail
					key={0}
					fetchCityData={fetchCityData}
					travelBy={travelBy}
					labels={labels}
					placeHolder={placeHolder}
					Direction={Direction}
					handleAttachmentsUpload={handleAttachmentsUpload}
				/>
				<Button
					htmlType="submit"
					className="ThemeBtn"
					block
					// onClick={onFinishForm}
				>
					Submit
				</Button>
			</Form>
		</Form.Provider>
	);
}

export default NewTravelComposer;
