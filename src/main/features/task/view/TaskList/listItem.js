import { Button, Progress } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { Rate } from "antd";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import moment from "moment";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import { taskDictionary } from "../../localization";
import {
	getPriorityLabel,
	UserTaskStatusEnum,
	getUserStatusLabel,
} from "../../utils/enum/enum";
import TaskMembers from "../TaskDetail/taskMembers";
import { postUserTaskRating } from "../../utils/services/service";
import Attachments from "../../../travel/view/UI/Attachments";
import { cancelTaskAction } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
// import {
//   ApprovalsModule,
//   ApprovalStatus,
// } from "../../../../sharedComponents/AppComponents/Approvals/enums";

function TaskListItem({
	item,
	isTaskMember = false,
	onTask = () => {},
	isRatingDisable = true,
	changeOnProgress,
	progress,
	isDetail = false,
}) {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction } = dictionaryList[userLanguage];
	const [rating, setRating] = useState("");
	const { taskDictionaryList } = taskDictionary[userLanguage];
	const [isMount, setIsMount] = useState(false);
	const [updatedStatus, setUpdatedStatus] = useState(null);
	const { labels } = taskDictionaryList;
	const dispatch = useDispatch();
	const {
		id,
		subject,
		description,
		referenceNo,
		ratingAssign,
		priority,
		startDate,
		endDate,
		progress: progressed,
		members = [],
		creator,
		status,
		attachments,
		predecessor,
	} = item;
	let {
		NotStarted,
		InProcess,
		Completed,
		RatingAssign,
		Cancelled,
	} = UserTaskStatusEnum;
	const { user } = useSelector(state => state.userSlice);
	let userId = user.id;

	let classes = "card-list-item ";
	classes += Direction === "rtl" ? "rtl" : "ltr";
	const { color, label } = getPriorityLabel(labels, priority);
	const taskColorEnum = getUserStatusLabel(label, status);
	useEffect(() => {
		if (isMount) {
			if (!isRatingDisable) handleRating(id, rating);
		}
	}, [rating]);

	useEffect(() => {
		setIsMount(true);
	}, []);

	const handleRating = async (id, rating) => {
		await postUserTaskRating(id, rating);
	};
	// console.log(progress ? progress : progressed, "condition");
	const handleCancel = (e, payload) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(cancelTaskAction(payload));
	};
	return (
		<div className={classes} onClick={() => onTask(id)}>
			<div className="card-item-header">
				<div className="left">
					<UserInfo
						avatarSrc={creator?.image}
						name={creator?.name}
						Subline={
							<SublineDesigWithTime
								designation={
									creator?.designation
										? creator?.designation
										: ""
								}
								time={moment(startDate).fromNow()}
							/>
						}
					/>
				</div>

				<div className="right">
					<div>
						<div className="labels">
							<span className="taskID">{referenceNo}</span>
							<span
								className="priority "
								style={{ backgroundColor: color }}
							>
								{label}
							</span>
							{userId === creator?.id
								? status !== Completed && status !== Cancelled
									? isDetail && (
											<span
												className="cancel-task ThemeBtn"
												onClick={e =>
													handleCancel(e, id)
												}
											>
												Cancel
											</span>
									  )
									: ""
								: ""}
							{(status === Completed || status === Cancelled) && (
								<span
									className="user-status"
									style={{
										backgroundColor: taskColorEnum.color,
									}}
								>
									{taskColorEnum.label}
								</span>
							)}
						</div>

						<div className="rating">
							<Rate
								defaultValue={ratingAssign}
								disabled={isRatingDisable || progress !== 100}
								onChange={value => setRating(value)}
								value={ratingAssign}
							/>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div className="card-item-body-main">
					<div className="card-item-body">
						<div className="left">
							<div className="card-Title-1">{subject}</div>
							<p className="card-desc-1">{description}</p>
						</div>

						<div className="right !min-w-max">
							{isTaskMember && (
								<TaskMembers
									members={members}
									changeOnProgress={changeOnProgress}
								/>
							)}
							<div className="!w-max m-4 ml-auto">
								<Attachments
									data={attachments}
									key={{ data: attachments }}
									toShow={1}
									onClick={() => {}}
									size={"50px"}
								/>
							</div>
						</div>
					</div>
					<div>
						<Progress
							strokeColor="#526bb1"
							percent={progress ? progress : progressed}
						/>
					</div>
					<div className="cardSections">
						<div className="cardSectionItem">
							<div className="cardSection__title">
								{labels.predecessor}
							</div>
							<div className="cardSection__body">
								{predecessor}
							</div>
						</div>
						<div className="cardSectionItem">
							<div className="cardSection__title">
								{labels.startDate}
							</div>
							<div className="cardSection__body">
								{moment(startDate).format("ddd,MMM DD,YYYY")}
							</div>
						</div>
						<div className="cardSectionItem">
							<div className="cardSection__title">
								{labels.endtDate}
							</div>
							<div className="cardSection__body">
								{moment(endDate).format("ddd,MMM DD,YYYY")}
							</div>
						</div>
						{/* <div className="cardSectionItem">
              <div className="cardSection__title">{labels.predecessor}</div>
              <div className="cardSection__body">Predecessor</div>
            </div> */}
						<div className="cardSectionItem">
							<div className="cardSection__title">
								{labels.assignTo}
							</div>
							<div className="cardSection__body">
								{members && (
									<Avatar
										isAvatarGroup={true}
										isTag={false}
										heading={"Members"}
										membersData={members}
										image={
											"https://joeschmoe.io/api/v1/random"
										}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TaskListItem;
