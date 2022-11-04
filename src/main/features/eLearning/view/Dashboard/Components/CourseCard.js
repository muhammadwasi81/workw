import { Progress } from "antd";
import React from "react";
import { BsFileText } from "react-icons/bs";
import beginner from "../../../../../../content/NewContent/eLearning/beginer.svg";
import master from "../../../../../../content/NewContent/eLearning/master.svg";
import intermediate from "../../../../../../content/NewContent/eLearning/intermediate.svg";
import WhiteCard from "../../../UI/WhiteCard";
import BoxThumnail from "../UI/BoxThumnail";
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
function CourseCard() {
	const navigate = useNavigate();
	return (
		<WhiteCard
			onClick={() => {
				navigate("courses/123");
			}}
			className="cursor-pointer hover:shadow-lg transition-all"
		>
			<div className="flex flex-col gap-1">
				<BoxThumnail
					tag={tag[1]}
					level={LevelsIcon[1]}
					image={
						"https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80"
					}
					title={"UI UX Design: Wireframe To Define Idea"}
					description={
						"Lorem ipsum dolor sit amet consectetur adipisicing elit.Reprehenderit, aperiam iste magni autem ipsa"
					}
				/>
				<Progress
					percent={30}
					showInfo={false}
					strokeColor="var(--currentThemeColor)"
				/>

				<div className="flex justify-between items-center font-semibold">
					<p className="!mb-0 flex items-center gap-1">
						<BsFileText className="!text-lg" /> 3/5 Lessons
					</p>
					<span>30%</span>
				</div>
			</div>
		</WhiteCard>
	);
}

export default CourseCard;
