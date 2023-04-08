import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import {
	Avatar,
	Button,
	Carousel,
	Checkbox,
	DatePicker,
	Form,
	Input,
	Radio,
	Typography,
} from "antd";
import moment from "moment";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { getNameForImage } from "../../../../../utils/base";
import CitySelect from "../../../../sharedComponents/AntdCustomSelects/SharedSelects/CitySelect";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import NewTravelDetailCard from "../UI/NewTravelDetailCard";
import TravelCard from "../UI/TravelCard";
import TravelDetailCard from "../UI/TravelDetailCard";
import { travelCategoryData } from "./TravelCategories";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { TravelDictionary } from "../../localization/index";

function NewTravelComposerDetail(props) {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { TravelDictionaryList } = TravelDictionary[userLanguage];
	const { headings,labels,placeHolder} = TravelDictionaryList;

	const { fetchCityData, travelBy, onSelectCity, onTravelDetailAdd } = props;
	const cities = useSelector(state => state.sharedSlice.cities);
	const [form] = Form.useForm();
	const [isReturn, setIsReturn] = useState(false);

	const travelDetailFormSubmit = async () => {
		form.submit();
		try {
			const travelDetailVal = await form.validateFields();
			onTravelDetailAdd(travelDetailVal);
			setIsReturn(false);
			form.resetFields();
		} catch (error) {}
	};

	return (
		<>
			<Form
				form={form}
				layout="vertical"
				name="travelDetailForm"
				initialValues={{
					departureDate: moment(new Date()),
					returnDate: moment(new Date()),
					isHotelRequired: false,
					isTADARequired: false,
					return: false,
				}}
				className=""
			>
				<div className="!bg-neutral-100 rounded !p-3">
					<Form.Item
						rules={[
							{
								required: true,
								message: "Please enter valid reason.",
							},
						]}
						label={labels.reason}
						//label={"Reason"}
						name="reason"
					>
						<Input placeholder={placeHolder.reason} size="middle" />
					</Form.Item>
					<Form.Item 
					label={labels.travel} 
					required>
						<div className="flex gap-4 flex-col sm:flex-row">
							<div className="flex flex-col w-full">
								<CitySelect
									data={cities}
									selectedData={(val, obj) => {
										// console.log("val", obj);
										onSelectCity("departure", obj);
									}}
									canFetchNow={cities && cities.length > 0}
									fetchData={fetchCityData}
									optionComponent={opt => {
										return (
											<>
												<Avatar
													src={opt.image}
													className="!bg-black"
												>
													{getNameForImage(opt.name)}
												</Avatar>
												{opt.name + " - " + opt.country}
											</>
										);
									}}
									defaultKey={"id"}
									isObject={true}
									mode={""}
									placeholder={placeHolder.departureCity}
									size="middle"
									name="departureId"
									rules={[
										{
											required: true,
											message:
												"Please select departure city.",
										},
									]}
								/>
							</div>
							<div className="flex flex-col w-full">
								<CitySelect
									data={cities}
									selectedData={(val, obj) => {
										onSelectCity("arrival", obj);
									}}
									canFetchNow={cities && cities.length > 0}
									fetchData={fetchCityData}
									optionComponent={opt => {
										return (
											<>
												<Avatar
													src={opt.image}
													className="!bg-black"
												>
													{getNameForImage(opt.name)}
												</Avatar>
												{opt.name + " - " + opt.country}
											</>
										);
									}}
									defaultKey={"id"}
									isObject={true}
									mode={""}
									placeholder={placeHolder.destinationCity}
									size="middle"
									name="arrivalId"
									rules={[
										{
											required: true,
											message:
												"Please select destination city.",
										},
									]}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item label={labels.date} required>
						<div className="flex w-full gap-3">
							<Form.Item
								name="departureDate"
								rules={[
									{
										required: true,
										message: "Departure date is required",
									},
								]}
							>
								<DatePicker
									format="YYYY-MM-DD HH:mm"
									showTime={{
										defaultValue: moment(
											"00:00:00",
											"HH:mm"
										),
									}}
									placeholder={placeHolder.selectDate}
									size="middle"
								/>
							</Form.Item>
							{isReturn && (
								<Form.Item
									name="returnDate"
									rules={[
										{
											required: true,
											message: "Return date is required",
										},
									]}
								>
									<DatePicker
										format="YYYY-MM-DD HH:mm"
										showTime={{
											defaultValue: moment(
												"00:00:00",
												"HH:mm"
											),
										}}
										size="middle"
										placeholder={placeHolder.selectDate}
									/>
								</Form.Item>
							)}
							<Form.Item valuePropName="checked" name="return">
								<Checkbox
									onChange={e => {
										setIsReturn(e.target.checked);
									}}
								>
									{labels.return}
								</Checkbox>
							</Form.Item>
						</div>
					</Form.Item>
					<Form.Item 
					label={labels.hotelTada}
					>
						<div className="flex ">
							<Form.Item
								name="isHotelRequired"
								valuePropName="checked"
							>
								<Checkbox>{labels.hotelReq}</Checkbox>
							</Form.Item>
							<Form.Item
								name="isTADARequired"
								valuePropName="checked"
							>
								<Checkbox>{labels.tadaReq}</Checkbox>
							</Form.Item>
						</div>
					</Form.Item>
					<div className="flex justify-between items-center">
						<Form.Item
						label={labels.travelBy}
							name="travelById"
							rules={[
								{
									required: true,
									message: "Please Select Travel Type",
								},
							]}
						>
							<Radio.Group className="travelCategory !flex gap-5">
								{travelCategoryData(travelBy).map(travel => (
									<Radio.Button value={travel.id}>
										{travel.image}
										{travel.name}
									</Radio.Button>
								))}
							</Radio.Group>
						</Form.Item>
						<Button
							onClick={travelDetailFormSubmit}
							className="ThemeBtn"
						>
							{labels.add}
						</Button>
					</div>
				</div>
			</Form>
		</>
	);
}

export default NewTravelComposerDetail;
