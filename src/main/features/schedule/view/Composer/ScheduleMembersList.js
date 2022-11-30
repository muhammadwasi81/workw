import { Button, Tag } from "antd";
import React from "react";
import {
	getStatusLabelAndColor,
	ScheduleMemberStatus,
	ScheduleMemberType,
} from "../../enum/enum";
// import Avatar from "../../../ Avatar/avatarOLD";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import { useSelector } from "react-redux";

function ScheduleMembersList({ status, data, memberType, isActionEnabled }) {
	const { label, color } = getStatusLabelAndColor("", "")[status];

	const loggedInUserId = useSelector(state => state.userSlice.user.id);
	return (
		<div>
			<div className="approvalCollapse ant-collapse cursor-pointer">
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
										<Button className="!border !border-[#1ECB40] !bg-[#1ECB40] !text-white !rounded-sm !p-1">
											Attending
										</Button>
										<Button className="!border !border-[#FF0000] !bg-[#FF0000] !text-white !rounded-sm !p-1">
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
