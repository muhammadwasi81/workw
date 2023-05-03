import React, { useContext, useState } from "react";
import { listitem } from "../utils/listitem";
import { Link, Item, List, AdminList as AList } from "../styles/admin.style";
import { useMediaQuery } from "react-responsive";
import { Tooltip } from "antd";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { searchDictionaryList } from "../utils/localization/index";
import "../../administration/styles/adminstration.css";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector ,useDispatch} from "react-redux";
import { useNavigate , useSearchParams} from "react-router-dom";
import '../styles/style.css'

import { globalSearch } from "../../../features/search/store/actions";
import { handleTab } from "../store/slice";
const MenuList = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { globalSearch1 } = searchDictionaryList[userLanguage];
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { keyword , tab } = useSelector((state) => state.globalSearchSlice);
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultValue = searchParams.get("q");

  function onKeyUp(e) {
    e.preventDefault();
    e.stopPropagation();
    let value = e.target.value
    console.log(value,"value")
    if (e.keyCode === 13 && !e.shiftKey) {
      dispatch(
        globalSearch({
          pageNo: 1,
          pageSize: 20,
          search: value,
          filterType: 0,
        })
      );
      navigate(`?q=${value}`);
      dispatch(handleTab("All"))
    }
  }
  return (
    <>
      <List className="Adminlist" style={{ height: "inherit"}}>
        <AList className="admin_list">
          <div className="searchBox" style={{height:"30px" , marginBottom:"5px"}}>
          <SearchOutlined/>
          <input
            defaultValue={defaultValue}
            type="text"
            className="globalSearchInput"
            onKeyUp={(e) => onKeyUp(e)}
          />
          </div>
          {listitem?.map(({ displayName, to, IconName }) => (
            <Item key={displayName}
              onClick={()=>{dispatch(handleTab(displayName))}}>
              <Tooltip
                title={isTabletOrMobile && displayName}
                placement="top"
                color="cyan">
                <a className={tab == displayName ? "forNavBar active" : "forNavBar"}>
                  <div className="iconValue">
                  <img src={IconName} alt="#" /></div>
                  {!isTabletOrMobile && globalSearch1[displayName]}
                </a>
              </Tooltip>
            </Item>
          ))}
        </AList>
      </List>
    </>
  );
};
export default MenuList;
