import React from "react";

function CurriculumCollapseCard(props) {
	return (
		<div>
			{props.data.details.map(detail => (
				<div className="flex items-center gap-3 mb-5">
					<div className="">
						<p className="!mb-2 font-bold">{detail.title}</p>
						<p className="!mb-0 text-[#707070] text-xs flex items-center gap-1">
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
