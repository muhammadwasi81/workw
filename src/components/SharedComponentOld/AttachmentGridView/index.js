import React, { useState } from "react";
import SingleAttachmentView from "./SingleAttachmentView";
import { AttachmentGrid } from "./attachmentView.style";
import PostModel from "../../MainMenu/Home/NewsFeed/Post/PostModel/PostModel";

const AttachmentGridView = ({ attachments }) => {
	const [modelState, setmodelState] = useState(false);
	let attachmentArr =
		attachments.length > 4 ? attachments.slice(0, 4) : [...attachments];
	console.log(modelState);
	return (
		<React.Fragment>
			<AttachmentGrid
				length={attachmentArr.length}
				className="AttachmentGridView"
				onClick={() => setmodelState(true)}
			>
				{attachments.length > 4 && (
					<div className="AttachmentViewShutter">
						+{attachments.length - 4}
					</div>
				)}
				{attachmentArr.map((item, ind) => (
					<SingleAttachmentView key={ind} item={item} />
				))}
			</AttachmentGrid>
			<PostModel
				post={{
					image: attachments,
				}}
				leftelement={false}
				setModelState={() => setmodelState(false)}
				open={modelState}
			/>
		</React.Fragment>
	);
};
export default AttachmentGridView;
