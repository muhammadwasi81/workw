import React, { useEffect } from "react";
import { Select } from "antd";
import { useState } from "react";
import Avatar from "../Avatar/avatarOLD";
import "./antdCustomSelect.css";
const { Option } = Select;

function AntCustomSelect(props) {
	const [pgNo, setPgNo] = useState(0);

	const {
		loading,
		data,
		onChange,
		onSearch,
		onSelect,
		paginationHandler,
		debouncedSearch,
		apiData,
		mode,
		placeholder,
		size,
		filterOption,
		tagRender,
		isEmailSelect,
		isImage,
		value,
		defaultData = [],
		optionComponent,
		label,
		name,
	} = props;

	useEffect(() => {
		setPgNo(0);
	}, [debouncedSearch]);

	// handle pagination inside this component
	const onPopupScroll = event => {
		let target = event.target;
		if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
			if (apiData.length > 0) {
				setPgNo(pgNo + 1);
			}
		}
	};
	useEffect(() => {
		if (pgNo !== 0) {
			paginationHandler(pgNo);
		}
	}, [pgNo]);

	return (
		<Select
			className="w-full antd_custom_select"
			mode={mode}
			size={size}
			showSearch
			placeholder={placeholder}
			tagRender={tagRender}
			value={value}
			loading={loading}
			onPopupScroll={onPopupScroll}
			onSelect={onSelect}
			onChange={onChange}
			onSearch={onSearch}
			filterOption={filterOption}
		>
			{data &&
				data.length > 0 &&
				data.map((opt, index) => (
					<Option
						key={index}
						value={isEmailSelect ? opt.email : opt.id}
						disabled={defaultData.includes(opt.id)}
						className="hover:!bg-primary-color hover:!text-white"
					>
						<div className="flex gap-1 items-center">
							{optionComponent ? optionComponent(opt) : opt.name}
						</div>
					</Option>
				))}
		</Select>
	);
}

export default AntCustomSelect;
