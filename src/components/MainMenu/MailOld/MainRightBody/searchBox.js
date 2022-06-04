import React, {useEffect, useState} from 'react';
import mailSearch from "../assests/mailSearch.svg";
import {useDispatch, useSelector} from "react-redux";
import {useMediaQuery} from "react-responsive";
import SearchInput from "../../../SharedComponent/searchBox/SearchInput";
import {refreshMail} from "../Store/Api";
import {useLocation} from "react-router-dom";


const SearchMailBox = () => {
    const dispatch = useDispatch();
    const {responsiveSlice} = useSelector(state => state);
    const {isMobileScreen} = responsiveSlice;
    const isTablet = useMediaQuery({maxWidth: 599});
    const {pathname} = useLocation();
    const api_base = pathname.split("/")[2];
    const [searchInput, setSearchInput] = useState("null");
    const icon = (
        <img src={mailSearch} width={isMobileScreen ? 15 : 18} height={isMobileScreen ? 15 : 18} alt="mailSearch"/>
    );

    let objData = {
        folderPath: api_base,
        pageNo: 1,
        pageSize: 50,
        search: searchInput
    }

    useEffect(() => {
        // dispatch(refreshMail(objData));
    }, [objData.search]);

    const handleSearchEmail = (e) => {
        if(e.target.value.length >= 2){
            setSearchInput(e.target.value)
        }
    }

    return (
        <div className={`mailSearchBox ${isTablet && "mailMobileTabletSearchBox"} 
        ${isMobileScreen && "mailMobileTabletMargin"}`}>
            <SearchInput
                icon={icon}
                placeholder="Search mail"
                style={{backgroundColor: "#f4f4f4", padding: "5px 13px"}}
                onChange={handleSearchEmail}
            />
        </div>
    );

}

export default SearchMailBox;