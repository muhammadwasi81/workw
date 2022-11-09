import { useContext } from "react";
import store from "../../../../../../store/store";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { FeedDictionary } from "../../../localization";
import { feedSlice } from "../../../store/slice";
import { PostType } from "../../../utils/constants";
import photo from "../../../../../../content/NewContent/NewsFeed/svg/post_img_icon.svg";
import doc from "../../../../../../content/NewContent/NewsFeed/svg/post_doc_icon.svg";
import poll from "../../../../../../content/NewContent/NewsFeed/svg/post_poll_icon.svg";

function PostOptions() {
	const onPostAttachment = files => {
		if (files.length && files[0]) {
			store.dispatch(
				feedSlice.actions.addPostAttachment({ files: files })
			);
		}
	};
	const setPostTypeToPoll = () => {
		store.dispatch(
			feedSlice.actions.onPostTypeChange({ type: PostType.POLL })
		);
	};
	const { userLanguage } = useContext(LanguageChangeContext);
	const { composer } = FeedDictionary[userLanguage];
	const { Poll, Documents, PhotoVideo } = composer;

	return (
		<div className="uploader">
			<div className="options">
				<input
					onChange={({ target: { files } }) =>
						onPostAttachment(files)
					}
					accept=".jpg, .jpeg, .gif, .bmp, .png, .mp4"
					multiple
					type="file"
				/>
				<div className="wrapper">
					<img src={photo} alt="photo" /> <span>{PhotoVideo}</span>
				</div>
			</div>
			<div className="options">
				<input
					onChange={({ target: { files } }) =>
						onPostAttachment(files)
					}
					multiple
					accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
					type="file"
				/>
				<div className="wrapper">
					<img src={doc} alt="doc" /> <span>{Documents}</span>
				</div>
			</div>
			<div className="options" onClick={() => setPostTypeToPoll()}>
				<div className="wrapper">
					<img src={poll} alt="poll" />
					<span>{Poll}</span>
				</div>
			</div>
		</div>
	);
}

export default PostOptions;
