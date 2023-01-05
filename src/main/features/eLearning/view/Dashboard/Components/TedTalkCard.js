import React from "react";
import { useNavigate } from "react-router";
import WhiteCard from "../../../UI/WhiteCard";
import BoxThumnail from "../UI/BoxThumnail";
import DefaultImage from "../../../../../../content/NewContent/eLearning/tedTalkDefault.jpg"

function TedTalkCard({ data }) {
	const navigate = useNavigate()
	let { 
		name,
		description,
		image,
	} = data;

	return (
		<WhiteCard
			onClick={() => navigate(`tedtalk/${data.id}`)}
			className="cursor-pointer hover:shadow-lg transition-all"
		>
			<div className="flex flex-col gap-1">
				<BoxThumnail
					image={image ? image : DefaultImage}
					title={name}
					description={description}
				/>
			</div>
		</WhiteCard>
	);
}

export default TedTalkCard;
