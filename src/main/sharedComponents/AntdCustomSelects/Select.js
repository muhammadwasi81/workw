import React, { useEffect } from "react";
import { Form, Select, Skeleton, Space } from "antd";
import { useState } from "react";
import "./antdCustomSelect.css";
import { useSelector } from "react-redux";
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
		value = [],
		defaultData = [],
		optionComponent,
		isLoaded,
		label = "",
		name = "",
		showSearch = false,
		rules = [],

		formItem = true,
	} = props;

	useEffect(() => {
		setPgNo(0);
	}, [debouncedSearch]);
	const userId = useSelector(state => state.userSlice.user.id);
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
	// console.log("data", isLoaded, data);

	return (
		<>
			{!formItem ? (
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
					getPopupContainer={trigger => trigger.parentNode}
					// maxTagCount="responsive"
				>
					{isLoaded && !loading ? (
						data &&
						data.length > 0 &&
						data.map(
							(opt, index) =>
								userId !== opt.id && (
									<Option
										key={index}
										value={
											isEmailSelect ? opt.email : opt.id
										}
										disabled={defaultData.includes(opt.id)}
										className="hover:!bg-primary-color hover:!text-white"
									>
										<div className="flex gap-1 items-center">
											{optionComponent
												? optionComponent(opt)
												: opt.name}
										</div>
									</Option>
								)
						)
					) : (
						<Option>
							<Space>
								<Skeleton.Avatar active={true} />
								<Skeleton.Input active={true} block />
							</Space>
						</Option>
					)}
				</Select>
			) : (
				<Form.Item
					label={label}
					name={name}
					showSearch={showSearch}
					rules={rules}
				>
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
						getPopupContainer={trigger => trigger.parentNode}
						// maxTagCount="responsive"
					>
						{isLoaded && !loading ? (
							data &&
							data.length > 0 &&
							data.map(
								(opt, index) =>
									userId !== opt.id && (
										<Option
											key={index}
											value={
												isEmailSelect
													? opt.email
													: opt.id
											}
											disabled={defaultData.includes(
												opt.id
											)}
											className="hover:!bg-primary-color hover:!text-white"
										>
											<div className="flex gap-1 items-center">
												{optionComponent
													? optionComponent(opt)
													: opt.name}
											</div>
										</Option>
									)
							)
						) : (
							<Option>
								<Space>
									<Skeleton.Avatar active={true} />
									<Skeleton.Input active={true} block />
								</Space>
							</Option>
						)}
					</Select>
				</Form.Item>
			)}
		</>
	);
}

export default AntCustomSelect;
