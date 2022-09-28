import { CloseCircleOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getNameForImage } from "../../../../../utils/base";
import { getAllEmployees } from "../../../../../utils/Shared/store/actions";
import MemberSelect from "../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
// import { getNameForImage } from "../../../../utils/base";
// import { getAllEmployees } from "../../../../utils/Shared/store/actions";
// import MemberSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";

function AssignMemberModal({
	onChange,
	defaultData,
	placeholder = "Search",
	selectedMembers = [],
	handleDeleteMember = () => {},
}) {
	const dispatch = useDispatch();
	const [value, setValue] = useState([]);
	const employees = useSelector(state => state.sharedSlice.employees);
	useEffect(() => {
		fetchEmployees("", 0);
	}, []);

	useEffect(() => {
		setValue(defaultData);
	}, [defaultData]);

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
				data={employees}
				selectedData={selectedData}
				canFetchNow={employees && employees.length > 0}
				fetchData={fetchEmployees}
				placeholder={placeholder}
				mode={""}
				isObject={true}
				loadDefaultData={false}
				formItem={false}
				emptyStateAfterSelect={true}
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
				dataVal={value}
				name="members"
				showSearch={true}
			/>
			<hr />
			<div className="max-h-96 overflow-y-auto">
				{selectedMembers.map(element => (
					<div className="flex justify-between border-b py-3 border-b-neutral-300">
						<div className="flex gap-3">
							<Avatar src={""} className="!bg-black">
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

export default AssignMemberModal;
