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
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getNameForImage } from "../../../../../utils/base";
import CitySelect from "../../../../sharedComponents/AntdCustomSelects/SharedSelects/CitySelect";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import NewTravelDetailCard from "../UI/NewTravelDetailCard";
import TravelCard from "../UI/TravelCard";
import TravelDetailCard from "../UI/TravelDetailCard";
import { travelCategoryData } from "./TravelCategories";

function NewTravelComposerDetail(props) {
	const {
		fetchCityData,
		travelBy,
		labels,
		placeHolder,
		Direction,
		handleAttachmentsUpload,
		onSelectCity,
		onTravelDetailAdd,
		travelDetails,
	} = props;
	const cities = useSelector(state => state.sharedSlice.cities);
	const [form] = Form.useForm();
	const [isReturn, setIsReturn] = useState(false);

	const travelDetailFormSubmit = async () => {
		form.submit();
		try {
			const travelDetailVal = await form.validateFields();
			onTravelDetailAdd(travelDetailVal);
			form.resetFields();
			// console.log("detail", travelDetailVal);
		} catch (error) {}
	};
	console.log("traveldetails", travelDetails);
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
					specialRequest: "",
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
						label={"Reason"}
						name="reason"
					>
						<Input placeholder={"Enter reason"} size="middle" />
					</Form.Item>
					<Form.Item label={"Travel"} required>
						<div className="flex gap-4 flex-col sm:flex-row">
							<div className="flex flex-col w-full">
								<CitySelect
									data={cities}
									selectedData={(val, obj) => {
										console.log("val", obj);
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
									placeholder={"Search departure city"}
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
									placeholder={"Search destination city"}
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
					<Form.Item label={"Date"} required>
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
									format="YYYY-MM-DD HH:mm:ss"
									showTime={{
										defaultValue: moment(
											"00:00:00",
											"HH:mm:ss"
										),
									}}
									placeholder="Select Date"
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
										format="YYYY-MM-DD HH:mm:ss"
										showTime={{
											defaultValue: moment(
												"00:00:00",
												"HH:mm:ss"
											),
										}}
										size="middle"
										placeholder="Select Date"
										// value={moment(new Date())}
									/>
								</Form.Item>
							)}
							<Form.Item valuePropName="checked">
								<Checkbox
									onChange={e => {
										setIsReturn(e.target.checked);
									}}
								>
									Return
								</Checkbox>
							</Form.Item>
						</div>
					</Form.Item>
					<Form.Item label={"Hotel & TADA"}>
						<div className="flex ">
							<Form.Item
								name="isHotelRequired"
								valuePropName="checked"
							>
								<Checkbox>Hotel Required</Checkbox>
							</Form.Item>
							<Form.Item
								name="isTADARequired"
								valuePropName="checked"
							>
								<Checkbox>TADA Required</Checkbox>
							</Form.Item>
						</div>
					</Form.Item>
					<div className="flex justify-between items-center">
						<Form.Item
							label={"Travel By"}
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
							Add
						</Button>
					</div>
				</div>

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
		</>
	);
}

export default NewTravelComposerDetail;
