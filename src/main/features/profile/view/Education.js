import React from "react";
import { useState } from "react";
import EducationForm from "../forms/EducationForm";
import AddButton from "../UI/AddButton";
import List from "../UI/List";

function Education() {
	const [showEducation, setShowEducation] = useState(false);

	const handleEducation = () => {
		setShowEducation(!showEducation);
	};
	return (
		<div className="">
			<div className="p-3 ">
				<p className="text-lg text-black font-semibold">Education</p>
				{showEducation ? (
					<EducationForm handleEducation={handleEducation} />
				) : (
					<AddButton
						text={"Add a education"}
						onClick={handleEducation}
					/>
				)}
				<List />
			</div>
		</div>
	);
}

export default Education;
