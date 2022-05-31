import React, { useEffect, useState } from "react";
import { Select as Selectbox } from "antd";
import "./style.css";
export default function Select({
  placeholder,
  name,
  data,
  className,
  onBlur,
  onFocus,
  onChange,
  style,
  size,
  reset,
  defaultValue,
  showSearch,
  onSearch,
  status,
}) {
  const { Option } = Selectbox;
  const [state, setstate] = useState(null);
  function handleChange(value, a) {
    setstate(a.children);
    onChange(value);
  }

  useEffect(() => {
    if (reset) {
      setstate(null);
    }
  }, [reset]);

  // function onBlur() {

  // }

  // function onFocus() {

  // }

  const handleFilterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  const handleFilterSort = (optionA, optionB) => {
    return optionA.children
      .toLowerCase()
      .localeCompare(optionB.children.toLowerCase());
  };

  return (
    <Selectbox
      getPopupContainer={(trigger) => trigger.parentNode}
      size={size}
      status={status}
      showSearch={showSearch}
      style={{ ...style }}
      placeholder={placeholder}
      value={state || defaultValue}
      defaultValue={defaultValue}
      // optionFilterProp="children"
      className={className}
      // onChange={handleChange}
      onSelect={handleChange}
      // onFocus={onFocus}
      // onBlur={onBlur}
      onSearch={onSearch}
      name={name}
      filterOption={handleFilterOption}
      filterSort={handleFilterSort}
    >
      {data && data.map(({ id, name }) => <Option value={id}>{name}</Option>)}
    </Selectbox>
  );
}
