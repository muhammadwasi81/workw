import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllEmployees } from "../../../../utils/Shared/store/actions";
import MemberSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";

function WorkBoardMemberSelect({ onChange, defaultData, loadDefaultData }) {
	const dispatch = useDispatch();
	const employees = useSelector(state => state.sharedSlice.employees);
	const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
	const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
	const [value, setValue] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		fetchEmployees("", 0);
	}, []);

	useEffect(() => {
		setValue(defaultData);
		setLoading(true);
	}, [defaultData]);

	useEffect(() => {
		if (employees.length > 0 && !isFirstTimeDataLoaded) {
			setIsFirstTimeDataLoaded(true);
			setFirstTimeEmpData(employees);
		}
	}, [employees]);

	const fetchEmployees = (text, pgNo) => {
		dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
	};

	const selectedData = (data, obj) => {
		setValue(data);
		// setMembers(obj);
		onChange(data, obj);
	};

	return (
		<>
			<MemberSelect
				data={firstTimeEmpData}
				selectedData={selectedData}
				canFetchNow={isFirstTimeDataLoaded}
				fetchData={fetchEmployees}
				placeholder={"Search members"}
				mode={"multiple"}
				isObject={true}
				loadDefaultData={loadDefaultData}
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
							{opt.name}
						</>
					);
				}}
				dataVal={value}
				name="members"
				showSearch={true}
			/>
		</>
	);
}

export default WorkBoardMemberSelect;
