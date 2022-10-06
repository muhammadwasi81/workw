import React from "react";
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { getAllChats, searchConversation } from "../../store/actions";

const ConversationListSearch = () => {
  const dispatch = useDispatch();
  const handleSearch = (event) => {
    let { value } = event.target;
    if (value.length > 0)
      dispatch(searchConversation({ search: value, pageNo: 1 }))
    else
      dispatch(getAllChats())
  }
  return (
    <div className="ConversationListSearch">
      <div>
        <SearchOutlined className="text-[15px]" />
        <input placeholder="Search" onChange={handleSearch} />
      </div>
    </div>
  );
};
export default ConversationListSearch;
