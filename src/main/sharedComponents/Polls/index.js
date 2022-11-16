import React, { useState } from "react";
import "./style.css";
import { Radio } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { savePollResponse } from "../../features/feed/store/actions";
import { useEffect } from "react";
import { postPoll } from "../../features/feed/store/slice";

function Polls({ options, voteCounts, id: postId }) {
	const [isVoted, setIsVoted] = useState("");
	const [disableVote, setDisableVote] = useState(false);
	const [isAttachement, setIsAttachement] = useState(false);
	const dispatch = useDispatch();
	const getValue = opt => {
		setIsVoted(opt);
	};
	useEffect(() => {
		for (const opt of options) {
			if (opt.youVoted) {
				setDisableVote(true);
				setIsVoted(opt.id);
				break;
			} else {
				setDisableVote(false);
			}
		}
	}, [JSON.stringify(options)]);

	const handleUndo = () => {
		options.setIsVoted("");
	};
	const onRadioChange = ({ target: { value } }, id) => {
		setDisableVote(false);
		dispatch(postPoll({ postId, id }));
		dispatch(savePollResponse(id));
	};

	const onChange = e => {
		// console.log("radio checked", e.target.value);
		setIsVoted(e.target.value);
	};

	return (
		<div className={isAttachement ? "polls polls-attachment" : "polls"}>
			<Radio.Group
				optionType="button"
				// defaultValue={isVoted}
				value={isVoted}
				onChange={onChange}
				disabled={disableVote}
			>
				{options.map(
					(
						{ option, voteCount, youVoted, type, attachment, id },
						index
					) => {
						// if (youVoted && isVoted !== id) {
						// 	setIsVoted(id);
						// 	// getValue(id);
						// }

						if (attachment.length > 1 && !isAttachement) {
							// setIsVoted(id);
							setIsAttachement(true);
						}
						// const width = (votes / voteCounts) * 100;
						return (
							<Radio.Button
								value={id}
								key={index}
								onChange={e => onRadioChange(e, id)}
								// disabled={youVoted}
							>
								{attachment.length > 0 && (
									<img
										src={attachment}
										alt="poll image"
										className="!object-cover !rounded-t-lg"
									/>
								)}
								<div className="pollValue">
									<div className="left">
										<span className="icon">
											<CheckCircleOutlined />
										</span>
										<span className="label">{option}</span>
									</div>
									<div className="right">
										{/* {isVoted === option ? (
											<span
												className="voteCount"
												onClick={handleUndo}
											>
												Undo
											</span>
										) : (
											)} */}
										<span
											className={`voteCount ${
												youVoted ? "!text-white" : ""
											}`}
										>{`${voteCount} Votes`}</span>
									</div>
								</div>
							</Radio.Button>
						);
					}
				)}
			</Radio.Group>
		</div>
	);
}

export default Polls;
