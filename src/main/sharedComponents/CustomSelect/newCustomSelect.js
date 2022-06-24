import { Select } from "antd";
import React, { useState } from "react";
import useSearch from "./useSearch";
import PropTypes from "prop-types";
//import * as S from "../Styles/employee.style";
const { Option } = Select;

function NewCustomSelect(props) {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const { data, loading, error, responseData } = useSearch(query, pageNumber, props.endPoint, props.requestType);

  function handleSearch(e) {
    // console.log("handle search", e);
    setQuery(e);
    setPageNumber(0);
  }
  const onPopupScroll = (event) => {
    let target = event.target;
    if (!loading && Math.ceil(target.scrollTop + target.offsetHeight) === target.scrollHeight) {
      if (responseData.data.length > 0) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    }
  };
  const img = (data) => {
    // console.log("data", data);
    if (data.hasOwnProperty("image")) {
      return (
        <img
          className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
          src={
            data.image.length > 0
              ? data.image
              : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
          }
        />
      );
    }
  };

  return (
    <Select
      // open={}
      notFoundContent={<></>}
      status={props.status}
      mode={props.mode}
      onSearch={handleSearch}
      loading={loading}
      onPopupScroll={onPopupScroll}
      optionFilterProp="children"
      onBlur={props.onBlur}
      // onSelect={val => {
      // 	console.log("selected value", val);
      // }}
      onChange={props.onChange}
      onClear={props.onClear}
      onClick={props.onClick}
      onFocus={props.onFocus}
      className="newCustomSelect w-full"
      id={props.id}
      allowClear={props.allowClear}
      clearIcon={props.clearIcon}
      defaultValue={props.defaultValue}
      autoFocus={props.autoFocus}
      bordered={props.bordered}
      autoClearSearchValue={props.autoClearSearchValue}
      disabled={props.disabled}
      key={props.key}
      value={props.value}
      showAction={props.showAction}
      showArrow={props.showArrow}
      showSearch={props.showSearch}
      getPopupContainer={(trigger) => trigger.parentNode}
      size={props.size}
      placeholder={props.placeholder}
      placement={props.placement}
      removeIcon={props.removeIcon}
      searchValue={props.searchValue}
      onDropdownVisibleChange={props.onDropdownVisibleChange}
      dropdownRender={(ReactNode, props) => {
        return (
          <>
            {ReactNode}
            <div
              className=""
              style={{
                paddingLeft: "10px",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
              }}>
              {loading && "Loading..."}
            </div>
            <div
              style={{
                paddingLeft: "10px",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
              }}>
              {error && "Error"}
            </div>
          </>
        );
      }}
      filterOption={(input, option) => option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}
      filterSort={(optionA, optionB) => optionA.children.toString().toLowerCase().localeCompare(optionB.children.toString().toLowerCase())}>
      {/* {loadedData} */}

      {data &&
        data.length > 0 &&
        data.map((data, index) => (
          <>
            <Option key={index} value={props.valueObject ? JSON.stringify(data) : data.id}>
              {/* {img(data)} */}
              {data.name}
            </Option>
          </>
        ))}
    </Select>
  );
}

export default React.memo(NewCustomSelect);

NewCustomSelect.propTypes = {
  onSelect: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string,
  allowClear: PropTypes.bool,
  clearIcon: PropTypes.node,
  defaultValue: PropTypes.any,
  autoFocus: PropTypes.bool,
  bordered: PropTypes.bool,
  autoClearSearchValue: PropTypes.bool,
  disabled: PropTypes.bool,
  key: PropTypes.string,
  value: PropTypes.string,
  showArrow: PropTypes.bool,
  showSearch: PropTypes.bool,
  size: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  optionFilterProp: PropTypes.string,
  optionLabelProp: PropTypes.string,
  options: PropTypes.any,
  mode: PropTypes.string,
  placement: PropTypes.string,
  removeIcon: PropTypes.node,
  searchValue: PropTypes.string,
  onPopupScroll: PropTypes.func,
  onDropdownVisibleChange: PropTypes.func,
  onSearch: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  direction: PropTypes.any,
  rules: PropTypes.arrayOf(PropTypes.object).isRequired,
  endPoint: PropTypes.string.isRequired,
  requestType: PropTypes.string.isRequired,
  onSearch: PropTypes.func,
  size: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string,
  valueObject: PropTypes.bool,
};
NewCustomSelect.defaultProps = {
  status: "",
  valueObject: false,
  size: "large",
  rules: [{ required: true }],
  onChange: undefined,
  mode: "",
  showImage: false,
};
