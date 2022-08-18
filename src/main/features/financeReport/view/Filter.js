import { Button, DatePicker, Select } from "antd";
import { Option } from "antd/lib/mentions";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllChartOfAccount } from "../../chartOfAccount/store/actions";

const ReportReport = ({ handleChange }) => {
	const { Option } = Select;
	const dispatch = useDispatch();
	const allAccounts = useSelector(state => state.chartOfAccountsSlice.listData);
	useEffect(() => {
		dispatch(getAllChartOfAccount())
	}, [])
	const [filter, setFilter] = useState({
		search: "",
		startDate: moment().subtract(1, 'month'),
		endDate: moment(),
		accountId: null,
		balanceBroughtForward: true
	});
	return (
		<div className="reportFilter">
			<Select
				showSearch
				optionFilterProp="children"
				onChange={(value) => {
					setFilter({
						...filter,
						accountId: value
					});
					}}
				style={{ width: "200px", margin: "5px" }}
				placeholder="Select Account"
				filterOption={(input, option) =>
					option.children.toLowerCase().includes(input.toLowerCase())
				}
			>
				{allAccounts.map((item) => <Option value={item.id}>{item.name}</Option>)}
			</Select>

			<DatePicker
				value={filter.startDate}
				onChange={(value) => {
					setFilter({ ...filter, startDate: value })
				}}
				className="!ml-2"
			//   defaultValue={moment(-1)}
			/>
			<DatePicker
				value={filter.endDate}
				onChange={(value) => setFilter({ ...filter, endDate: value })}
				className="!ml-2"
			//   defaultValue={moment()}
			/>
			
			<Button className="ThemeBtn ml-2" onClick={()=>handleChange(filter)}>
				Generate Report
			</Button>

		</div>
	);
};
export default ReportReport;
