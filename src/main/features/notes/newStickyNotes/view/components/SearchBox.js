import React from 'react';
import { Input } from 'antd';
import "antd/dist/antd.css";
import {SearchOutlined  } from '@ant-design/icons';
import "../../style.css";






const SearchBox=()=>{
  

    return(<>
        <Input size="default" placeholder="Search" prefix={<SearchOutlined />} className="search_box" 
/>
    </>)
}
export default SearchBox;