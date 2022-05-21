import React from "react";
import {Form, Mentions} from "antd";
import {useSelector} from "react-redux";
import store from "../../../../../store/store";
import {feedSlice} from "../../store/slice";
import {PostType} from "../../utils/constants";

const PostTitleField = () => {
    const {type, title, pollTitle} = useSelector(({feedSlice}) => feedSlice.postCompose);
    const feedMentions = useSelector(({feedSlice}) => feedSlice.feedMentionOptions);
    return (
        <Form.Item name={"postDetail"}>
            <Form.Item>
                <Mentions
                    rows={4}
                    placeholder={PostType.getTitlePlaceHolder(type)}
                    onChange={value => {
                        store.dispatch(feedSlice.actions.onPostTitleTextChange({value}));
                    }}
                    value={PostType.isPollType(type) ? pollTitle : title}
                    onSelect={(e) => {
                        store.dispatch(feedSlice.actions.onPostMention({...e}));
                    }}
                >
                    {feedMentions.map(({id, text}) => (
                        <Mentions.Option key={id} value={text}>{text}</Mentions.Option>
                    ))}
                </Mentions>
            </Form.Item>
        </Form.Item>
    );
};

export default PostTitleField;
