import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";
import { validateEmail } from "../../../../utils/Shared/helper/validateEmail";
import AntCustomSelect from "../Select";
import { TagRender } from "../TagRender";

function EmailSelect({
	data,
	selectedData,
	canFetchNow,
	fetchData,
	defaultData = [],
	defaultKey = "email",
	isObject = false,
	isImage = false,
	placeholder = "Search...",
	mode = "default",
	size = "large",
}) {
	const [searchValue, setSearchValue] = useState("");
	const [stateVal, setStateVal] = useState([]);
	const [isDataFetchable, setIsDataFetchable] = useState(canFetchNow);
	const [emailData, setEmailData] = useState([...data]);
	const debouncedSearch = useDebounce(searchValue, 500);
	const { employees, loader } = useSelector(state => state.sharedSlice);

	const onChange = value => {
		// console.log(`onchange ${value}`);
		const tempArray = String(value).split(",");
		if (validateEmail(tempArray[tempArray.length - 1])) {
			setStateVal([...tempArray]);
		} else if (!tempArray[0]) {
			setStateVal([]);
		}
	};

	const onSearch = value => {
		setIsDataFetchable(true);
		setSearchValue(value);
		setEmailData([]);
	};
	const onSelect = value => {
		// console.log(" on select selected value", value);
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
			setEmailData([...data]);
		}
	}, [debouncedSearch]);

	useEffect(() => {
		if (isDataFetchable) {
			setEmailData(prevData => {
				return [...new Set([...prevData, ...employees])];
			});
			setIsDataFetchable(false);
		}
	}, [employees]);

	useEffect(() => {
		let filterArrOfObj;
		if (isObject) {
			filterArrOfObj = employees.filter(val =>
				stateVal.includes(val[defaultKey])
			);
		}
		selectedData(stateVal, filterArrOfObj);
	}, [stateVal]);

	return (
		<AntCustomSelect
			value={stateVal}
			isEmailSelect={true}
			isImage={isImage}
			data={emailData}
			apiData={employees}
			loading={loader}
			onChange={onChange}
			onSearch={onSearch}
			onSelect={onSelect}
			paginationHandler={paginationHandler}
			debouncedSearch={debouncedSearch}
			mode={mode}
			placeholder={placeholder}
			size={size}
			filterOption={false}
			tagRender={props => <TagRender props={props} />}
		/>
	);
}

export default EmailSelect;
