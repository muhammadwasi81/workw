import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import useSearch from "./useSearch";
import PropTypes from "prop-types";
//import * as S from "../Styles/employee.style";
const { Option } = Select;

function NewCustomSelect(props) {
	const [query, setQuery] = useState("");
	const [pageNumber, setPageNumber] = useState(0);

	const { data, loading, error, responseData } = useSearch(
		query,
		pageNumber,
		props.endPoint,
		props.requestType
	);

	function handleSearch(e) {
		// console.log("handle search", e);
		setQuery(e);
		setPageNumber(0);
	}
	const onPopupScroll = event => {
		let target = event.target;
		if (
			!loading &&
			target.scrollTop + target.offsetHeight === target.scrollHeight
		) {
			if (responseData.data.length > 0) {
				setPageNumber(prevPageNumber => prevPageNumber + 1);
			}
		}
	};
	// const loadedData = data.map((data, index) => {
	// 	return <Option key={data.id}>{data.name}</Option>;
	// });
	// console.log("mode", props.mode);
	return (
		<Select
			status={props.status}
			style={{ width: "100%" }}
			mode={props.mode}
			onSearch={handleSearch}
			loading={loading}
			onPopupScroll={onPopupScroll}
			optionFilterProp="children"
			onBlur={props.onBlur}
			onSelect={val => {
				console.log("selected value", val);
			}}
			onChange={props.onChange}
			onClear={props.onClear}
			onClick={props.onClick}
			onFocus={props.onFocus}
			className="newCustomSelect"
			id={props.id}
			allowClear={props.allowClear}
			clearIcon={props.clearIcon}
			defaultValue={props.defaultValue}
			autoFocus={props.autoFocus}
			bordered={props.bordered}
			autoClearSearchValue={props.autoClearSearchValue}
			disabled={props.disabled}
			key={props.key}
			value={props.value}
			showAction={props.showAction}
			showArrow={props.showArrow}
			showSearch={props.showSearch}
			getPopupContainer={trigger => trigger.parentNode}
			size={props.size}
			placeholder={props.placeholder}
			placement={props.placement}
			removeIcon={props.removeIcon}
			searchValue={props.searchValue}
			onDropdownVisibleChange={props.onDropdownVisibleChange}
			dropdownRender={(ReactNode, props) => {
				return (
					<>
						{ReactNode}
						<div
							className=""
							style={{
								paddingLeft: "10px",
								fontWeight: "bold",
								display: "flex",
								justifyContent: "center",
							}}
						>
							{loading && "Loading..."}
						</div>
						<div
							style={{
								paddingLeft: "10px",
								fontWeight: "bold",
								display: "flex",
								justifyContent: "center",
							}}
						>
							{error && "Error"}
						</div>
					</>
				);
			}}
		>
			{/* {loadedData} */}

			{data &&
				data.length > 0 &&
				data.map((data, index) => (
					<Option
						key={index}
						value={
							props.valueObject ? JSON.stringify(data) : data.id
						}
					>
						{data.name.toLowerCase()}
					</Option>
				))}
		</Select>
	);
}

export default React.memo(NewCustomSelect);

NewCustomSelect.propTypes = {
	onSelect: PropTypes.func,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	onClear: PropTypes.func,
	onClick: PropTypes.func,
	onFocus: PropTypes.func,
	className: PropTypes.string,
	id: PropTypes.string,
	allowClear: PropTypes.bool,
	clearIcon: PropTypes.node,
	defaultValue: PropTypes.any,
	autoFocus: PropTypes.bool,
	bordered: PropTypes.bool,
	autoClearSearchValue: PropTypes.bool,
	disabled: PropTypes.bool,
	key: PropTypes.string,
	value: PropTypes.string,
	showArrow: PropTypes.bool,
	showSearch: PropTypes.bool,
	size: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	optionFilterProp: PropTypes.string,
	optionLabelProp: PropTypes.string,
	options: PropTypes.any,
	mode: PropTypes.string,
	placement: PropTypes.string,
	removeIcon: PropTypes.node,
	searchValue: PropTypes.string,
	onPopupScroll: PropTypes.func,
	onDropdownVisibleChange: PropTypes.func,
	onSearch: PropTypes.func,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	direction: PropTypes.any.isRequired,
	rules: PropTypes.arrayOf(PropTypes.object).isRequired,
	endPoint: PropTypes.string.isRequired,
	requestType: PropTypes.string.isRequired,
	onSearch: PropTypes.func.isRequired,
	size: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	status: PropTypes.string,
	// label: PropTypes.string.isRequired,
	direction: PropTypes.any.isRequired,
	valueObject: PropTypes.bool,
};
NewCustomSelect.defaultProps = {
	status: "",
	valueObject: false,
	size: "large",
	rules: [{ required: true }],
	onChange: undefined,
	mode: "",
};
