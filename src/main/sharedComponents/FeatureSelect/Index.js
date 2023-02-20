import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import {
  addProjectFeatureAction,
  removeProjectFeatureAction,
} from "../../features/projects/store/actions";
import { useParams } from "react-router-dom";

function FeatureSelect({ features, form, notIncludeFeature, onChange }) {
  // const [isChecked, setIsChecked] = useState(false);
  console.log(features, "features selecttt");
  const data = [
    {
      name: features.newsFeed,
      featureName: "Feed",
      icon: feedIcon,
      description:
        "A board for the project/group to update and have open conversations",
      id: FeaturesEnum.FEATURES_TYPE.Feed,
    },
    {
      name: features.schedule,
      featureName: "Schedule",
      icon: schedulesIcon,
      description: "Schedule to manage timelines for the project/group",
      id: FeaturesEnum.FEATURES_TYPE.Schedule,
    },
    {
      name: features.workBoard,
      featureName: "Workboard",
      icon: todoBoard,
      description: "A Kanban methodology board to manage tasks",
      id: FeaturesEnum.FEATURES_TYPE.WorkBoard,
    },
    {
      name: features.document,
      featureName: "Document",
      icon: documentIcon,
      description: "Project/Group based documents",
      id: FeaturesEnum.FEATURES_TYPE.Document,
    },
    {
      name: features.task,
      featureName: "Task",
      icon: taskIcon,
      description: "Key tasks and milestones for a Project/Group",
      id: FeaturesEnum.FEATURES_TYPE.Task,
    },
    {
      name: features.expenses,
      featureName: "Expense",
      icon: expensesIcon,
      description: "Expense management for the project/group",
      id: FeaturesEnum.FEATURES_TYPE.Expense,
    },
    {
      name: features.travel,
      featureName: "Travel",
      icon: travelIcon,
      description: "Management Group/Project Travel requirements",
      id: FeaturesEnum.FEATURES_TYPE.Travel,
    },
  ];

  console.log(features, "FEATURES");
  console.log(data, "DATA ");

  const handleChange = (checked) => {
    onChange(checked);
  };

  // const onChange = (id, checked) => {
  //   if (checked) {
  //     form.setFieldsValue({
  //       features: [...form.getFieldValue("features"), { featureId: id }],
  //     });
  //     const payload = {
  //       featureId: id,
  //       projectId: projectId,
  //     };
  //     // setFeature(payload);
  //     dispatch(addProjectFeatureAction([payload]));
  //   } else {
  //     let featureValue = form.getFieldValue("features");
  //     featureValue = featureValue.filter((filter) => filter.featureId !== id);
  //     form.setFieldsValue({
  //       features: [...featureValue],
  //     });
  //     dispatch(
  //       removeProjectFeatureAction({
  //         featureId: id,
  //         id: projectId,
  //       })
  //     );
  //   }
  // };
  return (
    <>
      <p className="!mb-[8px]">Features</p>
      {data
        .filter((data) => data.id !== notIncludeFeature)
        .map((item) => {
          return (
            <div className="FeatureSelect flex justify-between bg-[#f4f4f4] mb-2">
              <div>
                <div className="flex">
                  <div className="imageBox border-r border-r-[#b3bed5]">
                    <img
                      src={item.icon}
                      className="h-[34px] w-[34px]"
                      alt="icon"
                    />
                  </div>
                  <div>
                    <h4>{item.name}</h4>
                    <p className="text-slate-500">{item.description}</p>
                  </div>
                </div>
              </div>
              <div className="radioBtn">
                <Form.Item name={item.featureName} valuePropName="checked">
                  <Switch
                    defaultChecked={[features]?.some(
                      (feature) => feature.featureId === item.id
                    )}
                    onChange={(checked) => {
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
