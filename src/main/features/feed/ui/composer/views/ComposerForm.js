import React from "react";
import {Form} from "antd";
import {useDispatch} from "react-redux";
import PostTitleField from "./PostTitleField";
import PostTagField from "./PostTagField";
import PostPrivacyOptions from "./PostPrivacyOptions";
import PostPreviewAttachments from "./PostPreviewAttachments";
import PostPollOptions from "./PostPollOptions";
import PostOptions from "./PostOptions";
import {onFeedCreateSubmitAction} from "../../../store/actions";

export default function ComposerForm() {
    const dispatch = useDispatch()
    const [formRef] = Form.useForm();

    return (
        <Form form={formRef}>
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
