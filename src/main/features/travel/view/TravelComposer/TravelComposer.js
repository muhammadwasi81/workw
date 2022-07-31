import {
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

function TravelComposer(props) {
	const { label } = props;
	const { labels, placeHolder, travelBy } = label;
	const [form] = Form.useForm();
	const [state, setState] = useState(initialState);
	const [stateCard, setStateCard] = useState(initialTravelDetailState);
	const [errors, setErrors] = useState(initialErrors);
	const [submit, setSubmit] = useState(false);
	const [docsData, setDocsData] = useState(null);
	const [isSubmit, setIsSubmit] = useState(false);
	const [travelDetails, setTravelDetails] = useState([]);
	const { loader, success } = useSelector(state => state.travelSlice);

	const isTablet = useMediaQuery({ maxWidth: 650 });
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction } = dictionaryList[userLanguage];
	const dispatch = useDispatch();
	const onInputFieldChange = (value, name) => {
		setState({
			...state,
			[name]: value,
		});
	};
	const addTravelDetails = state => {
		setTravelDetails(prevTravel => [...prevTravel, ...state]);
	};

	const onFinish = values => {
		let cities = travelDetails.map(travel => {
			return {
				id: defaultUiid,
				reason: travel.reason,
				departureId: JSON.parse(travel.departureId).id,
				arrivalId: JSON.parse(travel.arrivalId).id,
				departureDate: moment(travel.departureDate).format(),
				returnDate: moment(travel.returnDate).format(),
				travelById: travel.travelById,
				isTADARequired: travel.isTADARequired,
				isHotelRequired: travel.isHotelRequired,
			};
		});
		let approvers = values.approvers.map(approver => {
			return {
				approverId: approver,
				approverType: 0,
				isDefault: true,
				status: 0,
				email: "",
			};
		});
		let agents = values.agents.map(agent => {
			if (validateEmail(agent)) {
				return {
					approverId: defaultUiid,
					approverType: 0,
					isDefault: true,
					status: 0,
					email: agent,
				};
			}
			return {
				approverId: agent,
				approverType: 0,
				isDefault: true,
				status: 0,
				email: "",
			};
		});
		const { subject, description, specialRequest } = values;
		setState(prevState => ({
			...prevState,
			subject,
			description,
			specialRequest,
			approvers,
			agents,
			cities,
		}));
		setIsSubmit(true);
		// console.log("docsData", docsData);
	};
	const onCardSlide = e => {
		// console.log("slider", e);
	};

	const onClick = index => {
		const tempTravel = [...travelDetails];
		//   const index = tempTravel.indexOf(5);
		if (index != -1) {
			tempTravel.splice(index, 1); // remove number using index
		}
		setTravelDetails(tempTravel);
	};
	const checkValidation = () => {
		// if(travelDetails.length===0){}

		if (stateCard.reason.length === 0) {
			setErrors(prevErrors => ({
				...prevErrors,
				reason: true,
			}));
		} else {
			setErrors(prevErrors => ({
				...prevErrors,
				reason: false,
			}));
		}
		if (stateCard.arrivalId === null) {
			setErrors(prevErrors => ({
				...prevErrors,
				arrivalId: true,
			}));
		} else {
			setErrors(prevErrors => ({
				...prevErrors,
				arrivalId: false,
			}));
		}
		if (stateCard.departureId === null) {
			setErrors(prevErrors => ({
				...prevErrors,
				departureId: true,
			}));
		} else {
			setErrors(prevErrors => ({
				...prevErrors,
				departureId: false,
			}));
		}
		if (stateCard.travelById === null) {
			setErrors(prevErrors => ({
				...prevErrors,
				travelBy: true,
			}));
		} else {
			setErrors(prevErrors => ({
				...prevErrors,
				travelBy: false,
			}));
		}
		setSubmit(true);
	};
	const onFormSubmit = () => {
		form.submit();
		if (travelDetails.length === 0) {
			checkValidation();
		}
	};
	const handleDocsUpload = data => {
		setDocsData(data);
	};

	useEffect(() => {
		if (isSubmit) {
			dispatch(addTravel(state));
			form.resetFields();
			setTravelDetails([]);
			setIsSubmit(false);
		}
	}, [isSubmit]);

	return (
		<Form
			className="travel-composer"
			onFinish={onFinish}
			layout="vertical"
			form={form}
			dir={Direction}
		>
			<S.FormItem
				name="subject"
				label={<Typography level={5}>{labels.subject}</Typography>}
				rules={[
					{ required: true, message: "Please input your subject!" },
				]}
				direction={Direction}
			>
				<div className="input-row">
					<TextInput
						name="subject"
						placeholder={placeHolder.subjectPh}
						onChange={onInputFieldChange}
					/>
				</div>
			</S.FormItem>
			<S.FormItem
				name="description"
				label={<Typography level={5}>{labels.description}</Typography>}
				rules={[
					{
						required: true,
						message: "Please input your description!",
					},
				]}
				direction={Direction}
			>
				<div className="input-row">
					<TextAreaInput
						name="description"
						style={{ borderRadius: "5px" }}
						placeholder={placeHolder.DescPh}
						rows={4}
						onChange={onInputFieldChange}
					/>
				</div>
			</S.FormItem>
			<S.FormItem
				name="approvers"
				label={<Typography level={5}>{labels.approvers}</Typography>}
				rules={[
					{ required: true, message: "Please select approvers!" },
				]}
				direction={Direction}
			>
				<NewCustomSelect
					name="approvers"
					label={labels.approvers}
					showSearch={true}
					endPoint="api/Reference/GetAllUserReference"
					requestType="get"
					placeholder={placeHolder.approversPh}
					mode="multiple"
					showImage={true}
				/>
			</S.FormItem>

			<S.FormItem
				name="agents"
				label={<Typography level={5}>{labels.agent}</Typography>}
				rules={[{ required: true, message: "Please select agents!" }]}
				direction={Direction}
			>
				<NewCustomSelect
					name="agents"
					label={labels.agent}
					showSearch={true}
					endPoint="api/Reference/GetAllUserReference"
					requestType="get"
					placeholder={placeHolder.agentPh}
					mode="tags"
				/>
			</S.FormItem>
			<TravelComposerDetail
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
			/>
			<TravelCard>
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
			</TravelCard>
			<S.FormItem name="specialRequest" direction={Direction}>
				<div className="input-row">
					<Typography level={5}>{labels.specialRequest}</Typography>
					<TextAreaInput
						name="specialRequests"
						style={{ borderRadius: "5px" }}
						placeholder={placeHolder.specialRequestPh}
						rows={4}
						onChange={onInputFieldChange}
					/>
				</div>
			</S.FormItem>
			<S.FormItem direction={Direction}>
				<div className="input-row">
					<Typography level={5}>{labels.attachments}</Typography>
					<SingleUpload
						handleImageUpload={handleDocsUpload}
						uploadText={labels.upload}
						multiple={true}
						position={"flex-start"}
					/>
				</div>
			</S.FormItem>
			<Button
				className={`ThemeBtn tag_expense_btn font_bold p-0 ${
					isTablet ? "" : "font_medium"
				}`}
				block
				size={!isTablet && "large"}
				loading={loader}
				// htmlType="submit"
				onClick={onFormSubmit}
			>
				{labels.createExpense}
			</Button>
		</Form>
	);
}

export default TravelComposer;
