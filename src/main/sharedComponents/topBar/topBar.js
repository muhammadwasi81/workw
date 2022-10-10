import React, { useContext, useState } from "react";
import SearchInput from "../searchBox/SearchInput";
import { SearchOutlined } from "@ant-design/icons";
import "./style.css";
import { Button, Segmented } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import FilterSearchButton from "../FilterSearch/index";
import PropTypes from "prop-types";
import { isEmptyObj } from "../../../utils/base";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../utils/localization/languages";

const TopBar = ({
	filter,
	rightButtons,
	onSearch,
	segment,
	buttons,
	component,
	style,
	width,
	options = null,
}) => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { sharedLabels, Direction } = dictionaryList[userLanguage];
	const { onFilter, ...rest } = filter;
	const { onSegment, label1, label2 } = segment;
	const [activeButtons, setActiveButtons] = useState(
		buttons.map((item, index) => (index === 0 ? true : false))
	);
	let classes = "topBar " + width;
	classes += Direction === "rtl" ? "rtl" : "";
	return (
		<div className={classes} style={style}>
			<div className="topBar__inner">
				<div className="searchBox">
					<SearchInput
						icon={<SearchOutlined />}
						placeholder={sharedLabels.Search}
						size="larger"
						onChange={e => {
							onSearch(e.target.value);
						}}
					/>
				</div>
				<div className="topBar__buttons">
					{buttons.map(({ name, onClick, icon, to }, index) => (
						<Button
							onClick={() => {
								onClick(to);
								const actives = activeButtons.map(
									(item, key) => {
										if (index === key) {
											return (item = !item);
										} else {
											return (item = false);
										}
									}
								);

								setActiveButtons(actives);
							}}
							key={index}
							className={
								activeButtons[index]
									? "primaryBtn active"
									: "primaryBtn "
							}
						>
							{name}
							{icon && icon}
						</Button>
					))}
					{component}
				</div>
			</div>
			<div className="searchButtons">
				{!isEmptyObj(filter) && (
					<FilterSearchButton onFilter={onFilter} {...rest} />
				)}
				{rightButtons &&
					rightButtons.map(
						({ name, onClick, icon, className }, index) => (
							<Button
								onClick={onClick}
								type={"text"}
								key={index}
								className={
									"!flex !items-center !bg-neutral-100 !rounded hover:!bg-primary-color !font-semibold hover:!text-white " +
									className
								}
								icon={icon}
							>
								{name}
								{/* {icon && icon} */}
							</Button>
						)
					)}
				{!isEmptyObj(segment) && (
					<Segmented
						onChange={value => {
							onSegment(value);
						}}
						options={
							options
								? options
								: [
										{
											label: label1,
											value: label1,
											icon: <BarsOutlined />,
										},
										{
											label: label2,
											value: label2,
											icon: <AppstoreOutlined />,
										},
								  ]
						}
					/>
				)}
			</div>
		</div>
	);
};
TopBar.propTypes = {
	filter: PropTypes.shape({
		onFilter: PropTypes.func,
		select1: PropTypes.array,
		select2: PropTypes.array,
	}),
	buttons: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			onClick: PropTypes.func,
			icon: PropTypes.elementType,
		})
	),
	segment: PropTypes.shape({
		onSegment: PropTypes.func,
		label1: PropTypes.array,
		label2: PropTypes.array,
	}),
	onSearch: PropTypes.func,
};
TopBar.defaultProps = {
	filter: {},
	segment: {},
	buttons: [],
};
export default TopBar;
