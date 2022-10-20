import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getNameForImage } from "../../../../utils/base";
import { validateEmail } from "../../../../utils/Shared/helper/validateEmail";
import { getAllEmployees } from "../../../../utils/Shared/store/actions";
// import EmailSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/EmailSelect";
import MemberSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
// import Avatar from "../../../sharedComponents/Avatar/avatarOLD";

function AddMember({
	onChange,
	defaultData,
	loadDefaultData = false,
	placeholder = "Search",
	apiLoad = true,
	selectedMembers = [],
	handleMemberHost,
	handleDeleteMember,
}) {
	const dispatch = useDispatch();
	const [value, setValue] = useState([]);
	const [loading, setLoading] = useState(false);
	const employees = useSelector(state => state.sharedSlice.employees);
	const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
	const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);

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
		onChange(data, obj);
	};

	return (
		<>
			<MemberSelect
				data={firstTimeEmpData}
				selectedData={selectedData}
				canFetchNow={isFirstTimeDataLoaded}
				fetchData={fetchEmployees}
				placeholder={placeholder}
				isObject={true}
				mode={""}
				loadDefaultData={loadDefaultData}
				emptyStateAfterSelect={true}
				formItem={false}
				optionComponent={opt => {
					// console.log("option", opt);
					return (
						<>
							<Avatar src={opt.image} className="!bg-black">
								{getNameForImage(opt.name)}
							</Avatar>
							{opt.name}
						</>
					);
				}}
				dataVal={value}
				name="members"
				showSearch={true}
				// direction={Direction}
				apiLoad={apiLoad}
			/>
			<hr />
			<div className="max-h-96 overflow-y-auto">
				{selectedMembers
					.sort((a, b) => Number(b.admin) - Number(a.admin))
					.map(element => (
						<div className="flex justify-between border-b py-3 border-b-neutral-300">
							<div className="flex gap-3">
								<Avatar
									src={element.image}
									className="!bg-black"
								>
									{getNameForImage(element.name)}
								</Avatar>
								<div className="flex flex-col gap-1">
									<p className="!m-0">{element.name}</p>
									<p className="!m-0 text-neutral-400">
										{element.description
											? element.description
											: "No Designation"}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<Button
									key="makeHost"
									className={
										!element.admin
											? `ThemeBtn`
											: "ThemeBtnDelete"
									}
									onClick={() => {
										handleMemberHost(element.id);
									}}
								>
									{!element.admin
										? "Make Host"
										: "Remove Host"}
								</Button>
								<em className="ant-list-item-action-split !mt-0 !static" />
								<CloseCircleOutlined
									className="!text-red-400 hover:!text-red-600  !border-red-400 hover:!border-red-600 !text-xl cursor-pointer transition"
									onClick={() => {
										handleDeleteMember(element.id);
									}}
								/>
							</div>
						</div>
					))}
			</div>
		</>
	);
}

export default AddMember;
