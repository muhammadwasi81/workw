import { Select } from "antd";
import React, { useEffect, useState } from "react";
import ShortProfile from "../ShortProfile/ShortProfile";

const UserSearchable = (props) => {
  const { onChange, data } = props;
  const [handleDropdown, setHandleDropdown] = useState([]);
  const [options, setOptions] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    setOptions(data);
  }, []);

  const handleChange = (e) => {
    setOptions([...options.filter((option) => !e.includes(option.name))]);
    const selectedItem = data.filter((option) => e.includes(option.name));
    onChange(selectedItem);
  };

  return (
    <>
      <Select
        onSelect={() => setHandleDropdown("")}
        open={handleDropdown.length > 0 ? true : false}
        onSearch={(e) => setHandleDropdown(e)}
        getPopupContainer={(trigger) => trigger.parentNode}
        notFoundContent={false}
        onDeselect={(e) => {
          setOptions([...options, ...data.filter((item) => item.name === e)]);
        }}
        onChange={handleChange}
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Write name"
        optionLabelProp="label">
        {options?.map((res, i) => (
          <Option key={i} value={res.name} label={res.name}>
            <ShortProfile
              name={res.name}
              jobTitle={res.jobTitle}
              userIcon={
                "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
              }
            />
          </Option>
        ))}
      </Select>
    </>
  );
};

export default UserSearchable;
