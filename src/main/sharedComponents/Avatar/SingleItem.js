import React from "react";
import { useNavigate } from "react-router-dom";

function SingleItem({ data }) {
	const navigate = useNavigate();

	const handleClick = (e, id) => {
		e.preventDefault();
		e.stopPropagation();
		navigate(`/user/${id}`);
	};

	return data.map(item => {
		return (
			<div
				className="singleTag"
				onClick={e =>
					handleClick(
						e,
						item.approver?.id || item.user?.id || item.member?.id
					)
				}
			>
				{item.approver?.image ||
				item.user?.image ||
				item.member?.image ? (
					<div className="imageDiv">
						<img
							src={
								item.approver.image || 	item.user?.image || item.member?.image
							}
						/>
					</div>
				) : (
					""
				)}
				{(item.user || item.approver || item.member) && (
					<div className="tagText">
						<p className="text-primary-color">
							{item.user?.name ||
								item.approver?.name ||
								item.member?.name}
						</p>
					</div>
				)}
			</div>
		);
	});
}

export default SingleItem;
