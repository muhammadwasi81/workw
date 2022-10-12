import { Button, DatePicker, Input, Select } from "antd";
import { Option } from "antd/lib/mentions";
import moment from "moment";
import React, { useEffect, useState } from "react";

const ReportReport = ({ handleChange }) => {
	const { Option } = Select;
	const [filter, setFilter] = useState({
		search: "",
		startDate: moment().subtract(1, 'month'),
		endDate: moment(),
		voucherTypes: []
	});
	useEffect(()=>{
		handleChange(filter)
	}, [])
	return (
		<div className="reportFilter w-full flex">
			<Input
			value={filter.search}
			onChange={(e) => {
				setFilter({ ...filter, search: e.target.value })
			}}
			className="!w-max"
			placeholder="Search" />

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

			<Button className="ThemeBtn ml-2" onClick={() => handleChange(filter)}>
				Filter
			</Button>

		</div>
	);
};
export default ReportReport;
