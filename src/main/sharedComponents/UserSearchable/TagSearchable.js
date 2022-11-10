import { Avatar } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getNameForImage } from "../../../utils/base";
import { getAllEmployees } from "../../../utils/Shared/store/actions";
import MemberSelect from "../AntdCustomSelects/SharedSelects/MemberSelect";

function TagSearchable(props) {
	const dispatch = useDispatch();
	const fetchEmployees = (text, pgNo) => {
		dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
	};
	const employees = useSelector(state => state.sharedSlice.employees);
	return (
		<MemberSelect
			className={props.className}
			data={employees}
			selectedData={(value, obj) => {
				props.onChange(obj);
			}}
			canFetchNow={employees && employees.length > 0}
			fetchData={fetchEmployees}
			placeholder={props.placeholder}
			mode={"multiple"}
			size="middle"
			isObject={true}
			loadDefaultData={false}
			optionComponent={opt => {
				return (
					<>
						{opt.image ? (
							<Avatar src={opt.image} className="!bg-black" />
						) : (
							<Avatar className="!bg-black">
								{getNameForImage(opt.name)}
							</Avatar>
						)}
						{opt.name}
					</>
				);
			}}
			dataVal={[]}
			name={props.name}
		/>
	);
}

export default TagSearchable;
