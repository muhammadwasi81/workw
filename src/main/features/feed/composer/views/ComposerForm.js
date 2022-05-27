import React from "react";
import {Form} from "antd";
import {useDispatch} from "react-redux";
import PostTitleField from "./PostTitleField";
import PostTagField from "./PostTagField";
import PostPrivacyOptions from "./PostPrivacyOptions";
import PostPreviewAttachments from "./PostPreviewAttachments";
import PostPollOptions from "./PostPollOptions";
import store from "../../../../../store/store";
import {feedSlice} from "../../store/slice";
import {onFeedCreateSubmitAction} from "../../store/actions";
import {PostType} from "../../utils/constants";
import PostOptions from "./PostOptions";

export default function ComposerForm() {
    const dispatch = useDispatch()
    const [formRef] = Form.useForm();

    const onFinish = (e) => {
        // console.log(e);
        // formRef.resetFields();
    };

    return (
        <Form form={formRef} onFinish={onFinish}>
            <PostTitleField/>
            <PostPollOptions/>
            <PostPreviewAttachments/>
            <PostTagField/>
            <PostOptions/>
            <div className="submit-wrapper">
                <PostPrivacyOptions/>
                <button className="post-form" type="submit" onClick={() => dispatch(onFeedCreateSubmitAction())}>
                    Post
                </button>
            </div>
        </Form>
    );
};
