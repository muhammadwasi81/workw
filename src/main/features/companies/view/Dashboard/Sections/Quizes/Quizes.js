import React from "react";

import QuizCard from "../../Components/QuizCard";

function Quizes() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2">
			<QuizCard />
			<QuizCard />
			<QuizCard />
			<QuizCard />
			<QuizCard />
			<QuizCard />
		</div>
	);
}

export default Quizes;
