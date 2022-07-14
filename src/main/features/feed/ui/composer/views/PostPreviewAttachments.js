import ImageReader from "../../../../../sharedComponents/ImageReader/ImageReader";
import { useSelector } from "react-redux";
import store from "../../../../../../store/store";
import { feedSlice } from "../../../store/slice";

export default function PostPreviewAttachments() {
  const { attachments } = useSelector(({ feedSlice }) => feedSlice.postCompose);

  return (
    attachments.length > 0 && (
      <div className="preview-file">
        {attachments.map((item, index) => (
          <ImageReader
            removeFile={() =>
              store.dispatch(feedSlice.actions.removePostAttachment({ index }))
            }
            key={index}
            file={item}
          />
        ))}
      </div>
    )
  );
}
