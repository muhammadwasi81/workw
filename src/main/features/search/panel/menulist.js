import React, { useContext, useState } from "react";
import { listitem } from "../utils/listitem";
import { Link, Item, List, AdminList as AList } from "../styles/admin.style";
import { useMediaQuery } from "react-responsive";
import { Tooltip } from "antd";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { searchDictionaryList } from "../utils/localization/index";
import "../../administration/styles/adminstration.css";
import SearchInput from "../../../sharedComponents/searchBox/SearchInput";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const MenuList = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { globalSearch } = searchDictionaryList[userLanguage];
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [searchInput, setSearchInput] = useState("");
  const { keyword } = useSelector((state) => state.globalSearchSlice);

  const searchHandler = (e) => {
    const searchValue = e.target.value;
    setSearchInput(searchValue);
  };
  // const filteredData = listitem.filter((list) => {
  //   if (searchInput === "") {
  //     return list;
  //   } else {
  //     return Object.values(list)
  //       .join(" ")
  //       .toLowerCase()
  //       .includes(searchInput.toLowerCase());
  //   }
  // });
  return (
    <>
      <List className="Adminlist" style={{ height: "inherit" }}>
        <AList className="admin_list">
          <div className="searchBox">
            <SearchInput
              icon={<SearchOutlined />}
              placeholder={"Search"}
              size="larger"
              // onChange={searchHandler}
              value={keyword}
            />
          </div>
          {listitem?.map(({ displayName, to, IconName }) => (
            <Item key={displayName}>
              <Tooltip
                title={isTabletOrMobile && displayName}
                placement="top"
                color="cyan"
              >
                <Link to={to}>
                  {IconName}
                  {!isTabletOrMobile && globalSearch[displayName]}
                </Link>
              </Tooltip>
            </Item>
          ))}
        </AList>
      </List>
    </>
  );
};
export default MenuList;
