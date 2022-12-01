import React, { useContext } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getAllChats, searchConversation } from "../../store/actions";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { messengerDictionaryList } from "../../localization";

const ConversationListSearch = () => {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { messengerDictionary } = messengerDictionaryList[userLanguage];
  const handleSearch = (event) => {
    let { value } = event.target;
    if (value.length > 0)
      dispatch(searchConversation({ search: value, pageNo: 1 }));
    else dispatch(getAllChats());
  };
  return (
    <div className="ConversationListSearch">
      <div>
        <SearchOutlined className="text-[15px]" />
        <input
          placeholder={messengerDictionary.search}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};
export default ConversationListSearch;
