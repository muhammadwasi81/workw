import Input from "antd/lib/input/Input";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleOpenDetail } from "../../store/slice";
import PolicyItem from "./policyItem";
import SearchInput from "../../../../sharedComponents/searchBox/SearchInput";
import { SearchOutlined } from "@ant-design/icons";
import "./style.css";
export default function Listing({ listData, onSearch }) {
  //   const [filter, setFilter] = useState({
  //     filterType: 0,
  //     search: "",
  //   });
  const dispatch = useDispatch();
  const handleClick = (item) => {
    dispatch(handleOpenDetail(item));
  };
  return (
    <>
      <div className="policyHeader colorTheme">Policies</div>

      <div className="searchBox">
        <SearchInput
          icon={<SearchOutlined />}
          placeholder={"Search"}
          size="larger"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="overflow-scroll h-[85vh] w-[400px]">
        {listData.length !== 0 &&
          listData?.map((item) => (
            <PolicyItem item={item} handleClick={handleClick} />
          ))}
      </div>
    </>
  );
}
