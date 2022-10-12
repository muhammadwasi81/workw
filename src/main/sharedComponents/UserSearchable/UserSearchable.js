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
    setOptions([...options.filter((option) => !e.includes(option.id))]);
    const selectedItem = data.filter((option) => e.includes(option.id));
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
        placeholder={props.placeholder}
        optionLabelProp="label"
      >
        {options?.map((res, i) => (
          <Option key={i} value={res.id} label={res.name}>
            <ShortProfile
              name={res.name}
              jobTitle={res.jobTitle}
              userIcon={res.image}
            />
          </Option>
        ))}
      </Select>
    </>
  );
};

export default UserSearchable;
