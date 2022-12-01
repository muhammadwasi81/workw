import React from "react";
import { useSelector } from "react-redux";
import { Button, Tag } from "antd";

import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import {
	getStatusLabelAndColor,
	ScheduleMemberStatus,
	ScheduleMemberType,
} from "../../enum/enum";

function ScheduleMembersList({
	status,
	data,
	memberType,
	isActionEnabled,
	handleMemberStatusChange,
	handleMemberTypeStatusChange,
	id,
}) {
	const { label, color } = getStatusLabelAndColor("", "")[status];
	const loggedInUserId = useSelector(state => state.userSlice.user.id);
	return (
		<div>
			<div className="approvalCollapse ant-collapse cursor-pointer group">
				<div className="ant-collapse-item">
					<div className="approval__body-header">
						<div className="left">
							<Avatar
								src={data?.image && data?.image}
								name={data?.name}
								round
								width={"30px"}
								height={"30px"}
							/>
							<div className="userDetail">
								<span className="username">{data?.name}</span>
								<span className="designation">
									{data?.designation
										? data?.designation
										: "No Designation"}
								</span>
							</div>
						</div>
						<div className="right">
							<div className="flex gap-1 items-center">
								<span className="text-xs text-primary-color">
									{memberType === ScheduleMemberType.Admin &&
										"(Host)"}
								</span>

								{(status === ScheduleMemberStatus.Waiting &&
									isActionEnabled) ||
								(status === ScheduleMemberStatus.Waiting &&
									loggedInUserId === data?.id) ? (
									<div className="flex gap-1">
										{memberType !=
											ScheduleMemberType.Admin && (
											<Button
												className="!hidden !rounded-sm !p-1 group-hover:!inline"
												type="dashed"
												onClick={e => {
													handleMemberTypeStatusChange(
														id,
														ScheduleMemberType.Admin
													);
												}}
												// name={
												// 	memberType ===
												// 	ScheduleMemberType.User
												// 		? ScheduleMemberType.Admin
												// 		: ScheduleMemberType.User
												// }
											>
												Make Host
												{/* {memberType ===
												ScheduleMemberType.User
													? "Make Host"
													: "Remove Host"} */}
											</Button>
										)}
										<Button
											className="!border !border-[#1ECB40] !bg-[#1ECB40] !text-white !rounded-sm !p-1"
											onClick={() => {
												handleMemberStatusChange(
													id,
													ScheduleMemberStatus.Attending
												);
											}}
										>
											Attending
										</Button>
										<Button
											className="!border !border-[#FF0000] !bg-[#FF0000] !text-white !rounded-sm !p-1"
											onClick={() => {
												handleMemberStatusChange(
													id,
													ScheduleMemberStatus.NotAttending
												);
											}}
										>
											Decline
										</Button>
									</div>
								) : (
									<Tag style={{ background: color }}>
										{label}
									</Tag>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ScheduleMembersList;
