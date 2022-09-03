import React from "react";
import { Form, Switch } from "antd";
import feedIcon from "../../../content/svg/menu/newNavBarIcon/News Feed.svg";
import schedulesIcon from "../../../content/svg/menu/newNavBarIcon/Schedules.svg";
import todoBoard from "../../../content/svg/menu/newNavBarIcon/Work Board.svg";
import taskIcon from "../../../content/svg/menu/newNavBarIcon/Tasks.svg";
import travelIcon from "../../../content/svg/menu/newNavBarIcon/Travel.svg";
import documentIcon from "../../../content/NewContent/Documents/file/folder.svg";
import expensesIcon from "../../../content/svg/menu/newNavBarIcon/Expenses.svg";

import "./style.css";

function FeatureSelect({ features, form }) {
	const FeaturesEnum = {
		Feed: 1,
		Mailbox: 2,
		Messenger: 3,
		Group: 4,
		Project: 5,
		Task: 6,
		WorkBoard: 7,
		Lead: 8,
		Expense: 9,
		Schedule: 10,
		Travel: 11,
		Document: 12,
		ELearning: 13,
		Asset: 14,
		CustomApproval: 15,
		Employee: 16,
		Administration: 17,
		Appraisal: 18,
		Department: 19,
		Leave: 20,
		Loan: 21,
		Holiday: 22,
		Career: 23,
		AudioCalling: 24,
		VideoCalling: 25,
		Attendance: 27,
		Requisition: 28,
		MileBoard: 29,
		MileGrid: 30,
		MilePad: 31,
		Payroll: 32,
		Rewards: 33,
		Complains: 34,
		Warnings: 35,
		Bonus: 36,
		Promotion: 37,
		OrganizationalChart: 38,
		MyTeam: 39,
		Grade: 40,
	};

	const data = [
		{
			name: features.newsFeed,
			featureName: "newsFeed",
			icon: feedIcon,
			description: "loremipsum",
			isChecked: true,
			id: FeaturesEnum.Feed,
		},
		{
			name: features.schedule,
			featureName: "schedule",
			icon: schedulesIcon,
			description: "loremipsum",
			id: FeaturesEnum.Schedule,
		},
		{
			name: features.workBoard,
			featureName: "workboard",
			icon: todoBoard,
			description: "loremipsum",
			id: FeaturesEnum.WorkBoard,
		},
		{
			name: features.document,
			featureName: "document",
			icon: documentIcon,
			description: "loremipsum",
			id: FeaturesEnum.Document,
		},
		{
			name: features.task,
			featureName: "task",
			icon: taskIcon,
			description: "loremipsum",
			id: FeaturesEnum.Task,
		},
		{
			name: features.expenses,
			featureName: "expenses",
			icon: expensesIcon,
			description: "loremipsum",
			id: FeaturesEnum.Expense,
		},
		{
			name: features.travel,
			featureName: "travel",
			icon: travelIcon,
			description: "loremipsum",
			id: FeaturesEnum.Travel,
		},
	];

	const onChange = (id, checked) => {
		if (checked) {
			form.setFieldsValue({
				features: [
					...form.getFieldValue("features"),
					{ featureId: id },
				],
			});
		} else {
			let featureValue = form.getFieldValue("features");
			featureValue = featureValue.filter(
				filter => filter.featureId !== id
			);
			form.setFieldsValue({
				features: [...featureValue],
			});
		}
	};

	return (
		<>
			<p className="!mb-[8px]">Features</p>
			{data.map(item => {
				return (
					<div className="FeatureSelect flex justify-between bg-[#f4f4f4] mb-2">
						<div>
							<div className="flex">
								<div className="imageBox border-r border-r-[#b3bed5]">
									<img
										src={item.icon}
										className="h-[34px] w-[34px]"
									/>
								</div>
								<div>
									<h4>{item.name}</h4>
									<p className="text-slate-500">
										{item.description}
									</p>
								</div>
							</div>
						</div>
						<div className="radioBtn">
							<Form.Item name={item.featureName}>
								<Switch
									defaultChecked={false}
									checked={item.isChecked}
									onChange={checked => {
										onChange(item.id, checked);
									}}
									disabled={item.id === FeaturesEnum.Feed}
								/>
							</Form.Item>
						</div>
					</div>
				);
			})}
		</>
	);
}

export default FeatureSelect;
