import React from "react";
import {Form, Mentions} from "antd";
import {useSelector} from "react-redux";
import store from "../../../../store/store";
import {feedSlice} from "../store/slice";

const PostTitleField = () => {
    const feedTitle = useSelector(({feedSlice}) => feedSlice.feedCompose.feedTitle);
    const feedMentions = useSelector(({feedSlice}) => feedSlice.feedMentionOptions);
    return (
        <>
            <Form.Item name={"postDetail"}>
                <Form.Item>
                    <Mentions
                        rows={4}
                        placeholder="What's on your mind"
                        onChange={value => {
                            store.dispatch(feedSlice.actions.onFeedTitleTextChange({value}));
                        }}
                        value={feedTitle}
                        onSelect={(e) => {
                            store.dispatch(feedSlice.actions.onFeedAddMention({...e}));
                        }}
                    >
                        {feedMentions.map(({id, text}) => (
                            <Mentions.Option key={id} value={text}>{text}</Mentions.Option>
                        ))}
                    </Mentions>
                </Form.Item>
            </Form.Item>
        </>
    );
};

export default PostTitleField;
