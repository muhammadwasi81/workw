import React, { useEffect, useState } from "react";
import { Select as Selectbox } from "antd";
import "./style.css";
function Select({
	searchable,
	placeholder,
	name,
	data,
	className,
	onBlur,
	onFocus,
	onChange,
	style,
	size,
	reset,
}) {
	const { Option } = Selectbox;
	const [state, setstate] = useState(null);
	function handleChange(value, a, e) {
		console.log(value, e, a);
		setstate(a.children);
		onChange(value);
	}

	useEffect(() => {
		if (reset) {
			setstate(null);
		}
	}, [reset]);
	// function onBlur() {

	// }

	// function onFocus() {

	// }

	function onSearch(val) {
		console.log("search:", val);
	}

	return (
		<Selectbox
			size={size}
			showSearch={searchable}
			style={{ ...style }}
			placeholder={placeholder}
			value={state}
			// optionFilterProp="children"
			className={className}
			// onChange={handleChange}
			onSelect={handleChange}
			// onFocus={onFocus}
			// onBlur={onBlur}
			onSearch={onSearch}
			name={name}
			filterOption={(input, option) =>
				option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
			}
		>
			{data &&
				data.map(({ id, name }) => <Option value={id}>{name}</Option>)}
		</Selectbox>
	);
}

export default Select;
