import React from "react";
import WhiteCard from "../../../UI/WhiteCard";
import BoxThumnail from "../UI/BoxThumnail";
import { BsFileText } from "react-icons/bs";
function QuizCard() {
	return (
		<WhiteCard
			zz
			className="cursor-pointer hover:shadow-lg transition-all relative overflow-hidden"
		>
			<div className="absolute top-0 right-0 bg-[#D40413] text-white font-semibold rounded-bl-lg p-2 z-50">
				Overdue
			</div>
			<div className="flex flex-col gap-1">
				<BoxThumnail
					image={
						"https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80"
					}
					title={"UI UX Design: Wireframe To Define Idea"}
					description={
						"Lorem ipsum dolor sit amet consectetur adipisicing elit.Reprehenderit, aperiam iste magni autem ipsa"
					}
				/>
			</div>
			<p className="!mb-0 flex items-center gap-1 font-semibold">
				<BsFileText className="!text-lg" /> Questions: 10
			</p>
		</WhiteCard>
	);
}

export default QuizCard;
