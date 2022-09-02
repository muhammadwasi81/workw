import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CitySelect from "./SharedSelects/CitySelect";
import {
	getAllEmployees,
	getCities,
} from "../../../utils/Shared/store/actions";
import EmailSelect from "./SharedSelects/EmailSelect";
// import Avatar from "../Avatar/avatarOLD";
import MemberSelect from "./SharedSelects/MemberSelect";
import { getNameForImage } from "../../../utils/base";
import { Avatar } from "antd";

function ExampleAntdCustomSelect() {
	const dispatch = useDispatch();
	const { cities, loadingData, success, employees } = useSelector(
		state => state.sharedSlice
	);
	const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
	const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
	const [firstTimeCityData, setFirstTimeCityData] = useState([]);
	const [isFirstTimeCityDataLoaded, setIsFirstTimeCityDataLoaded] = useState(
		false
	);
	const [resetField, setResetField] = useState(false);
	useEffect(() => {
		fetchCityData("", 0);
		fetchEmployees("", 0);
	}, []);
	useEffect(() => {
		if (employees.length > 0 && !isFirstTimeDataLoaded) {
			setIsFirstTimeDataLoaded(true);
			setFirstTimeEmpData(employees);
		}
	}, [employees]);
	useEffect(() => {
		if (cities.length > 0 && !isFirstTimeCityDataLoaded) {
			setIsFirstTimeCityDataLoaded(true);
			setFirstTimeCityData(cities);
		}
	}, [cities]);
	useEffect(() => {
		if (resetField) {
			setResetField(false);
		}
	}, [resetField]);
	const fetchCityData = (text, pgNo) => {
		dispatch(getCities({ textData: text, page: pgNo }));
	};
	const fetchEmployees = (text, pgNo) => {
		dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
	};
	const selectedData = (data, obj) => {
		console.log("wrapper select data", data, obj);
		setResetField(true);
	};

	if (!isFirstTimeDataLoaded) {
		return;
	}
	if (!isFirstTimeCityDataLoaded) {
		return;
	}

	// const selectedData = () => {};
	return (
		<div>
			<MemberSelect
				data={employees}
				selectedData={selectedData}
				canFetchNow={employees && employees.length > 0}
				fetchData={fetchEmployees}
				// placeholder={placeHolder.agentPh}
				mode={"multiple"}
				isObject={true}
				loadDefaultData={false}
				optionComponent={opt => {
					return (
						<>
							<Avatar src={opt.image} className="!bg-black">
								{getNameForImage(opt.name)}
							</Avatar>
							{opt.name}
						</>
					);
				}}
				dataVal={[]}
				formItem={false}
				resetField={resetField}
				// name="agents"
				showSearch={true}
				// direction={Direction}
				// rules={[
				// 	{
				// 		required: true,
				// 		message: "Please select agents!",
				// 	},
				// ]}
				// label={labels.agent}
			/>
			{/* <CitySelect
				data={firstTimeCityData}
				selectedData={selectedData}
				canFetchNow={isFirstTimeCityDataLoaded}
				fetchData={fetchCityData}
				// preSelectedData={[
				// 	"6c1b11d3-00ac-44ab-9632-000de6270382",
				// 	"84b055e8-b423-4f3d-a90d-0002d85b1592",
				// ]}
				// defaultData={[
				// 	{
				// 		country: "France",
				// 		countryId: "6e0474ae-e4c8-440c-98c6-7e9daeececdb",
				// 		id: "697edc7a-c1ae-4af0-a0df-00019c517564",
				// 		name: "Loos",
				// 	},
				// 	{
				// 		country: "Czech Republic",
				// 		countryId: "b5b9046b-c7aa-4568-b0ee-2dd6b732c2bd",
				// 		id: "0fbf7b7a-99e2-481f-84ba-00123250bd18",
				// 		name: "Dolni Kounice",
				// 	},
				// ]}
				optionComponent={opt => {
					return (
						<>
							<Avatar
								name={opt.name}
								src={opt.image}
								round={true}
								width={"30px"}
								height={"30px"}
							/>
							{opt.name + " - " + opt.country}
						</>
					);
				}}
				defaultKey={"id"}
				isObject={true}
				isImage={true}
				mode={"multiple"}
				placeholder={"Search..."}
				size={"large"}
			/> */}
			{/*<CitySelect
				data={firstTimeCityData}
				selectedData={selectedData}
				canFetchNow={isFirstTimeCityDataLoaded}
				fetchData={fetchCityData}
			/>
			<CitySelect
				data={firstTimeCityData}
				selectedData={selectedData}
				canFetchNow={isFirstTimeCityDataLoaded}
				fetchData={fetchCityData}
			/>
			<EmailSelect
				data={firstTimeEmpData}
				selectedData={selectedData}
				canFetchNow={isFirstTimeDataLoaded}
				fetchData={fetchEmployees}
                defaultKey={"email"}
				isObject={true}
				isImage={false}
				mode={"tags"}
				placeholder={"Search..."}
				size={"large"}
			/>
			<EmailSelect
				data={firstTimeEmpData}
				selectedData={selectedData}
				canFetchNow={isFirstTimeDataLoaded}
				fetchData={fetchEmployees}
			/>*/}
			{/* <EmailSelect
				data={firstTimeEmpData}
				selectedData={selectedData}
				canFetchNow={isFirstTimeDataLoaded}
				fetchData={fetchEmployees}
				defaultKey={"email"}
				isObject={true}
				isImage={false}
				mode={"tags"}
				placeholder={"Search..."}
				size={"large"}
			/> */}
		</div>
	);
}

export default ExampleAntdCustomSelect;
