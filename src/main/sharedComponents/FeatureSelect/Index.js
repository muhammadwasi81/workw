import React, { useState } from "react";
import { Form, Switch } from "antd";
import "./style.css";
import { FeaturesEnum } from "../../../utils/Shared/enums/featuresEnums";
import { getFeatureDetails } from "./constant";

function Features({ onChange }) {
  return (
    <>
      <p className="!mb-[8px]">Features</p>
      {getFeatureDetails({
        allocatedFeaures: [
          FeaturesEnum.Feed,
          FeaturesEnum.Task,
          FeaturesEnum.Travel,
          FeaturesEnum.Schedule,
          FeaturesEnum.Workboard,
          FeaturesEnum.Document,
          FeaturesEnum.Expense,
        ],
        checked: [FeaturesEnum.Feed],
        disabled: [FeaturesEnum.Task],
      }).map((item) => {
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
                  defaultChecked={item.isChecked}
                  // defaultChecked={getFeatureDetails({
                  //   allocatedFeaures: [
                  //     FeaturesEnum.Feed,
                  //     FeaturesEnum.Task,
                  //     FeaturesEnum.Travel,
                  //     FeaturesEnum.Schedule,
                  //     FeaturesEnum.Workboard,
                  //     FeaturesEnum.Document,
                  //     FeaturesEnum.Expense,
                  //   ],
                  // })?.some((feature) => feature.featureId === item.id)}
                  onChange={(checked) => {
                    onChange(item.id, checked);
                  }}
                  disabled={item.isDisabled}
                />
              </Form.Item>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Features;
