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
import { useSelector ,useDispatch} from "react-redux";
// import { useSelector,  } from "react-redux";
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
  const [searchInput, setSearchInput] = useState("");
  const { keyword , tab } = useSelector((state) => state.globalSearchSlice);
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultValue = searchParams.get("q");

  const searchHandler = (e) => {
    const searchValue = e.target.value;
    setSearchInput(searchValue);
  };
  function onKeyUp(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("somethig",e.target.value)
    // setKeyword(e.target.value);
    let value = e.target.value
    console.log(value,"value")
    if (e.keyCode === 13 && !e.shiftKey) {
      // setIsSearch();
      dispatch(
        globalSearch({
          pageNo: 1,
          pageSize: 20,
          search: value,
          filterType: 0,
        })
      );
      // dispatch(handleGlobalSearch());
      navigate(`?q=${value}`);
      // setIsSearch(false);
      // e.target.value = "";
    }
  }
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
      <List className="Adminlist" style={{ height: "inherit" , position:"sticky"}}>
        <AList className="admin_list">
          <div className="searchBox" style={{height:"30px" , marginBottom:"5px"}}>
          <SearchOutlined/>
          <input
            defaultValue={defaultValue}
            type="text"
            className="globalSearchInput"
            onKeyUp={(e) => onKeyUp(e)}
          />
          {/* <input 
            type="text"
            className={"globalSearchInput"}
            onKeyUp={(e) => onKeyUp(e)}
          />
            <SearchInput
              icon={<SearchOutlined />}
              placeholder={"Search"}
              size="larger"
              // onChange={searchHandler}
              onKeyUp={(e) => onKeyUp(e)}
              // value={keyword}
            /> */}
          </div>
          {listitem?.map(({ displayName, to, IconName }) => (
            <Item key={displayName}
            // style={{ background: tab === displayName ? '#365899' : ''  }} 
            onClick={()=>{dispatch(handleTab(displayName))}}
            >
              <Tooltip
                title={isTabletOrMobile && displayName}
                placement="top"
                color="cyan"
              >
                
                  <a className={tab == displayName ? "forNavBar active" : "forNavBar"}>
                  {/* {IconName} */}
                  <div className="iconValue">
                  <img src={IconName} alt="#" /></div>
                  {!isTabletOrMobile && globalSearch1[displayName]}</a>
                
                {/* <Link >
                  
                </Link> */}
              </Tooltip>
            </Item>
          ))}
        </AList>
      </List>
    </>
  );
};
export default MenuList;
