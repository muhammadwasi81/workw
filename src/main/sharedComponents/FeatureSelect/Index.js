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
import { FeaturesEnum } from "../../../utils/Shared/enums/enums";

function FeatureSelect({ features, form, notIncludeFeature }) {
	const data = [
		{
			name: features.newsFeed,
			featureName: "Feed",
			icon: feedIcon,
			description: "loremipsum",
			id: FeaturesEnum.Feed,
		},
		{
			name: features.schedule,
			featureName: "Schedule",
			icon: schedulesIcon,
			description: "loremipsum",
			id: FeaturesEnum.Schedule,
		},
		{
			name: features.workBoard,
			featureName: "Workboard",
			icon: todoBoard,
			description: "loremipsum",
			id: FeaturesEnum.WorkBoard,
		},
		{
			name: features.document,
			featureName: "Document",
			icon: documentIcon,
			description: "loremipsum",
			id: FeaturesEnum.Document,
		},
		{
			name: features.task,
			featureName: "Task",
			icon: taskIcon,
			description: "loremipsum",
			id: FeaturesEnum.Task,
		},
		{
			name: features.expenses,
			featureName: "Expense",
			icon: expensesIcon,
			description: "loremipsum",
			id: FeaturesEnum.Expense,
		},
		{
			name: features.travel,
			featureName: "Travel",
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
			{data
				.filter(data => data.id !== notIncludeFeature)
				.map(item => {
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
								<Form.Item
									name={item.featureName}
									valuePropName="checked"
								>
									<Switch
										defaultChecked={false}
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
