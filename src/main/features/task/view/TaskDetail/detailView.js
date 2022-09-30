import React from "react";
import { useParams } from "react-router-dom";
import { ROUTES } from "../../../../../utils/routes";
import Header from "../../../../layout/header";
import TaskDetail from "./detailCard";
import "../../view/style/task.css";

export default function DetailView() {
	const { id } = useParams();
	return (
		<>
			<Header
				items={[
					{
						name: "Task Detail",
						to: "/tasks/taskDetail/" + id,
						// renderButton: buttonsEnum.dashboard,
					},
				]}
			/>
			<TaskDetail />
		</>
	);
}
