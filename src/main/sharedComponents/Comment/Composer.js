import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	getMentionsAndText,
	isValidFileSize,
	jsonToFormData,
} from "../../../utils/base";
import { DEFAULT_GUID } from "../../../utils/constants";
import { defaultUiid } from "../../../utils/Shared/enums/enums";
import useDebounce from "../../../utils/Shared/helper/use-debounce";
import { getAllEmployeeService } from "../../../utils/Shared/services/services";
import Avatar from "../Avatar/avatarOLD";
import CustomMentions from "../Mentions";
import closeIcon from "./assets/close.svg";
import { postComment } from "./services";
import "./style.css";

const CommentComposer = ({
	isAttachment = true,
	id = DEFAULT_GUID,
	referenceId = DEFAULT_GUID,
	parentId = DEFAULT_GUID,
	module = 1,
	commentRequestSuccess,
	initialMentions = [],
	placeHolder = "Write Your Comments Here.",
	setShowComments = () => {},
}) => {
	const {
		userSlice: { user },
	} = useSelector(state => state);
	const defaultState = {
		hasAttachment: false,
		attachmentFile: null,
		attachmentName: "",
		attachmentPath: "",
		commentText: "",
	};
	const { name, userImage } = user;
	const [mentions, setMentions] = useState([...initialMentions]);
	const [mentionsInTitle, setMentionsInTitle] = useState([]);
	const [state, setState] = useState(defaultState);
	const search = useDebounce(state.commentText, 500);

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
	const handleDeleteAttachments = () => {
		setState({
			...state,
			hasAttachment: false,
			attachmentPath: "",
			attachmentFile: null,
		});
	};
	const createNewComment = async event => {
		const { title, mentions } = getMentionsAndText(
			state.commentText,
			mentionsInTitle
		);
		const commentObj = {
			id,
			module,
			referenceId,
			parentId,
			comment: title,
			attachments: state.hasAttachment
				? [{ id: defaultUiid, file: state.attachmentFile }]
				: [],
			mentions,
		};
		if (event.keyCode === 13 || event.which === 13) {
			event.preventDefault();
			if (state.commentText.length > 0 || state.hasAttachment) {
				// console.log("state", state);
				const prevText = state.commentText;
				setState(defaultState);
				// setState(preValue => ({
				// 	...preValue,
				// 	commentText: "",
				// }));
				commentRequestSuccess &&
					commentRequestSuccess({ ...commentObj, ...state });
				const response = await postComment(jsonToFormData(commentObj));
				if (response) {
				} else {
					setState(preValue => ({
						...preValue,
						commentText: prevText,
					}));
				}
			}
		}
		setShowComments(true);
	};
	const getEmployeeOnMentionSearch = async value => {
		if (value.includes("@")) {
			let filter = value.split("@").at(-1);
			const text = filter.replace(/@/g, "");

			const { responseCode, data } = await getAllEmployeeService(
				text,
				1,
				20
			);
			if (responseCode === 1001) setMentions(data);
		}
	};

	useEffect(() => {
		getEmployeeOnMentionSearch(search);
	}, [search]);

	return (
		<div className="commentComposer !mb-0">
			<div className="">
				<Avatar
					name={name}
					width={30}
					height={30}
					round={true}
					src={userImage}
				/>
			</div>

			<div className="composer-area">
				<form className="inputs">
					<div className="inp">
						<CustomMentions
							onChange={event => {
								setState(preValue => ({
									...preValue,
									commentText: event,
								}));
							}}
							row={1}
							onSelect={event => {
								setMentionsInTitle(preValue => [
									...preValue,
									event,
								]);
							}}
							value={state.commentText}
							onKeyPress={event => createNewComment(event)}
							initialMentions={mentions}
							placeholder={placeHolder}
						/>
					</div>

					{isAttachment && (
						<div className="capture">
							<input
								accept=".jpg, .jpeg, .gif, .bmp, .png, .mp4"
								type="file"
								value=""
								onChange={handleCommentImageChange}
							/>
						</div>
					)}
				</form>
				{state.hasAttachment ? (
					<div className="attach-select-area">
						{
							<div
								className="attach  !h-[80px] !w-[80px]"
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
								<div
									className="cut"
									onClick={handleDeleteAttachments}
								>
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
