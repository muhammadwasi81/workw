import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";
import AntCustomSelect from "../Select";

function MemberSelect({
	data,
	selectedData,
	canFetchNow,
	fetchData,
	defaultData = [],
	defaultKey = "id",
	isObject = false,
	isImage = false,
	placeholder = "Search...",
	mode = "default",
	size = "large",
	optionComponent,
	value: val = mode === "default" ? "" : [],
	onChange: change,
	dataVal = [],
	loadDefaultData = false,
	name = "",
	label = "",
	rules = [],
	showSearch = false,
}) {
	const [value, setValue] = useState("");
	const [stateVal, setStateVal] = useState(dataVal);
	const [defaultValues, setDefaultValues] = useState([]);
	const [isDataFetchable, setIsDataFetchable] = useState(canFetchNow);
	const debouncedSearch = useDebounce(value, 500);
	const [memberData, setMemberData] = useState([...data]);
	const { employees, loader } = useSelector(state => state.sharedSlice);
	const [isAssignDefaultData, setIsAssignDefaultData] = useState(
		loadDefaultData
	);

	const onChange = value => {
		console.log("value", value);
		const tempArray = String(value).split(",");
		if (!tempArray[0]) {
			setStateVal([]);
		} else {
			setStateVal([...tempArray]);
		}
	};
	const triggerChange = changedValue => {
		change?.(changedValue);
	};
	useEffect(() => {
		if (defaultData.length > 0) {
			let tempArray = [];
			defaultData.forEach(element => {
				tempArray.push(element[defaultKey]);
			});
			setStateVal(tempArray);
			setDefaultValues(tempArray);
		}
	}, []);

	useEffect(() => {
		let filterArrOfObj;
		if (isObject) {
			filterArrOfObj = employees.filter(val =>
				stateVal.includes(val[defaultKey])
			);
		}
		selectedData(stateVal, filterArrOfObj);

		if (stateVal.length > 0) {
			if (stateVal.length === 1) {
				triggerChange(stateVal.toString());
			} else {
				triggerChange(stateVal);
			}
		}
	}, [stateVal]);

	const onSearch = value => {
		if (defaultData.length > 0) {
			setMemberData([...defaultData]);
		} else {
			setMemberData([]);
		}
		setIsDataFetchable(true);
		setValue(value);
	};
	const onSelect = value => {
		// console.log("selected value", value);
		// selectedData(value);
	};

	const paginationHandler = pgNo => {
		if (debouncedSearch.length > 0) {
			fetchData(debouncedSearch, pgNo);
			setIsDataFetchable(true);
		}
	};

	useEffect(() => {
		if (debouncedSearch.length > 0) {
			fetchData(debouncedSearch, 0);
		} else {
			setMemberData([...data]);
		}
	}, [debouncedSearch]);

	useEffect(() => {
		if (isDataFetchable) {
			// console.log("memberData", memberData);
			// let uniqueData = employees.filter(function (obj) {
			// 	return memberData.indexOf(obj) === -1;
			// });
			// console.log("unique data", uniqueData);
			// setMemberData(uniqueData);
			const merged = [...memberData, ...employees];
			// console.log("[...new Set([...prevData, ...employees])]", [
			// 	...new Map(merged.map(v => [v.id, v])).values(),
			// ]);
			setMemberData(() => {
				return [...new Map(merged.map(v => [v.id, v])).values()];
			});
			setIsDataFetchable(false);
		}
	}, [employees]);

	useEffect(() => {
		if (canFetchNow) {
			setMemberData([...data]);
		}
	}, [data]);

	useEffect(() => {
		if (isAssignDefaultData && dataVal && dataVal.length > 0) {
			setStateVal([...dataVal]);
			setIsAssignDefaultData(false);
		}
	}, [dataVal]);

	return (
		<AntCustomSelect
			value={stateVal}
			data={memberData}
			apiData={employees}
			loading={loader}
			onChange={onChange}
			onSearch={onSearch}
			onSelect={onSelect}
			paginationHandler={paginationHandler}
			debouncedSearch={debouncedSearch}
			filterOption={false}
			isEmailSelect={false}
			isImage={isImage}
			mode={mode}
			placeholder={placeholder}
			size={size}
			defaultData={defaultValues}
			optionComponent={optionComponent}
			isLoaded={canFetchNow}
			name={name}
			showSearch={showSearch}
			rules={rules}
			label={label}

			// tagRender={props => <TagRender props={props} />}
		/>
	);
}

export default MemberSelect;
