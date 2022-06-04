import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Cascader } from "antd";
import { Select } from "antd";
import React, { useState } from "react";
// import SuggestionBox from "../searchSelect/SuggestionBox";
import * as S from "./SelectCascader.style.js";
import { BiSearchAlt } from "react-icons/bi";
const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
	children.push(
		<Option key={i.toString(36) + i}>
			<Avatar />
			{i.toString(36) + i}
		</Option>
	);
}

const options = [
	{
		value: "user",
		label: "User",
		children: [
			{
				value: "hangzhou",
				label: "Hangzhou",
			},
			{
				value: "asd",
				label: "asd",
			},
			{
				value: "vv",
				label: "vv",
			},
		],
	},
	{
		value: "Department",
		label: "Department",
		children: [
			{
				value: "nanjing",
				label: "Nanjing",
			},
			{
				value: "saleem",
				label: "saleem",
			},
		],
	},
];
const data = [
	{
		value: "4",
		type: "user",

		label: "tuntun",
	},
	{
		value: "5",
		type: "user",
		label: "amali",
	},
	{
		value: "6",
		type: "user",
		label: "husnain",
	},
];

const defaults = [
	{
		value: "7",
		type: "admin",
		label: "#000",
	},
	{
		value: "1",
		type: "admin",
		label: "#f00",
	},
	{
		value: "2",
		type: "admin",

		label: "#0f0",
	},
	{
		value: "3",
		type: "admin",
		label: "#00f",
	},
];
const SelectCascader = () => {
	const [dataValue, setDataValue] = useState({});
	const onChange = e => {
		console.log(e);
	};

	const casChangeHadnler = (value, selectedOptions) => {
		console.log("Selected", selectedOptions);
		console.log("value", value);
		const User = selectedOptions
			.map(item => {
				if (item[0].label === "User") {
					if (item.length === 1) {
						return item[0].children;
					}
					return item[1];
				}
			})
			.filter(items => items !== undefined);
		console.log("user", User);
	};
	function filter(inputValue, path) {
		return path.some(
			option =>
				option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >
				-1
		);
	}
	return (
		<S.Container>
			<Cascader
				onChange={(value, selectedOptions) =>
					casChangeHadnler(value, selectedOptions)
				}
				style={{ width: 233 }}
				options={options}
				allowClear={false}
				placement="bottomRight"
				multiple
				maxTagCount="responsive"
			>
				<S.CustomSearch>
					<BiSearchAlt size={25} color="#978e8e" />
				</S.CustomSearch>
			</Cascader>
			{/* <SuggestionBox
        custom={true}
        avatar={true}
        defaults={defaults}
        value={dataValue}
        data={data}
        onChange={onChange}
      /> */}
			{/* <Select
        size={"small"}
        mode="tags"
        size={"large"}
        placeholder="Please select"
        defaultValue={["a10", "c12"]}
        onChange={onChange}
        style={{ width: "100%" }}
      >
        {children}
      </Select> */}
		</S.Container>
	);
};

export default SelectCascader;
