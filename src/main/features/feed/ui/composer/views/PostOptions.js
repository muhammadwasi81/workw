import store from "../../../../../../store/store";
import { feedSlice } from "../../../store/slice";
import { PostType } from "../../../utils/constants";

function PostOptions() {
  const onPostAttachment = (files) => {
    if (files.length && files[0]) {
      store.dispatch(feedSlice.actions.addPostAttachment({ files: files }));
    }
  };
  const setPostTypeToPoll = () => {
    store.dispatch(feedSlice.actions.onPostTypeChange({ type: PostType.POLL }));
  };

  return (
    <div className="uploader">
      <div className="options">
        <input
          onChange={({ target: { files } }) => onPostAttachment(files)}
          accept=".jpg, .jpeg, .gif, .bmp, .png, .mp4"
          multiple
          type="file"
        />
        <div className="wrapper">
          <img
            src="https://konnect.im/static/media/image.002df348.svg"
            alt=""
          />{" "}
          <span>Photo/Video</span>
        </div>
      </div>
      <div className="options">
        <input
          onChange={({ target: { files } }) => onPostAttachment(files)}
          multiple
          accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
          type="file"
        />
        <div className="wrapper">
          <img
            src="https://konnect.im/static/media/contract.eb367011.svg"
            alt=""
          />{" "}
          <span>Documents</span>
        </div>
      </div>
      <div className="options" onClick={() => setPostTypeToPoll()}>
        <div className="wrapper">
          <img
            src="https://konnect.im/static/media/ballot.ad2d2fc5.svg"
            alt=""
          />
          <span>Poll</span>
        </div>
      </div>
    </div>
  );
}

export default PostOptions;
