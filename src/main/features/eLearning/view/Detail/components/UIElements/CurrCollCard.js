import React from "react";
import book from "../../../../../../../content/NewContent/LD/book.svg";
import doc from "../../../../../../../content/NewContent/LD/doc.svg";
import play from "../../../../../../../content/NewContent/LD/play.svg";
export const icon_and_text = [
	{
		icon: play,
		text: "Video",
	},
	{
		icon: book,
		text: "Reading",
	},
	{
		icon: doc,
		text: "Quiz",
	},
];
function CurriculumCollapseCard(props) {
	return (
		<div>
			{props.data.details.map(detail => (
				<div className="flex items-center gap-3 mb-5">
					<img
						src={icon_and_text[detail.type - 1].icon}
						alt="icons"
					/>
					<div className="">
						<p className="!mb-2 font-bold">{detail.title}</p>
						<p className="!mb-0 text-[#707070] text-xs flex items-center gap-1">
							{icon_and_text[detail.type - 1].text}{" "}
							<span className="text-[30px] mb-1">&#8226;</span>{" "}
							{detail.duration}{" "}
							{detail.type === 3 ? "questions" : "minutes"}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

export default CurriculumCollapseCard;
