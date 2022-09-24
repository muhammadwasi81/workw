import React from 'react';
import { Input } from 'antd';
import "antd/dist/antd.css";
import { AudioOutlined } from '@ant-design/icons';



const { Search } = Input;

const suffix = (
    <AudioOutlined
      style={{
        fontSize: 10,
        color: '#1890ff',
      }}
    />
  );

const SearchBox=()=>{
    const onSearch = (value) => console.log(value);

    return(<>
     <Search
      placeholder="input search text"
      onSearch={onSearch}
      style={{
        width: 300,
      }}
    />
    </>)
}
export default SearchBox;