import { Progress } from "antd";
import React from "react";
import { BsFileText } from "react-icons/bs";
import beginner from "../../../../../../content/NewContent/eLearning/beginer.svg";
import master from "../../../../../../content/NewContent/eLearning/master.svg";
import intermediate from "../../../../../../content/NewContent/eLearning/intermediate.svg";
import WhiteCard from "../../../UI/WhiteCard";
import BoxThumnail from "../UI/BoxThumnail";
import DefaultImage from "../../../../../../content/NewContent/eLearning/articleDefatulImage.svg"
import { useNavigate } from "react-router-dom";

export const LevelsIcon = {
	1: <img src={beginner} alt="beginner" />,
	2: <img src={intermediate} alt="intermediate" />,
	3: <img src={master} alt="master" />,
};
export const tag = {
	1: "Beginner",
	2: "Intermediate",
	3: "Advance",
};
function VideoCard({data}) {
	const navigate = useNavigate();
	let { 
		name,
		// courseType,
		description,
		image
	 } = data ? data : "";
	 let DefaultImage = "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80"
	return (
		<WhiteCard
			onClick={() => {
				navigate(`video/${data.id}`);
			}}
			className="cursor-pointer hover:shadow-lg transition-all"
		>
			<div className="flex flex-col gap-1">
				<BoxThumnail
					// tag={tag[courseType]}
					level={LevelsIcon[1]}
					image={image === "" ? DefaultImage : image }
					title={name}
					description={description && description}
				/>
			</div>
		</WhiteCard>
	);
}

export default VideoCard;
