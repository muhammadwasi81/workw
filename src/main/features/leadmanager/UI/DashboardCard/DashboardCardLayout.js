import React from "react";
import { Card, Skeleton } from "antd";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import PublicPrivateIcon from "../../../../sharedComponents/PublicPrivateIcon/PublicPrivateIcon";
import { useSelector } from "react-redux";

function DashboardCardLayout({
	data = {},
	defaultImg,
	loading = false,
	handleUpdate = () => {},
	getDetailById = () => {},
	onClick = () => {},
}) {
	const { Meta } = Card;
	const userId = useSelector(state => state.userSlice.user.id);

	return (
		<>
			<Card
				cover={
					!loading ? (
						<img
							alt="example"
							className="object-cover"
							src={data.image ? data.image : defaultImg}
						/>
					) : (
						<Skeleton.Image className="ant-skeleton-active" />
					)
				}
				className="Card2"
				hoverable
				onClick={onClick}
				loading={loading}
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
						membersData={data.members ? data.members : []}
					/>
					{userId === data.createBy && (
						<div
							className="flex items-center gap-1 p-1 rounded-sm bg-neutral-100 !text-primary-color hover:bg-neutral-200 transition"
							onClick={e => {
								e.preventDefault();
								e.stopPropagation();
								getDetailById(data.id);
								handleUpdate();
							}}
						>
							Update
						</div>
					)}
				</div>
			</Card>
		</>
	);
}

export default DashboardCardLayout;
