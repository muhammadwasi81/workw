import React, { useEffect } from "react";
import { Form, Select, Skeleton, Space } from "antd";
import { useState } from "react";
import "./antdCustomSelect.css";
import { useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";

const { Option } = Select;

function AntCustomSelect(props) {
  const [pgNo, setPgNo] = useState(0);

  const {
    loading,
    data,
    onChange,
    // onData,
    onSearch,
    onSelect,
    paginationHandler,
    debouncedSearch,
    apiData,
    mode,
    placeholder,
    size,
    filterOption,
    tagRender,
    isEmailSelect,
    value = [],
    valueWithColors = [],
    defaultData = [],
    optionComponent,
    isLoaded,
    label = "",
    name = "",
    showSearch = false,
    colors = false,

    rules = [],
    formItem = true,
    className = "",
    isIncludedMyId,
  } = props;

  // console.log(optionComponent, "option");
  useEffect(() => {
    setPgNo(0);
  }, [debouncedSearch]);
  const userId = useSelector((state) => state.userSlice.user.id);
  // handle pagination inside this component
  const onPopupScroll = (event) => {
    let target = event.target;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      if (apiData.length > 0) {
        setPgNo(pgNo + 1);
      }
    }
  };
  useEffect(() => {
    if (pgNo !== 0) {
      paginationHandler(pgNo);
    }
  }, [pgNo]);

  const handleRemove = (removedValue) => {
    const updatedValues = value.filter((val) => val !== removedValue);

    onChange(updatedValues); // Update the selected values
  };

  const tagColorRender = (props) => {
    let color;
    if (!colors) {
      color = valueWithColors.find((member) => member.id === props.value)
        ?.color;
    }
    return (
      <div
        className="ant-select-selection-item"
        style={{
          border: color ? `1px solid ${color}` : "none",
        }}
      >
        {props.label}
        <span
          className="ant-select-selection-item-remove"
          onClick={() => handleRemove(props.value)}
        >
          <CloseOutlined className="text-[12px] text-[#999] ml-1 hover:text-[#777] w-[1em] h-[1em]" />
        </span>
      </div>
    );
  };
  return (
    <>
      {!formItem ? (
        <Select
          {...props}
          className="w-full antd_custom_select"
          mode={mode}
          size={size}
          showSearch={true}
          placeholder={placeholder}
          tagRender={colors ? tagRender : tagColorRender}
          value={value}
          loading={loading}
          onPopupScroll={onPopupScroll}
          onSelect={onSelect}
          onChange={onChange}
          // onData={onData}
          onSearch={onSearch}
          filterOption={filterOption}
          getPopupContainer={(trigger) => trigger.parentNode}
          // maxTagCount="responsive"
        >
          {isLoaded && !loading ? (
            data &&
            data.length > 0 &&
            data.map(
              (opt, index) =>
                userId !== opt.id && (
                  <Option
                    key={index}
                    value={isEmailSelect ? opt.email : opt.id}
                    disabled={defaultData.includes(opt.id)}
                    className="hover:!bg-primary-color hover:!text-white"
                  >
                    <div className="flex gap-1 items-center">
                      {optionComponent ? optionComponent(opt) : opt.name}
                    </div>
                  </Option>
                )
            )
          ) : (
            <Option className="SelectOptionSkeleton">
              <Space className="pointer-events-none">
                <Skeleton.Avatar active={true} />
                <Skeleton.Input active={true} block />
              </Space>
            </Option>
          )}
        </Select>
      ) : (
        <Form.Item
          label={label}
          name={name}
          // showSearch={showSearch}
          rules={rules}
          className={className}
        >
          <Select
            className="w-full antd_custom_select"
            mode={mode}
            size={size}
            // showSearch={true}
            showSearch={true}
            placeholder={placeholder}
            tagRender={tagRender}
            value={value}
            loading={loading}
            onPopupScroll={onPopupScroll}
            onSelect={onSelect}
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            getPopupContainer={(trigger) => trigger.parentNode}
            // maxTagCount="responsive"
          >
            {isLoaded && !loading ? (
              data &&
              data.length > 0 &&
              data.map((opt, index) =>
                isIncludedMyId ? (
                  <Option
                    key={index}
                    value={isEmailSelect ? opt.email : opt.id}
                    disabled={defaultData.includes(opt.id)}
                    className="hover:!bg-primary-color hover:!text-white"
                  >
                    <div className="flex gap-1 items-center">
                      {optionComponent ? optionComponent(opt) : opt.name}
                    </div>
                  </Option>
                ) : (
                  <>
                    {userId !== opt.id && (
                      <Option
                        key={index}
                        value={isEmailSelect ? opt.email : opt.id}
                        disabled={defaultData.includes(opt.id)}
                        className="hover:!bg-primary-color hover:!text-white"
                      >
                        <div className="flex gap-1 items-center">
                          {optionComponent ? optionComponent(opt) : opt.name}
                        </div>
                      </Option>
                    )}
                  </>
                )
              )
            ) : (
              <Option className="SelectOptionSkeleton">
                <Space className="pointer-events-none">
                  <Skeleton.Avatar active={true} />
                  <Skeleton.Input active={true} block />
                </Space>
              </Option>
            )}
          </Select>
        </Form.Item>
      )}
    </>
  );
}

export default AntCustomSelect;
