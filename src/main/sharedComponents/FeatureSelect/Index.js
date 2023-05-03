import { Form, Switch } from "antd";
import "./style.css";
// import { FeaturesEnum } from "../../../utils/Shared/enums/featuresEnums";
import { getFeatureDetails } from "./constant";
import { groupFeatureEnums } from "../../../utils/Shared/enums/groupFeatureEnum";

function Features({ onChange, checked, disabled }) {
  console.log(checked, "checked");
  return (
    <>
      <p className="!mb-[8px]">Features</p>
      {getFeatureDetails({
        allocatedFeatures: groupFeatureEnums.map((feature) => feature.value),
        checked: checked,
        disabled: disabled,
      })
        .filter((itm) => itm.id !== checked.featureId)
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
                    defaultChecked={item.isChecked}
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
