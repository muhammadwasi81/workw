import React from "react";
import { Card } from "antd";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import WorkBoardImg from "../../../../content/png/workboard.png";
import PublicPrivateIcon from "../../../sharedComponents/PublicPrivateIcon/PublicPrivateIcon";
import { ROUTES } from "../../../../utils/routes";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getWorkboardById } from "../store/action";
import { useDispatch } from "react-redux";
import { handleBoardComposer } from "../store/slice";
function WorkBoardCard({ data }) {
	const { Meta } = Card;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userId = useSelector(state => state.userSlice.user.id);

	return (
		<Card
			cover={
				<img
					alt="example"
					className="object-cover"
					src={data.image ? data.image : WorkBoardImg}
				/>
			}
			className="Card2"
			hoverable
			onClick={e => {
				navigate(`${ROUTES.WORKBOARD.BOARD}${data.id}`);
			}}
		>
			<Meta
				className="w-full"
				title={data.name}
				description={
					<div className="flex items-center gap-1 w-full">
						<PublicPrivateIcon id={data.privacyId} />{" "}
						<div className="flex items-center justify-between w-full">
							<span className="text-ellipsis whitespace-nowrap overflow-hidden w-[150px]">
								{data.description}
							</span>
						</div>
					</div>
				}
			/>
			<div className="flex justify-between items-center">
				<Avatar
					isAvatarGroup={true}
					isTag={false}
					heading={"Members"}
					membersData={data.members}
					image={"https://joeschmoe.io/api/v1/random"}
				/>
				{userId === data.createBy && (
					<div
						className="flex items-center gap-1 p-1 rounded-sm bg-neutral-100 !text-primary-color hover:bg-neutral-200 transition"
						onClick={e => {
							e.preventDefault();
							e.stopPropagation();
							dispatch(getWorkboardById(data.id));
							dispatch(
								handleBoardComposer({
									isEdit: true,
									isVisible: true,
								})
							);
						}}
					>
						Update
					</div>
				)}
			</div>
		</Card>
	);
}

export default WorkBoardCard;
