import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";
import AntCustomSelect from "../Select";

function CitySelect({
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
}) {
	const [value, setValue] = useState("");
	const [stateVal, setStateVal] = useState([]);
	const [defaultValues, setDefaultValues] = useState([]);
	const [isDataFetchable, setIsDataFetchable] = useState(canFetchNow);
	const debouncedSearch = useDebounce(value, 500);
	const [cityData, setCityData] = useState([...data]);
	const { cities, loadingData } = useSelector(state => state.sharedSlice);

	const onChange = value => {
		const tempArray = String(value).split(",");
		if (!tempArray[0]) {
			setStateVal([]);
		} else {
			setStateVal([...tempArray]);
		}
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
			filterArrOfObj = cities.filter(val =>
				stateVal.includes(val[defaultKey])
			);
		}
		selectedData(stateVal, filterArrOfObj);
	}, [stateVal]);

	const onSearch = value => {
		if (defaultData.length > 0) {
			setCityData([...defaultData]);
		} else {
			setCityData([]);
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
			setCityData([...data]);
		}
	}, [debouncedSearch]);

	useEffect(() => {
		if (isDataFetchable) {
			setCityData(prevData => {
				return [...new Set([...prevData, ...cities])];
			});
			setIsDataFetchable(false);
		}
	}, [cities]);

	return (
		<AntCustomSelect
			value={stateVal}
			data={cityData}
			apiData={cities}
			loading={loadingData}
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
			// tagRender={props => <TagRender props={props} />}
		/>
	);
}

export default CitySelect;
