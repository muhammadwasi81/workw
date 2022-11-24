import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";
import CommentWrapper from "../../../../sharedComponents/Comment/CommentWrapper";
import { getTaskById } from "../../store/actions";
import { changeOnProgress, clearTaskById } from "../../store/taskSlice";
import TaskListItem from "../TaskList/listItem";
import "../style/task.css";

function TaskDetail({ id }) {
	const [progress, setProgress] = useState();
	const { task } = useSelector(state => state.taskSlice);
	const dispatch = useDispatch();

	useEffect(() => {
		if (id) {
			dispatch(getTaskById(id));
		}
		return () => {
			dispatch(clearTaskById());
		};
	}, [id]);
	useEffect(() => {
		const memberAvg = task.members?.reduce(
			(acc, obj) => acc + obj.progress,
			0
		);
		const progress = memberAvg / task?.members?.length;
		setProgress(progress);
	}, [task]);

	const handleProgressChange = data => {
		dispatch(changeOnProgress(data));
	};

	return (
		<>
			{!Object.keys(task).length ? (
				<Skeleton avatar paragraph={{ rows: 6 }} />
			) : (
				<div className="taskDetail">
					{
						<TaskListItem
							progress={progress}
							item={task}
							isTaskMember={true}
							isRatingDisable={false}
							changeOnProgress={handleProgressChange}
							isDetail={true}
						/>
					}
					<div className="comments">
						<CommentWrapper
							initailComments={[]}
							referenceId={id}
							module={2}
							isCommentLoad={true}
						/>
					</div>
				</div>
			)}
		</>
	);
}

export default TaskDetail;
