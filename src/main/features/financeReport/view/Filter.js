import { DatePicker, Select } from "antd";
import { Option } from "antd/lib/mentions";
import moment from "moment";
import React, { useEffect, useState } from "react";

const ReportReport = ({handleChange}) => {
	const { Option } = Select;
	useEffect(()=>{
		handleChange(filter)
	}, [])
	const [filter , setFilter] = useState({
		search: "",
		startDate: moment().subtract(1, 'days'),
		endDate: moment(),
		accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
		balanceBroughtForward: true
	});
	return (
		<div className="reportFilter">
			<Select
				showSearch
				optionFilterProp="children"
				onChange={() => { }}
				style={{ width: "200px", margin: "5px" }}
				placeholder="Select Account"
				filterOption={(input, option) =>
					option.children.toLowerCase().includes(input.toLowerCase())
				}
			>
				{[].map(item => (
					<Option value={item.value}>{item.label}</Option>
				))}
			</Select>

			<DatePicker
              value={filter.startDate}
              onChange={(value) => setForm({ ...filter, startDate: value })}
			//   defaultValue={moment(-1)}
            />
			<DatePicker
              value={filter.endDate}
              onChange={(value) => setForm({ ...filter, endDate: value })}
			//   defaultValue={moment()}
            />


		</div>
	);
};
export default ReportReport;
