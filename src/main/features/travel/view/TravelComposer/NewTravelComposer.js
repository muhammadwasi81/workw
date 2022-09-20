import { Avatar, Button, Carousel, Form, Input, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import "./travel.css";
import { defaultUiid } from "../../../../../utils/Shared/enums/enums";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { validateEmail } from "../../../../../utils/Shared/helper/validateEmail";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { useDispatch, useSelector } from "react-redux";
import { addTravel } from "../../store/actions";
import NewTravelComposerDetail from "./NewTravelComposerDetail";
import {
	getAllEmployees,
	getCities,
} from "../../../../../utils/Shared/store/actions";
import { getNameForImage, jsonToFormData } from "../../../../../utils/base";
import MemberSelect from "../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import NewTravelDetailCard from "../UI/NewTravelDetailCard";
import { TravelReferenceTypeEnum } from "../../../projects/enum/enums";

function NewTravelComposer(props) {
	const {
		label,
		referenceType = TravelReferenceTypeEnum.General,
		referenceId = defaultUiid,
	} = props;
	const { labels, placeHolder, travelBy } = label;
	const [cities, setCities] = useState({
		departure: null,
		arrival: null,
	});
	const [travelDetails, setTravelDetails] = useState([]);

	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction } = dictionaryList[userLanguage];

	const [docs, setDocs] = useState();
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
	const loading = useSelector(state => state.travelSlice.loader);

	const handleAttachmentsUpload = files => {
		setDocs(files);
	};
	const onFinishForm = (travelVal, travelDetailVal) => {
		if (travelDetails.length === 0) {
			message.error("Please add travel detail.");
			return;
		}
		const cities = travelDetails.map(travel => {
			return {
				id: defaultUiid,
				reason: travel.reason,
				departureId: travel.departureId,
				arrivalId: travel.arrivalId,
				departureDate: moment(travel.departureDate).format(),
				returnDate: moment(travel.returnDate).format(),
				travelById: travel.travelById,
				isTADARequired: travel.isTADARequired,
				isHotelRequired: travel.isHotelRequired,
			};
		});
		const approvers = travelVal.approvers.map(approver => {
			return {
				approverId: approver,
				// approverType: 0,
				// isDefault: true,
				// status: 0,
				// email: "",
			};
		});
		const agents = travelVal.agents.map(agent => {
			if (validateEmail(agent)) {
				return {
					approverId: defaultUiid,
					// approverType: 0,
					// isDefault: true,
					// status: 0,
					// email: agent,
				};
			}
			return {
				approverId: agent,
				// approverType: 0,
				// isDefault: true,
				// status: 0,
				// email: "",
			};
		});
		const { subject, description, specialRequest } = travelVal;
		let attachments;
		if (docs?.length > 0) {
			attachments = docs.map(file => {
				return {
					id: defaultUiid,
					file: file.originFileObj,
				};
			});
		}
		dispatch(
			addTravel(
				jsonToFormData({
					subject,
					description,
					specialRequest,
					approvers,
					agents,
					cities,
					attachments,
					referenceId,
					referenceType,
				})
			)
		);
	};
	const onSelectCity = (name, objVal) => {
		setCities({
			...cities,
			[name]: objVal[0],
		});
	};

	const onTravelDetailAdd = values => {
		let tempArr = [];
		let tempObj = { ...values, ...cities };

		tempArr.push(tempObj);

		if (values.return) {
			let tempObj;
			tempObj = { ...values };
			tempObj.returnDate = values.departureDate;
			tempObj.departure = cities.arrival;
			tempObj.arrival = cities.departure;
			tempObj.departureDate = values.returnDate;
			tempObj.arrivalId = values.departureId;
			tempObj.departureId = values.arrivalId;
			tempArr.push(tempObj);
		}
		setTravelDetails(prevTravel => [...prevTravel, ...tempArr]);
	};

	return (
		<Form.Provider
			onFormFinish={async (name, { values, forms }) => {
				try {
					const travelVal = await forms.travelForm.validateFields();
					onFinishForm(travelVal, travelDetails);
				} catch (error) {}
				if (travelDetails.length === 0) {
					try {
						await forms.travelDetailForm.validateFields();
					} catch (error) {}
				}
			}}
			key={1}
		>
			<Form>
				<Form
					className="travel-composer"
					layout="vertical"
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
					<NewTravelComposerDetail
						key={0}
						fetchCityData={fetchCityData}
						travelBy={travelBy}
						labels={labels}
						placeHolder={placeHolder}
						Direction={Direction}
						handleAttachmentsUpload={handleAttachmentsUpload}
						onSelectCity={onSelectCity}
						onTravelDetailAdd={onTravelDetailAdd}
					/>
					<Carousel
						// afterChange={onCardSlide}
						infinite={false}
						prevArrow={<LeftOutlined />}
						nextArrow={<RightOutlined />}
						slidesToShow={1}
						dots={true}
						arrows
					>
						{travelDetails.map((travel, index) => (
							<div className="carrouselbox">
								<NewTravelDetailCard
									key={index}
									travel={travel}
									index={index}
									// onClick={onClick}
									isCloseable={true}
								/>
							</div>
						))}
					</Carousel>
					<Form.Item
						name="specialRequest"
						direction={Direction}
						label={labels.specialRequest}
					>
						<Input.TextArea
							style={{ borderRadius: "5px" }}
							placeholder={placeHolder.specialRequestPh}
							rows={4}
						/>
					</Form.Item>
					<Form.Item direction={Direction} label={labels.attachments}>
						<SingleUpload
							handleImageUpload={handleAttachmentsUpload}
							uploadText={labels.upload}
							multiple={true}
							position={"flex-start"}
						/>
					</Form.Item>
				</Form>

				<Button
					htmlType="submit"
					className="ThemeBtn"
					block
					loading={loading}
				>
					Submit
				</Button>
			</Form>
		</Form.Provider>
	);
}

export default NewTravelComposer;
