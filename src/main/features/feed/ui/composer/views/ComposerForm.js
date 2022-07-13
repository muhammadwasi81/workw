import React, { useEffect } from "react";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PostTitleField from "./PostTitleField";
import PostTagField from "./PostTagField";
import PostPrivacyOptions from "./PostPrivacyOptions";
import PostPreviewAttachments from "./PostPreviewAttachments";
import PostPollOptions from "./PostPollOptions";
import PostOptions from "./PostOptions";
import { getAllUser, onFeedCreateSubmitAction } from "../../../store/actions";

export default function ComposerForm() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.feedSlice);
  const [formRef] = Form.useForm();
  useEffect(() => {
    dispatch(getAllUser({ search: "", pageNo: 1, pageSize: 10 }));
  }, []);
  if (loading) return null;
  return (
    <Form form={formRef}>
      <PostTitleField />
      <PostPollOptions />
      <PostPreviewAttachments />
      <PostTagField />
      <PostOptions />
      <div className="submit-wrapper">
        <PostPrivacyOptions />
        <button
          className="post-form"
          type="submit"
          onClick={() => {
            dispatch(onFeedCreateSubmitAction());
          }}
        >
          Post
        </button>
      </div>
    </Form>
  );
}
