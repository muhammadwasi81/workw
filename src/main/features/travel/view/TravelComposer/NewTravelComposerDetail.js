import {
	Avatar,
	Button,
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
import { travelCategoryData } from "./TravelCategories";
// import TravelCard from "../UI/TravelCard";

function NewTravelComposerDetail(props) {
	const {
		fetchCityData,
		travelBy,
		labels,
		placeHolder,
		Direction,
		handleAttachmentsUpload,
	} = props;
	const cities = useSelector(state => state.sharedSlice.cities);
	const [form] = Form.useForm();
	const [isReturn, setIsReturn] = useState(false);
	const options = [
		{
			label: "Hotel Required",
			value: "hotelRequired",
		},
		{
			label: "TADA Required",
			value: "tadaRequired",
		},
	];
	return (
		<Form
			form={form}
			layout="vertical"
			name="travelDetailForm"
			onFinish={values => {
				console.log("travelDetailForm:", values);
			}}
			initialValues={{
				startDate: moment(new Date()),
				endDate: moment(new Date()),
			}}
			className="!pt-0 !rounded-t-none"
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
								selectedData={val => {
									// console.log("val", val);
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
								mode={"multiple"}
								placeholder={"Search departure city"}
								size="middle"
								name="departureCity"
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
								selectedData={val => {
									// console.log("val", val);
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
								mode={"multiple"}
								placeholder={"Search destination city"}
								size="middle"
								name="arrivalCity"
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
							name="startDate"
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
								name="endDate"
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
						<Form.Item name="return" valuePropName="checked">
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
					<Checkbox.Group options={options}></Checkbox.Group>
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
						// htmlType="submit"
						onClick={e => {
							// e.preventDefault();
							form.submit();
						}}
						className="ThemeBtn"
					>
						Add
					</Button>
				</div>
			</div>
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
	);
}

export default NewTravelComposerDetail;
