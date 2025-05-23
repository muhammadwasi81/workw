import React, { useState } from "react";
import { isValidFileSize } from "../../../utils/base";
// import { getUserDataFromStorage, STRINGS } from "../../../../../utils/base";
import Avatar from "../Avatar/avatar";
import closeIcon from "./assets/close.svg";
import "./style.css";

const CommentComposer = props => {
	let { isAttachment = true, onCommentSend } = props;

	const defaultState = {
		hasAttachment: false,
		attachmentFile: null,
		attachmentName: "",
		attachmentPath: "",
		commentText: "",
	};
	const [state, setState] = useState(defaultState);
	const handleCommentImageChange = e => {
		if (e.target.files && e.target.files[0]) {
			const validFile = isValidFileSize(e.target.files);
			if (validFile.status) {
				const reader = new FileReader();
				const file = e.target.files[0];
				reader.onload = data =>
					setState({
						...state,
						hasAttachment: true,
						attachmentPath: data.target.result,
						attachmentFile: file,
					});
				reader.readAsDataURL(file);
			} else {
				alert(validFile.message);
			}
		}
	};
	const deleteAttachment = () => {
		setState({
			...state,
			hasAttachment: false,
			attachmentPath: "",
			attachmentFile: null,
		});
	};

	return (
		<div className="commentComposer">
			<div className="">
				<Avatar
					src={
						"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
					}
					name={"EX"}
					width={33}
					height={33}
					round={true}
				/>
			</div>
			{/* onCommentSend({comment:state.commentText, attachmentFile : state.attachmentFile}) */}
			<div className="composer-area">
				<form
					className="inputs"
					onSubmit={e => {
						e.preventDefault();
						console.log("fff");
					}}
				>
					<div className="inp">
						<textarea
							placeholder="Write Your Comments Here."
							style={{ height: "20px" }}
						/>
					</div>

					{isAttachment && (
						<div className="capture">
							<input
								accept=".jpg, .jpeg, .gif, .bmp, .png, .mp4"
								type="file"
								onChange={handleCommentImageChange}
							/>
						</div>
					)}
				</form>
				{state.hasAttachment ? (
					<div className="attach-select-area">
						{
							<div
								className="attach"
								title={state.attachmentName}
								style={{
									backgroundImage: `url("${state.attachmentPath}")`,
									backgroundRepeat: `no-repeat`,
									backgroundSize: "contain",
									backgroundPosition: "center",
								}}
							>
								<div className="overlay">
									<span>{state.attachmentName}</span>
								</div>
								<div className="cut" onClick={deleteAttachment}>
									<img src={closeIcon} alt="#" />
								</div>
							</div>
						}
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
};
export default CommentComposer;
