import React, { useRef } from "react";
import { useContext } from "react";
import store from "../../../../../../store/store";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { FeedDictionary } from "../../../localization";
import { feedSlice } from "../../../store/slice";
import { PostType } from "../../../utils/constants";
import photo from "../../../../../../content/NewContent/NewsFeed/svg/post_img_icon.svg";
import doc from "../../../../../../content/NewContent/NewsFeed/svg/post_doc_icon.svg";
import poll from "../../../../../../content/NewContent/NewsFeed/svg/post_poll_icon.svg";

const PostOptions = (props) => {
  const { imageVideoRef, pollRef, docsRef } = props;
  const onPostAttachment = (files) => {
    if (files.length && files[0]) {
      store.dispatch(feedSlice.actions.addPostAttachment({ files: files }));
    }
  };
  const setPostTypeToPoll = () => {
    store.dispatch(feedSlice.actions.onPostTypeChange({ type: PostType.POLL }));
  };
  /**
   * new changes modal work by humayoun, changes in options div added onclick and reference
   * start...
   */
  const setPostTypeToImageVideo = () => {
    store.dispatch(
      feedSlice.actions.onPostTypeChange({ type: PostType.DEFAULT })
    );
  };
  const setPostTypeToDocs = () => {
    store.dispatch(
      feedSlice.actions.onPostTypeChange({ type: PostType.DEFAULT })
    );
  };
  //end
  const { userLanguage } = useContext(LanguageChangeContext);
  const { composer } = FeedDictionary[userLanguage];
  const { Poll, Documents, PhotoVideo } = composer;

  return (
    <div className="uploader">
      <div
        className="options"
        onClick={() => setPostTypeToImageVideo()}
        ref={imageVideoRef}
      >
        <input
          accept=".jpg, .jpeg, .gif, .bmp, .png, .mp4"
          multiple
          type="file"
          value={""}
          ref={imageVideoRef}
          onChange={({ target: { files } }) => {
            onPostAttachment(files);
          }}
        />
        <div className="wrapper">
          <img src={photo} alt="photo" /> <span>{PhotoVideo}</span>
        </div>
      </div>
      <div
        className="options"
        onClick={() => setPostTypeToDocs()}
        ref={docsRef}
      >
        <input
          onChange={({ target: { files } }) => onPostAttachment(files)}
          multiple
          accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
          type="file"
          value={""}
          ref={docsRef}
        />
        <div className="wrapper">
          <img src={doc} alt="doc" /> <span>{Documents}</span>
        </div>
      </div>
      <div
        className="options"
        onClick={() => setPostTypeToPoll()}
        ref={pollRef}
      >
        <div className="wrapper">
          <img src={poll} alt="poll" />
          <span>{Poll}</span>
        </div>
      </div>
    </div>
  );
};

export default PostOptions;
