import React, { useContext, useEffect } from "react";
import { Form } from "antd";
import { useDispatch } from "react-redux";
import PostTitleField from "./PostTitleField";
import PostTagField from "./PostTagField";
import PostPrivacyOptions from "./PostPrivacyOptions";
import PostPreviewAttachments from "./PostPreviewAttachments";
import PostPollOptions from "./PostPollOptions";
import PostOptions from "./PostOptions";
import { getAllUser, onFeedCreateSubmitAction } from "../../../store/actions";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { FeedDictionary } from "../../../localization";

export default function ComposerForm({ referenceType, referenceId }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { composer } = FeedDictionary[userLanguage];
  const { Post } = composer;
  const dispatch = useDispatch();
  const [formRef] = Form.useForm();
  useEffect(() => {
    dispatch(getAllUser({ search: "", pageNo: 1, pageSize: 20 }));
  }, []);

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
            dispatch(onFeedCreateSubmitAction({ referenceType, referenceId }));
          }}
        >
          {Post}
        </button>
      </div>
    </Form>
  );
}
