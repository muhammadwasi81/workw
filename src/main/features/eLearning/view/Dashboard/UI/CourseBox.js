import { Progress } from "antd";
import React from "react";
import WhiteCard from "../../../UI/WhiteCard";
import { BsFileText } from "react-icons/bs";
import BoxThumnail from "./BoxThumnail";
import beginner from "../../../../../../content/NewContent/eLearning/beginer.svg";
import master from "../../../../../../content/NewContent/eLearning/master.svg";
import intermediate from "../../../../../../content/NewContent/eLearning/intermediate.svg";

function CourseBox() {
	const tag = {
		1: "Beginner",
		2: "Intermediate",
		3: "Advance",
	};
	const LevelsIcon = {
		1: <img src={beginner} alt="beginner" />,
		2: <img src={intermediate} alt="intermediate" />,
		3: <img src={master} alt="master" />,
	};
	return (
		<WhiteCard
			onClick={() => {}}
			className="cursor-pointer hover:shadow-lg transition-all"
		>
			<div className="flex flex-col gap-1">
				<BoxThumnail tag={tag[1]} level={LevelsIcon[1]} />
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

export default CourseBox;
