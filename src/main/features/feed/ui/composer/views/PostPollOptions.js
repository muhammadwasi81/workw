import PollInput from "../../../../../sharedComponents/PollInput/PollInput";
import { useSelector } from "react-redux";
import { DEFAULT_MAX_POLL_OPTIONS, PostType } from "../../../utils/constants";
import store from "../../../../../../store/store";
import { feedSlice } from "../../../store/slice";
import ImageReader from "../../../../../sharedComponents/ImageReader/ImageReader";

export default function PostPollOptions() {
  const onPollInputChange = (index, value) => {
    store.dispatch(
      feedSlice.actions.onPostPollOptionTextChange({ index, value })
    );
  };
  const onPollAttachmentChange = (index, files) => {
    store.dispatch(
      feedSlice.actions.onPostPollAttachmentChange({ index, files })
    );
  };
  const setPostTypeToDefault = () => {
    store.dispatch(
      feedSlice.actions.onPostTypeChange({ type: PostType.DEFAULT })
    );
  };
  const addPollOption = () => {
    store.dispatch(feedSlice.actions.addPostPollOption({}));
  };
  const removePollOption = (index) => {
    store.dispatch(feedSlice.actions.removePostPollOption({ index }));
  };

  const {
    type,
    poll: { options },
  } = useSelector(({ feedSlice }) => feedSlice.postCompose);

  return (
    PostType.isPollType(type) && (
      <>
        {options.map(({ value, attachment }, index) => (
          <>
            <PollInput
              key={index}
              index={index}
              placeholder={`Option ${index + 1}`}
              value={value}
              onChange={(e) => onPollInputChange(index, e.target.value)}
              onPollAttachmentChange={(files) =>
                onPollAttachmentChange(index, files)
              }
              removePollOption={() => removePollOption(index)}
            />
            <ImageReader key={index} file={attachment} />
          </>
        ))}
        <div className="poll-options">
          {options.length < DEFAULT_MAX_POLL_OPTIONS && (
            <button onClick={() => addPollOption()}>Add poll option</button>
          )}
          <button onClick={() => setPostTypeToDefault()}>Remove poll</button>
        </div>
      </>
    )
  );
}
