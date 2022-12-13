import React, { useContext, useState } from "react";

import { listitem } from "../util/listitem";
import { Link, Item, List, AdminList as AList } from "../styles/admin.style.js";
import { useMediaQuery } from "react-responsive";
import { Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import SearchInput from "../../../sharedComponents/searchBox/SearchInput";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
const AdminList = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration } = dictionaryList[userLanguage];
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [searchInput, setSearchInput] = useState("");

  const searchHandler = (e) => {
    const searchValue = e.target.value;
    setSearchInput(searchValue);
  };
  const filteredData = listitem.filter((list) => {
    if (searchInput === "") {
      return list;
    } else {
      return Object.values(list)
        .join(" ")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    }
  });
  return (
    <>
      <List>
        <div className="searchBox">
          <SearchInput
            icon={<SearchOutlined />}
            placeholder={"Search"}
            size="larger"
            onChange={searchHandler}
          />
        </div>
        <AList className="admin_list">
          {filteredData.map(({ displayName, to, IconName }) => (
            <Item key={displayName}>
              <Tooltip
                title={isTabletOrMobile && displayName}
                placement="top"
                color="cyan"
              >
                <Link to={to}>
                  {IconName}
                  {!isTabletOrMobile && administration[displayName]}
                </Link>
              </Tooltip>
            </Item>
          ))}
        </AList>
      </List>
    </>
  );
};

export default AdminList;
