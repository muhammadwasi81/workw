import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useDebounce from "../../../utils/Shared/helper/use-debounce";
// import { getAllEmployees } from "../../../utils/Shared/store/actions";
// import { getAllEmployees } from "../../features/employee/store/actions";
import ShortProfile from "../ShortProfile/ShortProfile";

const UserSearchable = props => {
	const { onChange, data } = props;
	const [handleDropdown, setHandleDropdown] = useState("");
	// console.log("handleDropdown", handleDropdown);
	const searchValue = useDebounce(handleDropdown, 500);
	const [options, setOptions] = useState([]);
	const { Option } = Select;
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	// setOptions(data);
	// 	// const fetchEmployees = (text, pgNo) => {
	// 	// };
	// 	// dispatch(getAllEmployees({ text: searchValue, pgNo: 1, pgSize: 20 }));
	// }, [searchValue]);

	const handleChange = e => {
		// console.log("e", e);
		// setOptions([...options.filter(option => !e.includes(option.id))]);
		const selectedItem = data.filter(option => e.includes(option.id));
		onChange(selectedItem);
	};

	return (
		<>
			<Select
				// onSelect={() => setHandleDropdown("")}
				open={handleDropdown.length > 0 ? true : false}
				onSearch={e => setHandleDropdown(e)}
				getPopupContainer={trigger => trigger.parentNode}
				notFoundContent={false}
				// onDeselect={e => {
				// 	setOptions([
				// 		...options,
				// 		...data.filter(item => item.name === e),
				// 	]);
				// }}
				onChange={handleChange}
				filterOption={false}
				mode="multiple"
				style={{ width: "100%" }}
				placeholder={props.placeholder}
				// optionLabelProp="label"
			>
				{data?.map((res, i) => {
					console.log("res", res);
					return (
						<Option key={i}>
							<ShortProfile
								name={res.name}
								jobTitle={res.jobTitle}
								userIcon={res.image}
							/>
						</Option>
					);
				})}
			</Select>
		</>
	);
};

export default UserSearchable;
