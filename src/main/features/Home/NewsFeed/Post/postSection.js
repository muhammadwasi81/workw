import React, { useState } from "react";
import PostModel from "./PostModel/PostModel";
import thor from "../../../../../content/thor.jpg";
const PostSection = ({ post }) => {
	const [modelState, setmodelState] = useState(false);
	const openModel = () => {
		setmodelState(true);
	};
	return (
		<>
			<div className="post-section" onClick={openModel}>
				<img src={thor} alt="" />
			</div>
			{/* you can also pass a component to leftComponent which will render on the leftside // put false in it if you dont component */}
			<PostModel
				post={post}
				leftelement={false}
				setModelState={() => setmodelState(false)}
				open={modelState}
			/>
		</>
	);
};

export default PostSection;
