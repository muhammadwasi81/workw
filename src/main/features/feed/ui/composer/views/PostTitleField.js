import React from "react";
import { Form } from "antd";
import { useSelector } from "react-redux";
import store from "../../../../../../store/store";
import { feedSlice } from "../../../store/slice";
import { PostType } from "../../../utils/constants";
import CustomMentions from "../../../../../sharedComponents/Mentions";

const PostTitleField = () => {
  const { type, title, pollTitle } = useSelector(
    ({ feedSlice }) => feedSlice.postCompose
  );
  const feedMentions = useSelector(
    ({ feedSlice }) => feedSlice.mentionsOptions
  );
  console.log(feedMentions);
  return (
    <Form.Item name={"postDetail"}>
      <Form.Item>
        <CustomMentions
          onChange={(value) =>
            store.dispatch(feedSlice.actions.onPostTitleTextChange({ value }))
          }
          onSelect={(e) =>
            store.dispatch(feedSlice.actions.onPostMention({ ...e }))
          }
          placeholder={PostType.getTitlePlaceHolder(type)}
          value={PostType.isPollType(type) ? pollTitle : title}
          feedMentions={[]}
        />
      </Form.Item>
    </Form.Item>
  );
};

export default PostTitleField;
