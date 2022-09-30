import { Button } from "antd";
import React from "react";
import { useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import WorkplaceForm from "../forms/WorkplaceForm";
import AddButton from "../UI/AddButton";
import List from "../UI/List";

function Work() {
	const [showWorkForm, setShowWorkForm] = useState(false);
	const handleShowWork = () => {
		setShowWorkForm(!showWorkForm);
	};
	return (
		<div className="p-3 ">
			<p className="text-lg text-black font-semibold">Work</p>
			<div className="">
				{showWorkForm ? (
					<WorkplaceForm handleShowWork={handleShowWork} />
				) : (
					<AddButton
						text={"Add a workplace"}
						onClick={handleShowWork}
					/>
				)}
				<List />
			</div>
		</div>
	);
}

export default Work;
