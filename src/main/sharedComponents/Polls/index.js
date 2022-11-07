import React, { useState } from "react";
import "./style.css";
import { Radio } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { savePollResponse } from "../../features/feed/store/actions";

function Polls({ options, voteCounts }) {
	const [isVoted, setIsVoted] = useState("");
	const [isAttachement, setIsAttachement] = useState(false);
	const dispatch = useDispatch();
	const getValue = opt => {
		setIsVoted(opt);
	};
	const handleUndo = () => {
		options.setIsVoted("");
	};
	const onRadioChange = ({ target: { value } }, id) => {
		dispatch(savePollResponse(id));
	};

	return (
		<div className={isAttachement ? "polls polls-attachment" : "polls"}>
			<Radio.Group optionType="button" defaultValue={isVoted}>
				{options.map(
					(
						{ option, votes, youVoted, type, attachment, id },
						index
					) => {
						{
							/* if (youVoted && isVoted !== option) {
            getValue(option);
          } */
						}
						if (attachment.length > 1 && !isAttachement) {
							setIsAttachement(true);
						}
						const width = (votes / voteCounts) * 100;
						return (
							<Radio.Button
								value={option}
								key={index}
								onChange={e => onRadioChange(e, id)}
							>
								{isAttachement && (
									<img src={attachment} alt="" />
								)}
								<div className="pollValue">
									<div className="left">
										<span className="icon">
											<CheckCircleOutlined />
										</span>
										<span className="label">{option}</span>
									</div>
									<div className="right">
										{isVoted === option ? (
											<span
												className="voteCount"
												onClick={handleUndo}
											>
												Undo
											</span>
										) : (
											<span className="voteCount">{`${votes} Votes`}</span>
										)}
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
