import React from "react";
import { useNavigate } from "react-router-dom";

function SingleItem({ data, nestedObjProperty }) {
	const navigate = useNavigate();

	const handleClick = (e, id) => {
		// console.log(id, "MAIN ID NOW");
		e.preventDefault();
		e.stopPropagation();
		navigate(`/user/${id}`);
	};

	return data.map(item => {
		return (
			<div className="singleTag" onClick={e => handleClick(e, item.id)}>
				{item[nestedObjProperty]?.image ? (
					<div className="imageDiv">
						<img src={item[nestedObjProperty].image} />
					</div>
				) : (
					""
				)}
				<div className="tagText">
					<p>{item[nestedObjProperty]?.name}</p>
				</div>
			</div>
		);
	});
}

export default SingleItem;
