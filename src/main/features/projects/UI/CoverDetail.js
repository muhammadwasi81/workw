import React from "react";
import {
	CalendarOutlined,
	InfoCircleOutlined,
	LockOutlined,
} from "@ant-design/icons";
import { Popover, Tooltip } from "antd";
import { BiWorld } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import WhiteCard from "./WhiteCard";
import moment from "moment";

function CoverDetail({ detail }) {
	return (
		<WhiteCard className={"z-10 sticky top-0 w-full mt-[-87px] shadow-md"}>
			<div className="flex w-full justify-between text-base items-center">
				<div className="flex flex-col text-base">
					<span className="text-black text-base font-bold">
						{detail?.name}
					</span>
					<span className="text-gray-500 text-sm font-bold flex items-center gap-1">
						{detail?.privacyId === 1 ? (
							<Popover
								content={"Public Project"}
								className="cursor-pointer"
							>
								<BiWorld />
							</Popover>
						) : (
							<Popover
								content={"Private Project"}
								className="cursor-pointer"
							>
								<FaLock />
							</Popover>
						)}

						{detail?.description}
					</span>
				</div>
				<div>
					<div className="text-black text-base font-bold flex items-center gap-2">
						<Popover
							content={`Created by: ${detail?.creator.name}`}
						>
							<InfoCircleOutlined className="cursor-pointer" />
						</Popover>
						<span>Created by: {detail?.creator.name}</span>
					</div>
					<div className="flex items-center gap-2">
						<CalendarOutlined />
						<p className="!mb-0 text-sm">
							Created at:{" "}
							{moment(detail?.createDate).format("MMMM d, YYYY")}
						</p>
					</div>
				</div>
			</div>
		</WhiteCard>
	);
}

export default CoverDetail;
