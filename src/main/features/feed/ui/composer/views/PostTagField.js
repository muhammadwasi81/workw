import React, { useContext } from "react";
import { Form } from "antd";
import { useSelector } from "react-redux";
import store from "../../../../../../store/store";
import { feedSlice } from "../../../store/slice";
import UserSearchable from "../../../../../sharedComponents/UserSearchable/UserSearchable";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { FeedDictionary } from "../../../localization";

const PostTagField = () => {
  const feedTags = useSelector(({ feedSlice }) => feedSlice.tagsOptions);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { composer } = FeedDictionary[userLanguage];
  const { WriteYourName, Write } = composer;
  const options = feedTags.map(({ id, name, designation, image }) => ({
    id,
    name,
    id,
    image,
    jobTitle: designation,
  }));
  return (
    <div className="select-users">
      <div className="badge">{Write}</div>
      <Form.Item name={"tagUsers"} className="c-multi-select">
        <UserSearchable
          placeholder={WriteYourName}
          data={options}
          onChange={(e) => {
            store.dispatch(feedSlice.actions.onPostTagsChange(e));
          }}
        />
      </Form.Item>
    </div>
  );
};

export default PostTagField;
